import React from 'react'

export default function PageNotFound(props) {

  return (
    <div>
      Không tin thấy trang {props.match.url}    
    </div>
  )
}
