export function setToken(token){
  return(dispatch) => {
    dispatch({
      type: 'user/set',
      payload: token
    })
  }
}

export function setTab(payload){
  return(dispatch) => {
    dispatch({
      type: 'tab/set',
      payload: payload
    })
  }
}