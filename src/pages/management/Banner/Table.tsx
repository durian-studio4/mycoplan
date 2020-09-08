import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onDeactive: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onDelete,
  onDeactive,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();
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
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img alt={`gambar_banner-${props.id}`} width="100%" height="20%" src={props.image} />
        ),
        key: 'image',
      },
      {
        align: 'center',
        title: 'Judul',
        dataIndex: 'title',
        key: 'title',
      },
      {
        align: 'left',
        title: 'Deskripsi Banner',
        dataIndex: 'description',
        key: 'description',
      },
      {
        align: 'center',
        title: 'Waktu Mulai',
        dataIndex: 'start',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
        dataIndex: 'end',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Syarat & Ketentuan',
        dataIndex: 'terms_conditions',
        key: 'terms_conditions',
      },
      {
        align: 'center',
        title: 'Kode Promo',
        dataIndex: 'promo',
        key: 'promo',
      },
      {
        align: 'center',
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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
