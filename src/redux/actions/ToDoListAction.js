import { GET_TASK_API } from "../../redux/constants/ToDoListConst";
import Axios from "axios";

export const getTaskListApi = () => {
  //nơi tiền xử lý dữ liệu => xử lý function

  //khi API thực hiện lấy dữ liệu thành công thì return Dispatch chạy và nó dispatch lên reducer xử lý
  //ngược lại khi API lấy ko thành công thì return dispatch sẽ trả về thất bại và ko gửi về reducer xử lý
  //hàm redux-thunk dùng để delay trog quá trình dữ liệu lên reducer
  return (dispatch) => {
    let promises = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //lấy data thành công
    promises.then((result) => {
      console.log(result.data);

      //lấy data thành công thì ta dispatch dữ liệu lên reducer xử lý
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
    });
    //lấy data thất bại
    promises.catch((error) => {
      console.log(error.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    //xử lý trc khi dispastch
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //gửi data giống hệt data ở BE yêu cầu
      data: { taskName: taskName },
    });

    promise.then((result) => {
      console.log("result", result.data);
      //giúp tự load lại trang
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
      console.log("thất bại");
    });
  };
};

export const delTaskApi = (taskName) => {
  //nhận vô redux thunk và trả về function dispatch
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      console.log(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};

export const doneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      console.log(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};


export const rejectTaskApi = (taskName) => {

  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      console.log(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });

  }
}
