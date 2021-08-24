import { GET_TASK_API } from "../../redux/constants/ToDoListConst";
import Axios from "axios";

export const getTaskListApi = () => {
  //nơi tiền xử lý dữ liệu => xử lý function

  //sử dụng Async - Await function

  return async (dispatch) => {

    //try nghĩa là nếu ko bị lỗi thì hàm try thực thi, nếu có lỗi thì hàm catch sẽ thực thi
    try{

    //ta sẽ bóc tách phần tử để lấy ra data và status trong result
    let {data, status,...result} = await Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    // let result = await Axios({
    //   url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
    //   method: "GET",
    // });

    //trong result chứa 1 mảng rất nhiều giá trị dc lấy từ API, trong đó data là nơi chứa các taskName
    //và trog result có chứa thuộc tính status, nếu status = 200 thì dữ lịu lấy từ api thành công
    if(status === 200){
      dispatch({
        type: GET_TASK_API,
        taskList: data,
      });
      }
    

    }catch(error){
      console.log(error.response.data.message);
    }
    


    // console.log(result.data);
    
    // //lấy data thành công
    // promises.then((result) => {
    //   console.log(result.data);

    //   //lấy data thành công thì ta dispatch dữ liệu lên reducer xử lý
    // });
    // //lấy data thất bại
    // promises.catch((error) => {
    //   console.log(error.response.data);
    // });
};

  //khi API thực hiện lấy dữ liệu thành công thì return Dispatch chạy và nó dispatch lên reducer xử lý
  //ngược lại khi API lấy ko thành công thì return dispatch sẽ trả về thất bại và ko gửi về reducer xử lý
  //hàm redux-thunk dùng để delay trog quá trình dữ liệu lên reducer
  // return (dispatch) => {
  //   let promises = Axios({
  //     url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
  //     method: "GET",
  //   });
  //   //lấy data thành công
  //   promises.then((result) => {
  //     console.log(result.data);

  //     //lấy data thành công thì ta dispatch dữ liệu lên reducer xử lý
  //     dispatch({
  //       type: GET_TASK_API,
  //       taskList: result.data,
  //     });
  //   });
  //   //lấy data thất bại
  //   promises.catch((error) => {
  //     console.log(error.response.data);
  //   });
  // };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {

    try{
    //xử lý trc khi dispastch
    let {data,status} = await Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //gửi data giống hệt data ở BE yêu cầu
      data: { taskName: taskName },
    });
    if(status === 200){
      dispatch({
        type: GET_TASK_API,
        taskList: data,
      });
      }

    }catch(error){
      console.log(error.response.data.message);
    }

    // promise.then((result) => {
    //   console.log("result", result.data);
    //   //giúp tự load lại trang
    //   dispatch(getTaskListApi());
    // });
    // promise.catch((error) => {
    //   console.log("error", error.response.data);
    //   console.log("thất bại");
    // });
  };
  // return (dispatch) => {
  //   //xử lý trc khi dispastch
  //   let promise = Axios({
  //     url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
  //     method: "POST",
  //     //gửi data giống hệt data ở BE yêu cầu
  //     data: { taskName: taskName },
  //   });

  //   promise.then((result) => {
  //     console.log("result", result.data);
  //     //giúp tự load lại trang
  //     dispatch(getTaskListApi());
  //   });
  //   promise.catch((error) => {
  //     console.log("error", error.response.data);
  //     console.log("thất bại");
  //   });
  // };
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
  };
};
