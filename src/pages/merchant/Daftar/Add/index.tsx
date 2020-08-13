import React, { useState, useEffect } from 'react';
import { Card, Row, Input, Button, TimePicker, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const { TextArea } = Input;
const { RangePicker } = TimePicker;

const AddComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} title="Tambah Merchant" width={800} closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="nama_merchant">
              Nama Merchant
            </label>
            <Input
              className={styles.input}
              type="text"
              id="nama_merchant"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="logo">
              Logo Merchant
            </label>
            <Upload name="avatar" listType="picture-card" id="logo">
              <div className={styles.group}>
                <PlusOutlined />
              </div>
            </Upload>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="max_diskon">
              Pin Alamat
            </label>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="alamat">
              Alamat Merchant
            </label>
            <TextArea className={styles.area} id="alamat" placeholder="Masukkan Keterangan..." />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="deskripsi">
              Deskripsi Merchant
            </label>
            <TextArea className={styles.area} id="deskripsi" placeholder="Masukkan Keterangan..." />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Senen</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Selasa</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Rabu</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Kamis</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Jumat</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Sabtu</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Minggu</label>
            <Row>
              <RangePicker className={styles.picker} />
              <Button className={styles.button_schedule}>Disabled</Button>
            </Row>
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
