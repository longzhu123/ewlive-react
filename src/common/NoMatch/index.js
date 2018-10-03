import React, { Component } from 'react';
import img404 from '../../static/img/404.png';

//404页面组件
class NoMatch extends Component{
    render(){
        return(
            <img src={img404} alt="页面未找到" style={{width:'100%',overflow:'hidden'}}/>
        )
    }
}

export  default NoMatch;