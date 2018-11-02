import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        userList:[],
        selectIds:[]
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_USER_LIST:
            return state.set("userList",action.userList);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",[]).set("userList",action.userList);
        default:
            return state;
    }
}