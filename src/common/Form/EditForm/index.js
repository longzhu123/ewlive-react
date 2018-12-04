import React, {PureComponent} from 'react';
import {Checkbox, DatePicker, Form, Input, Select} from "antd";
import util from '../../../util/util';
import './index.css';
import moment from "moment"
import 'moment/locale/zh-cn';


moment.locale('zh-cn');
const FormItem = Form.Item;


//公共的编辑(增,删,改)表单组件
class EditForm extends PureComponent {

    componentDidMount(){
        this.props.onRef(this)
    }

    /**
     * 初始化编辑表单Form
     *
     * 以这样的数据格式作为参数传递
     *      {
                type: "select",
                lable: "机型",
                initialValue: "1",
                placeholder: "请选择您的机型",
                width: "200px",
                field:"iphone",
                validate:[{type: 'email', message: '邮箱格式不正确!',}]  //antd的表单rule对象格式(参考antd的doc)
                list: [{id:"1",name:"IphoneX"}, {id:"2",name:"Ihonexs"},{id:"3",name:"IhoneXsMax"}]
            }
     * @returns {Array}
     */
    initEditFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const  editFormOption = this.props.editFormOption;
        let editFormList = [];
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 19},
            },
        };

        if (editFormOption && editFormOption.length > 0) {
            editFormOption.map((item, index) => {
                let initialValue = item.initialValue || "";  // 默认为空
                let lable = item.lable;           //标题
                let placeholder = item.placeholder;  //placeholder
                let width = item.width;   //width
                let list = item.list || [];    //option
                let field = item.field;   // 字段key
                let validate = item.validate;   // 字段validate

                if (item.type === "input") {
                    const input = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {initialValue: initialValue,rules:validate})(
                            <Input placeholder={placeholder}/>
                        )}
                    </FormItem>;
                    editFormList.push(input);
                }
                else if (item.type === "select") {
                    const select = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {
                                initialValue: initialValue,
                                rules:validate
                            }
                        )(
                            <Select style={{width: width}} placeholder={placeholder}>
                                {util.OptionList(list)}
                            </Select>
                        )}
                    </FormItem>;
                    editFormList.push(select);
                } else if (item.type === "checkbox") {
                    const checkbox = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {
                            valuePropName: "checked",
                            initialValue: initialValue,
                            rules:validate
                        })(
                            <Checkbox>{lable}</Checkbox>
                        )}
                    </FormItem>;
                    editFormList.push(checkbox);
                } else if (item.type === "date") {
                    const dateComponent = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {
                            initialValue: moment(initialValue, 'YYYY/MM/DD'),
                            rules:validate
                        })(
                            <DatePicker
                                showTime
                                for-mat="YY-MM-DD HH:mm:ss"
                                placeholder={placeholder}
                            />
                        )}
                    </FormItem>;
                    editFormList.push(dateComponent);
                    return index;
                }
            })
        }
        return editFormList;

    };

    render() {

        return (
            <Form>
                {this.initEditFormList()}
            </Form>
        )
    }


    //添加表单的validate
    addFormValidate = (querParam) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.editAction(values, querParam);
            }
        });
    };

    //修改表单的validate
    updateFormValidate = (id,querParam) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id=id;
                this.props.editAction(values, querParam);
            }
        });
    };

}

export default Form.create()(EditForm);