import { useEffect } from "react";
import HomeTemplate from "../../templates/home";

import { List } from "../../../core/interfaces/list";

import { useDbService } from "../../../core/services/db.service";
import { useBetStore } from "../../../core/stores/list";

function HomePage() {
  const { setTodoLists } = useBetStore();
  const { findAll } = useDbService();

  const handleList = async () => {
    try {
      const response = await findAll();
      const lists = await response.json();

      const todoLists: List[] = lists.lists.map((list: any) => {
        return {
          id: list.id,
          title: list.title,
          activities: lists.activities.filter(
            (act: any) => act.listId === list.id
          ),
        };
      });

      setTodoLists(todoLists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomeTemplate />;
}

export default HomePage;
