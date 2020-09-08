import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

export interface Admin {
  json: {};
  clear: () => void;
}

interface Props {}
// /master/admins/
const AdminAksesComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const [data_admin, status_admin, loading_admin, error_admin, fetchAdmin] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchAdmin(`${REACT_APP_ENV}/master/admins`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const handleVisible = () => setVisible(!visible);

  const createAdmin = ({ json, clear }: Admin) => {
    postCreate(`${REACT_APP_ENV}/register/admin`, json, clear);
  };

  // const deactiveAdmin = (id: string) => {
  //   postUpdate(`${REACT_APP_ENV}/register/admin${id}`, JSON.stringify({ status: 'deactive' }));
  // };

  // const updateAdmin = ({ json }: any) => {
  //   postUpdate(`${REACT_APP_ENV}/register/admin${id_update}`, json);
  // };

  const deleteAdmin = (id: string) => {
    postDelete(`${REACT_APP_ENV}/master/admins/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Akses Admin</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Admin</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Admin"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button_search} onClick={handleVisible} type="primary">
              + Tambah Admin
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_admin}
          loading={Boolean(loading_admin)}
          status={Number(status_admin)}
          error={error_admin}
          onDelete={deleteAdmin}
        />
        {visible ? (
          <AddComponent
            visible={visible}
            onCreate={createAdmin}
            onCancel={handleVisible}
            onLoadButton={Boolean(loading_update)}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AdminAksesComponent;
