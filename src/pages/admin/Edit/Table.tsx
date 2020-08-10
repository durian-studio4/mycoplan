import React, { useMemo } from 'react';
import { Table, Row, Button, Dropdown, Menu, Radio, Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'left',
        title: 'Halaman',
      },
      {
        align: 'center',
        title: 'Create',
        key: 'create',
        render: () => <Checkbox />,
      },
      {
        align: 'center',
        title: 'Read',
        key: 'read',
        render: () => <Checkbox />,
      },
      {
        align: 'center',
        title: 'Update',
        key: 'update',
        render: () => <Checkbox />,
      },
      {
        align: 'center',
        title: 'Delete',
        key: 'delete',
        render: () => <Checkbox />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return <Table columns={columns} />;
};

export default TableComponent;
