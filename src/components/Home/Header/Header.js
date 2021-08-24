import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import './Header.css'
export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        BONO
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              Home 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              LOGIN
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/todolistrcc" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
              ToDoList RCC
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/todolistrfc" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
            ToDoList RFC
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/todolistredux" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
            ToDoList REDUX
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/todolistsaga" activeClassName="active-nav-item" activeStyle={{fontWeight: "bold"}}>
            ToDoList SAGA
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <NavLink className="dropdown-item" to="#">
                Action 1
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Action 2
              </NavLink>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
