import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载字典项ListAction
const loadDicItemListAction = (list,current,total) => ({
    type: ActionConstants.LOAD_DICITEM_LIST,
    dicItemList: fromJS(list),
    current,
    total
});

//加载字典项List
export const loadDicItemList = (current,querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            debugger;
            dispatch(loadDicItemListAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};


//表格复选框chage Action
const tableSelectChangeAction = (selectIds) => ({
    type: ActionConstants.TABLE_SELECT_CHANGE,
    selectIds:fromJS(selectIds)
});

//表格复选框chage
export const tableSelectChange = (selectedRowKeys) => {
    return (dispatch) => {
        dispatch(tableSelectChangeAction(selectedRowKeys));
    }
};

//删除表格项的数据 Action
const delItemAction = (dicItemList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds:fromJS([]),
    dicItemList:fromJS(dicItemList.records),
    total:dicItemList.total
});

//删除表格项的数据
export const delItem = (selectIds,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/deleteBatchSysDicItemByIds",
            data: {"ids":selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicItemOptions = {
                url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
                data: querParams
            };
            util.ajax(dicItemOptions).then((res => {
                dispatch(delItemAction(res.data));
            }));

        }));

    }
};

//改变过滤表单参数
const changeFilterParamAction = (queryObj) => ({
    type: ActionConstants.CHANGE_FILTER_PARAM,
    queryObj:fromJS(queryObj)
});


//条件查询表格
export const filterForm = (queryObj) => {
    return (dispatch) => {

        dispatch(changeFilterParamAction(queryObj));
        queryObj.current = 1;
        queryObj.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
            data:queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadDicItemListAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list,current,total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    dicItemList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};

//是否显示添加字典项模态框Action
const isShowAddDicItemModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_DICITEM_MODAL,
    isShow
});

//是否显示添加字典项模态框
export const isShowAddDicItemModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddDicItemModalAction(isShow));
    }
};


//是否显示查看字典项模态框Action
const isShowViewDicItemModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_DICITEM_MODAL,
    isShow
});


//是否显示查看字典项模态框
export const isShowViewDicItemModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewDicItemModalAction(isShow));
    }
};


//是否显示查看字典项项模态框
export const isShowViewDicItemItemModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewDicItemItemModalAction(isShow));
    }
};

const isShowViewDicItemItemModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_DICITEM_ITEM_MODAL,
    isShow
});

//是否显示修改字典项模态框Action
const isShowUpdateDicItemModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_DICITEM_MODAL,
    isShow
});

//是否显示修改字典项模态框
export const isShowUpdateDicItemModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateDicItemModalAction(isShow));
    }
};

//修改字典项Action
const addDicItemOperAction = (res) => ({
    type: ActionConstants.ADD_DICITEM_OPER,
    dicItemList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showAddDicItemModal:false
});

//添加字典项
export const addDicItemOper = (addDicItemObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/addSysDicItem",
            data: addDicItemObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicItemOptions = {
                url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
                data: querParams
            };
            util.ajax(dicItemOptions).then((res => {
                dispatch(addDicItemOperAction(res));
            }));
        }));
    }
};



//修改字典项Action
const updateDicItemOperAction = (res) => ({
    type: ActionConstants.UPDATE_DICITEM_OPER,
    dicItemList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showUpdateDicItemModal:false
});

//修改字典项
export const updateItem = (updateObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/updateSysDicItemById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicItemOptions = {
                url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
                data: querParams
            };
            util.ajax(dicItemOptions).then((res => {
                dispatch(updateDicItemOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id,operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/getSysDicItemById",
            data: {"id":id}
        };
        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data,operate));
        }));
    }
};

/**
 * 修改字典项Action
 * @param curOperRowObj  当前操作的表格行对象
 *
 */
const getDetailByIdAction = (curOperRowObj,opera) => ({
    type: ActionConstants.GET_DETAILBYDICITEM_ID,
    curOperRowObj:fromJS(curOperRowObj),
    opera
});



