import React, { useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import TableComponent from './Table';
import AddComponent from './Add';

interface Props {}

const AdminAksesComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);
  return (
    <div>
      <p className={styles.title}>Akses Admin</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Admin</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Admin"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button_search} onClick={handleVisible} type="primary">
              + Tambah Admin
            </Button>
          </div>
        </Row>
        <TableComponent />
        <AddComponent visible={visible} onCancel={handleVisible} />
      </Card>
    </div>
  );
};

export default AdminAksesComponent;
