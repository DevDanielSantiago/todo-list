import { memo } from "react";

import "./styles.css";

interface HeaderComponentProps {
  title: string;
  buttonText: string;
  onAdd?: () => void;
}

function HeaderComponent({ title, buttonText, onAdd }: HeaderComponentProps) {
  return (
    <header className="c-header">
      <h1 className="c-header_title">{title}</h1>
      <button
        className="c-header_button"
        aria-label={buttonText}
        onClick={onAdd}
      >
        {buttonText}
      </button>
    </header>
  );
}

export default memo(HeaderComponent);
