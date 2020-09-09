import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Upload, Button } from 'antd';
import styles from './index.less';

import SelectKategori from '@/components/Select/SelectKategori';

import useFetch from '@/hooks/useFetch';
import useSelect from '@/hooks/useSelect';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ formData }: any) => void;
  onLoadButton: boolean;
}

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [name, setName] = useState('');

  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  const [id_product, onChangeProduct, onClearProduct] = useSelect(data_update.id_product_category);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/product/subcategories/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_update) {
      setName(data_update.name);
    }
  }, [data_update]);

  const onChangeState = (e: any) => {
    const { value } = e.target;

    setName(value);
  };

  const onClearState = () => {
    setName('');
    onClearProduct();
    onCancel();
  };

  const DataJSON = {
    name,
    id_product_category: String(id_product),
  };

  const updateKategori = () => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }
    onUpdate({
      formData: formData,
    });
    onClearState();
  };

  return (
    <Modal visible={visible} title="Update Kategori" closable={false} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <SelectKategori
                handleChange={onChangeProduct}
                // initial={data_update.merchant && data_update.merchant.name}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <Input
                className={styles.input}
                placeholder="Nama Kategori Resep"
                value={name}
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
          onClick={updateKategori}
          disabled={!name || !id_product || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default UpdateComponent;
