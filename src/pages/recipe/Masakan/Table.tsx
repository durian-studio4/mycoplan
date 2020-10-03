import React, { useMemo, Fragment } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import { format } from 'date-fns';
import styles from './index.less';

import PageError from '@/components/PageError';

interface Props {
  recipe_access: any;
  data: any;
  loading: boolean;
  status: number;
  error: any;
  onLoadButton: boolean;
  onActive: (id: string) => void;
  onDeactive: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  recipe_access,
  data,
  loading,
  status,
  error,
  onActive,
  onLoadButton,
  onDeactive,
  onDelete,
}) => {
  // const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      author: data[key].author,
      video: data[key].video,
      production_time: data[key].production_time,
      difficulty: data[key].difficulty,
      images: data[key].images,
      created_at: data[key].created_at,
      portion_max: data[key].portion_max,
      portion_min: data[key].portion_min,
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
        title: 'ID Resep',
        dataIndex: 'id',
        key: 'id',
      },
      {
        align: 'center',
        title: 'Gambar',
        width: 200,
        render: ({ images, id }: any) => {
          if (images[0]) {
            return (
              <img
                // key={id}
                alt={`recipe-images-${id}`}
                src={images[0].url}
                style={{ width: '100%', height: '200px', margin: '5px', objectFit: 'contain' }}
              />
            );
          }
          return null;
        },
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
            {recipe_access && recipe_access.update ? (
              <>
                <Button className={styles.button_edit} type="primary">
                  <NavLink
                    to={`/recipe/masakan/edit/${props.id}`}
                    // onClick={() => visibleUpdate(props.id)}
                  >
                    Edit
                  </NavLink>
                </Button>
                {props.status === 'active' ? (
                  <Button
                    className={styles.button_action}
                    id={props.id}
                    onClick={() => onDeactive(props.id)}
                    type="primary"
                    disabled={onLoadButton}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    className={styles.button_action}
                    id={props.id}
                    onClick={() => onActive(props.id)}
                    type="primary"
                    disabled={onLoadButton}
                  >
                    Activate
                  </Button>
                )}
              </>
            ) : null}
            {recipe_access && recipe_access.delete ? (
              <Button
                className={styles.button_action}
                id={props.id}
                onClick={() => onDelete(props.id)}
                type="primary"
                danger
              >
                Delete
              </Button>
            ) : null}
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
      dataSource={data_array}
      loading={loading || onLoadButton}
      scroll={{ x: 1300 }}
      style={{ display: recipe_access && recipe_access.read ? 'block' : 'none' }}
    />
  );
};

export default TableComponent;
