import React from 'react';
import { Card, Input, Button } from 'antd';
import styles from './index.less';

interface Props {}

const SettingsProfileComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Profile & Kata Sandi</p>
      <Card>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="nama">
              Nama
            </label>
            <Input
              className={styles.input}
              type="text"
              id="nama"
              placeholder="Nama"
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
              placeholder="Email"
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
              placeholder="Password Lama"
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
              placeholder="Password Baru"
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
              placeholder="Konfirmasi Password Baru"
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

export default SettingsProfileComponent;
