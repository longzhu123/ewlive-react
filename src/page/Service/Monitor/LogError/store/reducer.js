import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        logErrorList:[],
        selectIds:[],
        pageIndex:1,
        totalSize:0,
        queryObj:{}
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_LOGERROR_LIST:
            return state.set("logErrorList",action.logErrorList).set("totalSize",action.total).set("pageIndex",action.current);
        case ActionConstants.TABLE_SELECT_CHANGE:
            return state.set("selectIds",action.selectIds);
        case ActionConstants.TABLE_DEL_ITEM:
            return state.set("selectIds",action.selectIds).set("logErrorList",action.logErrorList).set("totalSize",action.total).set("pageIndex",1);
        case ActionConstants.CHANGE_FILTER_PARAM:
            return state.set("queryObj",action.queryObj);
        case ActionConstants.RESET_LOAD_GRID:
            return state.set("logErrorList",action.logErrorList).set("totalSize",action.total).set("pageIndex",action.current).set("queryObj",fromJS({}));
        default:
            return state;
    }
}