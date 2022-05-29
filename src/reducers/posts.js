import { FETCH_POST, UPDATE} from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    default:
      return state;
  }
};