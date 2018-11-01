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
export const loadUserList = (values) => {
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