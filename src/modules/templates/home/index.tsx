import { useNavigate } from "react-router-dom";
import { atom, SetStateAction, useAtom } from "jotai";

import { ListName } from "../../../core/interfaces/list";

import ListPreviewComponent from "./list-preview";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";
import EmptyListComponent from "../../../core/components/empty-list";

import { Lists } from "../../../core/mocks/lists";

import ModalListName from "./modal-name";

import "./styles.css";

const openModalAtom = atom(false);
const editNameAtom = atom<ListName>();

function HomeTemplate() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const [editName, setEditName] = useAtom(editNameAtom);

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

  const handleDelete = (id: string) => {
    console.log("delete", id);
  };

  const handleSubmit = (data: { title: string }) => {
    if (editName) console.log("update", data.title);
    else console.log("create", data.title);
  };

  return (
    <ContainerComponent>
      <HeaderComponent
        title="TO-DO List"
        buttonText="Adicionar"
        onAdd={handleAdd}
      />

      {Lists.length > 0 ? (
        <div className="c-preview_list">
          {Lists.map((list, index) => (
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
