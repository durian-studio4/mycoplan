import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const ManagementBannerComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Banner Beranda</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Banner</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Search Banner"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button_search} type="primary">
              + Tambah Banner
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default ManagementBannerComponent;
