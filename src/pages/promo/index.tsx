import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

export interface Promo {
  formData: any;
  clear: () => void;
}

interface Props {}

const PromoComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible, setVisible] = useState(false);
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/vouchers/`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const handleVisible = () => setVisible(!visible);

  const handleVisibleUpdate = (id: string) => {
    setIdUpdate(id);
    setVisibleUpdate(true);
  };

  const handleVisibleUpdateCancel = () => {
    setIdUpdate('');
    setVisibleUpdate(false);
  };

  const createPromo = ({ formData, clear }: Promo) => {
    postCreate(`${REACT_APP_ENV}/admin/vouchers`, formData, clear);
  };

  const consoleLog = () => console.log('success');

  const deactivePromo = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');
    postCreate(`${REACT_APP_ENV}/admin/vouchers/${id}?_method=put`, formData, consoleLog);
  };

  const activePromo = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'active');
    postCreate(`${REACT_APP_ENV}/admin/vouchers/${id}?_method=put`, formData, consoleLog);
  };

  const updatePromo = ({ formData, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/vouchers/${id_update}?_method=put`, formData, clear);
  };

  const deletePromo = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/vouchers/${id}`);
  };

  const promo_access = context && context[5];

  return (
    <div>
      <p className={styles.title}>Promo</p>
      <Card>
        <Row justify="space-between">
          {promo_access && promo_access.read ? <p className={styles.title}>Daftar Promo</p> : null}
          {promo_access && promo_access.create ? (
            <div className={styles.row_box}>
              <Button className={styles.button} type="primary" onClick={handleVisible}>
                Buat Promo
              </Button>
            </div>
          ) : null}
        </Row>
        <TableComponent
          promo_access={promo_access}
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
          visibleUpdate={handleVisibleUpdate}
          onActive={activePromo}
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
