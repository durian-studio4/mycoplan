import * as React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';

const useFilterColumn = () => {
  const handleSearch = (confirm: () => void) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleEnter = (e: any, confirm: any) => {
    if (e.key.toLowerCase() === 'enter') {
      handleSearch(confirm);
    }
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          className={styles.input}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ''}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onKeyDown={(e) => handleEnter(e, confirm)}
        />
        <Button className={styles.button} type="primary" onClick={() => handleSearch(confirm)}>
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)}>Reset</Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  return [getColumnSearchProps];
};

export default useFilterColumn;
