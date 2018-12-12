import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载角色ListAction
const loadUserRoleListAction = (list,current,total) => ({
    type: ActionConstants.LOAD_USER_ROLE_LIST,
    userRoleList: fromJS(list),
    current,
    total
});

//加载角色List
export const loadUserRoleList = (current,querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadUserRoleListAction(res.data.records,res.data.current,res.data.total));
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
const delItemAction = (userRoleList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds:fromJS([]),
    userRoleList:fromJS(userRoleList.records),
    total:userRoleList.total
});

//删除表格项的数据
export const delItem = (selectIds,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/deleteBatchSysUserRoleByIds",
            data: {"ids":selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userRoleOptions = {
                url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
                data: querParams
            };
            util.ajax(userRoleOptions).then((res => {
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
            url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
            data:queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadUserRoleListAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list,current,total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    userRoleList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
        }));
    }
};

//是否显示添加角色模态框Action
const isShowAddUserRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_USER_ROLE_MODAL,
    isShow
});

//是否显示添加角色模态框
export const isShowAddUserRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddUserRoleModalAction(isShow));
    }
};


//是否显示查看角色模态框Action
const isShowViewUserRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_USER_ROLE_MODAL,
    isShow
});

//是否显示查看角色模态框
export const isShowViewUserRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewUserRoleModalAction(isShow));
    }
};



//是否显示修改角色模态框Action
const isShowUpdateUserRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_USER_ROLE_MODAL,
    isShow
});

//是否显示修改角色模态框
export const isShowUpdateUserRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateUserRoleModalAction(isShow));
    }
};

//修改角色Action
const addUserRoleOperAction = (res) => ({
    type: ActionConstants.ADD_USER_ROLE_OPER,
    userRoleList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showAddUserRoleModal:false
});

//添加角色
export const addUserRoleOper = (addUserRoleObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/addSysUserRole",
            data: addUserRoleObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userRoleOptions = {
                url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
                data: querParams
            };
            util.ajax(userRoleOptions).then((res => {
                dispatch(addUserRoleOperAction(res));
            }));
        }));
    }
};



//修改角色Action
const updateUserRoleOperAction = (res) => ({
    type: ActionConstants.UPDATE_USER_ROLE_OPER,
    userRoleList: fromJS(res.data.records),
    current:res.data.current,
    total:res.data.total,
    showUpdateUserRoleModal:false
});

//修改角色
export const updateItem = (updateObj,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/updateSysUserRoleById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userRoleOptions = {
                url: StringConstants.SERVER_URL + "/sysUserRole/likeSearchSysUserRoleByPage",
                data: querParams
            };
            util.ajax(userRoleOptions).then((res => {
                dispatch(updateUserRoleOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id,operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRole/getSysUserRoleById",
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