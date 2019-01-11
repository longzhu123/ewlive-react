import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card, Icon, Modal, Table} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";

const confirm = Modal.confirm;
let querParams = {};

//异常日志管理组件
class LogError extends PureComponent {

    componentDidMount() {
        this.props.loadLogErrorList();
    }

    render() {
        const {logErrorList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, filterForm, queryObj, resetLoadGrid} = this.props;
        querParams = queryObj.toJS();
        const logErrorDataList = logErrorList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '异常方法',
                dataIndex: 'function',
                align: "center"
            }, {
                title: 'funDescription',
                dataIndex: '方法描述',
                align: "center"
            }, {
                title: '请求人',
                dataIndex: 'reqPerson',
                align: "center"
            },
             {
                title: '请求IP',
                dataIndex: 'reqIp',
                align: "center"
            },
            {
                title: '请求参数',
                dataIndex: 'reqParams',
                align: "center"
            },
            {
                title: '异常信息',
                dataIndex: 'errorMsg',
                align: "center"
            }
        ];
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "异常方法",
                placeholder: "异常方法",
                width: "100px",
                field: "function"
            },
            {
                type: "input",
                lable: "方法描述",
                placeholder: "方法描述",
                width: "100px",
                field: "funDescription"
            },
            {
                type: "input",
                lable: "请求人",
                placeholder: "请求人",
                width: "100px",
                field: "reqPerson"
            },
            {
                type: "input",
                lable: "请求IP",
                placeholder: "请求IP",
                width: "100px",
                field: "reqIp"
            },
            {
                type: "input",
                lable: "请求参数",
                placeholder: "请求参数",
                width: "100px",
                field: "reqParams"
            },
            {
                type: "input",
                lable: "异常信息",
                placeholder: "异常信息",
                width: "100px",
                field: "errorMsg"
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
                        dataSource={logErrorDataList}
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
    logErrorList: state.get("logErrorReducer").get("logErrorList"),
    selectIds: state.get("logErrorReducer").get("selectIds"),
    pageIndex: state.get("logErrorReducer").get("pageIndex"),
    totalSize: state.get("logErrorReducer").get("totalSize"),
    queryObj: state.get("logErrorReducer").get("queryObj"),
});

const mapDispatchToProps = (dispatch) => ({
    //加载异常日志列表
    loadLogErrorList() {
        dispatch(actionCreators.loadLogErrorList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadLogErrorList(current, querParams));
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

export default connect(mapState, mapDispatchToProps)(LogError);