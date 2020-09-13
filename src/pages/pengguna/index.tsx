import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const PenggunaComponent: React.FC<Props> = () => {
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/users`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const deactiveUser = (id: string) => {
    postUpdate(`${REACT_APP_ENV}/admin/users/${id}`, { status: 'inactive' });
  };

  // const updateUser = ({ formData, clear }: any) => {
  //   postCreate(`${REACT_APP_ENV}/admin/users/${id_update}`, formData, clear);
  // };

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
          onLoadButton={Boolean(loading_update)}
          onDeactive={deactiveUser}
          onDelete={deleteUser}
        />
      </Card>
    </div>
  );
};

export default PenggunaComponent;
