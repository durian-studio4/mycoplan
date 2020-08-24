import React, { useMemo } from 'react';
import { Table, Checkbox } from 'antd';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      halaman: 'Dashboard',
    },
  ];

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
        dataIndex: 'halaman',
        key: 'halaman',
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

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
