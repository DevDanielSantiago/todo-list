import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./modules/pages/home";
import ListPage from "./modules/pages/list";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:id" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
