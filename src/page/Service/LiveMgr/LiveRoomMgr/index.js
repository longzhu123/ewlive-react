import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Icon, Table, Modal} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import ViewForm from '../../../../common/Form/ViewForm';
import EditForm from '../../../../common/Form/EditForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";

const confirm = Modal.confirm;
let querParams = {};
let toCurOperRowObj = {};

//直播房间信息管理组件
class LiveRoomInfo extends PureComponent {

    componentDidMount() {
        this.props.loadLiveRoomInfoList();
        this.props.loadPlayStateSelectList();
    }

    onRef = (ref) => {
        this.addLiveRoomInfoFormRef = ref;
        this.updateLiveRoomInfoFormRef = ref;
    };

    render() {
        const {liveRoomInfoList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, showViewModal, showUpdateModal, filterForm, queryObj, resetLoadGrid, isShowAddLiveRoomInfoModal, showAddLiveRoomInfoModal, showViewLiveRoomInfoModal, showUpdateLiveRoomInfoModal, isShowViewLiveRoomInfoModal, isShowUpdateLiveRoomInfoModal, curOperRowObj, playStateSelectList} = this.props;
        querParams = queryObj.toJS();
        toCurOperRowObj = curOperRowObj.toJS();
        const liveRoomInfoDataList = liveRoomInfoList.toJS();
        const playStateDropList = playStateSelectList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '房间名称',
                dataIndex: 'roomName',
                align: "center"
            },
            {
                title: '开播时间',
                dataIndex: 'playTime',
                align: "center"
            }, {
                title: '开播状态',
                dataIndex: 'playStateDesc',
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
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "房间名称",
                placeholder: "房间名称",
                width: "200px",
                field: "roomName"
            },
            {
                type: "select",
                lable: "开播状态",
                placeholder: "开播状态",
                width: "200px",
                field: "playState",
                list: playStateDropList
            },
            {
                type: "date",
                lable: "开播时间",
                placeholder: "开播时间",
                width: "200px",
                field: "searchPlayTime"
            }
        ];

        //详细的配置参数
        const viewOptions = [
            {
                type: "text",
                lable: "房间名称",
                field: "roomName"
            },
            {
                type: "text",
                lable: "开播状态",
                field: "playStateDesc"
            },
            {
                type: "text",
                lable: "开播时间",
                field: "playTime"
            },
            {
                type: "text",
                lable: "备注",
                field: "comment"
            }
        ];


        //添加表单的配置参数
        const addFormOptions = [
            {
                type: "input",
                lable: "房间名称",
                placeholder: "房间名称",
                width: "200px",
                field: "roomName",
                validate: [
                    {
                        required: true, message: '请输入房间名称!',
                    }
                ]
            },
            {
                type: "select",
                lable: "开播状态",
                placeholder: "开播状态",
                width: "200px",
                field: "playState",
                list: playStateDropList,
                validate: [
                    {required: true, message: '请输入开播状态!'}
                ]
            },
            {
                type: "date",
                lable: "开播时间",
                placeholder: "开播时间",
                width: "200px",
                field: "playTime",
                validate: [
                    {required: true, message: '请输入开播时间!'}
                ]
            },
            {
                type: "file",
                lable: "房间封面",
                placeholder: "房间封面",
                width: "200px",
                field: "roomImg",
                validate: [
                    {required: true, message: '请输入房间封面!'}
                ]
            },
            {
                type: "textarea",
                lable: "备注",
                placeholder: "备注",
                width: "200px",
                field: "comment",
                validate: [
                    {required: true, message: '请输入备注!'}
                ]
            }

        ];
        //编辑表单的配置参数
        const updateFormOptions = [
            {
                type: "input",
                lable: "房间名称",
                placeholder: "房间名称",
                width: "200px",
                field: "roomName",
                initialValue: toCurOperRowObj.roomName,
                validate: [
                    {
                        required: true, message: '请输入房间名称!',
                    }
                ]
            },
            {
                type: "select",
                lable: "开播状态",
                placeholder: "开播状态",
                width: "200px",
                field: "playState",
                initialValue: toCurOperRowObj.playState,
                list: playStateDropList,
                validate: [
                    {required: true, message: '请输入开播状态!'}
                ]
            },
            {
                type: "date",
                lable: "开播时间",
                placeholder: "开播时间",
                width: "200px",
                field: "playTime",
                initialValue: toCurOperRowObj.playTime,
                validate: [
                    {
                        required: true, message: '请输入开播时间!',
                    }
                ]
            },
            {
                type: "textarea",
                lable: "备注",
                placeholder: "备注",
                width: "200px",
                field: "comment",
                initialValue: toCurOperRowObj.comment,
                validate: [
                    {
                        required: true, message: '请输入备注!',
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
                                onClick={() => isShowAddLiveRoomInfoModal(true)}>添加</Button>
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
                        dataSource={liveRoomInfoDataList}
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
                        title="添加直播房间信息"
                        visible={showAddLiveRoomInfoModal}
                        onOk={() => {
                            this.addLiveRoomInfoFormRef.addFormValidate(querParams)
                        }}
                        onCancel={() => isShowAddLiveRoomInfoModal(false)}
                        destroyOnClose
                    >
                        <EditForm editFormOption={addFormOptions} editAction={this.props.addLiveRoomInfoOper}
                                  onRef={this.onRef}/>
                    </Modal>
                </div>


                <div>
                    <Modal
                        title="查看直播房间信息"
                        visible={showViewLiveRoomInfoModal}
                        onCancel={() => isShowViewLiveRoomInfoModal(false)}
                        destroyOnClose
                    >
                        <ViewForm viewOptions={viewOptions} viewData={toCurOperRowObj}/>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="修改直播房间信息"
                        visible={showUpdateLiveRoomInfoModal}
                        onOk={() => this.updateLiveRoomInfoFormRef.updateFormValidate(toCurOperRowObj.id, querParams)}
                        onCancel={() => isShowUpdateLiveRoomInfoModal(false)}
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
    liveRoomInfoList: state.get("liveRoomMgrReducer").get("liveRoomInfoList"),
    selectIds: state.get("liveRoomMgrReducer").get("selectIds"),
    pageIndex: state.get("liveRoomMgrReducer").get("pageIndex"),
    totalSize: state.get("liveRoomMgrReducer").get("totalSize"),
    queryObj: state.get("liveRoomMgrReducer").get("queryObj"),
    showAddLiveRoomInfoModal: state.get("liveRoomMgrReducer").get("showAddLiveRoomInfoModal"),
    showViewLiveRoomInfoModal: state.get("liveRoomMgrReducer").get("showViewLiveRoomInfoModal"),
    showUpdateLiveRoomInfoModal: state.get("liveRoomMgrReducer").get("showUpdateLiveRoomInfoModal"),
    curOperRowObj: state.get("liveRoomMgrReducer").get("curOperRowObj"),
    playStateSelectList: state.get("liveRoomMgrReducer").get("playStateSelectList")
});

const mapDispatchToProps = (dispatch) => ({
    //加载直播房间信息列表
    loadLiveRoomInfoList() {
        dispatch(actionCreators.loadLiveRoomInfoList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadLiveRoomInfoList(current, querParams));
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
    //是否显示添加直播房间信息模态框
    isShowAddLiveRoomInfoModal(isShow) {
        dispatch(actionCreators.isShowAddLiveRoomInfoModal(isShow));
    },
    //添加直播房间信息
    addLiveRoomInfoOper(addLiveRoomInfoObj, querParam) {
        dispatch(actionCreators.addLiveRoomInfoOper(addLiveRoomInfoObj, querParam));
    },
    //是否显示查看直播房间信息模态框
    isShowViewLiveRoomInfoModal(isShow) {
        dispatch(actionCreators.isShowViewLiveRoomInfoModal(isShow));
    },
    //是否显示修改直播房间信息模态框
    isShowUpdateLiveRoomInfoModal(isShow) {
        dispatch(actionCreators.isShowUpdateLiveRoomInfoModal(isShow));
    },
    //加载开播状态的下拉list
    loadPlayStateSelectList() {
        dispatch(actionCreators.loadPlayStateSelectList("4783fd16d2bc4015be3f35e60f970c87"));
    }
});

export default connect(mapState, mapDispatchToProps)(LiveRoomInfo);