import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Form, Card, Input, Button, Table} from 'antd';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import {Modal} from "antd/lib/index";

const FormItem = Form.Item;
const confirm = Modal.confirm;
let querParams = {};

//用户管理组件
class User extends PureComponent {

    componentDidMount() {
        this.props.loadUserList();
    }

    render() {
        const {userList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, viewDetail, updateItem, filterForm, queryObj,resetLoadGrid} = this.props;
        querParams = queryObj.toJS();
        const userDataList = userList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '邮箱',
                dataIndex: 'email',
                align: "center"
            }, {
                title: '昵称',
                dataIndex: 'nickName',
                align: "center"
            }, {
                title: '优币',
                dataIndex: 'ewCoin',
                align: "center"
            }
            , {
                title: '操作',
                key: 'control',
                align: "center",
                render: (text, record) => (
                    <span className='control-container'>
                        <button className="ant-btn viewBtn" onClick={() => viewDetail(record.id)}>查看</button>
                        <button className="ant-btn updateBtn" onClick={() => updateItem(record.id)}>修改</button>
                    </span>
                ),
            }
        ];
        return (
            <div>
                <Card>
                    {/*将父组件的filterForm方法传给子组件filterForm*/}
                    <FilterForm filterForm={filterForm} resetLoadGrid={resetLoadGrid}/>
                </Card>
                <Card>
                    <div>
                        <Button type="primary" icon="plus" style={{marginRight: '10px'}}>添加</Button>
                        <Button type="danger" icon="delete" onClick={() => delItem(selectDataIds)}>删除</Button>
                    </div>
                    <br/>
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={userDataList}
                        pagination={{
                            current: pageIndex,
                            total: totalSize,
                            onChange: onShowSizeChange
                        }}
                    />
                </Card>
            </div>
        )

    }
}

//过滤表单组件
class FilterForm extends PureComponent {

    //获取过滤表单的submit事件
    handleFilterSubmit = (e) => {
        e.preventDefault();
        let fieldsValue = this.props.form.getFieldsValue();
        //调用父组件filterForm方法
        this.props.filterForm(fieldsValue);
    };


    //重置
    reset = () => {
        this.props.form.resetFields();
        this.props.resetLoadGrid();
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

FilterForm = Form.create({})(FilterForm);

const mapState = (state) => ({
    userList: state.get("userSettingReducer").get("userList"),
    selectIds: state.get("userSettingReducer").get("selectIds"),
    pageIndex: state.get("userSettingReducer").get("pageIndex"),
    totalSize: state.get("userSettingReducer").get("totalSize"),
    queryObj: state.get("userSettingReducer").get("queryObj")
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    //加载用户列表
    loadUserList() {
        dispatch(actionCreators.loadUserList(StringConstants.DEFAULT_PAGE_CURRENT,{}));
    },
    //表格复选框change事件
    tableSelectChange(selectedRowKeys) {
        dispatch(actionCreators.tableSelectChange(selectedRowKeys));
    },
    //删除项事件
    delItem(selectDataIds) {
        confirm({
            title: '确认删除当前数据吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if (selectDataIds.length === 0) {
                    Modal.error({
                        "title": "错误提示",
                        "content": "请选择要删除的记录"
                    });
                    return;
                }
                dispatch(actionCreators.delItem(selectDataIds));
            }
        });

    },
    //表格分页change事件
    onShowSizeChange(current) {
        dispatch(actionCreators.loadUserList(current,querParams));
    },
    //查看单条记录的详情
    viewDetail(id) {
        console.log("查询详情");
        console.log(id);
    },
    //修改单条记录
    updateItem(id) {
        console.log("修改详情");
        console.log(id);
    },
    //条件查询表格
    filterForm(queryObj) {
        dispatch(actionCreators.filterForm(queryObj));
    },
    //重置表格
    resetLoadGrid(){
        dispatch(actionCreators.resetLoadGrid({}));
    }
});

export default connect(mapState, mapDispatchToProps)(User);