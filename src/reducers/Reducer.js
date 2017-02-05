const initState = {id: null,sideBarStatus: false}

function Reducer (state = initState , action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        id: action.id
      }
    case 'LOGOUT':
      return {
        ...state,
        id: action.id
      }
    case 'SIDEBAROPEN':
      return {
        ...state,
       sideBarStatus : action.status
      }
    case 'SIDEBARCLOSE':
      return {
        ...state,
        sideBarStatus: action.status
      }
    default:
      return state
  }
}

export default Reducer
