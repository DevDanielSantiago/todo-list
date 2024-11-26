import "./styles.css";

import ListPreviewComponent from "./list-preview";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";

import { Lists } from "../../../core/mocks/lists";

function HomeTemplate() {
  return (
    <ContainerComponent>
      <HeaderComponent title="TO-DO List" buttonText="Adicionar" />

      <div className="c-preview_list">
        {Lists.map((list) => (
          <ListPreviewComponent
            id={list.id}
            title={list.title}
            activities={list.activities}
          />
        ))}
      </div>
    </ContainerComponent>
  );
}

export default HomeTemplate;
