import { Activity } from "../interfaces/activity";

export const Activities: Activity[] = [
  {
    id: "1",
    name: "Nome da Atividade",
    listId: "2",
    description: null,
    concludedAt: null,
  },
  {
    id: "2",
    name: "Nome da Atividade 2",
    listId: "2",
    description: "Descrição da atividade 2",
    concludedAt: new Date(),
  },
  {
    id: "3",
    name: "Nome da Atividade 3",
    listId: "2",
    description: "Descrição da atividade 3",
    concludedAt: null,
  },
];
