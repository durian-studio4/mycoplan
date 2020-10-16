import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Row, Input, InputNumber } from 'antd';
import styles from './index.less';

import SelectPenyesuaianHarga from '@/components/Select/SelectPenyesuaianHarga';
import SelectPenyesuaianJenis from '@/components/Select/SelectPenyesuaianJenis';

import useSelect from '@/hooks/useSelect';

interface Props {
  visible: boolean;
  id_product: string;
  id_transaction: string;
  name_product: string;
  onCreate: ({ json, clear }: any) => void;
  onCancel: () => void;
  onLoadButton: boolean;
}

const AddComponent: React.FC<Props> = ({
  visible,
  id_product,
  id_transaction,
  name_product,
  onCreate,
  onCancel,
  onLoadButton,
}) => {
  const [note, setNote] = useState(0);
  const [value, setValue] = useState(0);

  const [isDisabled, setDisabled] = useState(false);

  const [type, onChangeType, onClearType] = useSelect('price');
  const [condition, onChangeCondition, onClearCondition] = useSelect('add');

  useEffect(() => {
    if (!note) {
      return setDisabled(true);
    }
    if (!value) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [note, value]);

  const onChangeValue = (value: any) => {
    setValue(value);
  };

  const onChangeNote = (value: any) => {
    setNote(value);
  };

  const onClearState = () => {
    setNote(0);
    setValue(0);
    onClearType();
    onClearCondition();
    onCancel();
  };

  const DataJSON = {
    note,
    value,
    type,
    value_condition: condition,
    id_product,
    id_transaction,
  };

  const createTransaction = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

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
                  value={name_product}
                  disabled={true}
                />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="jenis">
                  Jenis Penyesuaian
                </label>
                <SelectPenyesuaianJenis initial="Harga" handleChange={onChangeType} />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="keterangan">
                  Keterangan
                </label>
                <InputNumber
                  style={{ width: '100%' }}
                  // className={styles.input}
                  id="keterangan"
                  placeholder=""
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  value={note}
                  onChange={onChangeNote}
                />
              </div>
            </div>
          </Row>
          <Row>
            <div className={styles.box3}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="value">
                  Penyesuaian Harga
                </label>
                <Row justify="space-between">
                  <div className={styles.box3}>
                    <SelectPenyesuaianHarga initial="+" handleChange={onChangeCondition} />
                  </div>
                  <div className={styles.box6}>
                    <InputNumber
                      style={{ width: '100%' }}
                      // className={styles.input}
                      id="value"
                      placeholder=""
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      value={value}
                      onChange={onChangeValue}
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
          disabled={onLoadButton}
          onClick={onCancel}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          disabled={isDisabled || onLoadButton}
          onClick={createTransaction}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default AddComponent;
