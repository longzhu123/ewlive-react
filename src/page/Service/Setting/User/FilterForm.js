//过滤表单组件
import React, {PureComponent} from 'react';
import {Form,Button,Input} from "antd";
import {connect} from 'react-redux';

const FormItem = Form.Item;

class FilterForm extends PureComponent {

    //获取过滤表单的submit事件
    handleFilterSubmit = (e)=>{
        e.preventDefault();
        let fieldsValue = this.props.form.getFieldsValue();
        //调用父组件filterForm方法
        this.props.filterForm(fieldsValue);
    };

    //获取过滤表单的值
    getFilterFiledValues=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.getFilterFiledValues(fieldsValue);
    };

    //重置
    reset = ()=>{
        this.props.form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="邮箱">
                    {
                        getFieldDecorator('email')(
                            <Input placeholder="请输入邮箱"/>
                        )
                    }
                </FormItem>
                <FormItem label="昵称">
                    {
                        getFieldDecorator('nickName')(
                            <Input placeholder="请输入昵称"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapState = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(
    Form.create({})(FilterForm)
);
