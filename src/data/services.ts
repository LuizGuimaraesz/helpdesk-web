import type { Service } from "../types/service";

export const servicesMock: Service[] = [
  {
    id: "network-installation",
    title: "Instalação de Rede",
    amount: "180.00",
    active: true,
  },
  {
    id: "data-recovery",
    title: "Recuperação de Dados",
    amount: "200.00",
    active: false,
  },
  {
    id: "hardware-maintenance",
    title: "Manutenção de Hardware",
    amount: "150.00",
    active: true,
  },
  {
    id: "software-support",
    title: "Suporte de Software",
    amount: "200.00",
    active: true,
  },
];
