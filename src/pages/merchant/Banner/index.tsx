import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';
import AddComponent from './Add';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

import PageUnauthorized from '@/components/PageUnauthorized';
export interface Banner {
  formData: any;
  clear: () => void;
}

interface Props {}

const ManagementBannerComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible, setVisible] = useState(false);
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_banner, status_banner, loading_banner, error_banner, fetchBanner] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchBanner(`${REACT_APP_ENV}/admin/banners`);
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

  const createBanner = ({ formData, clear }: Banner) => {
    postCreate(`${REACT_APP_ENV}/admin/banners`, formData, clear);
  };

  const updateBanner = ({ formData, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/banners/${id_update}?_method=put`, formData, clear);
  };

  const onClear = () => console.log('success');

  const deactiveBanner = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');

    postCreate(`${REACT_APP_ENV}/admin/banners/${id}?_method=put`, formData, onClear);
  };

  const activeBanner = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'active');

    postCreate(`${REACT_APP_ENV}/admin/banners/${id}?_method=put`, formData, onClear);
  };

  const deleteBanner = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/banners/${id}`);
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
      <p className={styles.title}>Banner Merchant</p>
      <Card>
        <Row justify="space-between">
          {merchant_access && merchant_access.read ? (
            <p className={styles.title}>Daftar Banner Merchant</p>
          ) : null}
          {merchant_access && merchant_access.create ? (
            <div className={styles.row_box}>
              <Button className={styles.button_search} onClick={handleVisible} type="primary">
                + Tambah Banner
              </Button>
            </div>
          ) : null}
        </Row>
        <TableComponent
          merchant_access={merchant_access}
          data={data_banner}
          loading={Boolean(loading_banner)}
          status={Number(status_banner)}
          error={error_banner}
          visibleUpdate={handleVisibleUpdate}
          onActive={activeBanner}
          onDelete={deleteBanner}
          onDeactive={deactiveBanner}
        />

        {visible ? (
          <AddComponent
            visible={visible}
            onCreate={createBanner}
            onCancel={handleVisible}
            onLoadButton={Boolean(loading_update)}
          />
        ) : null}

        {visible_update ? (
          <UpdateComponent
            visible={visible_update}
            id={id_update}
            onUpdate={updateBanner}
            onCancel={handleVisibleUpdateCancel}
            onLoadButton={Boolean(loading_update)}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default ManagementBannerComponent;
