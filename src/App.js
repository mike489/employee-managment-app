import React from "react";
// import Home from "./features/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Tasks from "./features/task/tasks";
import ManageTasks from "./features/task/manage-tasks";
import Navigation from "./features/navigation/navigation.component";
import Authentication from "./features/authentication/authentication.component";

const Shop = () => {
  return <h1> I AM THE SHOP</h1>;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route  index path="auth" element={<Authentication />} />
            <Route  path="shop" element={<Shop />} />
            <Route  path="tasks" element={<Tasks />} />
            <Route  path="manageTasks" element={<ManageTasks />} />
            {/* <Route index element={<Navigate to="home" />} /> */}
            {/* <Route exact path="/home" element={<Home />}> */}
            {/* <Route index element={<Navigate to="tasks" />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
