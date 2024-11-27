import { atom, useAtom } from "jotai";
import { lazy, Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDbService } from "../../../core/services/db.service";
import { List } from "../../../core/interfaces/list";
import { useBetStore } from "../../../core/stores/list";

const LazyListTemplate = lazy(() => import("../../templates/list"));

const loadingAtom = atom(false);

function ListPage() {
  const [loading, setLoading] = useAtom(loadingAtom);

  const { id } = useParams();
  const navigate = useNavigate();

  const { setList } = useBetStore();
  const { findListById, findActivitiesByListId } = useDbService();

  const handleList = async (id: string) => {
    try {
      setLoading(true);
      const response = await Promise.all([
        findListById(id),
        findActivitiesByListId(id),
      ]);
      const lists = await Promise.all(response.map((r) => r.json()));

      if (lists[0].length === 0) return navigate("/");
      const todoList: List = {
        ...lists[0][0],
        id: lists[0][0].id,
        title: lists[0][0].title,
        activities: lists[1].map((act: any) => ({
          ...act,
          id: act.id,
          name: act.name,
          description: act.description,
          concludedAt: act.concludedAt,
        })),
      };

      setList(todoList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) handleList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Suspense fallback={<p>Carregando página...</p>}>
      <LazyListTemplate loading={loading} />
    </Suspense>
  );
}

export default ListPage;
