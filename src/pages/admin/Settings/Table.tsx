import React, { useMemo } from 'react';
import { Table, Row, Button, Dropdown, Menu, Radio } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface Props {}

const menu = (
  <Menu>
    <Menu.Item key="0">Edit</Menu.Item>
    <Menu.Item key="1">Delete</Menu.Item>
  </Menu>
);

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
      },
      {
        align: 'left',
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        align: 'center',
        title: 'Peran',
        dataIndex: 'peran',
        key: 'peran',
      },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
        dataIndex: 'tanggal',
        key: 'tanggal',
      },
      // {
      //   align: 'center',
      //   title: 'Status',
      //   key: 'status',
      //   render: ({ id }: any) => {
      //     {
      //       if (id === 1) {
      //         <Radio>Active</Radio>;
      //       }
      //       if (id === 2) {
      //         <Radio>Running</Radio>;
      //       }
      //       if (id === 3) {
      //         <Radio>Banned</Radio>;
      //       }
      //     }
      //   },
      // },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <MenuOutlined />
            </a>
          </Dropdown>
        ),
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
