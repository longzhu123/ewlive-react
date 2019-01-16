import React, {PureComponent} from 'react';
import {Checkbox, DatePicker, Form, Input, Select, TreeSelect} from "antd";
import util from '../../../util/util';
import './index.css';
import moment from "moment"
import 'moment/locale/zh-cn';


moment.locale('zh-cn');
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

//公共的编辑(增,删,改)表单组件
class EditForm extends PureComponent {


    componentDidMount() {
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
        const editFormOption = this.props.editFormOption;
        let editFormList = [];
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16, offset: 1},
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
                    let input = "";
                    if (item.onFocus === undefined) {
                        input = <FormItem label={lable} key={field}  {...formItemLayout}>
                            {getFieldDecorator(field, {initialValue: initialValue, rules: validate})(
                                <Input placeholder={placeholder}/>
                            )}
                        </FormItem>;
                    } else {
                        input = <FormItem label={lable} key={field}  {...formItemLayout}>
                            {getFieldDecorator(field, {initialValue: initialValue, rules: validate})(
                                <Input placeholder={placeholder} onClick={item.onFocus()}/>
                            )}
                        </FormItem>;
                    }
                    editFormList.push(input);
                }
                else if (item.type === "select") {
                    const select = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {
                                initialValue: initialValue,
                                rules: validate
                            }
                        )(
                            <Select style={{width: width}} placeholder={placeholder} showSearch
                                    optionFilterProp="children">
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
                            rules: validate
                        })(
                            <Checkbox>{lable}</Checkbox>
                        )}
                    </FormItem>;
                    editFormList.push(checkbox);
                } else if (item.type === "date") {
                    const dateComponent = <FormItem label={lable} key={field}  {...formItemLayout}>
                        {getFieldDecorator(field, {
                            rules: validate
                        })(
                            <DatePicker
                                placeholder={placeholder}
                                onChange={this.dateOnChange}
                            />
                        )}
                    </FormItem>;
                    editFormList.push(dateComponent);
                } else if (item.type === "tree") {
                    const treeComponent =
                        <FormItem label={lable} key={field}  {...formItemLayout}>
                            {getFieldDecorator(field, {initialValue: initialValue, rules: validate})(
                                <TreeSelect
                                    showSearch
                                    style={{width: 300}}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    placeholder={placeholder}
                                    allowClear
                                    treeNodeFilterProp="title"
                                    treeDefaultExpandAll
                                >
                                    {this.renderTreeForm(item.treeList)}
                                </TreeSelect>
                            )}
                        </FormItem>;


                    editFormList.push(treeComponent);
                }
                return index;
            })
        }
        return editFormList;

    };


    dateOnChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    /**
     * 渲染树形下拉框
     * @param treeList
     */
    renderTreeForm = (treeList) => {
        return treeList.map((item, index) => {
            if (item.children !== undefined && item.children.length > 0) {
                return (
                    <TreeNode value={item.id} title={item.menuName} key={item.id}>
                        {this.renderTreeForm(item.children)}
                    </TreeNode>
                )
            } else {
                return (
                    <TreeNode value={item.id} title={item.menuName} key={item.id}></TreeNode>
                )
            }

        })
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
                for(let key in values){
                    if(key.toLowerCase().indexOf("time")>-1){
                        values[key]=moment(values[key]).format("YYYY-MM-DD 00:00:00")
                    }
                }
                console.log(values);
                this.props.editAction(values, querParam);
            }
        });
    };

    //修改表单的validate
    updateFormValidate = (id, querParam) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = id;
                this.props.editAction(values, querParam);
            }
        });
    };

}

export default Form.create()(EditForm);