import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table, Modal} from 'antd';
import FontList from '../../../../common/FontList'
import EditForm from '../../../../common/Form/EditForm';
import './index.css';
import {actionCreators} from "./store";
import * as StringConstants from "../../../../constant";
let goblaAddMenuForm;
let toCurOperRowObj = {};
const confirm = Modal.confirm;
//菜单管理组件
class Menu extends PureComponent {

    componentDidMount() {
        this.props.loadMenuList();
    }


    onRef = (ref) => {
        goblaAddMenuForm=ref;
        this.addMenuFormRef = ref;
        this.updateMenuFormRef = ref;
    };

    render() {
        const {menuList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showUpdateModal, isShowAddMenuModal, showAddMenuModal, showUpdateMenuModal, isShowUpdateMenuModal, curOperRowObj, showFontListModal, isShowFontListModal,clickFontItem} = this.props;
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
                         <Button type="primary" ghost onClick={() => showUpdateModal(record.id)}>修改</Button>
                    </span>
                ),
            }
        ];


        //添加表单的配置参数
        const addFormOptions = [
            {
                type: "input",
                lable: "菜单名称",
                placeholder: "菜单名称",
                width: "200px",
                field: "menuName",
                validate: [
                    {
                        required: true, message: '请输入菜单名称!',
                    }
                ]
            },
            {
                type: "input",
                lable: "菜单Url",
                placeholder: "菜单Url",
                width: "200px",
                field: "menuUrl",
                validate: [
                    {required: true, message: '请输入菜单Url!'}
                ]
            },
            {
                type: "input",
                lable: "菜单图标",
                placeholder: "菜单图标",
                width: "200px",
                field: "menuIcon",
                validate: [
                    {required: true, message: '请输入菜单图标!'}
                ],
                onFocus: () => () => {
                    isShowFontListModal(true);
                }
            },
            {
                type: "input",
                lable: "菜单排序号",
                placeholder: "菜单排序号",
                width: "200px",
                field: "menuSort",
                validate: [
                    {
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数值格式'
                    },
                    {
                        required: true, message: '请输入菜单排序号!',
                    }
                ]
            },
            {
                type: "tree",
                lable: "父菜单",
                placeholder: "父菜单",
                width: "200px",
                field: "parentId",
                treeList:menuDataList,
                validate: [
                    {
                        required: true, message: '请输入父菜单!',
                    }
                ]
            }
        ];
        //编辑表单的配置参数
        const updateFormOptions = [
            {
                type: "input",
                lable: "菜单名称",
                placeholder: "菜单名称",
                initialValue: toCurOperRowObj.menuName,
                width: "200px",
                field: "menuName",
                validate: [
                    {
                        required: true, message: '请输入菜单名称!',
                    }
                ]
            },
            {
                type: "input",
                lable: "菜单Url",
                placeholder: "菜单Url",
                width: "200px",
                field: "menuUrl",
                initialValue: toCurOperRowObj.menuUrl,
                validate: [
                    {required: true, message: '请输入菜单Url!'}
                ]
            },
            {
                type: "input",
                lable: "菜单图标",
                placeholder: "菜单图标",
                width: "200px",
                field: "menuIcon",
                initialValue: toCurOperRowObj.menuIcon,
                validate: [
                    {required: true, message: '请输入菜单图标!'}
                ],
                onFocus: () => () => {
                    isShowFontListModal(true);
                }
            },
            {
                type: "input",
                lable: "菜单排序号",
                placeholder: "菜单排序号",
                width: "200px",
                field: "menuSort",
                initialValue: toCurOperRowObj.menuSort,
                validate: [
                    {
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数值格式'
                    },
                    {
                        required: true, message: '请输入菜单排序号!',
                    }
                ]
            },
            {
                type: "tree",
                lable: "父菜单",
                placeholder: "父菜单",
                width: "200px",
                field: "parentId",
                treeList:menuDataList,
                initialValue: toCurOperRowObj.parentId,
                validate: [
                    {
                        required: true, message: '请输入父菜单!',
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
                        title="添加菜单"
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
                        title="修改菜单"
                        visible={showUpdateMenuModal}
                        onOk={() => this.updateMenuFormRef.updateFormValidate(toCurOperRowObj.id)}
                        onCancel={() => isShowUpdateMenuModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={updateFormOptions} editAction={this.props.updateItem}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="字体图标列表"
                        visible={showFontListModal}
                        width={1200}
                        onOk={() => {
                        }}
                        onCancel={() => isShowFontListModal(false)}
                        destroyOnClose
                    >
                        <FontList clickFontItem={clickFontItem}/>
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
    //加载菜单列表
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
                dispatch(actionCreators.delItem(selectDataIds,{}));
            }
        });

    },
    //表格分页change事件
    onShowSizeChange(current) {
        dispatch(actionCreators.loadMenuList(current));
    },
    //显示修改模态框
    showUpdateModal(id) {
        dispatch(actionCreators.getDetailById(id, "update"));
    },
    //修改操作
    updateItem(updateObj) {
        dispatch(actionCreators.updateItem(updateObj, {}));
    },
    //条件查询表格
    filterForm(queryObj) {
        dispatch(actionCreators.filterForm(queryObj));
    },
    //重置表格
    resetLoadGrid() {
        dispatch(actionCreators.resetLoadGrid({}));
    },
    //是否显示添加菜单模态框
    isShowAddMenuModal(isShow) {
        dispatch(actionCreators.isShowAddMenuModal(isShow));
    },
    //添加菜单
    addMenuOper(addMenuObj) {
        dispatch(actionCreators.addMenuOper(addMenuObj,{}));
    },
    //是否显示修改菜单模态框
    isShowUpdateMenuModal(isShow) {
        dispatch(actionCreators.isShowUpdateMenuModal(isShow));
    },
    clickFontItem(prev,icon){
        dispatch(actionCreators.isShowFontListModal(false));
        let iconName = prev+","+icon;
        goblaAddMenuForm.props.form.setFieldsValue({"menuIcon":iconName});
    }
});

export default connect(mapState, mapDispatchToProps, null, {withRef: true})(Menu);