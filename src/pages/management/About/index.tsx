import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

interface Props {}

const { TextArea } = Input;

const ManagementAboutComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Tentang mycoplan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Konten tentang mycoplan</p>
          <Button className={styles.button} type="primary">
            Edit Kontent
          </Button>
        </Row>
        <TextArea className={styles.area} />
      </Card>
    </div>
  );
};

export default ManagementAboutComponent;
