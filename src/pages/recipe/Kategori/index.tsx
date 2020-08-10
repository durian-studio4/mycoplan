import React from 'react';
<<<<<<< HEAD
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
=======
import styles from './index.less';

import Table from './Table';

interface Props {}

const KategoriComponent: React.FC<Props> = () => {
  return (
    <div>
      {/* <h1>Kategori</h1> */}

      {/* <Table /> */}
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
    </div>
  );
};

<<<<<<< HEAD
export default RecipeKategoriComponent;
=======
export default KategoriComponent;
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
