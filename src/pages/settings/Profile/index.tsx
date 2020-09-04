import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import styles from './index.less';

interface Props {}

const initialState = {
  nama: '',
  email: '',
  password: '',
  new_password: '',
  confirm_password: '',
};

const SettingsProfileComponent: React.FC<Props> = () => {
  const [{ nama, email, password, new_password, confirm_password }, setState] = useState(
    initialState,
  );

  const handleChangeState = (e: any) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  return (
    <div>
      <p className={styles.title}>Profil & Kata Sandi</p>
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
              value={nama}
              onChange={handleChangeState}
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
              value={email}
              onChange={handleChangeState}
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
              placeholder="Kata Sandi Lama"
              value={password}
              onChange={handleChangeState}
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
              placeholder="Kata Sandi Baru"
              value={new_password}
              onChange={handleChangeState}
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
              placeholder="Konfirmasi Kata Sandi Baru"
              value={confirm_password}
              onChange={handleChangeState}
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
