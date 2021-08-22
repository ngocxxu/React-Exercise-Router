import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
function App() {
  return (
    <BrowserRouter>
      {/* những component để bên ngoài <Switch></Switch> thì nó sẽ hiển thị ở all các trang có chứa trong Switch */}
      <Header></Header>

      {/* Switch dùng để khi page dc tìm thấy nó sẽ Break, giống cơ chế Switch Case */}
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
