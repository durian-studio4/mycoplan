import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  merchant_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onDelete: (id: string) => void;
  visibleUpdate: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  merchant_access,
  data,
  loading,
  status,
  error,
  onDelete,
  visibleUpdate,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      alias: data[key].alias,
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
        title: 'Alias Produk',
        dataIndex: 'alias',
        key: 'alias',
      },
      {
        align: 'center',
        title: 'Action',
        width: 200,
        render: (props: any) => (
          <Row justify="center">
            {merchant_access && merchant_access.update ? (
              <Button
                className={styles.button_edit}
                id={props.id}
                onClick={() => visibleUpdate(props.id)}
                type="primary"
              >
                Edit
              </Button>
            ) : null}
            {merchant_access && merchant_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete Alias Produk Ini?"
                onConfirm={() => onDelete(props.id)}
                okText="Delete"
                cancelText="Batal"
              >
                <Button className={styles.button_action} id={props.id} type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [merchant_access],
  );

  if (error) {
    return <PageError status={status} />;
  }

  return (
    <Table
      columns={columns}
      dataSource={data_array}
      loading={loading}
      style={{ display: merchant_access && merchant_access.read ? 'block' : 'none' }}
    />
  );
};

export default TableComponent;
