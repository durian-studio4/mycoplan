import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

import PageUnauthorized from '@/components/PageUnauthorized';
export interface Merchant {
  formData: any;
  clear: () => void;
}

interface Props {}

const MerchantDaftarComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible, setVisible] = useState(false);
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [
    data_merchant,
    status_merchant,
    loading_merchant,
    error_merchant,
    fetchMerchant,
  ] = useFetch();

  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMerchant(`${REACT_APP_ENV}/admin/merchants`);
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

  const createMerchant = ({ formData, clear }: Merchant) => {
    postCreate(`${REACT_APP_ENV}/register/merchant`, formData, clear);
  };

  const consoleLog = () => console.log('success');

  const deactiveMerchant = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');
    postCreate(`${REACT_APP_ENV}/admin/merchants/${id}?_method=put`, formData, consoleLog);
  };

  const activeMerchant = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'active');
    postCreate(`${REACT_APP_ENV}/admin/merchants/${id}?_method=put`, formData, consoleLog);
  };

  const updateMerchant = ({ formData, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/merchants/${id_update}?_method=put`, formData, clear);
  };

  const deleteMerchant = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/merchants/${id}`);
  };

  const merchant_access = context && context[2];

  if (
    merchant_access &&
    !merchant_access.read &&
    !merchant_access.delete &&
    !merchant_access.update &&
    !merchant_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Daftar Merchant</p>
      <Card>
        {merchant_access && merchant_access.create ? (
          <Row justify="space-between">
            <div className={styles.row_box}>
              <Button className={styles.button_search} onClick={handleVisible} type="primary">
                + Tambah Merchant
              </Button>
            </div>
          </Row>
        ) : null}
        <TableComponent
          merchant_access={merchant_access}
          data={data_merchant}
          loading={Boolean(loading_merchant)}
          status={Number(status_merchant)}
          error={error_merchant}
          visibleUpdate={handleVisibleUpdate}
          onDeactive={deactiveMerchant}
          onActive={activeMerchant}
          onDelete={deleteMerchant}
        />
        {visible ? (
          <AddComponent
            visible={visible}
            onCreate={createMerchant}
            onCancel={handleVisible}
            onLoadButton={Boolean(loading_update)}
          />
        ) : null}
        {visible_update ? (
          <UpdateComponent
            visible={visible_update}
            id_update={id_update}
            onCreate={updateMerchant}
            onLoadButton={Boolean(loading_update)}
            onCancel={handleVisibleUpdateCancel}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default MerchantDaftarComponent;
