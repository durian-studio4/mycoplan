import React, { useState, useEffect } from 'react';
import { Card, Row, Upload, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

import { Kategori } from './index';
interface Props {
  onCreate: ({ formData, clear }: Kategori) => void;
  onLoadButton: boolean;
}
const MerchantKategoriAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [image, setFileImg] = useState('');
  const [name, setName] = useState('');

  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!image) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, image]);

  const onChangeImage = (file: any) => {
    setFileImg(file);
    return false;
  };

  const onChangeState = (e: any) => {
    const { value } = e.target;

    setName(value);
  };

  const onRemoveImage = () => {
    setFileImg('');
  };

  const onClearState = () => {
    setName('');
    setFileImg('');
  };

  const DataJSON = {
    name,
    image,
  };

  const createKategori = () => {
    onCreate({
      formData: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Kategori Produk Baru</p>
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
                className={styles.input}
                placeholder="Nama Kategori Resep"
                value={name}
                onChange={onChangeState}
              />
            </div>
          </div>
        </Row>
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
