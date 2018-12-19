import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';
import {actionCreators} from "./store";
import FontList from '../../../../common/FontList'
import {Modal} from "antd";
//菜单管理组件
class Menu extends PureComponent {

    render() {
        const {showFontListModal, isShowFontListModal} = this.props;
        return (
            <div>
                <button onClick={isShowFontListModal(true)}>显示</button>
                <div>
                    <Modal
                        title="字体图标列表"
                        visible={showFontListModal}
                        onOk={() => {
                        }}
                        onCancel={() => isShowFontListModal(false)}
                        destroyOnClose
                    >
                        <FontList/>
                    </Modal>
                </div>

            </div>
        )

    }


}


const mapState = (state) => ({
    showFontListModal: state.get("menuSettingReducer").get("showFontListModal")
});

const mapDispatchToProps = (dispatch) => ({
    //是否显示字体图标列表的Modal
    isShowFontListModal(isShow) {
        dispatch(actionCreators.isShowFontListModal(true));
    }
});

export default connect(mapState, mapDispatchToProps)(Menu);