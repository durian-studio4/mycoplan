import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

interface Props {}

const { TextArea } = Input;

const ManagementWhatsappComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>WhatsApp Chat</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Link Whatsapp Chat</p>
          <Button className={styles.button} type="primary">
            Edit Link
          </Button>
        </Row>
        <TextArea className={styles.area} />
      </Card>
    </div>
  );
};

export default ManagementWhatsappComponent;
