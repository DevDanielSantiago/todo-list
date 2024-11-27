import { atom, SetStateAction, useAtom } from "jotai";

import ActivityComponent from "./activity";
import DialogActivity from "./modal-activity";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";
import EmptyListComponent from "../../../core/components/empty-list";

import { Activity, ActivityData } from "../../../core/interfaces/activity";

import { useDbService } from "../../../core/services/db.service";
import { useBetStore } from "../../../core/stores/list";

const openDialogAtom = atom(false);
const editActivityAtom = atom<ActivityData>();

interface ListTemplateProps {
  loading: boolean;
  listId: string | undefined;
}

function ListTemplate({ loading, listId }: ListTemplateProps) {
  const [openDialog, setOpenDialog] = useAtom(openDialogAtom);
  const [editActivity, setEditActivity] = useAtom(editActivityAtom);

  const {
    list,
    updateActivityAtList,
    deleteActivityAtList,
    addActivityAtList,
  } = useBetStore();

  const { updateActivity, deleteActivity, createActivity } = useDbService();

  const handleClose = () => {
    setOpenDialog(false);
    setEditActivity(undefined);
  };

  const handleAdd = () => setOpenDialog(true);
  const handleEdit = (edit: SetStateAction<ActivityData | undefined>) => {
    setEditActivity(edit);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const activity = list?.activities.find((act) => act.id === id);
      if (!activity) return;

      await deleteActivity(id);
      deleteActivityAtList(id);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSaveUpdate = async (data: {
    id: string;
    name: string;
    description: string | null;
  }) => {
    try {
      const activity = list?.activities.find((act) => act.id === data.id);
      if (!activity) return;

      activity["name"] = data.name;
      activity["description"] = data.description;

      await updateActivity(activity);
      updateActivityAtList(activity);
      setOpenDialog(false);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSaveNew = async (data: {
    name: string;
    description: string | null;
  }) => {
    try {
      if (!list || !listId) return;
      const activity: Activity = {
        id: `${list?.activities.length + 1}`,
        listId: listId,
        name: data.name,
        description: data.description,
        concludedAt: null,
      };

      await createActivity(activity);
      addActivityAtList(activity);
      setOpenDialog(false);
    } catch (error) {
      // TODO Error message
    }
  };

  const handleSubmit = (data: { name: string; description: string | null }) => {
    if (editActivity) handleSaveUpdate({ ...data, id: editActivity.id });
    else handleSaveNew(data);
  };

  const handleCheck = async (data: { id: string; checked: boolean }) => {
    try {
      const activity = list?.activities.find((act) => act.id === data.id);
      if (!activity) return;

      activity["concludedAt"] = data.checked ? new Date() : null;

      await updateActivity(activity);
      updateActivityAtList(activity);
    } catch (error) {
      // TODO Error message
    }
  };

  return (
    <ContainerComponent>
      {loading ? (
        <p>Buscando dados da lista selecionada...</p>
      ) : (
        <>
          <HeaderComponent
            title={list?.title!}
            buttonText="Adicionar"
            onAdd={handleAdd}
          />

          {list?.activities && list?.activities.length > 0 ? (
            list?.activities!.map((activity, index) => (
              <ActivityComponent
                key={index}
                id={activity.id}
                name={activity.name}
                description={activity.description}
                concludedAt={activity.concludedAt}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCheck={handleCheck}
              />
            ))
          ) : (
            <EmptyListComponent size="md" />
          )}

          <DialogActivity
            open={openDialog}
            onClose={handleClose}
            editData={editActivity}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </ContainerComponent>
  );
}

export default ListTemplate;
