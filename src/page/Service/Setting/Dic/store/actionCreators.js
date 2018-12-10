import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载字典ListAction
const loadDicListAction = (list,current,total) => ({
    type: ActionConstants.LOAD_DIC_LIST,
    dicList: fromJS(list),
    current,
    total
});

//加载字典List
export const loadDicList = (current,querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadDicListAction(res.data.records,res.data.current,res.data.total));
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
const delItemAction = (dicList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds:fromJS([]),
    dicList:fromJS(dicList.records),
    total:dicList.total
});

//删除表格项的数据
export const delItem = (selectIds,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/deleteBatchSysDicByIds",
            data: {"ids":selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicOptions = {
                url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
                data: querParams
            };
            util.ajax(dicOptions).then((res => {
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
            url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
            data:queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadDicListAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list,current,total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    dicList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};

//是否显示添加字典模态框Action
const isShowAddDicModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_DIC_MODAL,
    isShow
});

//是否显示添加字典模态框
export const isShowAddDicModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddDicModalAction(isShow));
    }
};


//是否显示查看字典模态框Action
const isShowViewDicModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_DIC_MODAL,
    isShow
});


//是否显示查看字典模态框
export const isShowViewDicModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewDicModalAction(isShow));
    }
};


//是否显示查看字典项模态框
export const isShowViewDicItemModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewDicItemModalAction(isShow));
    }
};

const isShowViewDicItemModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_DIC_ITEM_MODAL,
    isShow
});

//是否显示修改字典模态框Action
const isShowUpdateDicModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_DIC_MODAL,
    isShow
});

//是否显示修改字典模态框
export const isShowUpdateDicModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateDicModalAction(isShow));
    }
};

//修改字典Action
const addDicOperAction = (res) => ({
    type: ActionConstants.ADD_DIC_OPER,
    dicList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showAddDicModal:false
});

//添加字典
export const addDicOper = (addDicObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/addSysDic",
            data: addDicObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicOptions = {
                url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
                data: querParams
            };
            util.ajax(dicOptions).then((res => {
                dispatch(addDicOperAction(res));
            }));
        }));
    }
};



//修改字典Action
const updateDicOperAction = (res) => ({
    type: ActionConstants.UPDATE_DIC_OPER,
    dicList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showUpdateDicModal:false
});

//修改字典
export const updateItem = (updateObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/updateSysDicById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let dicOptions = {
                url: StringConstants.SERVER_URL + "/sysDic/likeSearchSysDicByPage",
                data: querParams
            };
            util.ajax(dicOptions).then((res => {
                dispatch(updateDicOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id,operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDic/getSysDicById",
            data: {"id":id}
        };
        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data,operate));
        }));
    }
};

/**
 * 修改字典Action
 * @param curOperRowObj  当前操作的表格行对象
 *
 */
const getDetailByIdAction = (curOperRowObj,opera) => ({
    type: ActionConstants.GET_DETAILBY_ID,
    curOperRowObj:fromJS(curOperRowObj),
    opera
});



//根据字典id查询字典项信息
export const getDicItemById = (querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysDicItem/likeSearchSysDicItemByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            let data = res.data;
            console.log(data);
            dispatch(getDicItemByIdAction(data));
        }));
    }
};

//根据字典id查询字典项信息Action
const getDicItemByIdAction = (data) => ({
    type: ActionConstants.GET_DIC_ITEM_BY_DICID,
    dicItemList: fromJS(data.records),
    dicItemCurrent:data.current,
    dicItemTotal:data.total
});
