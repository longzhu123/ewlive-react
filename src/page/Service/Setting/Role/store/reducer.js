import {fromJS} from 'immutable';
import * as ActionConstants from './constants';

const defaultState = fromJS(
    {

    }
);

export default (state = defaultState, action) => {
    switch (action.type){
        default:
            return state;
    }
}