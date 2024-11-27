import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { atom, useAtom } from "jotai";

import { ActivityData } from "../../../../core/interfaces/activity";

import "./styles.css";

interface ModalListNameProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string | null }) => void;
  editData?: ActivityData;
}

const activityNameAtom = atom("");
const activityDescriptionAtom = atom<string | null>(null);

function DialogActivity({
  open,
  onClose,
  onSubmit,
  editData,
}: ModalListNameProps) {
  const [name, setName] = useAtom(activityNameAtom);
  const [description, setDescription] = useAtom(activityDescriptionAtom);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description);
    }
  }, [editData, setDescription, setName]);

  const handleClose = () => {
    onClose();
    setName("");
    setDescription(null);
  };
  const handleSave = () =>
    onSubmit({
      name: name,
      description: description,
    });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="c-dialog_title">Nova Lista</DialogTitle>
      <DialogContent className="c-dialog_content">
        <DialogContentText>
          Para criação de uma nova lista, por favor, entre com um nome.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Nome da lista"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          label="Descrição da atividade"
          type="text"
          fullWidth
          variant="standard"
          value={description || ""}
          onChange={(event) => setDescription(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button className="c-button" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          className="c-button"
          type="submit"
          onClick={handleSave}
          disabled={!name}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogActivity;
