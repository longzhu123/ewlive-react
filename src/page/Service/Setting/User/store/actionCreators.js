import * as ActionConstants from './constants';
import {fromJS} from 'immutable';
import * as StringConstants from "../../../../../constant";
import util from '../../../../../util/util';
import {Modal} from 'antd';

//加载用户ListAction
const loadUserListAction = (list) => ({
    type: ActionConstants.LOAD_USER_LIST,
    userList: fromJS(list)
});

//加载用户List
export const loadUserList = () => {
    return (dispatch) => {
        let options = {
            url: StringConstants.SERVER_URL + "/sysUser/getSysUserByParams",
            data: {}
        };
        util.ajax(options).then((res => {
            dispatch(loadUserListAction(res.data));
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
    userList:fromJS(userList)
});

//删除表格项的数据
export const delItem = (selectIds) => {
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
            let userOptions = {
                url: StringConstants.SERVER_URL + "/sysUser/getSysUserByParams",
                data: {}
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


