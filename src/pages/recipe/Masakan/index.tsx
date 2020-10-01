import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const RecipeMasakanComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

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

  const recipe_access = context && context[4];

  return (
    <div>
      <p className={styles.title}>Resep Masakan</p>
      <Card>
        <Row justify="space-between">
          {recipe_access && recipe_access.read ? (
            <p className={styles.title}>Daftar Resep</p>
          ) : null}
          {recipe_access && recipe_access.create ? (
            <div className={styles.row_box}>
              <NavLink to="/recipe/masakan/add">
                <Button className={styles.button_search} type="primary">
                  + Tambah Resep
                </Button>
              </NavLink>
            </div>
          ) : null}
        </Row>
        <TableComponent
          recipe_access={recipe_access}
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
