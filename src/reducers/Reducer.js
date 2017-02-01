const initState = {loginId: null}

function Reducer (state = initState , action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.id
      }
    case 'LOGOUT':
      return {
        id: action.id
      }
    default:
      return state
  }
}

export default Reducer