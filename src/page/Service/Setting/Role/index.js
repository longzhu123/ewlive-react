import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table, Modal, Tree} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";

const confirm = Modal.confirm;
const {TreeNode} = Tree;
let querParams = {};
let toCurOperRowObj = {};

//角色管理组件
class Role extends PureComponent {

    componentDidMount() {
        this.props.loadUserRoleList();
    }

    onRef = (ref) => {
        this.addUserRoleFormRef = ref;
        this.updateUserRoleFormRef = ref;
    };

    render() {
        const {userRoleList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showViewModal, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddUserRoleModal, showAddUserRoleModal, showViewUserRoleModal, showUpdateUserRoleModal, isShowViewUserRoleModal, isShowUpdateUserRoleModal, curOperRowObj, showRoleMenuSettingModal, showViewMenuSettingModal, isShowMenuSettingModal, roleMenuList, menuTreeCheck,roleMenuCheckKeys,curRoleMenuRealCheckData,confirmRoleMenuSetting} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
        const userRoleDataList = userRoleList.toJS();
        const selectDataIds = selectIds.toJS();
        const roleMenuTreeData = roleMenuList.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                align: "center"
            }, {
                title: '操作',
                key: 'control',
                align: "center",
                render: (text, record) => (
                    <span className='control-container'>
                         <Button type="primary" ghost onClick={() => showViewModal(record.id)}>查看</Button>
                         <Button type="primary" ghost onClick={() => showUpdateModal(record.id)}>修改</Button>
                        <Button type="primary" ghost onClick={() => showViewMenuSettingModal(record.id)}>菜单设置</Button>
                    </span>
                ),
            }
        ];
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "角色名称",
                placeholder: "角色名称",
                width: "200px",
                field: "roleName"
            }
        ];

        //详细的配置参数
        const viewOptions = [
            {
                type: "text",
                lable: "角色名称",
                field: "roleName"
            }
        ];


        //添加表单的配置参数
        const addFormOptions = [
            {
                type: "input",
                lable: "角色名称",
                placeholder: "角色名称",
                width: "200px",
                field: "roleName",
                validate: [
                    {
                        required: true, message: '请输入角色名称!',
                    }
                ]
            }
        ];
        //编辑表单的配置参数
        const updateFormOptions = [
            {
                type: "input",
                lable: "角色名称",
                placeholder: "角色名称",
                width: "200px",
                field: "roleName",
                initialValue: toCurOperRowObj.roleName,
                validate: [
                    {
                        required: true, message: '请输入角色名称!',
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
                                onClick={() => isShowAddUserRoleModal(true)}>添加</Button>
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
                        dataSource={userRoleDataList}
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
                        title="添加角色"
                        visible={showAddUserRoleModal}
                        onOk={() => {
                            this.addUserRoleFormRef.addFormValidate(querParams)
                        }}
                        onCancel={() => isShowAddUserRoleModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions} editAction={this.props.addUserRoleOper}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看角色"
                        visible={showViewUserRoleModal}
                        onCancel={() => isShowViewUserRoleModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改角色"
                        visible={showUpdateUserRoleModal}
                        onOk={() => this.updateUserRoleFormRef.updateFormValidate(toCurOperRowObj.id, querParams)}
                        onCancel={() => isShowUpdateUserRoleModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={updateFormOptions} editAction={this.props.updateItem}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="菜单设置"
                        height="600"
                        visible={showRoleMenuSettingModal}
                        onOk={() => confirmRoleMenuSetting(toCurOperRowObj.id,roleMenuCheckKeys.toJS())}
                        onCancel={() => isShowMenuSettingModal(false)}
                        destroyOnClose
                    >
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            onCheck={menuTreeCheck}
                            defaultCheckedKeys={curRoleMenuRealCheckData.toJS()}
                        >
                            {
                                this.renderMenuTreeNodes(roleMenuTreeData)
                            }
                        </Tree>
                    </Modal>
                </div>
            </div>
        )

    }


    renderMenuTreeNodes = (data) => {
        return data.map(item => {
            if (!item.children) {
                return (
                    <TreeNode title={item.menuName} key={item.id}/>
                )
            } else {
                return (
                    <TreeNode title={item.menuName} key={item.id}>
                        {this.renderMenuTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
    };


}


const mapState = (state) => ({
    userRoleList: state.get("userRoleSettingReducer").get("userRoleList"),
    selectIds: state.get("userRoleSettingReducer").get("selectIds"),
    pageIndex: state.get("userRoleSettingReducer").get("pageIndex"),
    totalSize: state.get("userRoleSettingReducer").get("totalSize"),
    queryObj: state.get("userRoleSettingReducer").get("queryObj"),
    showAddUserRoleModal: state.get("userRoleSettingReducer").get("showAddUserRoleModal"),
    showViewUserRoleModal: state.get("userRoleSettingReducer").get("showViewUserRoleModal"),
    showUpdateUserRoleModal: state.get("userRoleSettingReducer").get("showUpdateUserRoleModal"),
    curOperRowObj: state.get("userRoleSettingReducer").get("curOperRowObj"),
    showRoleMenuSettingModal: state.get("userRoleSettingReducer").get("showRoleMenuSettingModal"),
    roleMenuList: state.get("userRoleSettingReducer").get("roleMenuList"),
    roleMenuCheckKeys: state.get("userRoleSettingReducer").get("roleMenuCheckKeys"),
    curRoleMenuRealCheckData: state.get("userRoleSettingReducer").get("curRoleMenuRealCheckData")
});

const mapDispatchToProps = (dispatch) => ({
    //加载角色列表
    loadUserRoleList() {
        dispatch(actionCreators.loadUserRoleList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadUserRoleList(current, querParams));
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
    //是否显示添加角色模态框
    isShowAddUserRoleModal(isShow) {
        dispatch(actionCreators.isShowAddUserRoleModal(isShow));
    },
    //添加角色
    addUserRoleOper(addUserRoleObj, querParam) {
        dispatch(actionCreators.addUserRoleOper(addUserRoleObj, querParam));
    },
    //是否显示查看角色模态框
    isShowViewUserRoleModal(isShow) {
        dispatch(actionCreators.isShowViewUserRoleModal(isShow));
    },
    //是否显示修改角色模态框
    isShowUpdateUserRoleModal(isShow) {
        dispatch(actionCreators.isShowUpdateUserRoleModal(isShow));
    },
    //是否显示菜单设置模态框
    isShowMenuSettingModal(isShow) {
        dispatch(actionCreators.isShowMenuSettingModal(isShow));
    },
    //菜单设置按钮Click事件
    showViewMenuSettingModal(id) {
        dispatch(actionCreators.showViewMenuSettingModal(id));
    },
    //菜单Tree复选框选中事件
    menuTreeCheck(checkedKeys, e) {
        dispatch(actionCreators.menuTreeCheck(checkedKeys,e));
    },
    //菜单设置模态框设置event
    confirmRoleMenuSetting(id,checkedKeys){
        dispatch(actionCreators.confirmRoleMenuSetting(id,checkedKeys));
    }
});

export default connect(mapState, mapDispatchToProps)(Role);