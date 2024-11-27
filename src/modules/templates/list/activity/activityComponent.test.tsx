import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActivityComponent from ".";

describe("ActivityComponent", () => {
  it("ensures that the name and description of the activity are rendered", () => {
    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onCheck={jest.fn()}
      />
    );

    expect(screen.getByText("Atividade de Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição de Teste")).toBeInTheDocument();
  });

  it("ensures that the button labels are rendered", () => {
    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onCheck={jest.fn()}
      />
    );

    expect(screen.getByLabelText("Editar atividade")).toBeInTheDocument();
    expect(screen.getByLabelText("Deletar atividade")).toBeInTheDocument();
  });

  it("ensures that the button is not checked when there is no concludedAt", () => {
    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onCheck={jest.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("ensures that the button is checked when concludedAt", () => {
    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={new Date()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onCheck={jest.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("ensures that the edit button is passing the data correctly", async () => {
    const onEditMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={onEditMock}
        onDelete={jest.fn()}
        onCheck={jest.fn()}
      />
    );

    const editButton = screen.getByLabelText("Editar atividade");
    await user.click(editButton);
    expect(onEditMock).toHaveBeenCalledWith({
      id: "1",
      name: "Atividade de Teste",
      description: "Descrição de Teste",
    });
  });

  it("ensures that the delete button is passing the id correctly", async () => {
    const onDeleteMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={jest.fn()}
        onDelete={onDeleteMock}
        onCheck={jest.fn()}
      />
    );

    const deleteButton = screen.getByLabelText("Deletar atividade");
    await user.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  it("ensures that the check button is passing id and status correctly", async () => {
    const onCheckMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ActivityComponent
        id="1"
        name="Atividade de Teste"
        description="Descrição de Teste"
        concludedAt={null}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onCheck={onCheckMock}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onCheckMock).toHaveBeenCalledWith({ id: "1", checked: true });
  });
});
