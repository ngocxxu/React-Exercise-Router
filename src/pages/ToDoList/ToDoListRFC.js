import React, { useState, useEffect } from "react";
import style from "./Todolist.css";
import Axios from "axios";

export default function ToDoListRFC(props) {
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
    e.preventDefault();
    console.log(state.values.taskName)
    let promise = Axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST',
      //gửi data giống hệt data ở BE yêu cầu
      data: {taskName: state.values.taskName}
    })

    promise.then((result)=>{
      console.log('result', result.data);
      getTaskList();
    })
    promise.catch((error)=>{
      console.log('error', error.response.data)
      console.log('thất bại')
    })


  };

  const delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    })

    promise.then((result) => {
      console.log(result.data);
      getTaskList();
    })

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }

  const doneTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT',

    })

    promise.then((result) => {
      console.log(result.data);
      getTaskList();

    });

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }

  const rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT',

    })

    promise.then((result) => {
      console.log(result.data);
      getTaskList();

    });

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }


  const renderTaskToDo = () => {
    return state.taskList
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
    return state.taskList
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
    let promises = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //lấy data thành công
    promises.then((result) => {
      console.log(result.data);

      //lấy data thành công thì ta setState lại
      setState({
        //giữ lại vị trí của các state cũ
        ...state,
        taskList: result.data,
      });
    });
    //lấy data thất bại
    promises.catch((error) => {
      console.log(error.response.data);
    });
  };



  useEffect(() => {
    getTaskList();

    return() => {

    }
  })


  return (
    <div>
      <div className="card">
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
