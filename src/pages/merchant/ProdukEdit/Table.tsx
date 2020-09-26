import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import useFilterColumn from '@/hooks/useFilterColumn';
import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onDeactive: (id: string) => void;
  onActive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  onActive,
  onDeactive,
  onDelete,
}) => {
  const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      sku: data[key].sku,
      quantity: data[key].quantity,
      price: data[key].price,
      discount: data[key].discount,
      images: data[key].images,
      status: data[key].status,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        ...getColumnSearchProps('no'),
      },
      {
        align: 'center',
        title: 'ID Produk',
        dataIndex: 'id',
        key: 'id',
        ...getColumnSearchProps('id'),
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: ({ images, id }: any) => {
          if (images[0]) {
            return (
              <img
                // key={id}
                alt={`recipe-images-${id}`}
                src={images[0].url}
                style={{ width: '100%', height: 'auto', margin: '5px' }}
              />
            );
          }
          return null;
        },
        key: 'images',
      },
      {
        align: 'center',
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        ...getColumnSearchProps('sku'),
      },
      {
        align: 'center',
        title: 'Stok',
        dataIndex: 'quantity',
        key: 'quantity',
        ...getColumnSearchProps('quantity'),
      },
      {
        align: 'center',
        title: 'Nama Produk',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      // {
      //   align: 'center',
      //   title: 'Gambar',
      //   dataIndex: 'gambar',
      //   key: 'gambar',
      // },
      {
        align: 'center',
        title: 'Harga (Rp.)',
        dataIndex: 'price',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'price',
        ...getColumnSearchProps('price'),
      },
      {
        align: 'center',
        title: 'Discount (Rp.)',
        dataIndex: 'discount',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'discount',
        ...getColumnSearchProps('discount'),
      },
      // {
      //   align: 'center',
      //   title: 'Unit',
      //   dataIndex: 'unit',
      //   key: 'unit',
      // },
      // {
      //   align: 'center',
      //   title: 'Kategori',
      //   dataIndex: 'kategori',
      //   key: 'kategori',
      // },
      // {
      //   align: 'center',
      //   title: 'Sub Kategori',
      //   dataIndex: 'sub_kategori',
      //   key: 'sub_kategori',
      // },
      // {
      //   align: 'center',
      //   title: 'Terjual',
      //   dataIndex: 'terjual',
      //   key: 'terjual',
      // },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        align: 'center',
        title: 'Action',
        width: 200,
        render: (props: any) => (
          <Row justify="space-around">
            <Button className={styles.button_edit} type="primary">
              <NavLink
                to={`/merchant/produk/edit/${props.id}`}
                // onClick={() => visibleUpdate(props.id)}
              >
                Edit
              </NavLink>
            </Button>
            {props.status === 'active' ? (
              <Button
                className={styles.button_action}
                id={props.id}
                onClick={() => onDeactive(props.id)}
                type="primary"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                className={styles.button_action}
                id={props.id}
                onClick={() => onActive(props.id)}
                type="primary"
              >
                Activate
              </Button>
            )}
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDelete(props.id)}
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

  if (error || status !== 200) {
    return <PageError />;
  }

  return <Table columns={columns} dataSource={data_array} loading={loading} scroll={{ x: 1300 }} />;
};

export default TableComponent;
