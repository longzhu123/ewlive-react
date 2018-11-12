import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载用户ListAction
const loadUserListAction = (list,current,total) => ({
    type: ActionConstants.LOAD_USER_LIST,
    userList: fromJS(list),
    current,
    total
});

//加载用户List
export const loadUserList = (current,querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadUserListAction(res.data.records,res.data.current,res.data.total));
        })).catch((e => {
            Modal.error({
                "title": "错误提示",
                "content": "网络异常"
            })
        }))
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
const delItemAction = (userList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds:fromJS([]),
    userList:fromJS(userList.records),
    total:userList.total
});

//删除表格项的数据
export const delItem = (selectIds,querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/deleteBatchSysUserByIds",
            data: {"ids":selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userOptions = {
                url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
                data: querParams
            };
            util.ajax(userOptions).then((res => {
                dispatch(delItemAction(res.data));
            })).catch((e => {
                Modal.error({
                    "title": "错误提示",
                    "content": "网络异常"
                });
            }))

        })).catch((e => {
            Modal.error({
                "title": "错误提示",
                "content": "网络异常"
            })
        }))

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
            url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
            data:queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadUserListAction(res.data.records,res.data.current,res.data.total));
        })).catch((e => {
            Modal.error({
                "title": "错误提示",
                "content": "网络异常"
            })
        }))
    }
};


//重置表格ListAction
const resetLoadGridAction = (list,current,total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    userList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
        })).catch((e => {
            Modal.error({
                "title": "错误提示",
                "content": "网络异常"
            })
        }))
    }
};

//是否显示添加用户模态框Action
const isShowAddUserModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_USER_MODAL,
    isShow
});

//是否显示添加用户模态框
export const isShowAddUserModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddUserModalAction(isShow));
    }
};


//是否显示查看用户模态框Action
const isShowViewUserModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_USER_MODAL,
    isShow
});

//是否显示查看用户模态框
export const isShowViewUserModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewUserModalAction(isShow));
    }
};



//是否显示修改用户模态框Action
const isShowUpdateUserModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_USER_MODAL,
    isShow
});

//是否显示修改用户模态框
export const isShowUpdateUserModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateUserModalAction(isShow));
    }
};


//添加用户
export const addUserOper = (addUserObj) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/addSysUser",
            data: addUserObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            let querParams={};
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userOptions = {
                url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
                data: querParams
            };
            util.ajax(userOptions).then((res => {
                dispatch(resetLoadGridAction(res.data.records,res.data.current,res.data.total));
            })).catch((e => {
                Modal.error({
                    "title": "错误提示",
                    "content": "网络异常"
                });
            }))
        })).catch((e => {
            Modal.error({
                "title": "错误提示",
                "content": "网络异常"
            })
        }))
    }
};



//修改用户Action
const updateUserOperAction = (updateUserObj) => ({
    type: ActionConstants.UPDATE_USER_OPER,
    updateUserObj
});

//修改用户
export const updateUserOper = (updateUserObj) => {
    return (dispatch) => {
        dispatch(updateUserOperAction(updateUserObj));
    }
};



//查看详情用户Action
const viewUserOperAction = (viewUserObj) => ({
    type: ActionConstants.VIEW_USER_OPER,
    viewUserObj
});

//查看详情用户
export const viewUserOper = (viewUserObj) => {
    return (dispatch) => {
        dispatch(updateUserOperAction(viewUserObj));
    }
};