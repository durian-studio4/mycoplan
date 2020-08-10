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
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Kategori Produk',
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
