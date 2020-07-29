import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

interface Props {}

const { TextArea } = Input;

const ProfileComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>About mycoplan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Konten about mycoplan</p>
          <Button className={styles.button} type="primary">
            Edit Kontent
          </Button>
        </Row>
        <TextArea className={styles.area} />
      </Card>
    </div>
  );
};

export default ProfileComponent;
