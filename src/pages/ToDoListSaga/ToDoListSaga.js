import React, { useState, useEffect } from "react";
import style from "./Todolist.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";



export default function ToDoListSaga(props) {

  const dispatch = useDispatch();

  const {taskList} = useSelector(state => state.ToDoListReducer)

  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(name,value);
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };
    // newErrors = {...newErrors, [name]: value.trim()===''};

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      console.log("abc");
      newErrors[name] = name + " is not a valid";
    } else {
      newErrors[name] = "";
    }

    setState = {
      //mảng cần dc giữ lại, mình chỉ cập nhật lại lỗi và giá trị mới
      ...state,
      values: newValues,
      errors: newErrors,
    };

  };

  const addTask = (e) => {


  };

  const delTask = (taskName) => {

  }

  const doneTask = (taskName) => {

  }

  const rejectTask = (taskName) => {

  }


  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick={()=>{
                delTask(item.taskName);
              }} type='button'>
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete" onClick={()=>{
                doneTask(item.taskName);
              }} type='button'>
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick={()=>{
                delTask(item.taskName);
              }} type='button'>
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete" onClick={()=>{
                rejectTask(item.taskName);
              }} type='button'>
                <i className="far fa-check-circle" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  const getTaskList = () => {

  };



  useEffect(() => {

    return() => {

    }
  })


  return (
    <div>
      <div className="card">
        <button className="btn btn-danger" onClick={()=>{
          //dispatch action 2
          dispatch({
            type: 'getTaskApiAction',

          })
        }}>Dispatch action saga getTaskApi</button>
        <div className="card__header">
          <img src={require("./bg.png")} />
        </div>
        {/* <h2>hello!</h2> */}
        <form className="card__body" onSubmit={addTask}>
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="card__add">
              <input name='taskName'
                onChange={handleChange}
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
              />
              <button id="addItem" onClick={
                addTask
              }>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
              {renderTaskToDoDone()}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
