import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        userList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_USER_LIST:
            return state.set("userList",action.userList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("userList",action.userList);
        default:
            return state;
    }
}