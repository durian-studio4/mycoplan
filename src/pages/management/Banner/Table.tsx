import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  management_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  visibleUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onActive: (id: string) => void;
  onDeactive: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  management_access,
  data,
  loading,
  status,
  error,
  visibleUpdate,
  onActive,
  onDelete,
  onDeactive,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();
  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      title: data[key].title,
      description: data[key].description,
      start: data[key].start,
      end: data[key].end,
      terms_conditions: data[key].terms_conditions,
      image: data[key].image,
      promo: data[key].voucher ? data[key].voucher.code : '',
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
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: (props) => (
          <img
            alt={`gambar_banner-${props.id}`}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            src={props.image}
          />
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
            {management_access && management_access.update ? (
              <>
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
              </>
            ) : null}
            {management_access && management_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete?"
                onConfirm={() => onDelete(props.id)}
                okText="Yes"
                cancelText="No"
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
    [management_access],
  );

  if (error || status !== 200) {
    return <PageError />;
  }

  return (
    <Table
      columns={columns}
      dataSource={data_array}
      loading={loading}
      scroll={{ x: 1300 }}
      style={{ display: management_access && management_access.read ? 'block' : 'none' }}
    />
  );
};

export default TableComponent;
