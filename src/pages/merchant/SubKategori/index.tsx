import React, { useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import SelectAll from '@/components/Select/SelectAll';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

export interface Kategori {
  json: {};
  clear: () => void;
}

interface Props {}

const MerchantSubKategoriComponent: React.FC<Props> = () => {
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

  const createKategori = ({ json, clear }: Kategori) => {
    postCreate(`${REACT_APP_ENV}/admin/product/subcategories`, json, clear);
  };

  // const updateKategori = ({ json }: any) => {
  //   postUpdate(`${REACT_APP_ENV}/admin/product/subcategories/${id_update}`, json);
  // };

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
            <SelectAll initial="Daging" />
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
          onDelete={deleteKategori}
        />
      </Card>
    </div>
  );
};

export default MerchantSubKategoriComponent;
