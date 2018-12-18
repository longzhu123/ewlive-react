import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {connect} from 'react-redux';
import {actionCreators} from "./store";
//字体图标列表组件
class FontList extends PureComponent {

    componentDidMount(){
        this.props.loadFontList();
    }

    render() {
        const  {fontList} = this.props;
        return (
            <div>
                {
                    fontList.map((item,index)=>(
                        <p key={index}>
                            <FontAwesomeIcon icon={[item.get("prev"),item.get("icon")]} size="lg"/>
                            <span>{item.get("icon")}</span>
                        </p>
                    ))
                }
            </div>
        )
    }

}

const mapState = (state) => ({
    fontList: state.get("fontListReducer").get("fontList"),
});

const mapDispatchToProps = (dispatch) => ({
    loadFontList(){
        debugger;
        dispatch(actionCreators.loadFontList());
    }
});

export default connect(mapState, mapDispatchToProps)(FontList);