import logo from './logo.svg';
import './App.css';
import './core/theme/theme.css';
import RouterClass from "./core/routes/router";
import { BrowserRouter as Router, Routes } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>{RouterClass.getRoutes()}</Routes>
    </Router>
  );
}

export default App;
