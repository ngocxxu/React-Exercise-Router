import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListSaga from "./pages/ToDoListSaga/ToDoListSaga";
function App() {
  return (
    <BrowserRouter>
      {/* những component để bên ngoài <Switch></Switch> thì nó sẽ hiển thị ở all các trang có chứa trong Switch */}
      <Header></Header>

      {/* chèn trang loading cho website */}
      <LoadingComponent></LoadingComponent>

      {/* Switch dùng để khi page dc tìm thấy nó sẽ Break, giống cơ chế Switch Case */}
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/todolistrcc" component={ToDoList}></Route>
        <Route exact path="/todolistrfc" component={ToDoListRFC}></Route>
        <Route exact path="/todolistredux" component={ToDoListRedux}></Route>
        <Route exact path="/todolistsaga" component={ToDoListSaga}></Route>
        <Route exact path="/detail/:id" component={Detail}></Route>

        {/* tránh người dùng gõ bậy bạ trên URL, khi URL ko hợp lý thì sẽ trả về trang PageNotFound */}
        <Route path="*" component={PageNotFound}></Route>

        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
