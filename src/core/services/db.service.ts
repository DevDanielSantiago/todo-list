import { Activity } from "../interfaces/activity";
import { List } from "../interfaces/list";

export const useDbService = () => {
  const findAll = async () => {
    return fetch(
      "https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/db"
    );
  };

  const findListById = async (id: string) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/lists?id=${id}`
    );
  };

  const findActivitiesByListId = async (id: string) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/activities?listId=${id}`
    );
  };

  const createActivity = async (activity: Activity) => {
    return fetch(
      "https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/activities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(activity),
      }
    );
  };

  const updateActivity = async (activity: Activity) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/activities/${activity.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      }
    );
  };

  const deleteActivity = async (id: string) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/activities/${id}`,
      { method: "DELETE" }
    );
  };

  const createList = async (todoList: List) => {
    return fetch(
      "https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/lists",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(todoList),
      }
    );
  };

  const updateList = async (todoList: List) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/lists/${todoList.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoList),
      }
    );
  };

  const deleteList = async (id: string) => {
    return fetch(
      `https://my-json-server.typicode.com/DevDanielSantiago/fakeapi-todolist/lists/${id}`,
      { method: "DELETE" }
    );
  };

  return {
    findAll,
    findListById,
    findActivitiesByListId,
    createActivity,
    updateActivity,
    deleteActivity,
    createList,
    updateList,
    deleteList,
  };
};
