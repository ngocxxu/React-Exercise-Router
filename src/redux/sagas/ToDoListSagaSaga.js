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
import { toDoListService } from "../../services/ToDoListService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { ADD_TASK_API, DELETE_TASK_API, DONE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from "../constants/ToDoListConst";
import LoadingReducer from "../reducers/LoadingReducer";
import {STATUS_CODE} from '../../util/constants/settingSystem'




//nơi định nghĩa theo dõi 1 function
//hàm getTaskApiAction này lấy danh sách task từ api
function* getTaskApiAction(action) {
  //put giống dispatch action, nơi hiển thị trang loading
  // yield put({
  //   type: DISPLAY_LOADING,
  // });

  //dùng để delay trong trang loading, vì đôi lúc mạnh nhanh ta ko thấy dc trang loading hiển thị
  //sau khi delay sẽ chạy tiếp các dòng code phía sau
  // yield delay(2000);

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

  try {
    //bóc tách phần tử như redux thunk
    let { status, data } = yield call(toDoListService.getTaskApi);

    //sau khi delay sẽ chạy tiếp các dòng code phía sau
    yield delay(2000);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }

    //sau khi lấy thành công, ta dùng hàm put thay cho dispatch, đưa về reducer xử lý

    //nơi ẩn trang loading sau khi lấy dữ liệu từ api thành công
  } catch (err) {
    console.log("error");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

//tách ra riêng từ file rootSaga với 1 function như bên dưới, file này  dùng để quản lý nghiệp vụ riêng của todolist, này dành cho action loại 2
export function* theoDoiActionGetTaskApi() {
  //đây là nơi gọi hàm liền của saga

  //cách 1:
  //getTaskApi là 1 action, truyền action cho hàm phía trên thực hiện
  //chạy luôn, ko cần chờ
  // yield fork(getTaskApi);

  //cách 2:
  // yield takeEvery('getTaskApiAction', getTaskApi)

  //cách 3:
    //takeLatest sẽ đứng đợi ta dispatch gửi đi type GET_TASKLIST_API từ 1 file khác vô trong nghiệp vụ này, lúc này getTaskApiAction sẽ dc gọi để thực hiện đoạn code phía bên trên
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}


//nghiệp vụ thêm tasks
export function * addTaskApiAction(action) {
  //action chính là cái tham số mà ta dispatch lên
  const {taskName} = action;

  //gọi api

  try{
  //ở đây do tham số là taskName truyền vào nên ta dùng function callback để thực hiện
  //hàm call chỉ nhận function mà func đó phải trả về promise 
  const {status,data} = yield call(()=>{return toDoListService.addTaskApi(taskName)});

  if(status === STATUS_CODE.SUCCESS){
    yield put({
      //gọi lại GET_TASKLIST_API ở phía trên để thực hiện render các dữ liệu lại
      type: GET_TASKLIST_API,
      taskList: data,
    });
}else{
  console.log('error')
}

  



  }catch(err){console.log('error')}


  //hiển thị loading
  //thành công thì load lại task, =` cách gọi lại action saga load tasksList

}

//hàm này dùng để lắng nghe khi ng dùng dispatch lên,
//nhớ đưa theoDoiActionAddTaskApi vào file rootSaga thì nó mới hoạt động dc
export function * theoDoiActionAddTaskApi(){

  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

export function * deleteTaskApiAction(action){

  //gọi api

  const {taskName} = action;

  try{
    const {data,status} = yield call(()=>{return toDoListService.deleteTaskApi(taskName)})

    if(status === STATUS_CODE.SUCCESS){
      yield put({
        type: GET_TASKLIST_API,
      })
    }else{
      console.log('error')
    }

  }catch(err){console.log('err');}

}

export function * theoDoiActionDeleteTaskApi() {

  yield takeLatest(DELETE_TASK_API, deleteTaskApiAction);
}

export function * doneTaskApiAction(action){

  //gọi api

  const {taskName} = action;

  try{
    const {data,status} = yield call(()=>{return toDoListService.doneTaskApi(taskName)})

    if(status === STATUS_CODE.SUCCESS){
      yield put({
        type: GET_TASKLIST_API,
      })
    }else{
      console.log('error')
    }

  }catch(err){console.log('err');}

}

export function * theoDoiActionDoneTaskApi() {

  yield takeLatest(DONE_TASK_API, doneTaskApiAction);
}

export function * rejectTaskApiAction(action){

  //gọi api

  const {taskName} = action;

  try{
    const {data,status} = yield call(()=>{return toDoListService.rejectTaskApi(taskName)})

    if(status === STATUS_CODE.SUCCESS){
      yield put({
        type: GET_TASKLIST_API,
      })
    }else{
      console.log('error')
    }

  }catch(err){console.log('err');}

}

export function * theoDoiActionRejectTaskApi() {

  yield takeLatest(REJECT_TASK_API, rejectTaskApiAction);
}


