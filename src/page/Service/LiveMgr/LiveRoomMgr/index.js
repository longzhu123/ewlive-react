import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card, Icon, Modal, Table} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";

const confirm = Modal.confirm;
let querParams = {};

//操作日志管理组件
class LiveRoomMgr extends PureComponent {

    componentDidMount() {
        this.props.loadLogOperateList();
    }

    render() {
        const {logOperateList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, filterForm, queryObj, resetLoadGrid} = this.props;
        querParams = queryObj.toJS();
        const logOperateDataList = logOperateList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: 'IP',
                dataIndex: 'ip',
                align: "center"
            }, {
                title: '操作内容',
                dataIndex: 'operContent',
                align: "center"
            }, {
                title: '操作耗时',
                dataIndex: 'taskTimeSpan',
                align: "center"
            }
            , {
                title: '操作',
                key: 'control',
                align: "center"
            }
        ];
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "IP",
                placeholder: "IP",
                width: "200px",
                field: "ip"
            },
            {
                type: "input",
                lable: "操作内容",
                placeholder: "操作内容",
                width: "200px",
                field: "operContent"
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
                        dataSource={logOperateDataList}
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




            </div>
        )

    }

}


const mapState = (state) => ({
    logOperateList: state.get("liveRoomMgrReducer").get("logOperateList"),
    selectIds: state.get("liveRoomMgrReducer").get("selectIds"),
    pageIndex: state.get("liveRoomMgrReducer").get("pageIndex"),
    totalSize: state.get("liveRoomMgrReducer").get("totalSize"),
    queryObj: state.get("liveRoomMgrReducer").get("queryObj")
});

const mapDispatchToProps = (dispatch) => ({
    //加载操作日志列表
    loadLogOperateList() {
        dispatch(actionCreators.loadLogOperateList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadLogOperateList(current, querParams));
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
    }

});

export default connect(mapState, mapDispatchToProps)(LiveRoomMgr);