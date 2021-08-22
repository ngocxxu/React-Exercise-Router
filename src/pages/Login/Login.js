import React, {useState} from 'react'
import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login(props) {

  const [userLogin, setUserLogin] = useState(
    {userName:'', passWord:'', status: false,},
  )

    const handleChange = (e) =>{
      const {name,value} = e.target;

      const newUserLogin = {
        ...userLogin,
        [name]: value,
      };

      let valid = true;

      for(let key in newUserLogin){
        //so sánh userName, passWord nếu rỗng, nhưng ko chứa trường status
        if(key !== 'status'){
          console.log('status');
          if(newUserLogin[key].trim() === ''){
            valid = false;

          }
  
        }
      }
     
      if(!valid){
        newUserLogin.status = true;
      }else{
        newUserLogin.status = false;
      }

      setUserLogin(newUserLogin);

    }

    const handleLogin = (e) =>{
      e.preventDefault();
      if(userLogin.userName === '123' && userLogin.passWord === '123'){
        //thành công thì chuyển về trang trc đó
        props.history.goBack();
        //chuyển đến trang chỉ định sau khi xử lý
        //sau khi chuyển đến trang Home, nếu ta click vào mũi tên Back của Browser thì nó sẽ trả về trang LOGIN
        // props.history.push('/home');
        //nếu ta click vào mũi tên Back của Browser thì nó sẽ KHÔNG trả về trang LOGIN mà trả về trang CŨ trc khi chuyển về trang LOGIN
        // props.history.replace('/home');

        //lưu thông tin người đã login thành công vào localstorage để ng dùng ko phải login lại
        //JSON.stringify(userLogin) : biến obj thành chuỗi string
        localStorage.setItem('userLogin', JSON.stringify(userLogin))

      }else{
        alert('Login false')
      }

    }

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className='form-group'>
        <p>userName</p>
        <input name= 'userName' className='form-control' onChange={handleChange}></input>
      </div>
      <div className='form-group'>
        <p>passWord</p>
        <input name= 'passWord' className='form-control' onChange={handleChange}></input>
      </div>
      <div className='form-group'>
        <button className='btn btn-success'>LOGIN</button>
        
      </div>

      {/* Promt dùng để hiển thị hộp thoại ngăn cản sự kiện rời đi khi mà bạn chưa hoàn tất nội dung bạn viết */}
      {/* When = true thì hộp thoại Promt sẽ hiện lên */}
      <Prompt when={userLogin.status} message={(location) => {
        console.log(location)
        return 'Bạn có muốn rời đi không'
      }}></Prompt>
    </form>
  )
}
