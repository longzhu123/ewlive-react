import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card, Icon, Modal, Table} from 'antd';
import SearchForm from '../../../../common/Form/SearchForm';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";

const confirm = Modal.confirm;
let querParams = {};

//登录日志管理组件
class LogLogin extends PureComponent {

    componentDidMount() {
        this.props.loadLogLoginList();
    }

    render() {
        const {logLoginList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize, filterForm, queryObj, resetLoadGrid} = this.props;
        querParams = queryObj.toJS();
        const logLoginDataList = logLoginList.toJS();
        const selectDataIds = selectIds.toJS();
        const rowSelection = {
            onChange: tableSelectChange
        };
        const columns = [
            {
                title: '登录IP',
                dataIndex: 'loginIp',
                align: "center"
            }, {
                title: '昵称',
                dataIndex: 'nickName',
                align: "center"
            }, {
                title: '登录时间',
                dataIndex: 'loginTime',
                align: "center"
            }
        ];
        //搜索表单组件的配置参数
        const searchFormOptions = [
            {
                type: "input",
                lable: "登录IP",
                placeholder: "登录IP",
                width: "200px",
                field: "loginIp"
            },
            {
                type: "input",
                lable: "昵称",
                placeholder: "昵称",
                width: "200px",
                field: "nickName"
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
                        dataSource={logLoginDataList}
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
    logLoginList: state.get("logLoginReducer").get("logLoginList"),
    selectIds: state.get("logLoginReducer").get("selectIds"),
    pageIndex: state.get("logLoginReducer").get("pageIndex"),
    totalSize: state.get("logLoginReducer").get("totalSize"),
    queryObj: state.get("logLoginReducer").get("queryObj")
});

const mapDispatchToProps = (dispatch) => ({
    //加载登录日志列表
    loadLogLoginList() {
        dispatch(actionCreators.loadLogLoginList(StringConstants.DEFAULT_PAGE_CURRENT, {}));
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
        dispatch(actionCreators.loadLogLoginList(current, querParams));
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

export default connect(mapState, mapDispatchToProps)(LogLogin);