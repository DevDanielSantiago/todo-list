import { memo } from "react";
import { Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Activity } from "../../../../core/interfaces/activity";

import EmptyListComponent from "../../../../core/components/empty-list";

import "./styles.css";

interface ListPreviewProps {
  id: string;
  title: string;
  activities: Activity[];
  onNavigateList: (id: string) => void;
}

function ListPreviewComponent({
  id,
  title,
  activities,
  onNavigateList,
}: ListPreviewProps) {
  const handleNavigateList = () => onNavigateList(id);

  return (
    <div className="c-preview" onClick={handleNavigateList}>
      <h3 className="c-preview_title">{title}</h3>
      {activities.length > 0 ? (
        <ul className="c-preview_activities">
          {activities.map((activity) => (
            <li className="c-preview_activity">
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
        <EditIcon className="c-edit" />
      </Tooltip>
      <Tooltip title="Deletar lista" placement="bottom">
        <DeleteIcon className="c-delete" />
      </Tooltip>
    </div>
  );
}

export default memo(ListPreviewComponent);
