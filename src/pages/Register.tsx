import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";

type RegistrationData = {
  email: string;
  name: string;
  password: string;
};

const initialRegistrationData: RegistrationData = {
  email: "",
  name: "",
  password: "",
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(
    initialRegistrationData,
  );

  function updateRegistrationData(field: keyof RegistrationData) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setRegistrationData((current) => ({
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
            value={registrationData.name}
            onChange={updateRegistrationData("name")}
            required
          />
          <FormField
            id="register-email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            value={registrationData.email}
            onChange={updateRegistrationData("email")}
            required
          />
          <FormField
            id="register-password"
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={registrationData.password}
            onChange={updateRegistrationData("password")}
            required
          />
          <p className="text-sm text-placeholder italic">Mínimo de 6 dígitos</p>
        </div>

        <Button type="submit">Cadastrar</Button>
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
