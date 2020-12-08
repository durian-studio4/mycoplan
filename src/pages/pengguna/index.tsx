import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';
import UpdateComponent from './Update';

import useDownloadCsv from '@/hooks/useDownloadCsv';
import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const PenggunaComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();
  const [loading_download, onDownloadCSV] = useDownloadCsv();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/users`);
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

  const consoleLog = () => console.log('success');

  const deactiveUser = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');

    postCreate(`${REACT_APP_ENV}/admin/users/${id}?_method=put`, formData, consoleLog);
  };

  const activeUser = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'active');

    postCreate(`${REACT_APP_ENV}/admin/users/${id}?_method=put`, formData, consoleLog);
  };

  const updateUser = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/users/${id_update}?_method=put`, json, clear);
  };

  const deleteUser = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/users/${id}`);
  };

  const pengguna_access = context && context[1];

  if (
    pengguna_access &&
    !pengguna_access.read &&
    !pengguna_access.delete &&
    !pengguna_access.update &&
    !pengguna_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Pengguna</p>
      <Card>
        <Row justify="space-between">
          {pengguna_access && pengguna_access.read ? (
            <p className={styles.title}>Daftar Pengguna</p>
          ) : null}
          {pengguna_access && pengguna_access.create ? (
            <div className={styles.row_box}>
              <Button
                className={styles.button}
                type="primary"
                disabled={Boolean(loading_download)}
                onClick={() =>
                  onDownloadCSV({
                    url: `${REACT_APP_ENV}/admin/users?download=1`,
                    file: 'Users',
                  })
                }
              >
                <DownloadOutlined /> Download CSV
              </Button>
            </div>
          ) : null}
        </Row>
        <TableComponent
          pengguna_access={pengguna_access}
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
          visibleUpdate={handleVisibleUpdate}
          onLoadButton={Boolean(loading_update)}
          onDeactive={deactiveUser}
          onActive={activeUser}
          onDelete={deleteUser}
        />
      </Card>
      {visible_update ? (
        <UpdateComponent
          visible={visible_update}
          id={id_update}
          onCancel={handleVisibleUpdateCancel}
          onUpdate={updateUser}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </div>
  );
};

export default PenggunaComponent;
