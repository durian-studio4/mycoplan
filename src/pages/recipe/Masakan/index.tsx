import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

import TableComponent from './Table';

interface Props {}

const RecipeMasakanComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Resep Masakan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Resep</p>
          <div className={styles.row_box}>
            <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Resep"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <NavLink to="/recipe/masakan/add">
              <Button className={styles.button_search} type="primary">
                + Tambah Resep
              </Button>
            </NavLink>
          </div>
        </Row>
        <TableComponent />
      </Card>
    </div>
  );
};

export default RecipeMasakanComponent;
