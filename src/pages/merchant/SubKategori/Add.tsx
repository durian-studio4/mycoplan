import React, { useState, useEffect } from 'react';
import { Card, Row, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

import SelectKategori from '@/components/Select/SelectKategori';

import useSelect from '@/hooks/useSelect';

import PageLoading from '@/components/PageLoading';

import { Kategori } from './index';

interface Props {
  onCreate: ({ formData, clear }: Kategori) => void;
  onLoadButton: boolean;
}

const MerchantSubKategoriAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [name, setName] = useState('');
  const [image, setFileImg] = useState([]);

  const [disabled, setDisabled] = useState(false);

  const [id_product_category, onChangeCategories, onClearCategories] = useSelect('');

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!image.length) {
      return setDisabled(true);
    }
    if (!id_product_category) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, image, id_product_category]);

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onChangeState = (e: { target: HTMLInputElement }) => setName(e.target.value);

  const onRemoveImage = () => {
    setFileImg([]);
  };

  const onClearState = () => {
    setName('');
    setFileImg([]);
    onClearCategories();
  };

  const DataJSON = {
    name,
    id_product_category: String(id_product_category),
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
        <p className={styles.title}>Sub Kategori Produk Baru</p>
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
                <SelectKategori handleChange={onChangeCategories} />
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.group}>
                <Input
                  className={styles.input}
                  placeholder="Nama"
                  value={name}
                  onChange={onChangeState}
                />
              </div>
            </div>
          </Row>
        )}
        <Button
          className={styles.button}
          type="primary"
          disabled={onLoadButton || disabled}
          onClick={createKategori}
        >
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantSubKategoriAddComponent;
