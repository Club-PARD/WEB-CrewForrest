import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"; 
import HomePage from "./components/home";
import FindCrewPage from "./page/findCrew";
import CreateCrewPage from "./page/createCrew";
import MyPage from "./page/myPage";
import Login from "./page/login";




function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}>
      </Route>
      <Route path="/createcrew" element={<CreateCrewPage/>}> 
      </Route>
      <Route path="/findcrew" element={<FindCrewPage/>}> 
      </Route>
      <Route path="/mypage" element={<MyPage/>}> 
      </Route>
      <Route path="/login" element={<Login/>}> 
      </Route>
    </Routes>
  </Router>
  
  );
}

export default App;