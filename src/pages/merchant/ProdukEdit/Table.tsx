import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

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
        align: 'center',
        title: 'ID Produk',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        align: 'center',
        title: 'Stok',
        dataIndex: 'stok',
        key: 'stok',
      },
      {
        align: 'center',
        title: 'Nama Produk',
        dataIndex: 'nama_produk',
        key: 'nama_produk',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Harga (Rp.)',
        dataIndex: 'harga',
        key: 'harga',
      },
      {
        align: 'center',
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        align: 'center',
        title: 'Kategori',
        dataIndex: 'kategori',
        key: 'kategori',
      },
      {
        align: 'center',
        title: 'Sub Kategori',
        dataIndex: 'sub_kategori',
        key: 'sub_kategori',
      },
      {
        align: 'center',
        title: 'Terjual',
        dataIndex: 'terjual',
        key: 'terjual',
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
        render: (props: any) => (
          <Row justify="space-around">
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

  return <Table columns={columns} />;
};

export default TableComponent;
