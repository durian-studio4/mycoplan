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
}

const TableComponent: React.FC<Props> = ({ data, loading, status, error }) => {
  const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      // quantity: data[key].quantity,
      // id_merchant: data[key].id_merchant,
      // nama_merchant: data[key].merchant.name,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        ...getColumnSearchProps('no'),
      },
      {
        align: 'center',
        title: 'ID Merchant',
        dataIndex: 'id',
        key: 'id',
        ...getColumnSearchProps('id'),
      },
      {
        align: 'center',
        title: 'Nama Merchant',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        align: 'center',
        title: 'Jumlah Produk',
        dataIndex: 'quantity',
        key: 'quantity',
        ...getColumnSearchProps('quantity'),
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
