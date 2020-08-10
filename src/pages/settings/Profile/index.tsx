import React from 'react';
import { Card, Input, Button } from 'antd';
import styles from './index.less';

interface Props {}

<<<<<<< HEAD
const SettingsProfileComponent: React.FC<Props> = () => {
=======
const ProfileComponent: React.FC<Props> = () => {
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
  return (
    <div>
      <p className={styles.title}>Profile & Kata Sandi</p>
      <Card>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama
            </label>
            <Input
              className={styles.input}
              type="text"
              id="name"
              placeholder="name"
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <Input
              className={styles.input}
              type="email"
              id="email"
              placeholder="email"
              // value={email}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="password">
              Kata Sandi
            </label>
            <Input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              // value={password}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="new_password">
              Kata Sandi Baru
            </label>
            <Input
              className={styles.input}
              type="password"
              id="new_password"
              placeholder="New Password"
              // value={confirm_password}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="confirm_password">
              Konfirmasi Kata Sandi Baru
            </label>
            <Input
              className={styles.input}
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              // value={confirm_password}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
    </div>
  );
};

<<<<<<< HEAD
export default SettingsProfileComponent;
=======
export default ProfileComponent;
>>>>>>> c48e7a7b86fe7fda7a5fcc710910694f5f93dce5
