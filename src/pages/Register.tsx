import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/login/register/Button";
import { FormField } from "../components/login/register/FormField";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail valido.").trim(),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
});

type SignUpstate = {
  message: string | null;
  fields: {
    name: string;
    email: string;
    password: string;
  };
};

const initialState: SignUpstate = {
  message: null,
  fields: {
    name: "",
    email: "",
    password: "",
  },
};

export function RegisterPage() {
  const navigate = useNavigate();

  const [state, formAction, isLoading] = useActionState(
    SignUpAction,
    initialState,
  );

  async function SignUpAction(_: SignUpstate, formData: FormData) {
    const fields = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      const data = signUpSchema.parse(fields);

      await api.post("/users", data);

      alert("Cadastro efetuado com sucesso!");

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
      aria-labelledby="register-title"
    >
      <div className="border-border flex w-full flex-col gap-10 rounded-[10px] border border-solid p-7">
        <div className="flex w-full flex-col gap-0.5">
          <h1
            id="register-title"
            className="text-foreground text-xl leading-[1.4] font-bold"
          >
            Crie sua conta
          </h1>
          <p className="text-muted text-xs leading-[1.4]">
            Informe seu nome, e-mail e senha
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <FormField
            id="name"
            name="name"
            type="text"
            label="Nome"
            placeholder="Digite seu nome"
            defaultValue={state.fields.name}
            required
          />
          <FormField
            id="register-email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            defaultValue={state.fields.email}
            required
          />
          <FormField
            id="register-password"
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
          />
          <p className="text-sm text-placeholder italic">Mínimo de 6 dígitos</p>
        </div>

        {state.message && (
          <p className="text-feedback-error text-sm font-medium">
            {state.message}
          </p>
        )}

        <Button type="submit" isLoading={isLoading}>
          Cadastrar
        </Button>
      </div>

      <div className="border-border flex w-full flex-col gap-6 rounded-[10px] border border-solid p-7">
        <div className="flex w-full flex-col gap-0.5">
          <h2 className="text-foreground text-base leading-[1.4] font-bold">
            Já tem uma conta?
          </h2>
          <p className="text-muted text-xs leading-[1.4]">Acesse agora mesmo</p>
        </div>

        <Button variant="white" onClick={() => navigate("/login")}>
          Acessar conta
        </Button>
      </div>
    </form>
  );
}
