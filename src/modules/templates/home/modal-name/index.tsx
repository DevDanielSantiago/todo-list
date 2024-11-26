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

import { atom, useAtom, type SetStateAction } from "jotai";

import { ListName } from "../../../../core/interfaces/list";

import "./styles.css";

interface ModalListNameProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
  editData?: ListName;
}

const listNameAtom = atom("");

function DialogListName({
  open,
  onClose,
  onSubmit,
  editData,
}: ModalListNameProps) {
  const [editName, setEditName] = useAtom(listNameAtom);

  useEffect(() => {
    if (editData) setEditName(editData.title);
  }, [editData, setEditName]);

  const handleClose = () => {
    onClose();
    setEditName("");
  };
  const handleSave = () => onSubmit({ title: editName });

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
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
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
          disabled={!editName}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogListName;
