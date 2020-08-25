import React, { useState } from 'react';
import { Button, Card, Row } from 'antd';
import ReactQuill from 'react-quill';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

interface Props {}

const ManagementAboutComponent: React.FC<Props> = () => {
  const [value, setValue] = useState('');
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
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Card>
    </div>
  );
};

export default ManagementAboutComponent;
