import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {
        fontList:[],
    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        case ActionConstants.LOAD_FONT_LIST:
            debugger;
            return state.set("fontList",action.fontList);
        default:
            return state;
    }
}