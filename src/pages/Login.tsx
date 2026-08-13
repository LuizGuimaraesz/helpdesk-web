import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.email("Informe um e-mail valido.").trim(),
  password: z.string().min(1, "Informe sua senha"),
});

type SignInState = {
  message: string | null;
  fields: {
    email: string;
    password: string;
  };
};

const initialState: SignInState = {
  message: null,
  fields: {
    email: "",
    password: "",
  },
};

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [state, formAction, isLoading] = useActionState(
    loginAction,
    initialState,
  );

  async function loginAction(_: SignInState, formData: FormData) {
    const fields = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      const data = signInSchema.parse(fields);

      const response = await api.post("/sessions", data);

      auth.save(response.data);

      alert("Login efetuado com sucesso!");

      return initialState;
    } catch (error: any) {
      console.log(error);
      if (error instanceof ZodError) {
        return { message: error.issues[0].message, fields };
      }

      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error ?? "Nao foi possivel entrar.",
          fields,
        };
      }

      return { message: "Ocorreu um erro inesperado.", fields };
    }
  }

  return (
    <form
      className="flex w-full max-w-[400px] flex-col gap-3"
      action={formAction}
      aria-labelledby="login-title"
    >
      <div className="border-border flex w-full flex-col gap-10 rounded-[10px] border border-solid p-7">
        <div className="flex w-full flex-col gap-0.5">
          <h1
            id="login-title"
            className="text-foreground text-xl leading-[1.4] font-bold"
          >
            Acesse o portal
          </h1>
          <p className="text-muted text-xs leading-[1.4]">
            Entre usando seu e-mail e senha cadastrados
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <FormField
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            defaultValue={state.fields.email}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
          />
        </div>

        {state.message && (
          <p className="text-sm font-medium text-red-500">{state.message}</p>
        )}

        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </div>

      <div className="border-border flex w-full flex-col gap-6 rounded-[10px] border border-solid p-7">
        <div className="flex w-full flex-col gap-0.5">
          <h2 className="text-foreground text-base leading-[1.4] font-bold">
            Ainda não tem uma conta?
          </h2>
          <p className="text-muted text-xs leading-[1.4]">
            Cadastre agora mesmo
          </p>
        </div>

        <Button variant="white" onClick={() => navigate("/signup")}>
          Criar conta
        </Button>
      </div>
    </form>
  );
}
