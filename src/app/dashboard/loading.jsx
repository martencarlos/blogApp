import React from 'react'
import Loading from '../../components/Loading/Loading'

function loading() {
  return (
    <Loading
      fallback={"loading fallback dashboard"}
    /> 
  )
}

export default loading