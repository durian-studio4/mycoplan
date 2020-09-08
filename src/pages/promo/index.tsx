import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

export interface Promo {
  json: {};
  clear: () => void;
}

interface Props {}

const PromoComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  const handleVisible = () => setVisible(!visible);

  const handleVisibleUpdate = (id: string) => {
    setIdUpdate(id);
    setVisibleUpdate(true);
  };

  const handleVisibleUpdateCancel = () => {
    setIdUpdate('');
    setVisibleUpdate(false);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/vouchers/`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const createPromo = ({ json, clear }: Promo) => {
    postCreate(`${REACT_APP_ENV}/admin/vouchers`, json, clear);
  };

  const deactivePromo = (id: string) => {
    postUpdate(`${REACT_APP_ENV}/admin/vouchers/${id}`, { status: 'inactive' });
  };

  const updatePromo = ({ json }: any) => {
    postUpdate(`${REACT_APP_ENV}/admin/vouchers/${id_update}`, json);
  };

  const deletePromo = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/vouchers/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Promo</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Promo</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Promo"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary" onClick={handleVisible}>
              Buat Promo
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
          visibleUpdate={handleVisibleUpdate}
          onDeactive={deactivePromo}
          onDelete={deletePromo}
        />
      </Card>
      {visible ? (
        <AddComponent
          visible={visible}
          onCancel={handleVisible}
          onCreate={createPromo}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
      {visible_update ? (
        <UpdateComponent
          visible={visible_update}
          id={id_update}
          onUpdate={updatePromo}
          onCancel={handleVisibleUpdateCancel}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </div>
  );
};

export default PromoComponent;
