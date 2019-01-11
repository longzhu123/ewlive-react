import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载登录日志ListAction
const loadLogLoginListAction = (list, current, total) => ({
    type: ActionConstants.LOAD_LOGLOGIN_LIST,
    logLoginList: fromJS(list),
    current,
    total
});

//加载登录日志List
export const loadLogLoginList = (current, querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysLogLogin/likeSearchSysLogLoginByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadLogLoginListAction(res.data.records, res.data.current, res.data.total));
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
const delItemAction = (logLoginList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds: fromJS([]),
    logLoginList: fromJS(logLoginList.records),
    total: logLoginList.total
});

//删除表格项的数据
export const delItem = (selectIds, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysLogLogin/deleteBatchSysLogLoginByIds",
            data: {"ids": selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let logLoginOptions = {
                url: StringConstants.SERVER_URL + "/sysLogLogin/likeSearchSysLogLoginByPage",
                data: querParams
            };
            util.ajax(logLoginOptions).then((res => {
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
            url: StringConstants.SERVER_URL + "/sysLogLogin/likeSearchSysLogLoginByPage",
            data: queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadLogLoginListAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list, current, total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    logLoginList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysLogLogin/likeSearchSysLogLoginByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};
