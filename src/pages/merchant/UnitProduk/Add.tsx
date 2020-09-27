import React, { useState } from 'react';
import { Card, Row, Input, Button } from 'antd';
import styles from './index.less';

import { Unit } from './index';
interface Props {
  onCreate: ({ json, clear }: Unit) => void;
  onLoadButton: boolean;
}

const MerchantUnitProdukAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [name, setName] = useState('');

  const onChangeState = (e: { target: HTMLInputElement }) => setName(e.target.value);

  const onClearState = () => setName('');

  const createUnit = () => {
    const formData = new FormData();
    formData.append('name', name);
    onCreate({
      json: formData,
      clear: onClearState,
    });
  };

  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Unit Produk Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box3}>
            <Input
              className={styles.input}
              placeholder="Unit Produk"
              value={name}
              onChange={onChangeState}
            />
          </div>
        </Row>
        <Button
          className={styles.button}
          disabled={!name || onLoadButton}
          onClick={createUnit}
          type="primary"
        >
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantUnitProdukAddComponent;
