import type { TicketDetails } from "../types/ticket";

export const ticketDetailsMock: TicketDetails = {
  id: "mock-ticket-id",
  number: "00004",
  title: "Backup não está funcionando",
  description:
    "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
  category: "Recuperação de Dados",
  createdAt: "12/04/25 09:12",
  updatedAt: "12/04/25 15:20",
  client: "André Costa",
  technician: {
    name: "Carlos Silva",
    email: "carlos.silva@test.com",
  },
  baseAmount: "R$ 200,00",
  additionalServices: [
    {
      id: "backup-subscription",
      title: "Assinatura de backup",
      amount: "R$ 120,00",
    },
    {
      id: "computer-formatting",
      title: "Formatação do PC",
      amount: "R$ 75,00",
    },
  ],
  totalAmount: "R$ 395,00",
  status: "open",
};
