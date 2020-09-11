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
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error }) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      id: data[key].id,
      name: data[key].name,
      quantity: data[key].quantity,
      id_merchant: data[key].id_merchant,
      nama_merchant: data[key].merchant.name,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'ID Merchant',
        dataIndex: 'id_merchant',
        key: 'id_merchant',
      },
      {
        align: 'center',
        title: 'Nama Merchant',
        dataIndex: 'nama_merchant',
        key: 'nama_merchant',
      },
      {
        align: 'center',
        title: 'Jumlah Produk',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
            <NavLink
              to={`/merchant/produk/${props.id}`}
              // onClick={() => visibleUpdate(props.id)}
            >
              <Button className={styles.button} type="primary">
                Edit
              </Button>
            </NavLink>
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

  return <Table columns={columns} dataSource={data_array} loading={loading} />;
};

export default TableComponent;
