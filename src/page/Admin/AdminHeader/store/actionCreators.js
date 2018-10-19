
import * as ActionConstants from './constants';

//左侧菜单click的Action
const toggleClickAction = () => ({
    type: ActionConstants.CHANGE_ADMIN_LEFT_SLIDER
});

//左侧菜单click事件
export const toggleClick = () => {
    return (dispatch) => {
        dispatch(toggleClickAction());
    }
};