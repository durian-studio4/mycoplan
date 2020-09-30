import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { useParams } from 'umi';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import TableComponent from './Table';

interface Props {}

const AdminEditComponent: React.FC<Props> = () => {
  const { id } = useParams();

  const [data_admin, status_admin, loading_admin, error_admin, fetchAdmin] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchAdmin(`${REACT_APP_ENV}/master/admins/${id}/menus/`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update, id]);

  const updateAdmin = ({ json }: any) => {
    postUpdate(`${REACT_APP_ENV}/master/admins/${id}/menus/`, json);
  };

  return (
    <div>
      <p className={styles.title}>Edit Akses</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Akses Halaman</p>
        </Row>
        <TableComponent
          data={data_admin}
          loading={Boolean(loading_admin)}
          status={Number(status_admin)}
          error={error_admin}
          onLoad={Boolean(loading_update)}
          onUpdate={updateAdmin}
        />
      </Card>
    </div>
  );
};

export default AdminEditComponent;
