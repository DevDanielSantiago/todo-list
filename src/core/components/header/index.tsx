import { memo } from "react";

import "./styles.css";

interface HeaderComponentProps {
  title: string;
  buttonText: string;
}

function HeaderComponent({ title, buttonText }: HeaderComponentProps) {
  return (
    <div className="c-header">
      <h1 className="c-header_title">{title}</h1>
      <button className="c-header_button">{buttonText}</button>
    </div>
  );
}

export default memo(HeaderComponent);
