import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import About from "./components/AboutComponent";
import Feature from "./components/FeaturComponent";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import QuizForm from "./components/QuizForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <QuizForm />
    </div>
    // <Router>
    //   <div>
    //     <Navbar />
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <Route path="/login" component={Login} />
    //       <Route path="/register" component={Register} />
    //       <Route path="/quiz" component={Quiz} />
    //     </Switch>
    //   </div>
    // </Router>
  );
}

const Home = () => {
  window.localStorage.clear();
  return (
    <div>
      <Feature />
      <About />
    </div>
  );
};

export default App;
