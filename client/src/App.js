import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import About from "./components/AboutComponent";
import Feature from "./components/FeaturComponent";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import QuizForm from "./components/QuizForm";
import JoinQuiz from "./components/JoinQuiz";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { ProtectedBackwardRoute } from "./components/ProtectedRoutesBackward";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedBackwardRoute path="/login" component={Login} />
          <ProtectedBackwardRoute path="/register" component={Register} />
          <ProtectedRoute path="/create_quiz" component={QuizForm} />
          <ProtectedRoute
            exact
            path="/logout"
            component={() => {
              window.localStorage.clear();
              return <Redirect to="/login" />;
            }}
          />
          <ProtectedRoute path="/join_quiz" component={JoinQuiz} />
          <Route exact path="/quiz" component={() => <Redirect to="/" />} />
          <ProtectedRoute path="/quiz/:id" component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  window.localStorage.removeItem("completed");
  window.localStorage.removeItem("countTimer");
  window.localStorage.removeItem("index");
  window.localStorage.removeItem("score");
  window.localStorage.removeItem("time");
  window.localStorage.removeItem("list");
  return (
    <div>
      <Feature />
      <About />
    </div>
  );
};

export default App;
