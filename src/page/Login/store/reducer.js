import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        loginToken:""
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.AUTH_LOGIN_ACTION:
            return state.set("loginToken",action.loginToken);
        default:
            return state;
    }
}