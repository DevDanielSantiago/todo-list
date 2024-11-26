import { memo } from "react";
import { Checkbox, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./styles.css";

interface ActivityProps {
  name: string;
  description: string | null;
  deadline: Date | null;
  concludedAt: Date | null;
}

function ActivityComponent({
  name,
  description,
  deadline,
  concludedAt,
}: ActivityProps) {
  return (
    <div className="c-todo_activity">
      <div className="c-todo_activity-main">
        <Checkbox style={{ color: "green" }} checked={!!concludedAt} />
        <div className="c-todo_about">
          <h3 className="c-todo_name">{name}</h3>
          {description && <p className="c-todo_description">{description}</p>}
          {deadline && (
            <span className="c-todo_expiration">
              {deadline?.toDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="c-todo_activity_options">
        <Tooltip title="Editar atividade" placement="bottom">
          <EditIcon className="c-edit" />
        </Tooltip>
        <Tooltip title="Deletar atividade" placement="bottom">
          <DeleteIcon className="c-delete" />
        </Tooltip>
      </div>
    </div>
  );
}

export default memo(ActivityComponent);
