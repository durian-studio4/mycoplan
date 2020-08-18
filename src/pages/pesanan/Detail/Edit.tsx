import React, { useEffect, useState } from 'react';
import { Modal, Button, Col, Row, Input } from 'antd';
import styles from './index.less';

import SelectPenyesuaianHarga from '@/components/Select/SelectPenyesuaianHarga';
import SelectPenyesuaianJenis from '@/components/Select/SelectPenyesuaianJenis';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const EditComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="Penyesuaian Harga & Stok"
      width={1000}
      closable={false}
      footer={null}
    >
      <div className={styles.modal_body}>
        <Col>
          <Row>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="produk">
                  Nama Produk
                </label>
                <Input
                  className={styles.input}
                  type="text"
                  id="produk"
                  // value={format(data_list.tanggal, 'dd/MM/yyyy')}
                  disabled={true}
                />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="jenis">
                  Jenis Penyesuaian
                </label>
                <SelectPenyesuaianJenis />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="keterangan">
                  Keterangan
                </label>
                <Input addonBefore="Rp." type="text" id="keterangan" />
              </div>
            </div>
          </Row>
          <Row>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="penyesuaian">
                  Penyesuaian Harga
                </label>
                <Row justify="space-between">
                  <div className={styles.box3}>
                    <SelectPenyesuaianHarga />
                  </div>
                  <div className={styles.box6}>
                    <Input
                      className={styles.input}
                      id="penyesuaian"
                      placeholder="0"
                      // value={qty}
                      // onChange={onChangeQty}
                    />
                  </div>
                </Row>
              </div>
            </div>
          </Row>
        </Col>
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          // disabled={isDisabled || Boolean(loading_list)}
          // onClick={onEdit}
          onClick={onCancel}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          // disabled={isDisabled || Boolean(loading_list)}
          // onClick={onEdit}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default EditComponent;
