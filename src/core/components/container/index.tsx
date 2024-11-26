import "./styles.css";

interface ContainerProps {
  children: React.ReactNode;
}

function ContainerComponent({ children }: ContainerProps) {
  return (
    <div className="c-container">
      <div className="c-content">{children}</div>
    </div>
  );
}

export default ContainerComponent;
