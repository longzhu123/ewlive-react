import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        showFontListModal:false
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case  ActionConstants.IS_SHOWFONTLIST_MODAL_ACTION:
            return state.set("showFontListModal",action.isShow);
        default:
            return state;
    }
}