import { Activity } from "../interfaces/activity";

export const Activities: Activity[] = [
  {
    id: "1",
    name: "Nome da Atividade",
    description: null,
    concludedAt: null,
    deadline: null,
  },
  {
    id: "2",
    name: "Nome da Atividade 2",
    description: "Descrição da atividade 2",
    concludedAt: new Date(),
    deadline: null,
  },
  {
    id: "3",
    name: "Nome da Atividade 3",
    description: "Descrição da atividade 3",
    concludedAt: null,
    deadline: new Date(),
  },
];