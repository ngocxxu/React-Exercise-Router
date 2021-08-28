import { DOMAIN } from "../util/constants/settingSystem";
import Axios from "axios";

export class ToDoListService {
  constructor(){

  }

  getTaskApi = () => {
    return Axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  }
  addTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: { taskName: taskName}
    });
  }
  deleteTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  }
  rejectTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
  }
  doneTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
  }
  
}

//cách gọi hàm
export const toDoListService = new ToDoListService();

