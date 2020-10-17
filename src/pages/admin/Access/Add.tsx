import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button } from 'antd';
import styles from './index.less';

import SelectPeran from '@/components/Select/SelectPeran';

import useSelect from '@/hooks/useSelect';

import { Admin } from './index';
interface Props {
  visible: boolean;
  onCreate: ({ json, clear }: Admin) => void;
  onCancel: () => void;
  onLoadButton: boolean;
}

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const AddComponent: React.FC<Props> = ({ visible, onCreate, onCancel, onLoadButton }) => {
  const [{ name, email, password, password_confirmation }, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);

  const [role, onChangeRole, onClearRole] = useSelect('Master');

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!email) {
      return setDisabled(true);
    }
    if (!password) {
      return setDisabled(true);
    }
    if (!password_confirmation) {
      return setDisabled(true);
    }
    if (password !== password_confirmation) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, email, password_confirmation, password]);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onClearState = () => {
    setState({ ...initialState });
    onCancel();
  };

  const DataJSON = JSON.stringify({
    name,
    email,
    password,
    password_confirmation,
    role,
    status: 'active',
  });

  const createAdmin = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Tambah Akses" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama
            </label>
            <Input
              className={styles.input}
              type="text"
              id="name"
              placeholder="Nama"
              value={name}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="password">
              Kata Sandi
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="password_confirmation">
              Konfirmasi Kata Sandi
            </label>
            <Input
              type="password"
              id="password_confirmation"
              placeholder="Kata Sandi"
              value={password_confirmation}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Peran</label>
            <SelectPeran initial="Master" handleChange={onChangeRole} />
          </div>
        </div>
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          disabled={onLoadButton}
          onClick={onClearState}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          onClick={createAdmin}
          disabled={isDisabled || onLoadButton}
          type="primary"
        >
          OK
        </Button>
      </Row>
    </Modal>
  );
};

export default AddComponent;
