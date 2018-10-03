import {combineReducers} from 'redux-immutable';
import {reducer as customHeaderReducer} from '../common/CustomHeader/store';
import {reducer as loginReducer} from '../page/Login/store';


//全局reducer
//将多个reducer合并成一个reducer
const reducer = combineReducers({
    customHeader:customHeaderReducer,
    loginReducer:loginReducer
});

export default reducer;