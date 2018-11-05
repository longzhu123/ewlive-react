import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Form, Card, Input, Button, Table,Modal} from 'antd';
import * as StringConstants from '../../../../constant';
import './index.css';
import {actionCreators} from "./store";
import  FilterForm from './FilterForm';

const confirm = Modal.confirm;

//用户管理组件
class User extends PureComponent {


    componentDidMount() {
        this.props.loadUserList();
    }

    render() {
        const {userList, tableSelectChange, delItem, selectIds, onShowSizeChange, pageIndex, totalSize,viewDetail,updateItem,filterForm,getFilterFiledValues} = this.props;
        const userDataList = userList.toJS();
        const selectDataIds = selectIds.toJS();
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
                        <button className="ant-btn viewBtn" onClick={()=>viewDetail(record.id)}>查看</button>
                        <button className="ant-btn updateBtn" onClick={()=>updateItem(record.id)}>修改</button>
                    </span>
                ),
            }
        ];
        return (
            <div>
                <Card>
                    {/*将父组件的filterForm方法传给子组件filterForm*/}
                    <FilterForm filterForm={filterForm} getFilterFiledValues={getFilterFiledValues}/>
                </Card>
                <Card>
                    <div>
                        <Button type="primary" icon="plus" style={{marginRight: '10px'}}>添加</Button>
                        <Button type="danger" icon="delete" onClick={() => delItem(selectDataIds)}>删除</Button>
                    </div>
                    <br/>
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={userDataList}
                        pagination={{
                            current: pageIndex,
                            total: totalSize,
                            onChange: onShowSizeChange
                        }}
                    />
                </Card>
            </div>
        )

    }
}


const mapState = (state) => ({
    userList: state.get("userSettingReducer").get("userList"),
    selectIds: state.get("userSettingReducer").get("selectIds"),
    pageIndex: state.get("userSettingReducer").get("pageIndex"),
    totalSize: state.get("userSettingReducer").get("totalSize")
});

const mapDispatchToProps = (dispatch) => ({
    //加载用户列表
    loadUserList() {
        dispatch(actionCreators.loadUserList(StringConstants.DEFAULT_PAGE_CURRENT));
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
        dispatch(actionCreators.loadUserList(current));
    },
    //查看单条记录的详情
    viewDetail(id){
        console.log("查询详情");
        console.log(id);
    },
    //修改单条记录
    updateItem(id){
        console.log("修改详情");
        console.log(id);

    },
    //条件查询表格
    filterForm(queryObj){
        dispatch(actionCreators.filterForm(queryObj));
    },
    //获取过滤表单的值
    getFilterFiledValues(filedValues){
        console.log('获取过滤表单的值');
        console.log(filedValues);
    }
});

export default connect(mapState, mapDispatchToProps)(User);