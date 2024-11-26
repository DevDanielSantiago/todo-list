import { memo } from "react";
import SegmentIcon from "@mui/icons-material/SegmentOutlined";

import "./styles.css";

interface EmptyListProps {
  size: "sm" | "md";
  text?: string;
}

function EmptyListComponent({ size, text }: EmptyListProps) {
  return (
    <div className="c-empty">
      <SegmentIcon className="c-empty_icon" data-size={size} />
      <span className="c-empty_text" data-size={size}>
        {text || "Não foram encontradas atividades"}
      </span>
    </div>
  );
}

export default memo(EmptyListComponent);
