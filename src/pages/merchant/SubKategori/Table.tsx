import React, { useMemo } from 'react';
import { Table, Row, Button, Popconfirm } from 'antd';
import styles from './index.less';

import PageError from '@/components/PageError';
import useFilterColumn from '@/hooks/useFilterColumn';

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
  const [getColumnSearchProps] = useFilterColumn();

  let data_array = [];

  for (let key in data) {
    data_array.push({
      no: Number(key) + 1,
      id: data[key].id,
      name: data[key].name,
      image: data[key].image,
      kategori: data[key].parent.name,
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
      // {
      //   align: 'center',
      //   title: 'Gambar',
      //   width: 200,
      //   render: (props: any) => (
      //     <img
      //       alt={`gambar_subkategori-${props.id}`}
      //       style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
      //       src={props.image}
      //     />
      //   ),
      // },
      {
        align: 'center',
        title: 'Kategori Produk',
        dataIndex: 'kategori',
        key: 'kategori',
        ...getColumnSearchProps('kategori'),
      },
      {
        align: 'center',
        title: 'Sub Kategori Produk',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
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
                title="Apakah Anda Ingin Delete Sub Kategori Produk Ini?"
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

  if (error || status !== 200) {
    return <PageError />;
  }

  return (
    <>
      <p className={styles.title}>Sub Kategori</p>
      <Table columns={columns} dataSource={data_array} loading={loading} />;
    </>
  );
};
export default TableComponent;
