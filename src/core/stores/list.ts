import { create } from "zustand";

import { List, ListName } from "../interfaces/list";
import { Activity } from "../interfaces/activity";

interface BetState {
  list: List | undefined;
  todoLists: List[];
  setList: (list: List) => void;
  setTodoLists: (lists: List[]) => void;
  updateTodoList: (data: ListName) => void;
  addTodoList: (list: List) => void;
  deleteTodoList: (id: string) => void;
  updateActivityAtList: (activity: Activity) => void;
  addActivityAtList: (activity: Activity) => void;
  deleteActivityAtList: (id: string) => void;
}

export const useBetStore = create<BetState>((set, get) => ({
  list: undefined,
  todoLists: [],
  setList: (list) => set({ list }),
  setTodoLists: (todoLists) => set({ todoLists }),
  updateTodoList: (data) => {
    const lists = get().todoLists;
    const newList = lists.map((list) => {
      if (list.id === data.id) return { ...list, title: data.title };
      return list;
    });

    set({ todoLists: newList });
  },
  addTodoList: (list) => {
    const lists = get().todoLists;
    const newList = [...lists, list];

    set({ todoLists: newList });
  },
  deleteTodoList: (id) => {
    const lists = get().todoLists;
    const newList = lists.filter((list) => list.id !== id);

    set({ todoLists: newList });
  },
  updateActivityAtList: (activity) => {
    const list = get().list;
    if (!list) return;

    const newActivities = list.activities.map((act) => {
      if (act.id === activity.id) return activity;
      return act;
    });

    set({ list: { ...list, activities: newActivities } });
  },
  addActivityAtList: (activity) => {
    const list = get().list;
    if (!list) return;

    const newActivities = [...list.activities, activity];

    set({ list: { ...list, activities: newActivities } });
  },
  deleteActivityAtList: (id) => {
    const list = get().list;
    if (!list) return;

    const newActivities = list.activities.filter((act) => act.id !== id);

    set({ list: { ...list, activities: newActivities } });
  },
}));
