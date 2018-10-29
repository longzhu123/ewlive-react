import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';


//字典管理组件
class Dic extends PureComponent {

    render() {
        return (
           <div>
               <h1>字典管理</h1>
           </div>
        )

    }


}
const mapState = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(Dic);