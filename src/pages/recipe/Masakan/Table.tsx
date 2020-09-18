import React, { useMemo, Fragment } from 'react';
import { Table, Row, Button } from 'antd';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onLoadButton: boolean;
  onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  data,
  loading,
  status,
  error,
  onLoadButton,
  onDeactive,
  onDelete,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      id: data[key].id,
      name: data[key].name,
      author: data[key].author,
      video: data[key].video,
      production_time: data[key].production_time,
      difficulty: data[key].difficulty,
      images: data[key].images,
      created_at: data[key].created_at,
      status: data[key].status,
    });
  }

  const columns = useMemo(
    () => [
      // {
      //   align: 'center',
      //   title: 'No.',
      //   dataIndex: 'no',
      //   key: 'no',
      // },
      {
        align: 'center',
        title: 'ID Resep',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: ({ images }: any) => (
          <Fragment>
            {images.map(({ id, url }: any, i: any) => (
              <img
                key={id}
                alt={`recipe-images-${id}`}
                src={url || ''}
                style={{ width: '100%', height: '30%', margin: '5px' }}
              />
            ))}
          </Fragment>
        ),
        key: 'images',
      },
      {
        align: 'center',
        title: 'Nama Resep',
        dataIndex: 'name',
        key: 'name',
      },
      {
        align: 'center',
        title: 'Pembuat',
        dataIndex: 'author',
        key: 'author',
      },
      {
        align: 'center',
        title: 'Link Youtube',
        dataIndex: 'video',
        key: 'video',
      },
      {
        align: 'center',
        title: 'Durasi Masak',
        dataIndex: 'production_time',
        key: 'production_time',
      },
      {
        align: 'center',
        title: 'Porsi',
        render: ({ portion_max, portion_min }: number) => (
          <p>{`${portion_min} - ${portion_max}`}</p>
        ),
      },
      {
        align: 'center',
        title: 'Kesulitan',
        dataIndex: 'difficulty',
        key: 'difficulty',
      },
      // {
      //   align: 'center',
      //   title: 'Jenis Makanan',
      // },
      // {
      //   align: 'center',
      //   title: 'Kategori Resep',
      // },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
        dataIndex: 'created_at',
        render: (props) => <div>{format(new Date(props), 'dd-MM-yyyy')}</div>,
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
      },
      {
        align: 'center',
        title: 'Action',
        fixed: 'right',
        width: 200,
        render: (props: any) => (
          <Row justify="center">
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
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading || onLoadButton}
      scroll={{ x: 1300 }}
    />
  );
};

export default TableComponent;
