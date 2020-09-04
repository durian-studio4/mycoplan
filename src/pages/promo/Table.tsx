import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onDeactive,
  onDelete,
}) => {
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
        title: 'Kategori',
      },
      {
        align: 'center',
        title: 'Kode Promo',
      },
      {
        align: 'center',
        title: 'Diskon (%)',
      },
      {
        align: 'center',
        title: 'Maks. Diskon (Rp)',
      },
      {
        align: 'center',
        title: 'Min Belanja (Rp)',
      },
      {
        align: 'center',
        title: 'Waktu Mulai',
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
      },
      {
        align: 'center',
        title: 'Limit Pengguna',
      },
      {
        align: 'center',
        title: 'Maks. Penukaran',
      },
      {
        align: 'center',
        title: 'Sudah Ditukar',
      },
      {
        align: 'center',
        title: 'Total Ditukar (Rp)',
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        render: ({ id }: any) => (id === 1 ? <p>Active</p> : <p>Non-Active</p>),
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 150,
        render: (props: any) => (
          <Row justify="space-around">
            <Button
              className={styles.button_edit}
              id={props.id}
              onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              onClick={() => onDeactive(props.id)}
              type="primary"
            >
              Deactivate
            </Button>
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

  return <Table columns={columns} dataSource={data} loading={loading} scroll={{ x: 1300 }} />;
};

export default TableComponent;
