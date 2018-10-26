import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        currentUser:{}
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.AUTH_LOGIN_ACTION:
            return state.set("currentUser",action.user);
        default:
            return state;
    }
}