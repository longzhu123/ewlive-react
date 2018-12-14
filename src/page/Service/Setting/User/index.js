import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import {Modal, Tree} from "antd";

const confirm = Modal.confirm;
const {TreeNode} = Tree;
let querParams = {};
let toCurOperRowObj = {};

//用户管理组件
class User extends PureComponent {

    componentDidMount() {
        this.props.loadUserList();
    }

    onRef = (ref) => {
        this.addUserFormRef = ref;
        this.updateUserFormRef = ref;
    };

    render() {
        const {userList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showViewModal, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddUserModal, showAddUserModal, showViewUserModal, showUpdateUserModal, isShowViewUserModal, isShowUpdateUserModal, curOperRowObj, showUserRoleModal, isShowUserRoleModal, showViewUserRoleModal, userRoleList} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
        const userDataList = userList.toJS();
        const selectDataIds = selectIds.toJS();
        const roleTreeData = userRoleList.toJS();
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
                         <Button type="primary" ghost onClick={() => showViewModal(record.id)}>查看</Button>
                         <Button type="primary" ghost onClick={() => showUpdateModal(record.id)}>修改</Button>
                        <Button type="primary" ghost onClick={() => showUserRoleModal(record.id)}>角色设置</Button>
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

        //详细的配置参数
        const viewOptions = [
            {
                type: "text",
                lable: "邮箱",
                field: "email"
            },
            {
                type: "text",
                lable: "昵称",
                field: "nickName"
            },
            {
                type: "text",
                lable: "优币",
                field: "ewCoin"
            }
        ];


        //添加表单的配置参数
        const addFormOptions = [
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
        //编辑表单的配置参数
        const updateFormOptions = [
            {
                type: "input",
                lable: "邮箱",
                placeholder: "邮箱",
                width: "200px",
                field: "email",
                initialValue: toCurOperRowObj.email,
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
                initialValue: toCurOperRowObj.password,
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
                initialValue: toCurOperRowObj.nickName,
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
                initialValue: toCurOperRowObj.ewCoin,
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
                        onOk={() => {
                            this.addUserFormRef.addFormValidate(querParams)
                        }}
                        onCancel={() => isShowAddUserModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions} editAction={this.props.addUserOper}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看用户"
                        visible={showViewUserModal}
                        onCancel={() => isShowViewUserModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改用户"
                        visible={showUpdateUserModal}
                        onOk={() => this.updateUserFormRef.updateFormValidate(toCurOperRowObj.id, querParams)}
                        onCancel={() => isShowUpdateUserModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={updateFormOptions} editAction={this.props.updateItem}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="角色设置"
                        visible={showViewUserRoleModal}
                        onOk={() => isShowUserRoleModal(true)}
                        onCancel={() => isShowUserRoleModal(false)}
                        destroyOnClose
                    >
                        <Tree
                            checkable
                            defaultExpandAll={true}
                        >

                            {
                                this.renderRoleTreeNodes([
                                    {
                                        "id": "13110730be5b4a25a84c584d4449d0ff\n",
                                        "roleName": "角色列表",
                                        "children": roleTreeData
                                    }
                                ])
                            }
                        </Tree>
                    </Modal>
                </div>
            </div>
        )

    }

    renderRoleTreeNodes = (data) =>{
        return data.map(item => {
            if (!item.children) {
                return (
                    <TreeNode title={item.roleName} key={item.id} />
                )
            } else {
                return (
                    <TreeNode title={item.roleName} key={item.id}>
                        {this.renderRoleTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
    };

}


const mapState = (state) => ({
    userList: state.get("userSettingReducer").get("userList"),
    selectIds: state.get("userSettingReducer").get("selectIds"),
    pageIndex: state.get("userSettingReducer").get("pageIndex"),
    totalSize: state.get("userSettingReducer").get("totalSize"),
    queryObj: state.get("userSettingReducer").get("queryObj"),
    showAddUserModal: state.get("userSettingReducer").get("showAddUserModal"),
    showViewUserModal: state.get("userSettingReducer").get("showViewUserModal"),
    showUpdateUserModal: state.get("userSettingReducer").get("showUpdateUserModal"),
    curOperRowObj: state.get("userSettingReducer").get("curOperRowObj"),
    showViewUserRoleModal: state.get("userSettingReducer").get("showViewUserRoleModal"),
    userRoleList: state.get("userSettingReducer").get("userRoleList"),
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
    },
    //是否显示角色设置模态框
    isShowUserRoleModal(isShow) {
        alert(1);
        dispatch(actionCreators.isShowUserRoleModal(isShow));
    },
    //角色设置的click事件
    showUserRoleModal(id) {
        dispatch(actionCreators.showUserRoleModal(id));
    }
});

export default connect(mapState, mapDispatchToProps)(User);