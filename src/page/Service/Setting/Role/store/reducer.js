import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        roleList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddRoleModal:false,
        showViewRoleModal:false,
        showUpdateRoleModal:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_ROLE_LIST:
            return state.set("roleList",action.roleList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("roleList",action.roleList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("roleList",action.roleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_ROLE_MODAL:
            return state.set("showAddRoleModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_ROLE_MODAL:
            return state.set("showViewRoleModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_ROLE_MODAL:
            return state.set("showUpdateRoleModal",action.isShow);
        case ActionConstants.ADD_ROLE_OPER:
            return state.set("roleList",action.roleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddRoleModal",action.showAddRoleModal);
        case ActionConstants.UPDATE_ROLE_OPER:
            return state.set("roleList",action.roleList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateRoleModal",action.showAddRoleModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateRoleModal = false;
            let showViewRoleModal = false;
            if(action.opera === "update"){
                showUpdateRoleModal = true;
            }else if(action.opera === "view"){
                showViewRoleModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateRoleModal",fromJS(showUpdateRoleModal)).set("showViewRoleModal",fromJS(showViewRoleModal));
        default:
            return state;
    }
}