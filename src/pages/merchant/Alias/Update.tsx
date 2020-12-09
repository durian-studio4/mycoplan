import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button } from 'antd';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ json }: any) => void;
  onLoadButton: boolean;
}

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [alias, setAlias] = useState('');
  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/product-aliases/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data_update) {
      const data = data_update && data_update.alias;
      setAlias(data);
    }
  }, [data_update]);

  const onChangeState = (e: { target: HTMLInputElement }) => {
    const { value } = e.target;
    setAlias(value);
  };

  const onClearState = () => {
    setAlias('');
    onCancel();
  };

  const updateUnit = () => {
    onUpdate({
      json: { alias },
    });
    onClearState();
  };

  return (
    <Modal visible={visible} title="Update Alias Produk" closable={false} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="alias">
                Alias Produk
              </label>
              <Input
                className={styles.input}
                type="text"
                id="alias"
                placeholder="Alias Produk"
                value={alias}
                onChange={onChangeState}
              />
            </div>
          </div>
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
          onClick={updateUnit}
          disabled={!name || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default UpdateComponent;
