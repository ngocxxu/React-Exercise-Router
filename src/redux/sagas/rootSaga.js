import {all} from 'redux-saga/effects'

//import có dấu * là import nguyên cái file đó vô lun
//cách viết 1
import * as ToDoListSaga from './ToDoListSagaSaga'
//cách viết 2:
// import { theoDoiActionGetTaskApi } from './ToDoListSaga'

export function* rootSaga() {
  //nhận vào mảng với các nghiệp vụ mà nó theo dõi
  yield all([
    //nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionDoneTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),

  ])


}
