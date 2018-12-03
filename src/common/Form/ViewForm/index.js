import React, {Component} from 'react';
import './index.css';


//公共的显示详情表单组件
class ViewForm extends Component {


    /**
     * 初始化查看详情列表
     * @param viewOptions
     * 以这样的数据格式作为参数传递
     *      {
                type: "text", //text:文本   file:附件
                lable: "机型", //显示的中文名称
                filed: "emial"  属性名
            }
     */
    initViewFormList = () => {
        let formList = new Array();

        const  {viewData,viewOptions} = this.props;
        viewOptions.map((options, index) =>
            formList.push(
                <li key={index}>
                    <div className="detail-form-left">{options.lable} :</div>
                    <div className="detail-form-content">{viewData[options.field]}</div>
                </li>
            )
        );
        return formList;
    };

    render() {
        return (
            <div>
                <ul className="detail-form">
                    {this.initViewFormList()}
                </ul>
            </div>
        )
    }

}

export default ViewForm;