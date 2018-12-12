import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        dicList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddDicModal:false,
        showViewDicModal:false,
        showUpdateDicModal:false,
        showViewDicItemModal:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_DIC_LIST:
            return state.set("dicList",action.dicList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("dicList",action.dicList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("dicList",action.dicList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_DIC_MODAL:
            return state.set("showAddDicModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_DIC_MODAL:
            return state.set("showViewDicModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_DIC_MODAL:
            return state.set("showUpdateDicModal",action.isShow);
        case ActionConstants.ADD_DIC_OPER:
            return state.set("dicList",action.dicList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddDicModal",action.showAddDicModal);
        case ActionConstants.UPDATE_DIC_OPER:
            return state.set("dicList",action.dicList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateDicModal",action.showAddDicModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateDicModal = false;
            let showViewDicModal = false;
            if(action.opera === "update"){
                showUpdateDicModal = true;
            }else if(action.opera === "view"){
                showViewDicModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateDicModal",fromJS(showUpdateDicModal)).set("showViewDicModal",fromJS(showViewDicModal));
        case ActionConstants.GET_DIC_ITEM_BY_DICID:
            return state.set("showViewDicItemModal",true).set("dicItemCurrent",action.dicItemCurrent).set("dicItemTotal",action.dicItemTotal).set("dicItemList",action.dicItemList);
        case ActionConstants.IS_SHOW_VIEW_DIC_ITEM_MODAL:
            return state.set("showViewDicItemModal",action.show);
        default:
            return state;
    }
}