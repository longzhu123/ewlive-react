import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        userList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddUserModal:false,
        showViewUserModal:false,
        showUpdateUserModal:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_USER_LIST:
            return state.set("userList",action.userList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("userList",action.userList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("userList",action.userList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_USER_MODAL:
            return state.set("showAddUserModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_USER_MODAL:
            return state.set("showViewUserModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_USER_MODAL:
            return state.set("showUpdateUserModal",action.isShow);
        case ActionConstants.ADD_USER_OPER:
            return state.set("userList",action.userList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddUserModal",action.showAddUserModal);
        case ActionConstants.UPDATE_USER_OPER:
            return state.set("userList",action.userList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateUserModal",action.showAddUserModal);
        case ActionConstants.GET_DETAILBY_ID:
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateUserModal",action.showUpdateUserModal);
        default:
            return state;
    }
}