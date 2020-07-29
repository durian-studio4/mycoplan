import React, { useMemo } from 'react';
import { Table } from 'antd';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'left',
        title: 'Halaman',
        dataIndex: 'halaman',
        key: 'halaman',
      },
      {
        align: 'center',
        title: 'Create',
        dataIndex: 'create',
        key: 'create',
      },
      {
        align: 'center',
        title: 'Read',
        dataIndex: 'read',
        key: 'read',
      },
      {
        align: 'center',
        title: 'Update',
        dataIndex: 'update',
        key: 'update',
      },
      {
        align: 'center',
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
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
