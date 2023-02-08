import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Main from './page/main';
import CreateCrewPage from './page/createCrew';
import ListItem from "./page/ListItem";

function App() {
  return <Router>
    <Routes>
      <Route path='/' element={<CreateCrewPage />}>
      </Route>
      <Route path="/createCrew" element={<ListItem />}>
      </Route>
    </Routes>
  </Router>


}

export default App;