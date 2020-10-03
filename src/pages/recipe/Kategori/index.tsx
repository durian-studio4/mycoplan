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

export interface Kategori {
  formData: any;
  clear: () => void;
}

interface Props {}

const RecipeKategoriComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [visible_update, setVisibleUpdate] = useState(false);
  const [id_update, setIdUpdate] = useState('');

  const [data_resep, status_resep, loading_resep, error_resep, fetchResep] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchResep(`${REACT_APP_ENV}/admin/recipe/categories`);
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

  const createKategori = ({ formData, clear }: Kategori) => {
    postCreate(`${REACT_APP_ENV}/admin/recipe/categories`, formData, clear);
  };

  const updateKategori = ({ formData, clear }: Kategori) => {
    postCreate(
      `${REACT_APP_ENV}/admin/recipe/categories/${id_update}?_method=put`,
      formData,
      clear,
    );
  };

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/recipe/categories/${id}`);
  };

  const recipe_access = context && context[4];

  if (
    recipe_access &&
    !recipe_access.read &&
    !recipe_access.delete &&
    !recipe_access.update &&
    !recipe_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Kategori Resep</p>
      {recipe_access && recipe_access.create ? (
        <AddComponent onCreate={createKategori} onLoadButton={Boolean(loading_update)} />
      ) : null}
      <Card style={{ display: recipe_access && recipe_access.read ? 'block' : 'none' }}>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Kategori Resep</p>
        </Row>
        <TableComponent
          recipe_access={recipe_access}
          data={data_resep}
          loading={Boolean(loading_resep)}
          status={Number(status_resep)}
          error={error_resep}
          visibleUpdate={handleVisibleUpdate}
          onDelete={deleteKategori}
        />
      </Card>
      {visible_update ? (
        <UpdateComponent
          visible={visible_update}
          id={id_update}
          onCancel={handleVisibleUpdateCancel}
          onUpdate={updateKategori}
          onLoadButton={Boolean(loading_update)}
        />
      ) : null}
    </div>
  );
};

export default RecipeKategoriComponent;
