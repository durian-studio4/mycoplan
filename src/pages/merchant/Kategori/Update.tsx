import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Upload, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from './index.less';

// import SelectMerchant from '@/components/Select/SelectMerchant';

import useFetch from '@/hooks/useFetch';
// import useSelect from '@/hooks/useSelect';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ formData, clear }: any) => void;
  onLoadButton: boolean;
}

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [image, setFileImg] = useState([]);
  const [name, setName] = useState('');

  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  // const [id_merchant, onChangeMerchant, onClearMerchant] = useSelect(data_update.id_merchant);

  const [clear, setClear] = useState([]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/product/categories/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data_update) {
        const data_name = data_update.name;
        const data_img = data_update.image;
        setName(data_name);
        setClear([data_img]);
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [data_update]);

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onChangeState = (e: any) => {
    const { value } = e.target;

    setName(value);
  };

  const onRemoveImage = () => {
    setFileImg([]);
    setClear([]);
  };

  const onClearState = () => {
    setName('');
    onRemoveImage();
    // onClearMerchant();
    onCancel();
  };

  let DataJSON = {
    name,
    // id_parent: String(id_merchant),
  };

  const updateKategori = () => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }
    onUpdate({
      formData,
      clear: onClearState,
    });
  };

  if (image.length) {
    DataJSON['image'] = image[0];
  }

  return (
    <Modal visible={visible} title="Update Kategori" closable={false} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
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
          {/* <div className={styles.box10}>
            <div className={styles.group}>
              <SelectMerchant
                handleChange={onChangeMerchant}
                initial={data_update.merchant && data_update.merchant.name}
              />
            </div>
          </div> */}
          <div className={styles.box5}>
            <Row>
              <div className={styles.group}>
                <Upload
                  name="avatar"
                  listType="picture"
                  onRemove={onRemoveImage}
                  beforeUpload={onChangeImage}
                >
                  <Button className={styles.button} type="primary" disabled={Boolean(image.length)}>
                    Upload
                    <PlusOutlined />
                  </Button>
                </Upload>
              </div>
              {Boolean(clear.length) ? (
                <div className={styles.group}>
                  <Button className={styles.button} onClick={onRemoveImage} type="primary">
                    Clear
                    <MinusOutlined />
                  </Button>
                </div>
              ) : null}
            </Row>
          </div>
          {Boolean(clear.length) ? (
            <div className={styles.box10}>
              <div className={styles.group}>
                <img
                  alt="category-image"
                  src={data_update.image}
                  style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : null}
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
