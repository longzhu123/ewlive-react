import React, {Component} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import util from '../../../util/util';
import './index.css';
import moment from "moment"
import 'moment/locale/zh-cn';


moment.locale('zh-cn');
const FormItem = Form.Item;

//公共的搜索表单组件
class SearchForm extends Component {



    //搜索表单提交事件
    search = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        //调用父组件filterForm方法
        this.props.filterForm(fieldsValue);
    };

    //重置方法
    reset = () => {
        this.props.form.resetFields();
        this.props.resetLoadGrid();
    };

    /**
     * 初始化搜索表单列表
     *
     * 以这样的数据格式作为参数传递
     *      {
                type: "select",
                lable: "机型",
                initialValue: "1",
                placeholder: "请选择您的机型",
                width: "200px",
                field:"iphone",
                list: [{id:"1",name:"IphoneX"}, {id:"2",name:"Ihonexs"},{id:"3",name:"IhoneXsMax"}]
            }
     * @returns {Array}
     */
    initSearchFormList = () => {

        const {getFieldDecorator} = this.props.form;
        const formList = this.props.searchOptions;
        let formItemList = [];


        if (formList && formList.length > 0) {
            formList.map((item, index) => {

                let initialValue = item.initialValue || "";  // 默认为空
                let lable = item.lable;           //标题
                let placeholder = item.placeholder;  //placeholder
                let width = item.width;   //width
                let list = item.list || [];    //option
                let field = item.field;   // 字段key

                if (item.type === "input") {
                    const input = <FormItem label={lable} key={field}>
                        {getFieldDecorator(field, {initialValue: initialValue})(
                            <Input placeholder={placeholder}/>
                        )}
                    </FormItem>
                    formItemList.push(input);
                }
                else if (item.type === "select") {
                    const select = <FormItem label={lable} key={field}>
                        {getFieldDecorator(field, {
                                initialValue: initialValue
                            }
                        )(
                            <Select style={{width: width}} placeholder={placeholder}>
                                {util.OptionList(list)}
                            </Select>
                        )}
                    </FormItem>;
                    formItemList.push(select);
                } else if (item.type === "checkbox") {
                    const checkbox = <FormItem label={lable} key={field}>
                        {getFieldDecorator(field, {
                            valuePropName: "checked",
                            initialValue: initialValue,
                        })(
                            <Checkbox>{lable}</Checkbox>
                        )}

                    </FormItem>
                    formItemList.push(checkbox);
                } else if (item.type === "date") {
                    const dateComponent = <FormItem label={lable} key={field}>
                        {getFieldDecorator(field, {
                            initialValue: moment(initialValue, 'YYYY/MM/DD')

                        })(
                            <DatePicker
                                showTime
                                for-mat="YY-MM-DD HH:mm:ss"
                                placeholder={placeholder}
                            />
                        )}

                    </FormItem>
                    formItemList.push(dateComponent);

                }
            })

        }

        return formItemList;
    };

    render() {
        return (<Form layout="inline">
            {this.initSearchFormList()}
            <FormItem>
                <Button type="primary" onClick={this.search} style={{margin: '0 20px'}}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
            </FormItem>
        </Form>)
    }

}

export default Form.create()(SearchForm);