import React from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function Profile(props) {
  if(localStorage.getItem('userLogin')){
    return (
      <div>
        
      </div>
    )
    }else{
      alert('Please login first');

      // Redirect giúp ta chuyển hướng ở phần render
      return <Redirect to = '/login'></Redirect>
    }

}
