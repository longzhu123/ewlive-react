
import * as ActionConstants from './constants';

//左侧菜单click的Action
const changeLeftMenuSelectKeyAction = (pathName) => ({
    type: ActionConstants.CHANGE_LEFTMENU_SELECT_KEY,
    pathName
});

//左侧菜单click,改变默认选中事件
export const changeLeftMenuSelectKey = (pathName) => {
    return (dispatch) => {
        dispatch(changeLeftMenuSelectKeyAction(pathName));
    }
};