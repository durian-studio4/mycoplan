import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import TableComponent from './Table';
import UpdateComponent from './Update';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const PenggunaComponent: React.FC<Props> = () => {
  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

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

  const consoleLog = () => console.log('deactivated');

  const deactiveUser = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');

    postCreate(`${REACT_APP_ENV}/admin/users/${id}?_method=put`, formData, consoleLog);
  };

  const updateUser = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/users/${id_update}?_method=put`, json, clear);
  };

  const deleteUser = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/users/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Pengguna</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Pengguna</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Pengguna"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              <DownloadOutlined /> Download CSV
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
          visibleUpdate={handleVisibleUpdate}
          onLoadButton={Boolean(loading_update)}
          onDeactive={deactiveUser}
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
