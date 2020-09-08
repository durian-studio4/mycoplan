import React, { useState } from 'react';
import { Card, Row, Input, Button } from 'antd';
import styles from './index.less';

import SelectAll from '@/components/Select/SelectAll';

import useSelect from '@/hooks/useSelect';

import { Kategori } from './index';

interface Props {
  onCreate: ({ json, clear }: Kategori) => void;
  onLoadButton: boolean;
}

const MerchantKategoriAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [name, setName] = useState('');

  const [id_product_category, onChangeCategories, onClearCategories] = useSelect('0');

  const onChangeState = (e: { target: HTMLInputElement }) => setName(e.target.value);

  const onClearState = () => {
    setName('');
    onClearCategories();
  };

  const createUnit = () => {
    onCreate({
      json: { name, id_product_category },
      clear: onClearState,
    });
  };

  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Sub Kategori Produk Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.col}>
            <div className={styles.box3}>
              <SelectAll initial="Daging" />
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
        <Button
          className={styles.button}
          type="primary"
          disabled={onLoadButton}
          onClick={createUnit}
        >
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantKategoriAddComponent;
