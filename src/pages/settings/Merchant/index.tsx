import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageLoading from '@/components/PageLoading';
import PageError from '@/components/PageError';

interface Props {}

const initialState = {
  name: '',
  email: '',
  new_password: '',
  confirm_password: '',
};

const SettingsProfileComponent: React.FC<Props> = () => {
  const [{ name, email, confirm_password, new_password }, setState] = useState(initialState);

  const [isDisabled, setDisabled] = useState(false);

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/details`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    if (!new_password) {
      return setDisabled(true);
    }
    if (!confirm_password) {
      return setDisabled(true);
    }
    if (new_password !== confirm_password) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [new_password, confirm_password]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setState({ ...data_list });
      localStorage.setItem('name', data_list.name);
    }, 100);
    return () => clearTimeout(timeOut);
  }, [data_list]);

  const handleChangeState = (e: any) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const DataJSON = {
    password: new_password,
  };

  const updateSettings = () => {
    postUpdate(`${REACT_APP_ENV}/merchant/details`, JSON.stringify(DataJSON));
  };

  if (error_list || status_list !== 200) {
    return <PageError />;
  }

  return (
    <div>
      <p className={styles.title}>Profil & Kata Sandi</p>
      {loading_list ? (
        <PageLoading />
      ) : (
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
                placeholder="Name"
                value={name}
                disabled={true}
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
                disabled={true}
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
          <Button
            className={styles.button}
            onClick={updateSettings}
            type="primary"
            disabled={Boolean(loading_update) || isDisabled}
          >
            OK
          </Button>
        </Card>
      )}
    </div>
  );
};

export default SettingsProfileComponent;
