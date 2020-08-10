import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TableComponent from './Table';
import styles from './index.less';

interface Props {}

const PenggunaComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Pengguna</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Pengguna</p>
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
            <Button className={styles.button} type="primary">
              <DownloadOutlined /> Download CSV
            </Button>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default PenggunaComponent;
