import React from 'react'
import { useSelector } from 'react-redux'
import LoadingReducer from '../../../redux/reducers/LoadingReducer'
import styleLoading from './LoadingComponent.module.css'


export default function LoadingComponent(props) {
  
  const {isLoading} = useSelector(state => state.LoadingReducer)

  if(isLoading) {
    return (

      <div className={styleLoading.bgLoading}>
        <img src={require('../../../assets/imgLoading/loading.gif')}></img>
      </div>
    )
    }else{
      return ''
    }
}
