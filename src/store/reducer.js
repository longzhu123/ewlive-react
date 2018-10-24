import {combineReducers} from 'redux-immutable';
import {reducer as customHeaderReducer} from '../common/CustomHeader/store';
import {reducer as loginReducer} from '../page/Login/store';
import {reducer as AdminHeader} from '../page/Admin/AdminHeader/store';
import {reducer as AdminSlider} from '../page/Admin/AdminSlider/store';


//全局reducer
//将多个reducer合并成一个reducer
const reducer = combineReducers({
    customHeader:customHeaderReducer,
    loginReducer:loginReducer,
    adminHeader:AdminHeader,
    adminSlider:AdminSlider
});

export default reducer;