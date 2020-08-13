import React, { useState, useEffect } from 'react';
import { Card, Row, Input, Button, TimePicker, DatePicker, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const { TextArea } = Input;

const AddComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} title="Tambah Banner" width={800} closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="judul">
              Judul Banner
            </label>
            <Input
              className={styles.input}
              type="text"
              id="judul"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="gambar">
              Gambar
            </label>
            <Upload name="avatar" listType="picture-card" id="gambar">
              <div className={styles.group}>
                <PlusOutlined />
              </div>
            </Upload>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="deskripsi">
              Deskripsi Banner
            </label>
            <TextArea className={styles.area} id="deskripsi" placeholder="Masukkan Keterangan..." />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Waktu Mulai</label>
            <Row>
              <div className={styles.box3}>
                <DatePicker />
              </div>
              <div className={styles.box3}>
                <TimePicker />
              </div>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Waktu Akhir</label>
            <Row>
              <div className={styles.box3}>
                <DatePicker />
              </div>
              <div className={styles.box3}>
                <TimePicker />
              </div>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="syarat">
              Syarat & Ketentuan
            </label>
            <TextArea className={styles.area} id="syarat" placeholder="Masukkan Keterangan..." />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="kode">
              Kode Promo
            </label>
            <Input
              type="text"
              id="kode"
              placeholder=""
              // value={username}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="tipe">
              Tipe Banner
            </label>
            <Input
              type="text"
              id="kode"
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
