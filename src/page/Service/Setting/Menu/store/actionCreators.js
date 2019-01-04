import * as ActionConstants from "./constants";
import * as StringConstants from "../../../../../constant";
import util from "../../../../../util/util";
import {Modal} from 'antd';
import {fromJS} from 'immutable';

/**
 *是否显示字体图标列表
 * @param isShow
 * @returns {Function}
 */
export const isShowFontListModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowFontListModalAction(isShow));
    }
};

/**
 * 是否显示字体图标列表的ModalAction
 * @param isShow
 * @returns {{type: *, curOperRowObj: *, opera: *}}
 */
const isShowFontListModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOWFONTLIST_MODAL_ACTION,
    isShow
});


//加载用户ListAction
const loadMenuListAction = (list, current, total) => ({
    type: ActionConstants.LOAD_MENU_LIST,
    menuList: fromJS(list),
    current,
    total
});

//加载用户List
export const loadMenuList = (current, querParams) => {
    return (dispatch) => {
        querParams.current = current;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(loadMenuListAction(res.data.records, res.data.current, res.data.total));
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
const delItemAction = (menuList) => ({
    type: ActionConstants.TABLE_DEL_ITEM,
    selectIds: fromJS([]),
    menuList: fromJS(menuList.records),
    total: menuList.total
});

//删除表格项的数据
export const delItem = (selectIds, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/deleteBatchSysMenuByIds",
            data: {"ids": selectIds}
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "删除成功"
            });
            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let menuOptions = {
                url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
                data: querParams
            };
            util.ajax(menuOptions).then((res => {
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
            url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
            data: queryObj
        };
        util.ajax(options).then((res => {
            dispatch(loadMenuListAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};


//重置表格ListAction
const resetLoadGridAction = (list, current, total) => ({
    type: ActionConstants.RESET_LOAD_GRID,
    menuList: fromJS(list),
    current,
    total
});

//重置表格
export const resetLoadGrid = (querParams) => {
    return (dispatch) => {
        querParams.current = 1;
        querParams.size = StringConstants.PAGE_SIZE;
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
            data: querParams
        };
        util.ajax(options).then((res => {
            dispatch(resetLoadGridAction(res.data.records, res.data.current, res.data.total));
        }));
    }
};

//是否显示添加用户模态框Action
const isShowAddMenuModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_ADD_MENU_MODAL,
    isShow
});

//是否显示添加用户模态框
export const isShowAddMenuModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowAddMenuModalAction(isShow));
    }
};


//是否显示查看用户模态框Action
const isShowViewMenuModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_VIEW_MENU_MODAL,
    isShow
});

//是否显示查看用户模态框
export const isShowViewMenuModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowViewMenuModalAction(isShow));
    }
};


//是否显示修改用户模态框Action
const isShowUpdateMenuModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOW_UPDATE_MENU_MODAL,
    isShow
});

//是否显示修改用户模态框
export const isShowUpdateMenuModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowUpdateMenuModalAction(isShow));
    }
};

//添加用户Action
const addMenuOperAction = (res) => ({
    type: ActionConstants.ADD_MENU_OPER,
    menuList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showAddMenuModal: false
});

//添加用户
export const addMenuOper = (addMenuObj, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/addSysMenu",
            data: addMenuObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "添加成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let menuOptions = {
                url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
                data: querParams
            };
            util.ajax(menuOptions).then((res => {
                dispatch(addMenuOperAction(res));
            }));
        }));
    }
};


//修改用户Action
const updateMenuOperAction = (res) => ({
    type: ActionConstants.UPDATE_MENU_OPER,
    menuList: fromJS(res.data.records),
    current: res.data.current,
    total: res.data.total,
    showUpdateMenuModal: false
});

//修改用户
export const updateItem = (updateObj, querParams) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/updateSysMenuById",
            data: updateObj
        };
        util.ajax(options).then((res => {
            Modal.success({
                "title": "信息提示",
                "content": "修改成功"
            });

            querParams.current = StringConstants.DEFAULT_PAGE_CURRENT;
            querParams.size = StringConstants.PAGE_SIZE;
            let menuOptions = {
                url: StringConstants.SERVER_URL + "/sysMenu/likeSearchSysMenuByPage",
                data: querParams
            };
            util.ajax(menuOptions).then((res => {
                dispatch(updateMenuOperAction(res));
            }))
        }));
    }
};

//根据id查询详情
export const getDetailById = (id, operate) => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysMenu/getSysMenuById",
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







