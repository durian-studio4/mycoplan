import React from 'react';
import styles from './index.less';

import TableKategori from './TableKategori';
import TableRecipe from './TableRecipe';

interface Props {}

const RecipePilihanComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Resep & Kategori Pilihan</p>
      <TableRecipe />
      <TableKategori />
    </div>
  );
};

export default RecipePilihanComponent;
