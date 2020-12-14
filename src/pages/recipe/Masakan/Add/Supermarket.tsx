import React, { Fragment } from 'react';
import { Row, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../index.less';

// import SelectMerchant from '@/components/Select/SelectMerchant';

// import AutoProduk from '@/components/Autocomplete/Produk'
import AutoAlias from '@/components/Autocomplete/Alias';

import { Supermarket } from './index';

interface Props {
  supermarket: Supermarket[];
  onChangeProduct: (v: any, i: number) => void;
  onSelectProduct: (v: any, e: any, i: number) => void;
  onClearProduct: (i: number) => void;
  onChangeJumlah: (e: any, i: number) => void;
  onAddProduct: (e: any, i: number) => void;
  onRemoveProduct: (e: any, i: number) => void;
}

const SupermarketComponent: React.FC<Props> = ({
  supermarket,
  onChangeProduct,
  onSelectProduct,
  onClearProduct,
  onChangeJumlah,
  onAddProduct,
  onRemoveProduct,
}) => {
  return (
    <>
      {supermarket.map((data, i: number) => (
        <Fragment key={i}>
          <Row>
            <Fragment key={i}>
              <div className={styles.box5}>
                <Row style={{ marginTop: '1em' }}>
                  <Fragment>
                    <div className={styles.box4} style={{ marginTop: '10px' }}>
                      <label htmlFor="produk">Produk {i + 1}</label>
                    </div>
                    <div className={styles.box5} style={{ marginTop: '10px' }}>
                      <AutoAlias
                        role="admin"
                        value={data.alias}
                        onChange={(v: any) => onChangeProduct(v, i)}
                        onSelect={(v: any, e: any) => onSelectProduct(v, e, i)}
                        // onClear={() => onClearProduct(i,indexProduk)}
                      />
                    </div>
                  </Fragment>
                </Row>
              </div>
              <div className={styles.box3}>
                <Row style={{ marginTop: '1em' }}>
                  <Fragment>
                    <div className={styles.box3} style={{ textAlign: 'center', marginTop: '10px' }}>
                      <label>Jumlah</label>
                    </div>
                    <div className={styles.box3} style={{ marginTop: '10px' }}>
                      <Input value={data.qty} onChange={(e) => onChangeJumlah(e, i)} />
                    </div>
                  </Fragment>
                </Row>
              </div>
              <div className={styles.box2}>
                <Row style={{ marginTop: '1em' }}>
                  <div className={styles.box10} key={i} style={{ marginTop: '10px' }}>
                    <Button
                      className={styles.button_delete}
                      onClick={(e) => onRemoveProduct(e, i)}
                      disabled={Boolean(!i)}
                      type="primary"
                      danger
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button
                      className={styles.button_add}
                      onClick={(e) => onAddProduct(e, i)}
                      type="primary"
                    >
                      <PlusOutlined />
                    </Button>
                  </div>
                </Row>
              </div>
            </Fragment>
          </Row>
        </Fragment>
      ))}
    </>
  );
};

export default SupermarketComponent;
