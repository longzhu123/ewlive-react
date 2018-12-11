import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table} from 'antd';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import {Modal} from "antd";

const confirm = Modal.confirm;
let querParams = {};
let toCurOperRowObj = {};


//字典项管理组件
class DicItem extends PureComponent {

    componentDidMount() {
        this.props.loadDicItemList();
    }

    onRef = (ref) => {
        this.addDicItemFormRef = ref;
        this.updateDicItemFormRef = ref;
    };

    render() {
        const {dicItemList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddDicItemModal, showAddDicItemModal, showViewDicItemModal, showUpdateDicItemModal, isShowViewDicItemModal, isShowUpdateDicItemModal, curOperRowObj} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
        const dicItemDataList = dicItemList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '字典项编码',
                dataIndex: 'dicItemItemCode',
                align: "center"
            },
            {
                title: '字典项名称',
                dataIndex: 'dicItemItemName',
                align: "center"
            },
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

        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "字典名称",
                placeholder: "字典名称",
                width: "200px",
                field: "dicItemName"
            }
        ];

        //详细的配置参数
        const viewOptions = [
            {
                type: "text",
                lable: "字典名称",
                field: "dicItemName"
            }
        ];

        //添加表单的配置参数
        const addFormOptions = [
            {
                type: "input",
                lable: "字典名称",
                placeholder: "字典名称",
                width: "200px",
                field: "dicItemName",
                validate: [
                    {required: true, message: '请输入字典名称!'}
                ]
            }
        ];

        //编辑表单的配置参数
        const updateFormOptions = [
            {
                type: "input",
                lable: "字典名称",
                placeholder: "字典名称",
                width: "200px",
                field: "dicItemName",
                initialValue: toCurOperRowObj.dicItemName,
                validate: [
                    {required: true, message: '请输入字典名称!'}
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
                                onClick={() => isShowAddDicItemModal(true)}>添加</Button>
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
                        dataSource={dicItemDataList}
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
                        title="添加字典"
                        visible={showAddDicItemModal}
                        onOk={() => {
                            this.addDicItemFormRef.addFormValidate(querParams)
                        }}
                        onCancel={() => isShowAddDicItemModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions} editAction={this.props.addDicItemOper}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="字典项设置"
                        visible={showViewDicItemModal}
                        onCancel={() => isShowViewDicItemModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改字典"
                        visible={showUpdateDicItemModal}
                        onOk={() => this.updateDicItemFormRef.updateFormValidate(toCurOperRowObj.id, querParams)}
                        onCancel={() => isShowUpdateDicItemModal(false)}
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
    dicItemList: state.get("dicItemSettingReducer").get("dicItemList"),
    selectIds: state.get("dicItemSettingReducer").get("selectIds"),
    pageIndex: state.get("dicItemSettingReducer").get("pageIndex"),
    totalSize: state.get("dicItemSettingReducer").get("totalSize"),
    queryObj: state.get("dicItemSettingReducer").get("queryObj"),
    showAddDicItemModal: state.get("dicItemSettingReducer").get("showAddDicItemModal"),
    showViewDicItemModal: state.get("dicItemSettingReducer").get("showViewDicItemModal"),
    showUpdateDicItemModal: state.get("dicItemSettingReducer").get("showUpdateDicItemModal"),
    curOperRowObj: state.get("dicItemSettingReducer").get("curOperRowObj"),
    showViewDicItemModal: state.get("dicItemSettingReducer").get("showViewDicItemModal"),
    dicItemItemList: state.get("dicItemSettingReducer").get("dicItemItemList"),
    dicItemItemCurrent: state.get("dicItemSettingReducer").get("dicItemItemCurrent"),
    dicItemItemTotal: state.get("dicItemSettingReducer").get("dicItemItemTotal")
});

const mapDispatchToProps = (dispatch) => ({
    //加载字典项列表
    loadDicItemList() {
        dispatch(actionCreators.loadDicItemList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadDicItemList(current, querParams));
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
    //是否显示添加字典模态框
    isShowAddDicItemModal(isShow) {
        dispatch(actionCreators.isShowAddDicItemModal(isShow));
    },
    //添加字典
    addDicItemOper(addDicItemObj, querParam) {
        dispatch(actionCreators.addDicItemOper(addDicItemObj, querParam));
    },
    //是否显示修改字典模态框
    isShowUpdateDicItemModal(isShow) {
        dispatch(actionCreators.isShowUpdateDicItemModal(isShow));
    }
});

export default connect(mapState, mapDispatchToProps)(DicItem);