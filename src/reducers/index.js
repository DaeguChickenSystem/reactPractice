import list from './list';
import status from './status'
import post from './post'


import { combineReducers } from 'redux';

export default combineReducers({
    list, status, post
});
