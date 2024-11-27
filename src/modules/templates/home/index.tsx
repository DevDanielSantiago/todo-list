import { useNavigate } from "react-router-dom";
import { atom, SetStateAction, useAtom } from "jotai";

import { List, ListName } from "../../../core/interfaces/list";

import ListPreviewComponent from "./list-preview";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";
import EmptyListComponent from "../../../core/components/empty-list";

import { useBetStore } from "../../../core/stores/list";
import { useDbService } from "../../../core/services/db.service";

import ModalListName from "./modal-name";

import "./styles.css";

const openModalAtom = atom(false);
const editNameAtom = atom<ListName>();

function HomeTemplate() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const [editName, setEditName] = useAtom(editNameAtom);

  const { todoLists, updateTodoList, deleteTodoList, addTodoList } =
    useBetStore();

  const { updateList, deleteList, createList } = useDbService();

  const handleClose = () => {
    setOpenModal(false);
    setEditName(undefined);
  };

  const handleNavigateList = (id: string) => navigate("/list/" + id);

  const handleAdd = () => setOpenModal(true);
  const handleEdit = (edit: SetStateAction<ListName | undefined>) => {
    setEditName(edit);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const list = todoLists.find((act) => act.id === id);
      if (!list) return;

      await deleteList(id);
      deleteTodoList(id);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSaveUpdate = async (data: { id: string; title: string }) => {
    try {
      const todoList = todoLists.find((act) => act.id === data.id);
      if (!todoList) return;

      todoList["title"] = data.title;

      await updateList(todoList);
      updateTodoList(todoList);
      setOpenModal(false);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSaveNew = async (data: { title: string }) => {
    try {
      const todoList: List = {
        id: `${todoLists.length + 1}`,
        title: data.title,
        activities: [],
      };

      await createList(todoList);
      addTodoList(todoList);
      setOpenModal(false);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSubmit = (data: { title: string }) => {
    if (editName) handleSaveUpdate({ title: data.title, id: editName.id });
    else handleSaveNew(data);
  };

  return (
    <ContainerComponent>
      <HeaderComponent
        title="TO-DO List"
        buttonText="Adicionar"
        onAdd={handleAdd}
      />

      {todoLists.length > 0 ? (
        <div className="c-preview_list">
          {todoLists.map((list, index) => (
            <ListPreviewComponent
              key={index}
              id={list.id}
              title={list.title}
              activities={list.activities}
              onNavigateList={handleNavigateList}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyListComponent size="md" text="Não foram encontradas listas" />
      )}

      {openModal && (
        <ModalListName
          open={openModal}
          onClose={handleClose}
          onSubmit={handleSubmit}
          editData={editName}
        />
      )}
    </ContainerComponent>
  );
}

export default HomeTemplate;
