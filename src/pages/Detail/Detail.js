import React from 'react'

export default function Detail(props) {




  return (
    <div>
      {/* ta muốn lấy tham số trên URL, thì dùng params và tên của params đó là id */}
      Giá trị tham số: {props.match.params.id}

      Path name hiện tại: {props.match.path}
    </div>
  )
}
