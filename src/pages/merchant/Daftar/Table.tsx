import React, { useMemo, useState } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {}

const initialData = [
  {
    no: '1',
    judul: 'Judul Banner',
    description: 'Deskripsi',
    syarat: 'none',
    promo: 'none',
  },
  {
    no: '2',
    judul: 'Judul Banner',
    description: 'Deskripsi',
    syarat: 'none',
    promo: 'none',
  },
];

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'ID Merchant',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Nama Merchant',
        dataIndex: 'nama_merchant',
        key: 'nama_merchant',
      },
      {
        align: 'left',
        title: 'Deskripsi Merchant',
        dataIndex: 'description',
        key: 'description',
      },
      {
        align: 'center',
        title: 'Alamat Merchant',
        dataIndex: 'alamat',
        key: 'alamat',
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
        dataIndex: 'tanggal',
        key: 'tanggal',
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        render: ({ id }: any) => (id === 1 ? <p>Active</p> : <p>Non-Active</p>),
      },
      {
        align: 'center',
        title: 'Action',
        width: 150,
        render: (props: any) => (
          // <Dropdown overlay={menu} trigger={['click']}>
          //   <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          //     <MenuOutlined />
          //   </a>
          // </Dropdown>
          <Row justify="center">
            <Button
              className={styles.button_edit}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Deactivate
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Row>
        ),
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
