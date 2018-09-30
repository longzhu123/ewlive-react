import  React,{PureComponent} from  'react';
import {connect} from 'react-redux';
import {Button,Layout} from 'antd';


const { Header } = Layout;
class CustomHeader extends  PureComponent{
    render(){
        return(
            <div>
            </div>
        )
    }

}

const mapState = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(CustomHeader);