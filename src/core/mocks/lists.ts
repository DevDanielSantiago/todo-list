import { List } from "../interfaces/list";

export const Lists: List[] = [
  {
    id: "1",
    title: "Minha Lista 1",
    activities: [],
  },
  {
    id: "2",
    title: "Minha Lista 2",
    activities: [
      {
        id: "1",
        name: "Nome da Atividade",
        description: null,
        concludedAt: null,
      },
      {
        id: "2",
        name: "Nome da Atividade 2",
        description: "Descrição da atividade 2",
        concludedAt: new Date(),
      },
      {
        id: "3",
        name: "Nome da Atividade 3",
        description: "Descrição da atividade 3",
        concludedAt: null,
      },
    ],
  },
];
