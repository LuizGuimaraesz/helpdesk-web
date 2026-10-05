import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AxiosHeaders, isAxiosError } from "axios";
import { z } from "zod";
import { api } from "../services/api";
import type { User, UserAPIResponse } from "../types/user";

type AuthContextValue = {
  isLoading: boolean;
  session: UserAPIResponse | null;
  save: (data: UserAPIResponse) => void;
  updateProfile: (user: User, token: string) => void;
  remove: () => void;
};

const STORAGE_KEYS = {
  user: "@helpdesk:user",
  token: "@helpdesk:token",
};

const sessionSchema: z.ZodType<UserAPIResponse> = z.object({
  token: z.string().trim().min(1),
  user: z.object({
    id: z.string().trim().min(1),
    name: z.string().trim().min(1),
    email: z.email(),
    role: z.enum(["client", "technician", "admin"]),
    avatarUrl: z.string().nullable().optional(),
    hours: z.array(z.string()).optional(),
  }),
});

function clearStoredSession() {
  for (const key of Object.values(STORAGE_KEYS)) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Storage bloqueado não deve impedir a limpeza da sessão em memória.
    }
  }
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sessionRef = useRef<UserAPIResponse | null>(null);

  const applySession = useCallback((data: UserAPIResponse | null) => {
    sessionRef.current = data;

    if (data) {
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }

    setSession(data);
  }, []);

  const remove = useCallback(() => {
    applySession(null);
    clearStoredSession();
  }, [applySession]);

  function save(data: UserAPIResponse) {
    const validSession = sessionSchema.parse(data);

    try {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(validSession.user));
      localStorage.setItem(STORAGE_KEYS.token, validSession.token);
    } catch {
      clearStoredSession();
    }

    applySession(validSession);
  }

  function updateProfile(user: User, token: string) {
    const currentSession = sessionRef.current;

    if (
      !currentSession ||
      currentSession.token !== token ||
      currentSession.user.id !== user.id
    ) {
      return;
    }

    save({
      ...currentSession,
      user: { ...currentSession.user, ...user },
    });
  }

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (
          isAxiosError(error) &&
          error.response?.status === 401 &&
          error.config?.url !== "/sessions"
        ) {
          const currentSession = sessionRef.current;
          const authorization = AxiosHeaders.from(error.config?.headers).get(
            "Authorization",
          );

          if (
            currentSession &&
            authorization === `Bearer ${currentSession.token}`
          ) {
            remove();
          }
        }

        return Promise.reject(error);
      },
    );

    try {
      const user = localStorage.getItem(STORAGE_KEYS.user);
      const token = localStorage.getItem(STORAGE_KEYS.token);

      if (user && token) {
        const restoredSession = sessionSchema.safeParse({
          user: JSON.parse(user),
          token,
        });

        if (restoredSession.success) {
          applySession(restoredSession.data);
        } else {
          remove();
        }
      } else {
        remove();
      }
    } catch {
      remove();
    } finally {
      setIsLoading(false);
    }

    return () => api.interceptors.response.eject(interceptor);
  }, [applySession, remove]);

  return (
    <AuthContext.Provider
      value={{ session, save, updateProfile, isLoading, remove }}
    >
      {children}
    </AuthContext.Provider>
  );
}
