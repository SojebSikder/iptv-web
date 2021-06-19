import { combineReducers } from 'redux';

// import categoryReducer from './CategoryReducer';
// import tagReducer from './TagReducer';
// import postReducer from './PostReducer';
// import commentReducer from './CommentReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    // category: categoryReducer,
    // tag: tagReducer,
    // post: postReducer,
    // comment: commentReducer,
    user: userReducer
});

export default rootReducer;