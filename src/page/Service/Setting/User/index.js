import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Form, Card, Input, Button, Table} from 'antd';
import './index.css';
import {actionCreators} from "./store";
import {Modal} from "antd/lib/index";

const FormItem = Form.Item;
const confirm = Modal.confirm;

//用户管理组件
class User extends PureComponent {


    componentDidMount() {
        this.props.loadUserList();
    }

    render() {
        const {userList,tableSelectChange,delItem,selectIds} = this.props;
        const userDataList = userList.toJS();
        const selectDataIds = selectIds.toJS();

        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '邮箱',
                dataIndex: 'email'
            }, {
                title: '昵称',
                dataIndex: 'nickName'
            }, {
                title: '优币',
                dataIndex: 'ewCoin'
            }
        ];
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card>
                    <div>
                        <Button type="primary" icon="plus" style={{marginRight:'10px'}}>添加</Button>
                        <Button type="danger" icon="delete"  onClick={()=>delItem(selectDataIds)}>删除</Button>
                    </div>
                    <br/>
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={userDataList}
                        pagination={true}
                    />
                </Card>
            </div>
        )

    }
}

class FilterForm extends PureComponent {

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
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

FilterForm = Form.create({})(FilterForm);


const mapState = (state) => ({
    userList: state.get("userSettingReducer").get("userList"),
    selectIds:state.get("userSettingReducer").get("selectIds")
});

const mapDispatchToProps = (dispatch) => ({
    //加载用户列表
    loadUserList(){
        dispatch(actionCreators.loadUserList());
    },
    //表格复选框change事件
    tableSelectChange(selectedRowKeys){
        dispatch(actionCreators.tableSelectChange(selectedRowKeys));
    },
    //删除项事件
    delItem(selectDataIds){
        confirm({
            title: '确认删除当前数据吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if(selectDataIds.length === 0){
                    Modal.error({
                        "title": "错误提示",
                        "content": "请选择要删除的记录"
                    });
                    return;
                }
                dispatch(actionCreators.delItem(selectDataIds));
            }
        });

    }
});

export default connect(mapState, mapDispatchToProps)(User);