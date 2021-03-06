import React, { useEffect, useContext } from 'react';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableKategori from './TableKategori';
import TableRecipe from './TableRecipe';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const RecipePilihanComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const [
    data_kategori,
    status_kategori,
    loading_kategori,
    error_kategori,
    fetchKategori,
  ] = useFetch();

  const [data_recipe, status_recipe, loading_recipe, error_recipe, fetchRecipe] = useFetch();

  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchKategori(`${REACT_APP_ENV}/admin/selected/recipe-categories`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchRecipe(`${REACT_APP_ENV}/admin/selected/recipes`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const createRecipe = ({json, clear}: any) => {
    postCreate(`${REACT_APP_ENV}/admin/selected/recipes`, json, clear)
  }

  const createKategori = ({json, clear}: any) => {
    postCreate(`${REACT_APP_ENV}/admin/selected/recipe-categories`, json, clear)
  }

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/selected/recipe-categories/${id}`);
  };

  const deleteRecipe = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/selected/recipes/${id}`);
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
      <p className={styles.title}>Resep & Kategori Pilihan</p>
      <TableRecipe
        recipe_access={recipe_access}
        data={data_recipe}
        loading={Boolean(loading_recipe)}
        status={Number(status_recipe)}
        error={error_recipe}
        onLoadButton={Boolean(loading_update)}
        onCreate={createRecipe}
        onDelete={deleteRecipe}
      />
      <TableKategori
        recipe_access={recipe_access}
        data={data_kategori}
        loading={Boolean(loading_kategori)}
        status={Number(status_kategori)}
        error={error_kategori}
        onLoadButton={Boolean(loading_update)}
        onCreate={createKategori}
        onDelete={deleteKategori}
      />
    </div>
  );
};

export default RecipePilihanComponent;
