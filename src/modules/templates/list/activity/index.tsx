import { memo } from "react";
import { SetStateAction } from "jotai";
import { Checkbox, Tooltip } from "@mui/material";

import { ActivityData } from "../../../../core/interfaces/activity";

import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./styles.css";

interface ActivityProps {
  id: string;
  name: string;
  description: string | null;
  concludedAt: Date | null;
  onEdit: (edit: SetStateAction<ActivityData | undefined>) => void;
  onDelete: (id: string) => void;
  onCheck: (data: { id: string; checked: boolean }) => void;
}

function ActivityComponent({
  id,
  name,
  description,
  concludedAt,
  onEdit,
  onDelete,
  onCheck,
}: ActivityProps) {
  const handleDelete = () => onDelete(id);
  const handleEdit = () =>
    onEdit({ id: id, name: name, description: description });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheck({ id: id, checked: event.target.checked });
  };

  return (
    <div className="c-todo_activity">
      <div className="c-todo_activity-main">
        <Checkbox
          style={{ color: "green" }}
          onChange={handleChange}
          checked={!!concludedAt}
        />
        <div className="c-todo_about">
          <h3 className="c-todo_name">{name}</h3>
          {description && <p className="c-todo_description">{description}</p>}
        </div>
      </div>

      <div className="c-todo_activity_options">
        <Tooltip title="Editar atividade" placement="bottom">
          <EditIcon className="c-edit" onClick={handleEdit} />
        </Tooltip>
        <Tooltip title="Deletar atividade" placement="bottom">
          <DeleteIcon className="c-delete" onClick={handleDelete} />
        </Tooltip>
      </div>
    </div>
  );
}

export default memo(ActivityComponent);
