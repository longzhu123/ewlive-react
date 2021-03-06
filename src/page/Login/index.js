import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import './index.css';
import {Link} from 'react-router-dom';
import {actionCreators} from "./store";

const FormItem = Form.Item;

//登录组件
class Login extends PureComponent {

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <div className="login-name">登录</div>
                    </div>
                    <Form onSubmit={this.submitLogin} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: '请输入邮箱!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入邮箱"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom: '0'}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码?</a>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>
                            Or
                            <Link to="/register">现在就去注册!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )

    }

    //登录提交
    submitLogin = (e) => {
        e.preventDefault();
        // 前端验证
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 前端验证无误，向后端提交
                this.props.authLogin(values);
            }
        });
    }
}
const mapState = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    //登录
    authLogin(values) {
        dispatch(actionCreators.authLogin(values));
    }

});

const LoginForm = Form.create()(Login);
export default connect(mapState, mapDispatchToProps)(LoginForm);