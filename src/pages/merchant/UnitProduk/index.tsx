import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

export interface Unit {
  json: {};
  clear: () => void;
}

interface Props {}

const MerchantUnitProdukComponent: React.FC<Props> = () => {
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_unit, status_unit, loading_unit, error_unit, fetchUnit] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUnit(`${REACT_APP_ENV}/admin/units`);
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

  const createUnit = ({ json, clear }: Unit) => {
    postCreate(`${REACT_APP_ENV}/admin/units`, json, clear);
  };

  const updateUnit = ({ json }: any) => {
    postUpdate(`${REACT_APP_ENV}/admin/units/${id_update}`, json);
  };

  const deleteUnit = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/units/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Unit Produk</p>
      <AddComponent onCreate={createUnit} onLoadButton={Boolean(loading_update)} />
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Unit Produk</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Unit Produk"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
          </div>
        </Row>
        <TableComponent
          data={data_unit}
          loading={Boolean(loading_unit)}
          status={Number(status_unit)}
          error={error_unit}
          visibleUpdate={handleVisibleUpdate}
          onDelete={deleteUnit}
        />
      </Card>
      {visible_update ? (
        <UpdateComponent
          visible={visible_update}
          id={id_update}
          onCancel={handleVisibleUpdateCancel}
          onUpdate={updateUnit}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </div>
  );
};

export default MerchantUnitProdukComponent;
