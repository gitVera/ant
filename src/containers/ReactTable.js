import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import data from './data'


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class ReactTable extends Component {

  state = {
    searchText: '',
    loading: false,
  };



  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);

  } 

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
      ...this.getColumnSearchProps('name'),
      width: '220px',
      render: name => `${name}-Koko`,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
      ...this.getColumnSearchProps('age'),
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      ...this.getColumnSearchProps('address'),
    }];

    return (
      <div className="container">
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={data}
          indentSize={50}
          childrenColumnName="subprojects"
          onChange={this.onChange}
          loading={this.state.loading}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 220 }}
          rowClassName="rowClassName"
        />
      </div>
    );
  }
}

export default ReactTable;
