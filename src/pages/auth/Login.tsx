import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { createSession } from "../../services/sessions";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";

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

      const session = await createSession(data);

      auth.save(session);

      return initialState;
    } catch (error) {
      console.log(error);
      return {
        message: getErrorMessage(error, "Não foi possível entrar."),
        fields,
      };
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
          <Input
            variant="auth"
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            defaultValue={state.fields.email}
            required
          />
          <Input
            variant="auth"
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
