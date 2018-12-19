import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button,Modal} from 'antd';
import './index.css';
import {actionCreators} from "./store";

//菜单管理组件
class Menu extends PureComponent {

    render() {
        const {isShowFontListModal, showFontListModal} = this.props;


        return (
            <div>
                <div>
                    <Modal
                        title="字体图标列表"
                        visible={showFontListModal}
                        onOk={() =>alert(1) }
                        onCancel={() => isShowFontListModal(false)}
                        destroyOnClose
                    >
                        <h1>Hello World</h1>
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
    //是否显示字体图标列表
    isShowFontListModal(isShow) {
        dispatch(actionCreators.isShowFontListModal(isShow));
    },

});

export default connect(mapState, mapDispatchToProps)(Menu);