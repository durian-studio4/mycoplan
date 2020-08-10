import React from 'react';
<<<<<<< HEAD
import { Button, Card, Row, Input } from 'antd';
=======
import { Button, Card, Row } from 'antd';
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

<<<<<<< HEAD
const ManagementBannerComponent: React.FC<Props> = () => {
=======
const BannerComponent: React.FC<Props> = () => {
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
  return (
    <div>
      <p className={styles.title}>Banner Beranda</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Banner</p>
<<<<<<< HEAD
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
            <Button className={styles.button_search} type="primary">
              + Tambah Banner
            </Button>
          </div>
=======
          <Button className={styles.button} type="primary">
            + Tambah Banner
          </Button>
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

<<<<<<< HEAD
export default ManagementBannerComponent;
=======
export default BannerComponent;
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
