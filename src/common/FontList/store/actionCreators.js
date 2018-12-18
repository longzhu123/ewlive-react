import {fromJS} from 'immutable';
import * as ActionConstants from "./constants";
import axios from 'axios';

//加载字体列表Action
const loadFontListAction = (list) => ({
    type: ActionConstants.LOAD_FONT_LIST,
    fontList: fromJS(list)
});

//加载用户List
export const loadFontList = () => {
    return (dispatch) => {
        axios.get("../../font-icon.json").then((res => {
            debugger;
            dispatch(loadFontListAction(res.data));
        }));
    }
};
