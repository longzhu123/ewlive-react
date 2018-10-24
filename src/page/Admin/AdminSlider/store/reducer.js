import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        leftMenuSelectKey: ""
    }
);

export default (state = defaultState, action) => {
    switch (action.type) {
        case  ActionConstants.CHANGE_LEFTMENU_SELECT_KEY:
            return state.set("leftMenuSelectKey", action.pathName);
        default:
            return state;
    }
}
