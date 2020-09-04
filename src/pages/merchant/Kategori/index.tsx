import React, { useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

export interface Kategori {
  formData: any;
  clear: () => void;
}

interface Props {}

const MerchantKategoriComponent: React.FC<Props> = () => {
  const [data_resep, status_resep, loading_resep, error_resep, fetchResep] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchResep(`${REACT_APP_ENV}/admin/product/categories`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const createKategori = ({ formData, clear }: Kategori) => {
    postCreate(`${REACT_APP_ENV}/admin/product/categories`, formData, clear);
  };

  // const updatePromo = ({ json }: any) => {
  //   postUpdate(`${REACT_APP_ENV}/admin/product/categories/${id_update}`, json);
  // };

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/product/categories/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Kategori Produk</p>
      <AddComponent onCreate={createKategori} onLoadButton={Boolean(loading_update)} />
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Kategori Produk</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Kategori"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
          </div>
        </Row>
        <TableComponent
          data={data_resep}
          loading={Boolean(loading_resep)}
          status={Number(status_resep)}
          error={error_resep}
          onDelete={deleteKategori}
        />
      </Card>
    </div>
  );
};

export default MerchantKategoriComponent;
