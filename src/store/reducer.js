import {combineReducers} from 'redux-immutable';
import {reducer as loginReducer} from '../page/Login/store';
import {reducer as AdminHeader} from '../page/Admin/AdminHeader/store';
import {reducer as AdminSlider} from '../page/Admin/AdminSlider/store';
import {reducer as UserSettingReducer} from '../page/Service/Setting/User/store';
import {reducer as MenuSettingReducer} from '../page/Service/Setting/Menu/store';
import {reducer as RoleSettingReducer} from '../page/Service/Setting/Role/store';
import {reducer as DicSettingReducer} from '../page/Service/Setting/Dic/store';
import {reducer as DicItemSettingReducer} from '../page/Service/Setting/DicItem/store';
import {reducer as LogOperateReducer} from '../page/Service/Monitor/LogOperate/store';
import {reducer as FontListReducer} from '../common/FontList/store';



//全局reducer
//将多个reducer合并成一个reducer
const reducer = combineReducers({
    loginReducer:loginReducer,
    adminHeader:AdminHeader,
    adminSlider:AdminSlider,
    userSettingReducer:UserSettingReducer,
    menuSettingReducer:MenuSettingReducer,
    userRoleSettingReducer:RoleSettingReducer,
    dicSettingReducer:DicSettingReducer,
    dicItemSettingReducer:DicItemSettingReducer,
    logOperateSettingReducer:LogOperateReducer,
    fontListReducer:FontListReducer
});

export default reducer;