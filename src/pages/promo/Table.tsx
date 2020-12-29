import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';
import useFilterColumn from '@/hooks/useFilterColumn';

interface Props {
  promo_access: any;
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
  promo_access,
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
      image: data[key].image,
      category: data[key].category,
      code: data[key].code,
      discount: data[key].discount,
      max_discount: data[key].max_discount,
      min_purchase: data[key].min_purchase,
      start: data[key].start,
      end: data[key].end,
      user_limit: data[key].user_limit,
      quantity: data[key].quantity,
      used: data[key].used,
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
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      // {
      //   align: 'center',
      //   title: 'Gambar',
      //   width: 200,
      //   render: (props) => (
      //     <img
      //       alt={`gambar_kategori-${props.id}`}
      //       style={{ width: '100%', height: '30%', objectFit: 'contain' }}
      //       src={props.image}
      //     />
      //   ),
      //   key: 'gambar',
      // },
      {
        align: 'center',
        title: 'Kategori',
        dataIndex: 'category',
        key: 'category',
        ...getColumnSearchProps('category'),
      },
      {
        align: 'center',
        title: 'Kode Promo',
        dataIndex: 'code',
        key: 'code',
        ...getColumnSearchProps('code'),
      },
      // {
      //   align: 'center',
      //   title: 'Diskon (%)',
      //   dataIndex: 'discount',
      //   key: 'discount',
      // },
      // {
      //   align: 'center',
      //   title: 'Maks. Diskon (Rp)',
      //   dataIndex: 'max_discount',
      //   render: (props) => <p>{Number(props).toLocaleString()}</p>,
      //   key: 'max_discount',
      // },
      // {
      //   align: 'center',
      //   title: 'Min Belanja (Rp)',
      //   dataIndex: 'min_purchase',
      //   render: (props) => <p>{Number(props).toLocaleString()}</p>,
      //   key: 'min_purchase',
      // },
      {
        align: 'center',
        title: 'Waktu Mulai',
        dataIndex: 'start',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        ...getColumnSearchProps('start'),
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
        dataIndex: 'end',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
        ...getColumnSearchProps('end'),
      },
      // {
      //   align: 'center',
      //   title: 'Limit Pengguna',
      //   dataIndex: 'user_limit',
      //   key: 'user_limit',
      // },
      {
        align: 'center',
        title: 'Maks. Penukaran',
        dataIndex: 'quantity',
        key: 'quantity',
        ...getColumnSearchProps('quantity'),
      },
      {
        align: 'center',
        title: 'Sudah Ditukar',
        dataIndex: 'used',
        key: 'used',
        ...getColumnSearchProps('used'),
      },
      // {
      //   align: 'center',
      //   title: 'Total Ditukar (Rp)',
      // },
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
          <Row justify="space-around">
            {promo_access && promo_access.update ? (
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
                  <Popconfirm
                    title="Apakah Anda Ingin Deactivate Promo Ini?"
                    onConfirm={() => onDeactive(props.id)}
                    okText="Deactivate"
                    cancelText="Batal"
                  >
                    <Button className={styles.button_action} id={props.id} type="primary">
                      Deactivate
                    </Button>
                  </Popconfirm>
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
            {promo_access && promo_access.delete ? (
              <Popconfirm
                title="Apakah Anda Ingin Delete Promo Ini?"
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
    [promo_access],
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
      style={{ display: promo_access && promo_access.read ? 'block' : 'none' }}
    />
  );
};

export default TableComponent;
