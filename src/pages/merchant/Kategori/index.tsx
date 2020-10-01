import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useProdukRequest';

export interface Kategori {
  formData: any;
  clear: () => void;
}

interface Props {}

const MerchantKategoriComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_resep, status_resep, loading_resep, error_resep, fetchResep] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchResep(`${REACT_APP_ENV}/admin/product/categories?category=1`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const handleVisibleUpdate = (id: string) => {
    setIdUpdate(id);
    setVisibleUpdate(true);
  };

  const handleVisibleUpdateCancel = () => {
    setIdUpdate('');
    setVisibleUpdate(false);
  };

  const createKategori = ({ formData, clear }: Kategori) => {
    postCreate(`${REACT_APP_ENV}/admin/product/categories`, formData, clear);
  };

  const updateKategori = ({ formData, clear }: any) => {
    postCreate(
      `${REACT_APP_ENV}/admin/product/categories/${id_update}?_method=put`,
      formData,
      clear,
    );
  };

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/product/categories/${id}`);
  };

  const merchant_access = context && context[2];

  return (
    <div>
      <p className={styles.title}>Kategori Produk</p>
      {merchant_access && merchant_access.create ? (
        <AddComponent onCreate={createKategori} onLoadButton={Boolean(loading_update)} />
      ) : null}
      <Card style={{ display: merchant_access && merchant_access.read ? 'block' : 'none' }}>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Kategori Produk</p>
        </Row>
        <TableComponent
          merchant_access={merchant_access}
          data={data_resep}
          loading={Boolean(loading_resep)}
          status={Number(status_resep)}
          error={error_resep}
          visibleUpdate={handleVisibleUpdate}
          onDelete={deleteKategori}
        />
      </Card>
      {visible_update ? (
        <UpdateComponent
          visible={visible_update}
          id={id_update}
          onCancel={handleVisibleUpdateCancel}
          onUpdate={updateKategori}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </div>
  );
};

export default MerchantKategoriComponent;
