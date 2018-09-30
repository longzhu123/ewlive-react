import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        isLogin:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.AUTH_LOGIN_ACTION:
            return state.set("isLogin",true);
        default:
            return state;
    }
}