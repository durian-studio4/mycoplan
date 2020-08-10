import React, { useMemo } from 'react';
import { Table, Row, Button, Dropdown, Menu, Radio } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface Props {}

const menu = (
  <Menu>
    <Menu.Item key="0">Edit</Menu.Item>
    <Menu.Item key="1">Deactive</Menu.Item>
    <Menu.Item key="2">Delete</Menu.Item>
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
        title: 'Nomor Telepon',
        dataIndex: 'no_telepon',
        key: 'no_telepon',
      },
      {
        align: 'center',
        title: 'Tanggal Lahir',
        dataIndex: 'tanggal_lahir',
        key: 'tanggal_lahir',
      },
      {
        align: 'center',
        title: 'Usia',
        dataIndex: 'age',
        key: 'age',
      },
      {
        align: 'center',
        title: 'Jenis Kelamin',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        align: 'center',
        title: 'Alamat Utama',
        dataIndex: 'alamat',
        key: 'alamat',
      },
      {
        align: 'center',
        title: 'User Id',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        align: 'center',
        title: 'Metode Sign in',
        dataIndex: 'metode',
        key: 'metode',
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        render: ({ id }: any) => {
          {
            if (id === 1) {
              <Radio>Active</Radio>;
            }
            if (id === 2) {
              <Radio>Running</Radio>;
            }
            if (id === 3) {
              <Radio>Banned</Radio>;
            }
          }
        },
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <MenuOutlined />
            </a>
          </Dropdown>
          // <Row justify="space-around">
          //   <Button
          //     className={styles.button}
          //     id={props.id}
          //     // onClick={() => visibleUpdate(props.id)}
          //     type="primary"
          //   >
          //     Edit
          //   </Button>
          //   <Button
          //     className={styles.button}
          //     id={props.id}
          //     // onClick={() => remove(props.id)}
          //     type="primary"
          //     danger
          //   >
          //     Delete
          //   </Button>
          // </Row>
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
