import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';
//加载用户ListAction
const loadUserListAction = (list, current, total) => ({
    type: ActionConstants.LOAD_USER_LIST,
    userList: fromJS(list),
    current,
    total
});

//加载用户List
export const loadUserList = (current, querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadUserListAction(res.data.records, res.data.current, res.data.total));
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
const delItemAction = (userList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds: fromJS([]),
    userList: fromJS(userList.records),
    total: userList.total
});

//删除表格项的数据
export const delItem = (selectIds, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/deleteBatchSysUserByIds",
            data: {"ids": selectIds}
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
            url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
            data: queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadUserListAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list, current, total) => ({
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
            dispatch(resetLoadGridAction(res.data.records, res.data.current, res.data.total));
        }));
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

//添加用户Action
const addUserOperAction = (res) => ({
    type: ActionConstants.ADD_USER_OPER,
    userList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showAddUserModal: false
});

//添加用户
export const addUserOper = (addUserObj, querParams) => {
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

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userOptions = {
                url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
                data: querParams
            };
            util.ajax(userOptions).then((res => {
                dispatch(addUserOperAction(res));
            }));
        }));
    }
};


//修改用户Action
const updateUserOperAction = (res) => ({
    type: ActionConstants.UPDATE_USER_OPER,
    userList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showUpdateUserModal: false
});

//修改用户
export const updateItem = (updateObj, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/updateSysUserById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let userOptions = {
                url: StringConstants.SERVER_URL + "/sysUser/likeSearchSysUserByPage",
                data: querParams
            };
            util.ajax(userOptions).then((res => {
                dispatch(updateUserOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id, operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/getSysUserById",
            data: {"id": id}
        };


        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data, operate));
        }));

    }
};

/**
 * 修改用户Action
 * @param curOperRowObj  当前操作的表格行对象
 *
 */
const getDetailByIdAction = (curOperRowObj, opera) => ({
    type: ActionConstants.GET_DETAILBY_ID,
    curOperRowObj: fromJS(curOperRowObj),
    opera
});


//是否显示角色设置模态框Action
const isShowUserRoleModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_USER_ROLE_MODAL,
    isShow
});

//是否显示角色设置模态框
export const isShowUserRoleModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUserRoleModalAction(isShow));
    }
};

//显示用户角色列表
export const showUserRoleList = (data) => ({
    type: ActionConstants.SHOW_USER_ROLE_LIST,
    isShow:true,
    data:fromJS(data)
});

//显示用户角色列表
export const setCurUserRoleRealtionAction = (roleRealDataArray) => ({
    type: ActionConstants.SET_CURUSERROLE_REALTION_ACTION,
    roleRealDataArray:fromJS(roleRealDataArray)
});



//角色设置的click事件
export const showUserRoleModal = (id) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/getSysUserById",
            data: {"id": id}
        };
        util.ajax(options).then((res => {
            let data = res.data;
            dispatch(getDetailByIdAction(data));
        }));


        //查询用户角色列表
        let userRoleOptions = {url: StringConstants.SERVER_URL + "/sysUserRole/getSysUserRoleByParams",data:{}};
        util.ajax(userRoleOptions).then((res => {
            let data = res.data;
            dispatch(showUserRoleList(data));
        }));

        //请求该用户对应的角色关系
        let userRoleRealtionOptions = {url: StringConstants.SERVER_URL + "/sysUserRoleRealtion/getSysUserRoleRealtionByParams",data:{"userId":id}};
        util.ajax(userRoleRealtionOptions).then((res => {
            let data = res.data;
            let roleRealDataArray = new Array();
            for (const roleRealData of data) {
                roleRealDataArray.push(roleRealData.userRoleId);
            }
            dispatch(setCurUserRoleRealtionAction(roleRealDataArray));
        }));
    }
};



//角色菜单Tree复选框选中事件Action
const roleTreeCheckAction = (checkedKeys) => ({
    type: ActionConstants.ROLE_TREE_CHECK_ACTION,
    checkedKeys:fromJS(checkedKeys)
});

//角色菜单Tree复选框选中事件
export const roleTreeCheck = (checkedKeys) => {
    return (dispatch) => {
        dispatch(roleTreeCheckAction(checkedKeys));
    }
};


//角色设置模态的确认click事件Action
const confirmShowUserModalAction = (isShow) => ({
    type: ActionConstants.CONFIRM_SHOWUSER_MODAL_ACTION,
    isShow
});

//角色设置模态的确认click事件
export const confirmShowUserModal = (id,userRoleCheckKeys) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUserRoleRealtion/addSysUserRoleRealtion",
            data: {"userId": id,"userRoleIds":userRoleCheckKeys}
        };
        util.ajax(options).then((res => {
            dispatch(confirmShowUserModalAction(false));
            Modal.success({
                "title": "信息提示",
                "content": "角色设置成功"
            });
        }));

    }
};
