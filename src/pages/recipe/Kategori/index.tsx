import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const RecipeKategoriComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Kategori Resep</p>
      <AddComponent />
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Kategori Resep</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Search Nama Barang"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default RecipeKategoriComponent;
