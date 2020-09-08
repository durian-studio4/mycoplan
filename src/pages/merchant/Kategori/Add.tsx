import React, { useState, useEffect } from 'react';
import { Card, Row, Upload, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

import { Kategori } from './index';

import PageLoading from '@/components/PageLoading';
interface Props {
  onCreate: ({ formData, clear }: Kategori) => void;
  onLoadButton: boolean;
}

const initialState = {
  name: '',
  id_merchant: '',
};

const MerchantKategoriAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [image, setFileImg] = useState([]);
  const [{ name, id_merchant }, setState] = useState(initialState);

  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!image.length) {
      return setDisabled(true);
    }
    if (!id_merchant) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, id_merchant, image]);

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onChangeState = (e: any) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const onRemoveImage = () => {
    setFileImg([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setFileImg([]);
  };

  const DataJSON = {
    name,
    id_merchant,
    image: image[0],
  };

  const createKategori = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    onCreate({
      formData,
      clear: onClearState,
    });
  };

  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Kategori Produk Baru</p>
        {onLoadButton ? (
          <PageLoading />
        ) : (
          <Row style={{ marginBottom: '1em' }} align="middle">
            <div className={styles.box1}>
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
            <div className={styles.box3}>
              <div className={styles.group}>
                <Input
                  id="name"
                  className={styles.input}
                  placeholder="Nama Kategori Resep"
                  value={name}
                  onChange={onChangeState}
                />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <Input
                  id="id_merchant"
                  className={styles.input}
                  placeholder="ID Merchant"
                  value={id_merchant}
                  onChange={onChangeState}
                />
              </div>
            </div>
          </Row>
        )}
        <Button
          className={styles.button}
          type="primary"
          onClick={createKategori}
          disabled={onLoadButton || isDisabled}
        >
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantKategoriAddComponent;
