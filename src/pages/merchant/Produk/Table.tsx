import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 123,
      nama_merchant: 'imam ramadhan',
    },
  ];

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
        title: 'Nama Merchant',
        dataIndex: 'nama_merchant',
        key: 'nama_merchant',
      },
      {
        align: 'center',
        title: 'Jumlah Produk',
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

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
