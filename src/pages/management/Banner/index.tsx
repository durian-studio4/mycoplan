import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

export interface Banner {
  formData: any;
  clear: () => void;
}

interface Props {}

const ManagementBannerComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

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

  const createBanner = ({ formData, clear }: Banner) => {
    postCreate(`${REACT_APP_ENV}/admin/banners`, formData, clear);
  };

  // const updateBanner = ({ json }: any) => {
  //   postUpdate(`${REACT_APP_ENV}/admin/vouchers/${id_update}`, json);
  // };

  const deactiveBanner = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');

    postCreate(`${REACT_APP_ENV}/admin/banners/${id}?_method=put`, formData);
  };

  const deleteBanner = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/banners/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Banner Beranda</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Banner</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Banner"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button_search} onClick={handleVisible} type="primary">
              + Tambah Banner
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_banner}
          loading={Boolean(loading_banner)}
          status={Number(status_banner)}
          error={error_banner}
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
      </Card>
    </div>
  );
};

export default ManagementBannerComponent;
