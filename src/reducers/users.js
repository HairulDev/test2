import { FETCH_USER, UPDATE} from '../constants/actionTypes';

export default (state = { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case UPDATE:
      return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
    default:
      return state;
  }
};