import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        dicItemList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddDicItemModal:false,
        showViewDicItemModal:false,
        showUpdateDicItemModal:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_DICITEM_LIST:
            return state.set("dicItemList",action.dicItemList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("dicItemList",action.dicItemList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("dicItemList",action.dicItemList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_DICITEM_MODAL:
            return state.set("showAddDicItemModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_DICITEM_MODAL:
            return state.set("showViewDicItemModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_DICITEM_MODAL:
            return state.set("showUpdateDicItemModal",action.isShow);
        case ActionConstants.ADD_DICITEM_OPER:
            return state.set("dicItemList",action.dicItemList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddDicItemModal",action.showAddDicItemModal);
        case ActionConstants.UPDATE_DICITEM_OPER:
            return state.set("dicItemList",action.dicItemList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateDicItemModal",action.showAddDicItemModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateDicItemModal = false;
            let showViewDicItemModal = false;
            if(action.opera === "update"){
                showUpdateDicItemModal = true;
            }else if(action.opera === "view"){
                showViewDicItemModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateDicItemModal",fromJS(showUpdateDicItemModal)).set("showViewDicItemModal",fromJS(showViewDicItemModal));
        default:
            return state;
    }
}