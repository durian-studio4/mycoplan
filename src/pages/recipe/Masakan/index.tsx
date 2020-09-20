import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const RecipeMasakanComponent: React.FC<Props> = () => {
  const [data_resep, status_resep, loading_resep, error_resep, fetchResep] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchResep(`${REACT_APP_ENV}/admin/recipes`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const deactiveResep = (id: string) => {
    postUpdate(`${REACT_APP_ENV}/admin/recipes/${id}`, { status: 'inactive' });
  };

  const activeResep = (id: string) => {
    postUpdate(`${REACT_APP_ENV}/admin/recipes/${id}`, { status: 'active' });
  };

  const deleteResep = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/recipes/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Resep Masakan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Resep</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Resep"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <NavLink to="/recipe/masakan/add">
              <Button className={styles.button_search} type="primary">
                + Tambah Resep
              </Button>
            </NavLink>
          </div>
        </Row>
        <TableComponent
          data={data_resep}
          loading={Boolean(loading_resep)}
          status={Number(status_resep)}
          error={error_resep}
          onLoadButton={Boolean(loading_update)}
          onActive={activeResep}
          onDelete={deleteResep}
          onDeactive={deactiveResep}
        />
      </Card>
    </div>
  );
};

export default RecipeMasakanComponent;
