export function setToken(token){
  return(dispatch) => {
    dispatch({
      type: 'user/set',
      payload: token
    })
  }
}