import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        liveRoomInfoList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{},
        curOperRowObj:{},
        showAddLiveRoomInfoModal:false,
        showViewLiveRoomInfoModal:false,
        showUpdateLiveRoomInfoModal:false,
        playStateSelectList:[]
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_LIVEROOMINFO_LIST:
            return state.set("liveRoomInfoList",action.liveRoomInfoList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("liveRoomInfoList",action.liveRoomInfoList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("liveRoomInfoList",action.liveRoomInfoList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        case ActionConstants.IS_SHOW_ADD_LIVEROOMINFO_MODAL:
            return state.set("showAddLiveRoomInfoModal",action.isShow);
        case ActionConstants.IS_SHOW_VIEW_LIVEROOMINFO_MODAL:
            return state.set("showViewLiveRoomInfoModal",action.isShow);
        case ActionConstants.IS_SHOW_UPDATE_LIVEROOMINFO_MODAL:
            return state.set("showUpdateLiveRoomInfoModal",action.isShow);
        case ActionConstants.ADD_LIVEROOMINFO_OPER:
            return state.set("liveRoomInfoList",action.liveRoomInfoList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showAddLiveRoomInfoModal",action.showAddLiveRoomInfoModal);
        case ActionConstants.UPDATE_LIVEROOMINFO_OPER:
            return state.set("liveRoomInfoList",action.liveRoomInfoList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({})).set("showUpdateLiveRoomInfoModal",action.showAddLiveRoomInfoModal);
        case ActionConstants.GET_DETAILBY_ID:
            let showUpdateLiveRoomInfoModal = false;
            let showViewLiveRoomInfoModal = false;
            if(action.opera === "update"){
                showUpdateLiveRoomInfoModal = true;
            }else if(action.opera === "view"){
                showViewLiveRoomInfoModal = true;
            }
            return state.set("curOperRowObj",action.curOperRowObj).set("showUpdateLiveRoomInfoModal",fromJS(showUpdateLiveRoomInfoModal)).set("showViewLiveRoomInfoModal",fromJS(showViewLiveRoomInfoModal));
        case ActionConstants.LOAD_PLAYSTATE_SELECT_LIST:
            return state.set("playStateSelectList",action.selectList);
        default:
            return state;
    }
}