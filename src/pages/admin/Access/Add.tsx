import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, TimePicker, DatePicker } from 'antd';
import styles from './index.less';

import SelectPeran from '@/components/Select/SelectPeran';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const AddComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} title="Tambah Akses" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="nama">
              Nama
            </label>
            <Input
              className={styles.input}
              type="text"
              id="nama"
              placeholder=""
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
              type="email"
              id="email"
              placeholder=""
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
              type="password"
              id="password"
              placeholder=""
              // value={username}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Peran</label>
            <SelectPeran />
          </div>
        </div>
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          // disabled={onLoadButton}
          // onClick={handleClearState}
          onClick={onCancel}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          // onClick={createKaryawan}
          // disabled={isDisabled || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default AddComponent;
