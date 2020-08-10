import React from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

interface Props {}

const { TextArea } = Input;

<<<<<<< HEAD
const ManagementAboutComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Tentang mycoplan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Konten tentang mycoplan</p>
=======
const ProfileComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>About mycoplan</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Konten about mycoplan</p>
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
          <Button className={styles.button} type="primary">
            Edit Kontent
          </Button>
        </Row>
        <TextArea className={styles.area} />
      </Card>
    </div>
  );
};

<<<<<<< HEAD
export default ManagementAboutComponent;
=======
export default ProfileComponent;
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
