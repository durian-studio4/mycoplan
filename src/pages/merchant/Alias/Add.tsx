import React, { useState } from 'react';
import { Card, Row, Input, Button } from 'antd';
import styles from './index.less';

import { Unit } from './index';
interface Props {
  onCreate: ({ json, clear }: Unit) => void;
  onLoadButton: boolean;
}

const MerchantUnitProdukAddComponent: React.FC<Props> = ({ onCreate, onLoadButton }) => {
  const [alias, setAlias] = useState('');

  const onChangeState = (e: { target: HTMLInputElement }) => setAlias(e.target.value);

  const onClearState = () => setAlias('');

  const createAlias = () => {
    const formData = new FormData();
    formData.append('alias', alias);
    onCreate({
      json: formData,
      clear: onClearState,
    });
  };

  return (
    <div style={{ margin: '1em 0px' }}>
      <Card>
        <p className={styles.title}>Alias Produk Baru</p>
        <Row style={{ marginBottom: '1em' }}>
          <div className={styles.box3}>
            <Input
              className={styles.input}
              placeholder="Alias Produk"
              value={alias}
              onChange={onChangeState}
            />
          </div>
        </Row>
        <Button
          className={styles.button}
          disabled={!alias || onLoadButton}
          onClick={createAlias}
          type="primary"
        >
          Simpan
        </Button>
      </Card>
    </div>
  );
};

export default MerchantUnitProdukAddComponent;
