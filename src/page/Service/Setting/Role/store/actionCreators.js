import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载角色ListAction
const loadRoleListAction = (list,current,total) => ({
    type: ActionConstants.LOAD_ROLE_LIST,
    roleList: fromJS(list),
    current,
    total
});

//加载角色List
export const loadRoleList = (current,querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadRoleListAction(res.data.records,res.data.current,res.data.total));
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
const delItemAction = (roleList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds:fromJS([]),
    roleList:fromJS(roleList.records),
    total:roleList.total
});

//删除表格项的数据
export const delItem = (selectIds,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/deleteBatchSysRoleByIds",
            data: {"ids":selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let roleOptions = {
                url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
                data: querParams
            };
            util.ajax(roleOptions).then((res => {
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
            url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
            data:queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadRoleListAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list,current,total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    roleList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};

//是否显示添加角色模态框Action
const isShowAddRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_ROLE_MODAL,
    isShow
});

//是否显示添加角色模态框
export const isShowAddRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddRoleModalAction(isShow));
    }
};


//是否显示查看角色模态框Action
const isShowViewRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_ROLE_MODAL,
    isShow
});

//是否显示查看角色模态框
export const isShowViewRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewRoleModalAction(isShow));
    }
};



//是否显示修改角色模态框Action
const isShowUpdateRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_ROLE_MODAL,
    isShow
});

//是否显示修改角色模态框
export const isShowUpdateRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateRoleModalAction(isShow));
    }
};

//修改角色Action
const addRoleOperAction = (res) => ({
    type: ActionConstants.ADD_ROLE_OPER,
    roleList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showAddRoleModal:false
});

//添加角色
export const addRoleOper = (addRoleObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/addSysRole",
            data: addRoleObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let roleOptions = {
                url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
                data: querParams
            };
            util.ajax(roleOptions).then((res => {
                dispatch(addRoleOperAction(res));
            }));
        }));
    }
};



//修改角色Action
const updateRoleOperAction = (res) => ({
    type: ActionConstants.UPDATE_ROLE_OPER,
    roleList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showUpdateRoleModal:false
});

//修改角色
export const updateItem = (updateObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/updateSysRoleById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let roleOptions = {
                url: StringConstants.SERVER_URL + "/sysRole/likeSearchSysRoleByPage",
                data: querParams
            };
            util.ajax(roleOptions).then((res => {
                dispatch(updateRoleOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id,operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysRole/getSysRoleById",
            data: {"id":id}
        };


        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data,operate));
        }));

    }
};

/**
 * 修改角色Action
 * @param curOperRowObj  当前操作的表格行对象
 *
 */
const getDetailByIdAction = (curOperRowObj,opera) => ({
    type: ActionConstants.GET_DETAILBY_ID,
    curOperRowObj:fromJS(curOperRowObj),
    opera
});