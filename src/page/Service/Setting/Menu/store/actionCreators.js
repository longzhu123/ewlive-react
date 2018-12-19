import * as ActionConstants from "./constants";

/**
 *
 * @param isShow
 * @returns {Function}
 */
export const isShowFontListModal = (isShow) => {
    return (dispatch) => {
        dispatch(isShowFontListModalAction(isShow));
    }
};

/**
 * 是否显示字体图标列表的ModalAction
 * @param isShow
 * @returns {{type: *, curOperRowObj: *, opera: *}}
 */
const isShowFontListModalAction = (isShow) => ({
    type: ActionConstants.IS_SHOWFONTLIST_MODAL_ACTION,
    isShow
});