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
        showUpdateUserModal:false,
        showViewUserRoleModal:false,
        userRoleList:[],
        userRoleCheckKeys:[],
        curUserRoleRealCheckData:[]
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
            let showUpdateUserModal = false;
            let showViewUserModal = false;
            if(action.opera === "update"){
                showUpdateUserModal = true;
            }else if(action.opera === "view"){
                showViewUserModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateUserModal",fromJS(showUpdateUserModal)).set("showViewUserModal",fromJS(showViewUserModal));
        case ActionConstants.IS_SHOW_USER_ROLE_MODAL:
            return state.set("showViewUserRoleModal",action.isShow);
        case ActionConstants.SHOW_USER_ROLE_LIST:
            return state.set("userRoleList",action.data);
        case ActionConstants.ROLE_TREE_CHECK_ACTION:
            return state.set("userRoleCheckKeys",action.checkedKeys);
        case  ActionConstants.CONFIRM_SHOWUSER_MODAL_ACTION:
            return state.set("showViewUserRoleModal",action.isShow);
        case  ActionConstants.SET_CURUSERROLE_REALTION_ACTION:
            debugger;
            return state.set("curUserRoleRealCheckData",action.roleRealDataArray).set("showViewUserRoleModal",action.isShow);
        default:
            return state;
    }
}