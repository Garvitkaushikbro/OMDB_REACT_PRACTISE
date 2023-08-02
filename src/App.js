import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";

// import { Router } from "react-router";

// const Home = () => <div>home</div>;
// const Likes = () => <div>Likes</div>;

function App() {
  return (
    <Home></Home>
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     <Route exact path="/likes" element={<Likes />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
