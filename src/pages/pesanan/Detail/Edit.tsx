import React, { useEffect, useState } from 'react';
import { Modal, Button, Col, Row, Input, InputNumber } from 'antd';
import styles from './index.less';

import SelectPenyesuaianHarga from '@/components/Select/SelectPenyesuaianHarga';
import SelectPenyesuaianJenis from '@/components/Select/SelectPenyesuaianJenis';

import useFetch from '@/hooks/useFetch';
import useSelect from '@/hooks/useSelect';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  id_edit: string;
  name_product: string;
  onLoadButton: boolean;
  onUpdate: ({ json, clear }: any) => void;
  onCancel: () => void;
}

const EditComponent: React.FC<Props> = ({
  visible,
  id_edit,
  name_product,
  onLoadButton,
  onCancel,
  onUpdate,
}) => {
  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  const [note, setNote] = useState(0);
  const [value, setValue] = useState(0);

  const [isDisabled, setDisabled] = useState(false);

  const [type, onChangeType, onClearType] = useSelect(data_update.type);
  const [condition, onChangeCondition, onClearCondition] = useSelect(data_update.value_condition);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/transaction-adjustments/${id_edit}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_edit]);

  useEffect(() => {
    if (data_update) {
      setNote(data_update.note);
      setValue(data_update.value);
    }
  }, [data_update]);

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
    id_product: data_update.id_product,
    id_transaction: data_update.id_transaction,
  };

  const updateTransaction = () => {
    onUpdate({
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
      {status_update !== 200 || error_update ? <PageError /> : null}
      {Boolean(loading_update) ? (
        <PageLoading />
      ) : (
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
                  <SelectPenyesuaianJenis
                    initial={data_update.type == 'price' ? 'Harga' : 'Stok'}
                    handleChange={onChangeType}
                  />
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
                  <label className={styles.label} htmlFor="penyesuaian">
                    Penyesuaian Harga
                  </label>
                  <Row justify="space-between">
                    <div className={styles.box3}>
                      <SelectPenyesuaianHarga
                        initial={data_update.value_condition == 'add' ? '+' : '-'}
                        handleChange={onChangeCondition}
                      />
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
      )}
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
          disabled={isDisabled || onLoadButton}
          onClick={updateTransaction}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default EditComponent;
