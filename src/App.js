import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CreateCrewPage from './page/createCrew';
import HomePage from "./components/home";
import FindCrewPage from "./page/findCrew";
import Login from "./page/login";
import MyPage from "./page/MyPage";
import ListItem from "./page/ListItem";
import { firestore } from "./fbase";
import './components/layout/menu'


function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<HomePage />}>
      </Route>
      <Route path="/createcrew" element={<CreateCrewPage />}>
      </Route>
      <Route path="/findcrew" element={<FindCrewPage/>}>
      </Route>
      <Route path="/login" element={<Login/>}> 
      </Route>
      <Route path="/MyPage" element={<MyPage/>}>
      </Route>
    </Routes>
  </Router>
}

export default App;
