import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {
  data: any;
  loading: boolean;
  status: any;
  handleAdd: (id: string, name: string) => void;
  handleEdit: (id: string, name: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, loading, status, handleAdd, handleEdit }) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      id_adjustment: data[key].adjustment_id,
      adjustment: data[key].adjustment_value,
      sku: data[key].sku,
      image: data[key].image,
      nama_produk: data[key].name,
      kategori: data[key].category,
      sub_kategori: data[key].subcategory,
      quantity: data[key].quantity,
      unit: data[key].unit,
      weight: data[key].weight,
      unit_price: data[key].unit_price,
      total_price: data[key].total_price,
    });
  }

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
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_detail-${props.id}`}
            style={{ width: '100%', height: '30%', objectFit: 'contain' }}
            src={props.image}
          />
        ),
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
        title: 'Berat',
        dataIndex: 'weight',
        key: 'weight',
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
        dataIndex: 'unit_price',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'unit_price',
      },
      {
        align: 'center',
        title: 'Jumlah',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        align: 'center',
        title: 'Total Harga (Rp.)',
        dataIndex: 'total_price',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total_price',
      },
      // {
      //   align: 'center',
      //   title: 'Penyesuaian',
      // },
      {
        align: 'center',
        title: 'Perubahan Harga (Rp.)',
        dataIndex: 'adjustment',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'adjustment',
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 200,
        render: (props: any) => (
          <Row justify="space-around">
            {!props.id_adjustment ? (
              <Button
                className={styles.button_action}
                id={props.id_adjustment}
                onClick={() => handleAdd(props.id, props.nama_produk)}
                type="primary"
                disabled={status && (status.id_status === 7 || status.id_status === 8)}
              >
                Penyesuaian Harga
              </Button>
            ) : (
              <Button
                className={styles.button_action}
                id={props.id_adjustment}
                onClick={() => handleEdit(props.id_adjustment, props.nama_produk)}
                type="primary"
                disabled={status && (status.id_status === 7 || status.id_status === 8)}
              >
                Penyesuaian Harga
              </Button>
            )}
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return (
    <>
      <p className={styles.title}>Detail Pemesanan</p>
      <Table columns={columns} dataSource={data_array} loading={loading} scroll={{ x: 1300 }} />
    </>
  );
};

export default TableComponent;
