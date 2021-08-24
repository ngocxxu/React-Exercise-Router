import Axios from "axios";
import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { GET_TASK_API } from "../constants/ToDoListConst";

function* getTaskApi(action) {
  //Cách 1:
  // while(true) {
  //   yield take('getTaskApiAction') //take(): ko theo dõi action liên tục dc, chỉ call dc 1 lần, mún call nhìu lần phải đưa vô vòng lặp, nào truyền type nó mới làm,phải dispatch type lên thì mới thực thi dòng console.log phía dưới,theo dõi action và chặn lại-> xem action nào dispatch, mới thực thi các công việc bên dưới
  //   console.log('abc')
  //   //call api dispatch lên reducer...
  // }

  //cách 2:
  //action là cái mà mình dispatch lên
  // yield delay(3000);
  // console.log('hello', action)

  //bóc tách phần tử như redux thunk
  let {status, data} = yield call(() => {
    return Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
  });

  //sau khi lấy thành công, ta dùng hàm put thay cho dispatch, đưa về reducer xử lý
  yield put({
    type: GET_TASK_API,
    taskList: data,
  })


  console.log('result', data);
}

export function* rootSaga() {
  //đây là nơi gọi hàm liền của saga

  //cách 1:
  //getTaskApi là 1 action, truyền action cho hàm phía trên thực hiện
  //chạy luôn, ko cần chờ
  // yield fork(getTaskApi);

  //cách 2:
  // yield takeEvery('getTaskApiAction', getTaskApi)

  //cách 3:
  yield takeLatest("getTaskApiAction", getTaskApi);
}
