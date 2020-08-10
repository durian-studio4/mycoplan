import React from 'react';
import { Card, Row, Upload, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

interface Props {}

const MerchantKategoriAddComponent: React.FC<Props> = () => {
  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Kategori Resep Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box1}>
            <Upload name="avatar" listType="picture-card">
              <div className={styles.group}>
                <PlusOutlined />
                Upload
              </div>
            </Upload>
          </div>
          <div className={styles.box3}>
            <div className={styles.group}>
              <Input className={styles.input} />
            </div>
          </div>
        </Row>
        <div className={styles.group}></div>
        <Button className={styles.button}>Simpan</Button>
      </Card>
    </div>
  );
};

export default MerchantKategoriAddComponent;
