import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';

interface Props {}

const PenggunaComponent: React.FC<Props> = () => {
  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`https://api.mycoplan.id/api/get-user`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              placeholder="Cari Pengguna"
              // onChange={onChangeState}
              // value={name}
              // onKeyDown={handleKey}
            />
            <Button className={styles.button} type="primary">
              <DownloadOutlined /> Download CSV
            </Button>
          </div>
        </Row>
        <TableComponent
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
        />
      </Card>
    </div>
  );
};

export default PenggunaComponent;
