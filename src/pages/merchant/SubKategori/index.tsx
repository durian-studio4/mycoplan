import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import SelectKategori from '@/components/Select/SelectKategori';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

export interface Kategori {
  formData: any;
  clear: () => void;
}

interface Props {}

const MerchantSubKategoriComponent: React.FC<Props> = () => {
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [
    data_kategori,
    status_kategori,
    loading_kategori,
    error_kategori,
    fetchKategori,
  ] = useFetch();

  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchKategori(`${REACT_APP_ENV}/admin/product/subcategories`);
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
    postCreate(`${REACT_APP_ENV}/admin/product/subcategories`, formData, clear);
  };

  const updateKategori = ({ json }: any) => {
    postUpdate(`${REACT_APP_ENV}/admin/product/subcategories/${id_update}`, json);
  };

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/product/subcategories/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Sub Kategori Produk</p>
      <AddComponent onCreate={createKategori} onLoadButton={Boolean(loading_update)} />
      <Card>
        <p className={styles.title}>Sub Kategori</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box3} style={{ margin: '5px' }}>
            <SelectKategori />
          </div>
          <Input
            className={styles.input_search}
            id="name"
            type="text"
            placeholder="Cari Sub Kategori"
            // onChange={onChangeState}
            // value={name}
            // onKeyDown={handleKey}
          />
        </Row>
        <TableComponent
          data={data_kategori}
          loading={Boolean(loading_kategori)}
          status={Number(status_kategori)}
          error={error_kategori}
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

export default MerchantSubKategoriComponent;
