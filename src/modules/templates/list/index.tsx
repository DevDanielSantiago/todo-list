import { Activities } from "../../../core/mocks/activities";

import ActivityComponent from "./activity";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";

function ListTemplate() {
  return (
    <ContainerComponent>
      <HeaderComponent title="Lista de Atividades" buttonText="Adicionar" />

      {Activities.map((activity, index) => (
        <ActivityComponent
          key={index}
          name={activity.name}
          description={activity.description}
          concludedAt={activity.concludedAt}
        />
      ))}
    </ContainerComponent>
  );
}

export default ListTemplate;
