import React, { useState, useEffect } from 'react';
import { Card, Row, Input, Button } from 'antd';
import styles from './index.less';

import SelectKategori from '@/components/Select/SelectKategori';

import useSelect from '@/hooks/useSelect';

import PageLoading from '@/components/PageLoading';

import { Kategori } from './index';

interface Props {
  onCreate: ({ json, clear }: Kategori) => void;
  onLoadButton: boolean;
}

const MerchantKategoriAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [id_product_category, onChangeCategories, onClearCategories] = useSelect('');

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!id_product_category) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, id_product_category]);

  const onChangeState = (e: { target: HTMLInputElement }) => setName(e.target.value);

  const onClearState = () => {
    setName('');
    onClearCategories();
  };

  const createKategori = () => {
    onCreate({
      json: { name, id_product_category },
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
          <Row style={{ marginBottom: '1em' }}>
            <div className={styles.col}>
              <div className={styles.box3}>
                <SelectKategori handleChange={onChangeCategories} />
              </div>
              <br />
              <div className={styles.box3}>
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

export default MerchantKategoriAddComponent;
