import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import {Modal} from "antd";

const confirm = Modal.confirm;
let querParams = {};
let toCurOperRowObj = {};


//字典管理组件
class Dic extends PureComponent {

    componentDidMount() {
        this.props.loadDicList();
    }

    onRef = (ref) => {
        this.addDicFormRef= ref;
        this.updateDicFormRef=ref;
    };

    render() {
        const {dicList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showDicItemSettingModal, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddDicModal, showAddDicModal, showViewDicModal, showUpdateDicModal, isShowViewDicModal, isShowUpdateDicModal, curOperRowObj} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
        const dicDataList = dicList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '字典名称',
                dataIndex: 'dicName',
                align: "center"
            }
            , {
                title: '操作',
                key: 'control',
                align: "center",
                render: (text, record) => (
                    <span className='control-container'>
                        <Button type="primary" ghost onClick={() => showUpdateModal(record.id)}>修改</Button>
                        <Button type="primary" ghost onClick={() => showDicItemSettingModal(record.id)}>字典项设置</Button>
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
                field: "dicName"
            }
        ];

        //详细的配置参数
        const viewOptions = [
            {
                type:"text",
                lable:"字典名称",
                field:"dicName"
            }
        ];

        //添加表单的配置参数
        const addFormOptions = [
            {
                type: "input",
                lable: "字典名称",
                placeholder: "字典名称",
                width: "200px",
                field: "dicName",
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
                field: "dicName",
                initialValue:toCurOperRowObj.dicName,
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
                                onClick={() => isShowAddDicModal(true)}>添加</Button>
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
                        dataSource={dicDataList}
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
                        visible={showAddDicModal}
                        onOk={()=>{this.addDicFormRef.addFormValidate(querParams)}}
                        onCancel={() => isShowAddDicModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions}  editAction={this.props.addDicOper} onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看字典"
                        visible={showViewDicModal}
                        onCancel={() => isShowViewDicModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改字典"
                        visible={showUpdateDicModal}
                        onOk={() =>this.updateDicFormRef.updateFormValidate(toCurOperRowObj.id,querParams)}
                        onCancel={() => isShowUpdateDicModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={updateFormOptions} editAction={this.props.updateItem} onRef={this.onRef}/>
                    </Modal>
                </div>
            </div>
        )

    }


}
const mapState = (state) => ({
    dicList: state.get("dicSettingReducer").get("dicList"),
    selectIds: state.get("dicSettingReducer").get("selectIds"),
    pageIndex: state.get("dicSettingReducer").get("pageIndex"),
    totalSize: state.get("dicSettingReducer").get("totalSize"),
    queryObj: state.get("dicSettingReducer").get("queryObj"),
    showAddDicModal: state.get("dicSettingReducer").get("showAddDicModal"),
    showViewDicModal: state.get("dicSettingReducer").get("showViewDicModal"),
    showUpdateDicModal: state.get("dicSettingReducer").get("showUpdateDicModal"),
    curOperRowObj: state.get("dicSettingReducer").get("curOperRowObj")
});

const mapDispatchToProps = (dispatch) => ({
//加载用户列表
    loadDicList() {
        dispatch(actionCreators.loadDicList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadDicList(current, querParams));
    },
    //显示字典项设置的模态框
    showDicItemSettingModal(id) {
        let queryParams = {dicId:id,current:1,size:StringConstants.PAGE_SIZE};
        dispatch(actionCreators.getDicItemById(queryParams));
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
    isShowAddDicModal(isShow) {
        dispatch(actionCreators.isShowAddDicModal(isShow));
    },
    //添加用户
    addDicOper(addDicObj, querParam) {
        dispatch(actionCreators.addDicOper(addDicObj, querParam));
    },
    //是否显示查看用户模态框
    isShowViewDicModal(isShow) {
        dispatch(actionCreators.isShowViewDicModal(isShow));
    },
    //是否显示修改用户模态框
    isShowUpdateDicModal(isShow) {
        dispatch(actionCreators.isShowUpdateDicModal(isShow));
    }
});

export default connect(mapState, mapDispatchToProps)(Dic);