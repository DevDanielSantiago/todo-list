import { memo } from "react";
import { Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ListName } from "../../../../core/interfaces/list";
import { Activity } from "../../../../core/interfaces/activity";

import EmptyListComponent from "../../../../core/components/empty-list";

import "./styles.css";
import { SetStateAction } from "jotai";

interface ListPreviewProps {
  id: string;
  title: string;
  activities: Activity[];
  onNavigateList: (id: string) => void;
  onEdit: (edit: SetStateAction<ListName | undefined>) => void;
  onDelete: (id: string) => void;
}

function ListPreviewComponent({
  id,
  title,
  activities,
  onNavigateList,
  onEdit,
  onDelete,
}: ListPreviewProps) {
  const handleNavigateList = () => onNavigateList(id);
  const handleEdit = () => onEdit({ id: id, title: title });
  const handleDelete = () => onDelete(id);

  return (
    <div className="c-preview">
      <h3 className="c-preview_title" onClick={handleNavigateList}>
        {title}
      </h3>
      {activities.length > 0 ? (
        <ul className="c-preview_activities" onClick={handleNavigateList}>
          {activities.map((activity) => (
            <li key={activity.id} className="c-preview_activity">
              <div
                className="c-marker"
                data-concluded={!!activity.concludedAt}
              />
              <span className="c-activity">{activity.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyListComponent size="sm" />
      )}

      <Tooltip title="Editar nome da lista" placement="bottom">
        <EditIcon className="c-edit" onClick={handleEdit} />
      </Tooltip>
      <Tooltip title="Deletar lista" placement="bottom">
        <DeleteIcon className="c-delete" onClick={handleDelete} />
      </Tooltip>
    </div>
  );
}

export default memo(ListPreviewComponent);
