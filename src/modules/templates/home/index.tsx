import { useNavigate } from "react-router-dom";

import ListPreviewComponent from "./list-preview";

import ContainerComponent from "../../../core/components/container";
import HeaderComponent from "../../../core/components/header";

import { Lists } from "../../../core/mocks/lists";

import "./styles.css";

function HomeTemplate() {
  const navigate = useNavigate();

  const handleNavigateList = (id: string) => navigate("/list/" + id);

  return (
    <ContainerComponent>
      <HeaderComponent title="TO-DO List" buttonText="Adicionar" />

      <div className="c-preview_list">
        {Lists.map((list) => (
          <ListPreviewComponent
            id={list.id}
            title={list.title}
            activities={list.activities}
            onNavigateList={handleNavigateList}
          />
        ))}
      </div>
    </ContainerComponent>
  );
}

export default HomeTemplate;
