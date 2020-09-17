import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  // onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  // onDeactive,
  onDelete,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        // dataIndex: 'id',
        // key: 'id',
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
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        align: 'center',
        title: 'Nama Produk',
        dataIndex: 'name',
        key: 'name',
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
            {/* <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDeactive(props.id)}
              type="primary"
            >
              Deactivate
            </Button> */}
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

  return <Table columns={columns} dataSource={data.products} loading={loading} />;
};

export default TableComponent;
