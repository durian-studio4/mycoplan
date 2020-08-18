import React, { useMemo, useState } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

import EditComponent from './Edit';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 123,
      sku: 'test',
      nama_produk: 'panadol',
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
        title: 'Gambar',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Nama Produk',
        dataIndex: 'nama_produk',
        key: 'nama_produk',
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
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        align: 'center',
        title: 'Harga/Unit (Rp.)',
        dataIndex: 'harga',
        key: 'harga',
      },
      {
        align: 'center',
        title: 'Jumlah',
      },
      {
        align: 'center',
        title: 'Total Harga (Rp.)',
      },
      {
        align: 'center',
        title: 'Penyesuaian',
      },
      {
        align: 'center',
        title: 'Perubahan Harga (Rp.)',
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
            <Button className={styles.button} id={props.id} onClick={handleVisible} type="primary">
              Edit Harga
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

  return (
    <>
      <p className={styles.title}>Detail Pemesanan</p>
      <Table columns={columns} dataSource={data} />
      {visible ? <EditComponent visible={visible} onCancel={handleVisible} /> : null}
    </>
  );
};

export default TableComponent;
