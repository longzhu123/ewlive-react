import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        collapsed: false
    }
);

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionConstants.CHANGE_ADMIN_LEFT_SLIDER:
            const toggleCollapsed = !state.get("collapsed");
            return state.set("collapsed", toggleCollapsed);
        default:
            return state;
    }
}
