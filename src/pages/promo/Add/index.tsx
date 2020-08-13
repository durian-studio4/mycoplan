import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, TimePicker, DatePicker } from 'antd';
import styles from '../index.less';

import SelectPromo from '@/components/Select/SelectPromo';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const AddComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} title="Buat Promo" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="no_id">
              Kategori Promo
            </label>
            <SelectPromo />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="promo">
              Kode Promo
            </label>
            <Input
              className={styles.input}
              type="text"
              id="promo"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="diskon">
              Diskon
            </label>
            <Input
              addonAfter="%"
              type="text"
              id="diskon"
              placeholder=""
              // value={email}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="max_diskon">
              Maks. Diskon
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="max_diskon"
              placeholder=""
              // value={username}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="min_belanja">
              Min. Belanja
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="min_belanja"
              placeholder=""
              // value={username}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Waktu Mulai</label>
            <Row>
              <DatePicker className={styles.picker} style={{ marginRight: '5px' }} />
              <TimePicker className={styles.picker} />
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Waktu Akhir</label>
            <Row>
              <DatePicker className={styles.picker} style={{ marginRight: '5px' }} />
              <TimePicker className={styles.picker} />
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="limit">
              Limit
            </label>
            <Input
              addonAfter="/ Pengguna"
              type="text"
              id="limit"
              placeholder=""
              // value={email}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="max_penukaran">
              Maks. Penukaran
            </label>
            <Input
              type="text"
              id="max_penukaran"
              placeholder=""
              // value={username}
              // onChange={handleChangeState}
            />
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
