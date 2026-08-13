import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";

type Credentials = {
  email: string;
  password: string;
};

const initialCredentials: Credentials = {
  email: "",
  password: "",
};

export function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialCredentials);

  function updateCredential(field: keyof Credentials) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setCredentials((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className="flex w-full max-w-[400px] flex-col gap-3"
      onSubmit={handleSubmit}
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
            autoComplete="email"
            inputMode="email"
            value={credentials.email}
            onChange={updateCredential("email")}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            value={credentials.password}
            onChange={updateCredential("password")}
            required
          />
        </div>

        <Button type="submit">Entrar</Button>
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

        <Button variant="white" onClick={() => navigate("/cadastro")}>
          Criar conta
        </Button>
      </div>
    </form>
  );
}
