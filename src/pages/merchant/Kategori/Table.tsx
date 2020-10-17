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
  visibleUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  merchant_access,
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onDelete,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      image: data[key].image,
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
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_kategori-${props.id}`}
            style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
            src={props.image}
          />
        ),
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Kategori Produk',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'center',
        title: 'Action',
        width: 200,
        render: (props: any) => (
          <Row justify="space-around">
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
                title="Apakah Anda Ingin Delete Kategori Produk Ini?"
                onConfirm={() => onDelete(props.id)}
                okText="Delete"
                cancelText="Batal"
              >
                <Button className={styles.button_action} id={props.id} type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
            {/* <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Deactivate
            </Button> */}
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [merchant_access],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return <Table columns={columns} dataSource={data_array} loading={loading} />;
};

export default TableComponent;
