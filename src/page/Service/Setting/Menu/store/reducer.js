import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        showFontListModal:false,
        menuList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        curOperRowObj:{},
        showAddMenuModal:false,
        showViewMenuModal:false,
        showUpdateMenuModal:false,
        showViewMenuRoleModal:false,
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case  ActionConstants.IS_SHOWFONTLIST_MODAL_ACTION:
            return state.set("showFontListModal",action.isShow);
        case ActionConstants.LOAD_MENU_LIST:
            return state.set("menuList",action.menuList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("menuList",action.menuList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("menuList",action.menuList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_MENU_MODAL:
            return state.set("showAddMenuModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_MENU_MODAL:
            return state.set("showViewMenuModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_MENU_MODAL:
            return state.set("showUpdateMenuModal",action.isShow);
        case ActionConstants.ADD_MENU_OPER:
            return state.set("menuList",action.menuList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddMenuModal",action.showAddMenuModal);
        case ActionConstants.UPDATE_MENU_OPER:
            return state.set("menuList",action.menuList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateMenuModal",action.showAddMenuModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateMenuModal = false;
            let showViewMenuModal = false;
            if(action.opera === "update"){
                showUpdateMenuModal = true;
            }else if(action.opera === "view"){
                showViewMenuModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateMenuModal",fromJS(showUpdateMenuModal)).set("showViewMenuModal",fromJS(showViewMenuModal));
        default:
            return state;
    }
}