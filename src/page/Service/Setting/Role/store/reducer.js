import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        userRoleList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddUserRoleModal:false,
        showViewUserRoleModal:false,
        showUpdateUserRoleModal:false,
        showRoleMenuSettingModal:false,
        roleMenuList:[],
        roleMenuCheckKeys:[],
        curRoleMenuRealCheckData:[]
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_USER_ROLE_LIST:
            return state.set("userRoleList",action.userRoleList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("userRoleList",action.userRoleList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("userRoleList",action.userRoleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_USER_ROLE_MODAL:
            return state.set("showAddUserRoleModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_USER_ROLE_MODAL:
            return state.set("showViewUserRoleModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_USER_ROLE_MODAL:
            return state.set("showUpdateUserRoleModal",action.isShow);
        case ActionConstants.ADD_USER_ROLE_OPER:
            return state.set("userRoleList",action.userRoleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddUserRoleModal",action.showAddUserRoleModal);
        case ActionConstants.UPDATE_USER_ROLE_OPER:
            return state.set("userRoleList",action.userRoleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateUserRoleModal",action.showAddUserRoleModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateUserRoleModal = false;
            let showViewUserRoleModal = false;
            if(action.opera === "update"){
                showUpdateUserRoleModal = true;
            }else if(action.opera === "view"){
                showViewUserRoleModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateUserRoleModal",fromJS(showUpdateUserRoleModal)).set("showViewUserRoleModal",fromJS(showViewUserRoleModal));
        case ActionConstants.IS_SHOW_MENUSETTING_MODAL:
            return state.set("showRoleMenuSettingModal",action.isShow);
        case ActionConstants.SHOW_VIEWMENU_SETTING_MODAL:
            return state.set("showRoleMenuSettingModal",action.isShow).set("roleMenuList",action.menuTreeList);
        case ActionConstants.ROLE_MENU_TREE_CHECK_ACTION:
            return state.set("roleMenuCheckKeys",action.checkedKeys);
        case ActionConstants.SET_CURROLE_MENU_REALTION_ACTION:
            return state.set("curRoleMenuRealCheckData",action.menuRealDataArray);
        default:
            return state;
    }
}