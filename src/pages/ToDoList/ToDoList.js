import React, { Component } from "react";
import Axios from "axios";
import style from "./Todolist.css";
export default class ToDoList extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  getTaskList = () => {
    let promises = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //lấy data thành công
    promises.then((result) => {
      console.log(result.data);

      //lấy data thành công thì ta setState lại
      this.setState({
        taskList: result.data,
      });
    });
    //lấy data thất bại
    promises.catch((error) => {
      console.log(error.response.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick={()=>{
                this.delTask(item.taskName);
              }} type='button'>
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete" onClick={()=>{
                this.doneTask(item.taskName);
              }} type='button'>
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  renderTaskToDoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick={()=>{
                this.delTask(item.taskName);
              }} type='button'>
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete" onClick={()=>{
                this.rejectTask(item.taskName);
              }} type='button'>
                <i className="far fa-check-circle" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    })

    promise.then((result) => {
      console.log(result.data);
      this.getTaskList();
    })

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }

  doneTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT',

    })

    promise.then((result) => {
      console.log(result.data);
      this.getTaskList();

    });

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }

  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT',

    })

    promise.then((result) => {
      console.log(result.data);
      this.getTaskList();

    });

    promise.catch((err) => {
      console.log(err.response.data);
    })
  }

  handleChange = (event) => {
    let { value, name } = event.target;
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors };
    // newErrors = {...newErrors, [name]: value.trim()===''};

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      console.log("abc");
      newErrors[name] = name + " is not a valid";
    } else {
      newErrors[name] = "";
    }

    this.setState = {
      //mảng cần dc giữ lại, mình chỉ cập nhật lại lỗi và giá trị mới
      ...this.state,
      values: newValues,
      errors: newErrors,
    };
  };

  addTask = (e) => {
    e.preventDefault();
    console.log(this.state.values.taskName)
    let promise = Axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST',
      //gửi data giống hệt data ở BE yêu cầu
      data: {taskName: this.state.values.taskName}
    })

    promise.then((result)=>{
      console.log('result', result.data);
      this.getTaskList();
    })
    promise.catch((error)=>{
      console.log('error', error.response.data)
      console.log('thất bại')
    })

  };

  render() {
    return (
      <form
        onSubmit={
          this.addTask
        }
      >
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get Task List
        </button> */}
        <div className="card">
          <div className="card__header">
            {/* nếu tấm hình ko để trong folder public thì ta ghi là {require()} */}
            <img src={require("./bg.png")} />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input
                  onChange={this.handleChange}
                  name="taskName"
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button id="addItem" onClick={this.addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <h1 className="text text-danger">{this.state.errors.taskName}</h1>

              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  //hàm auto thực thi sau khi nội dung dc render auto
  componentDidMount() {
    this.getTaskList();
  }
}
