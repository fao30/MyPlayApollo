const initializeState = {
  access_token: '',
  tabActive: '',
  isLoading: true,
  error: null,
}

export default function userReducer(state = initializeState, action) {
  switch (action.type) {
    case 'user/set':
      return {
        ...state,
        access_token: action.payload,
        isLoading: false,
      };
    case 'tab/set':
      return {
        ...state,
        tabActive: action.payload,
        isLoading: false,
      };
    case 'user/loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'user/error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}