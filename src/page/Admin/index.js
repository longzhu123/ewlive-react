import  React,{PureComponent} from  'react';
import {connect} from 'react-redux';

class Admin extends  PureComponent{
    render(){
        return(
            <div>
                <h1>首页</h1>
            </div>
        )
    }

}

const mapState = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(Admin);