import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table,Modal} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import './index.css';
import {actionCreators} from "./store";
import * as StringConstants from "../../../../constant";

let toCurOperRowObj = {};
const confirm = Modal.confirm;

//菜单管理组件
class Menu extends PureComponent {

    componentDidMount() {
        this.props.loadMenuList();
    }

    onRef = (ref) => {
        this.addMenuFormRef = ref;
        this.updateMenuFormRef = ref;
    };

    render() {
        const {menuList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showViewModal, showUpdateModal, filterForm, resetLoadGrid, isShowAddMenuModal, showAddMenuModal, showViewMenuModal, showUpdateMenuModal, isShowViewMenuModal, isShowUpdateMenuModal, curOperRowObj} = this.props;
        toCurOperRowObj = curOperRowObj.toJS();
        const menuDataList = menuList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '菜单名称',
                dataIndex: 'menuName',
                align: "center"
            }, {
                title: '菜单Url',
                dataIndex: 'menuUrl',
                align: "center"
            },
            {
                title: '菜单图标',
                dataIndex: 'menuIcon',
                align: "center"
            },
            {
                title: '排序号',
                dataIndex: 'menuSort',
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
                    </span>
                ),
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
                    <div>
                        <Button type="primary" icon="plus" style={{marginRight: '10px'}}
                                onClick={() => isShowAddMenuModal(true)}>添加</Button>
                        <button className="ant-btn delBtn" onClick={() => delItem(selectDataIds)}><Icon
                            type="delete"/>删除
                        </button>
                    </div>
                    <br/>
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={menuDataList}
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
                        visible={showAddMenuModal}
                        onOk={() => {
                            this.addMenuFormRef.addFormValidate()
                        }}
                        onCancel={() => isShowAddMenuModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions} editAction={this.props.addMenuOper}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看用户"
                        visible={showViewMenuModal}
                        onCancel={() => isShowViewMenuModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改用户"
                        visible={showUpdateMenuModal}
                        onOk={() => this.updateMenuFormRef.updateFormValidate(toCurOperRowObj.id)}
                        onCancel={() => isShowUpdateMenuModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={updateFormOptions} editAction={this.props.updateItem}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>

            </div>
        )

    }
}


const mapState = (state) => ({
    showFontListModal: state.get("menuSettingReducer").get("showFontListModal"),
    menuList: state.get("menuSettingReducer").get("menuList"),
    selectIds: state.get("menuSettingReducer").get("selectIds"),
    pageIndex: state.get("menuSettingReducer").get("pageIndex"),
    totalSize: state.get("menuSettingReducer").get("totalSize"),
    queryObj: state.get("menuSettingReducer").get("queryObj"),
    showAddMenuModal: state.get("menuSettingReducer").get("showAddMenuModal"),
    showViewMenuModal: state.get("menuSettingReducer").get("showViewMenuModal"),
    showUpdateMenuModal: state.get("menuSettingReducer").get("showUpdateMenuModal"),
    curOperRowObj: state.get("menuSettingReducer").get("curOperRowObj")
});

const mapDispatchToProps = (dispatch) => ({
    //是否显示字体图标列表
    isShowFontListModal(isShow) {
        dispatch(actionCreators.isShowFontListModal(isShow));
    },
    //加载用户列表
    loadMenuList() {
        dispatch(actionCreators.loadMenuList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadMenuList(current));
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
    isShowAddMenuModal(isShow) {
        dispatch(actionCreators.isShowAddMenuModal(isShow));
    },
    //添加用户
    addMenuOper(addMenuObj) {
        dispatch(actionCreators.addMenuOper(addMenuObj));
    },
    //是否显示查看用户模态框
    isShowViewMenuModal(isShow) {
        dispatch(actionCreators.isShowViewMenuModal(isShow));
    },
    //是否显示修改用户模态框
    isShowUpdateMenuModal(isShow) {
        dispatch(actionCreators.isShowUpdateMenuModal(isShow));
    }
});

export default connect(mapState, mapDispatchToProps)(Menu);