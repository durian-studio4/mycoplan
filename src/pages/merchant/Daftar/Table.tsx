import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import useFilterColumn from '@/hooks/useFilterColumn';
import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDeactive: (id: string) => void;
  onActive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  visibleUpdate,
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
      logo: data[key].logo,
      description: data[key].description,
      address: data[key].address,
      tanggal_daftar: data[key].created_at,
      status: data[key].status,
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
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_merchant-${props.id}`}
            style={{ width: '100%', height: '50%' }}
            src={props.logo}
          />
        ),
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Nama Merchant',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        align: 'left',
        title: 'Deskripsi Merchant',
        dataIndex: 'description',
        key: 'description',
        ...getColumnSearchProps('description'),
      },
      {
        align: 'center',
        title: 'Alamat Merchant',
        dataIndex: 'address',
        key: 'address',
        ...getColumnSearchProps('address'),
      },
      {
        align: 'center',
        title: 'Tanggal Terdaftar',
        dataIndex: 'tanggal_daftar',
        render: (props) => <p>{format(new Date(props), 'dd-MM-yyyy')}</p>,
        key: 'tanggal',
        ...getColumnSearchProps('tanggal_daftar'),
      },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...getColumnSearchProps('status'),
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 150,
        render: (props: any) => (
          <Row justify="center">
            <Button
              className={styles.button_edit}
              id={props.id}
              onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
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

  return <Table columns={columns} loading={loading} dataSource={data_array} scroll={{ x: 1300 }} />;
};

export default TableComponent;
