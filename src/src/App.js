import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"; 
import HomePage from "./components/home";
import FindCrewPage from "./components/findCrew";
import CreateCrewPage from "./components/createCrew";
import MyPage from "./components/myPage";
import Login from "./components/login";




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