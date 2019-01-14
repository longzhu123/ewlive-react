import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载直播房间信息ListAction
const loadLiveRoomInfoListAction = (list, current, total) => ({
    type: ActionConstants.LOAD_LIVEROOMINFO_LIST,
    liveRoomInfoList: fromJS(list),
    current,
    total
});

//加载直播房间信息List
export const loadLiveRoomInfoList = (current, querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadLiveRoomInfoListAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};


//表格复选框chage Action
const tableSelectChangeAction = (selectIds) => ({
    type: ActionConstants.TABLE_SELECT_CHANGE,
    selectIds: fromJS(selectIds)
});

//表格复选框chage
export const tableSelectChange = (selectedRowKeys) => {
    return (dispatch) => {
        dispatch(tableSelectChangeAction(selectedRowKeys));
    }
};

//删除表格项的数据 Action
const delItemAction = (liveRoomInfoList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds: fromJS([]),
    liveRoomInfoList: fromJS(liveRoomInfoList.records),
    total: liveRoomInfoList.total
});

//删除表格项的数据
export const delItem = (selectIds, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/deleteBatchLiveRoomInfoByIds",
            data: {"ids": selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let liveRoomInfoOptions = {
                url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
                data: querParams
            };
            util.ajax(liveRoomInfoOptions).then((res => {
                dispatch(delItemAction(res.data));
            }));

        }));

    }
};

//改变过滤表单参数
const changeFilterParamAction = (queryObj) => ({
    type: ActionConstants.CHANGE_FILTER_PARAM,
    queryObj: fromJS(queryObj)
});


//条件查询表格
export const filterForm = (queryObj) => {
    return (dispatch) => {

        dispatch(changeFilterParamAction(queryObj));
        queryObj.current = 1;
        queryObj.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
            data: queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadLiveRoomInfoListAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list, current, total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    liveRoomInfoList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};

//是否显示添加直播房间信息模态框Action
const isShowAddLiveRoomInfoModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_LIVEROOMINFO_MODAL,
    isShow
});

//是否显示添加直播房间信息模态框
export const isShowAddLiveRoomInfoModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddLiveRoomInfoModalAction(isShow));
    }
};


//是否显示查看直播房间信息模态框Action
const isShowViewLiveRoomInfoModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_LIVEROOMINFO_MODAL,
    isShow
});

//是否显示查看直播房间信息模态框
export const isShowViewLiveRoomInfoModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewLiveRoomInfoModalAction(isShow));
    }
};


//是否显示修改直播房间信息模态框Action
const isShowUpdateLiveRoomInfoModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_LIVEROOMINFO_MODAL,
    isShow
});

//是否显示修改直播房间信息模态框
export const isShowUpdateLiveRoomInfoModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateLiveRoomInfoModalAction(isShow));
    }
};

//添加直播房间信息Action
const addLiveRoomInfoOperAction = (res) => ({
    type: ActionConstants.ADD_LIVEROOMINFO_OPER,
    liveRoomInfoList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showAddLiveRoomInfoModal: false
});

//添加直播房间信息
export const addLiveRoomInfoOper = (addLiveRoomInfoObj, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/addLiveRoomInfo",
            data: addLiveRoomInfoObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let liveRoomInfoOptions = {
                url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
                data: querParams
            };
            util.ajax(liveRoomInfoOptions).then((res => {
                dispatch(addLiveRoomInfoOperAction(res));
            }));
        }));
    }
};


//修改直播房间信息Action
const updateLiveRoomInfoOperAction = (res) => ({
    type: ActionConstants.UPDATE_LIVEROOMINFO_OPER,
    liveRoomInfoList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showUpdateLiveRoomInfoModal: false
});

//修改直播房间信息
export const updateItem = (updateObj, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/updateLiveRoomInfoById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let liveRoomInfoOptions = {
                url: StringConstants.SERVER_URL + "/liveRoomInfo/likeSearchLiveRoomInfoByPage",
                data: querParams
            };
            util.ajax(liveRoomInfoOptions).then((res => {
                dispatch(updateLiveRoomInfoOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id, operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/liveRoomInfo/getLiveRoomInfoById",
            data: {"id": id}
        };


        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data, operate));
        }));

    }
};

/**
 * 修改直播房间信息Action
 * @param curOperRowObj  当前操作的表格行对象
 *
 */
const getDetailByIdAction = (curOperRowObj, opera) => ({
    type: ActionConstants.GET_DETAILBY_ID,
    curOperRowObj: fromJS(curOperRowObj),
    opera
});

