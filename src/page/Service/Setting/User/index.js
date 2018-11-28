import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Form, Input, Table, Icon} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import {Modal} from "antd/lib/index";

const FormItem = Form.Item;
const confirm = Modal.confirm;
let querParams = {};
let toCurOperRowObj = {};

//用户管理组件
class User extends PureComponent {

    componentDidMount() {
        this.props.loadUserList();
    }

    constructor(prop) {
        super(prop);
    }

    onRef = (ref) => {
        this.addUserFormRef= ref;
        this.updateUserFormRef=ref;
    };

    render() {
        const {userList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showViewModal, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddUserModal, showAddUserModal, showViewUserModal, showUpdateUserModal, isShowViewUserModal, isShowUpdateUserModal, curOperRowObj} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
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
                        <button className="ant-btn viewBtn" onClick={() => showViewModal(record.id)}><Icon type="eye"/>查看</button>
                        <button className="ant-btn updateBtn" onClick={() => showUpdateModal(record.id)}><Icon
                            type="edit"/>修改</button>
                    </span>
                ),
            }
        ];
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "邮箱",
                placeholder: "邮箱",
                width: "200px",
                field: "email"
            },
            {
                type: "input",
                lable: "昵称",
                placeholder: "昵称",
                width: "200px",
                field: "nickName"
            }
        ];
        //编辑表单的配置参数
        const editFormOptions = [
            {
                type: "input",
                lable: "邮箱",
                placeholder: "邮箱",
                width: "200px",
                field: "email",
                validate: [
                    {
                        type: 'email', message: '邮箱格式不正确!',
                    },
                    {
                        required: true, message: '请输入邮箱!',
                    }
                ]
            },
            {
                type: "input",
                lable: "密码",
                placeholder: "密码",
                width: "200px",
                field: "password",
                validate: [
                    {required: true, message: '请输入密码!'}
                ]
            },
            {
                type: "input",
                lable: "昵称",
                placeholder: "昵称",
                width: "200px",
                field: "nickName",
                validate: [
                    {required: true, message: '请输入昵称!'}
                ]
            },
            {
                type: "input",
                lable: "优币",
                placeholder: "优币",
                width: "200px",
                field: "ewCoin",
                validate: [
                    {
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数值格式'
                    }, {
                        required: true, message: '请输入优币!',
                    }
                ]
            }
        ];
        return (
            <div>
                <Card>
                    {/*将父组件的filterForm方法传给子组件filterForm*/}
                    <SearchForm searchOptions={searchFormOptions} resetLoadGrid={resetLoadGrid}
                                filterForm={filterForm}/>
                </Card>
                <Card>
                    <div>
                        <Button type="primary" icon="plus" style={{marginRight: '10px'}}
                                onClick={() => isShowAddUserModal(true)}>添加</Button>
                        <button className="ant-btn delBtn" onClick={() => delItem(selectDataIds, querParams)}><Icon
                            type="delete"/>删除
                        </button>
                    </div>
                    <br/>
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={userDataList}
                        size="small"
                        pagination={{
                            showQuickJumper: true,
                            current: pageIndex,
                            total: totalSize,
                            onChange: onShowSizeChange,
                            showTotal: () => {
                                return `共 ${totalSize} 条`
                            },
                        }}
                    />
                </Card>

                <div>
                    <Modal
                        title="添加用户"
                        visible={showAddUserModal}
                        onOk={()=>{this.addUserFormRef.editFormValidate(querParams)}}
                        onCancel={() => isShowAddUserModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={editFormOptions} editType="add" editAction={this.props.addUserOper} onRef={this.onRef}/>
                        {/*<AddUserForm ref={this.addUserFormRef}/>*/}
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看用户"
                        visible={showViewUserModal}
                        onCancel={() => isShowViewUserModal(false)}
                        destroyOnClose
                    >
                        <ViewDetailUserForm/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改用户"
                        visible={showUpdateUserModal}
                        onOk={() => this.updateUser(this.updateUserFormRef, toCurOperRowObj.id, querParams)}
                        onCancel={() => isShowUpdateUserModal(false)}
                        destroyOnClose
                    >
                        <UpdateUserForm ref={this.updateUserFormRef}/>
                    </Modal>
                </div>
            </div>
        )

    }


    updateUser = (updateUserForm, id, querParam) => {
        updateUserForm.current.validateFields((err, values) => {
            if (!err) {
                values.id = id;
                this.props.updateItem(values, querParam);
            }
        });
    };
}


//修改表单组件
class UpdateUserForm extends PureComponent {

    render() {
        const {getFieldDecorator} = this.props.form;
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
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        initialValue: toCurOperRowObj ? toCurOperRowObj.email : "",
                        rules: [{
                            type: 'email', message: '邮箱格式不正确!',
                        }, {
                            required: true, message: '请输入邮箱!',
                        }],
                    })(
                        <Input placeholder="请输入邮箱"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        initialValue: toCurOperRowObj ? toCurOperRowObj.password : "",
                        rules: [{
                            required: true, message: '请输入密码!',
                        }],
                    })(
                        <Input placeholder="请输入密码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="昵称"
                >
                    {getFieldDecorator('nickName', {
                        initialValue: toCurOperRowObj ? toCurOperRowObj.nickName : "",
                        rules: [{
                            required: true, message: '请输入昵称!',
                        }],
                    })(
                        <Input placeholder="请输入昵称"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="优币"
                >
                    {getFieldDecorator('ewCoin', {
                        initialValue: toCurOperRowObj ? toCurOperRowObj.ewCoin : "",
                        rules: [{
                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: '只能输入数值格式'
                        }, {
                            required: true, message: '请输入优币!',
                        }]
                    })(
                        <Input placeholder="请输入优币"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}

//查看详细表单组件
class ViewDetailUserForm extends PureComponent {

    render() {
        return (
            <div>
                <ul className="detail-form">
                    <li>
                        <div className="detail-form-left">邮箱 :</div>
                        <div className="detail-form-content">{toCurOperRowObj.email}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">密码 :</div>
                        <div className="detail-form-content">{toCurOperRowObj.password}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">昵称 :</div>
                        <div className="detail-form-content">{toCurOperRowObj.nickName}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">优币 :</div>
                        <div className="detail-form-content">{toCurOperRowObj.ewCoin}</div>
                    </li>
                </ul>
            </div>
        );
    }
}


UpdateUserForm = Form.create({})(UpdateUserForm);

const mapState = (state) => ({
    userList: state.get("userSettingReducer").get("userList"),
    selectIds: state.get("userSettingReducer").get("selectIds"),
    pageIndex: state.get("userSettingReducer").get("pageIndex"),
    totalSize: state.get("userSettingReducer").get("totalSize"),
    queryObj: state.get("userSettingReducer").get("queryObj"),
    showAddUserModal: state.get("userSettingReducer").get("showAddUserModal"),
    showViewUserModal: state.get("userSettingReducer").get("showViewUserModal"),
    showUpdateUserModal: state.get("userSettingReducer").get("showUpdateUserModal"),
    curOperRowObj: state.get("userSettingReducer").get("curOperRowObj")
});

const mapDispatchToProps = (dispatch) => ({
    //加载用户列表
    loadUserList() {
        dispatch(actionCreators.loadUserList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
    },
    //表格复选框change事件
    tableSelectChange(selectedRowKeys) {
        dispatch(actionCreators.tableSelectChange(selectedRowKeys));
    },
    //删除项事件
    delItem(selectDataIds, querParams) {
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
                dispatch(actionCreators.delItem(selectDataIds, querParams));
            }
        });

    },
    //表格分页change事件
    onShowSizeChange(current) {
        dispatch(actionCreators.loadUserList(current, querParams));
    },
    //查看单条记录的详情
    showViewModal(id) {
        dispatch(actionCreators.getDetailById(id, "view"));
    },
    //显示修改模态框
    showUpdateModal(id) {
        dispatch(actionCreators.getDetailById(id, "update"));
    },
    //修改操作
    updateItem(updateObj, queryObj) {
        dispatch(actionCreators.updateItem(updateObj, queryObj));
    },
    //条件查询表格
    filterForm(queryObj) {
        dispatch(actionCreators.filterForm(queryObj));
    },
    //重置表格
    resetLoadGrid() {
        dispatch(actionCreators.resetLoadGrid({}));
    },
    //是否显示添加用户模态框
    isShowAddUserModal(isShow) {
        dispatch(actionCreators.isShowAddUserModal(isShow));
    },
    //添加用户
    addUserOper(addUserObj, querParam) {
        dispatch(actionCreators.addUserOper(addUserObj, querParam));
    },
    //是否显示查看用户模态框
    isShowViewUserModal(isShow) {
        dispatch(actionCreators.isShowViewUserModal(isShow));
    },
    //是否显示修改用户模态框
    isShowUpdateUserModal(isShow) {
        dispatch(actionCreators.isShowUpdateUserModal(isShow));
    }
});

export default connect(mapState, mapDispatchToProps)(User);