import React, { useEffect } from 'react';
import styles from './index.less';

import TableKategori from './TableKategori';
import TableRecipe from './TableRecipe';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const RecipePilihanComponent: React.FC<Props> = () => {
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
      fetchKategori(`${REACT_APP_ENV}/admin/recipe/categories`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchRecipe(`${REACT_APP_ENV}/admin/recipes`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const deleteKategori = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/recipe/categories/${id}`);
  };

  const deleteRecipe = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/recipes/${id}`);
  };

  return (
    <div>
      <p className={styles.title}>Resep & Kategori Pilihan</p>
      <TableRecipe
        data={data_recipe}
        loading={Boolean(loading_recipe)}
        status={Number(status_recipe)}
        error={error_recipe}
        onDelete={deleteRecipe}
      />
      <TableKategori
        data={data_kategori}
        loading={Boolean(loading_kategori)}
        status={Number(status_kategori)}
        error={error_kategori}
        onDelete={deleteKategori}
      />
    </div>
  );
};

export default RecipePilihanComponent;
