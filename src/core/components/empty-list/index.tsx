import { memo } from "react";
import SegmentIcon from "@mui/icons-material/SegmentOutlined";

import "./styles.css";

interface EmptyListProps {
  size: "sm" | "md";
  text?: string;
}

function EmptyListComponent({ size, text }: EmptyListProps) {
  return (
    <section className="c-empty">
      <SegmentIcon aria-hidden className="c-empty_icon" data-size={size} />
      <span className="c-empty_text" data-size={size}>
        {text || "Não foram encontradas atividades"}
      </span>
    </section>
  );
}

export default memo(EmptyListComponent);
