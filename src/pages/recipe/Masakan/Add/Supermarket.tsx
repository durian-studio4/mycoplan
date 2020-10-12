import React, {Fragment} from 'react'
import {Row, Button, Input} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../index.less'

import SelectMerchant from '@/components/Select/SelectMerchant';

import AutoProduk from '@/components/Autocomplete/Produk'

import {Supermarket} from './index'

interface Props {
  supermarket: Supermarket[];
  onChangeName: (v: any,o: any, i: number) => void
  onRemoveSupermarket: (e: any, i: number) => void
  onChangeProduct: (v:any, i:number, indexProduk: number) => void
  onSelectProduct: (v:any,e:any,i:number,indexProduk:number) => void
  onClearProduct: (i:number,indexProduk:number) => void
  onChangeJumlah: (e:any,i:number,indexProduk:number) => void
  onAddProduct: (e:any,i:number) => void
  onRemoveProduct: (e:any,i:number,indexProduk: number) => void
}

const SupermarketComponent: React.FC<Props> = ({supermarket, onChangeName, onRemoveSupermarket, onChangeProduct, onSelectProduct,onClearProduct, onChangeJumlah, onAddProduct, onRemoveProduct}) => {
    return (
      <>
      {supermarket.map(({ id_merchant, name_merchant, products }, i: number) => (
        <Fragment key={i}>
          <Row style={{ marginTop: '1em' }}>
            <div className={styles.box1}>
              <label htmlFor="supermarket">Supermarket {i + 1}</label>
            </div>
            <div className={styles.box4}>
              <SelectMerchant initial={name_merchant} handleChange={(v: any, o: any) => onChangeName(v, o, i)} />
            </div>
            <div className={styles.box1}>
              <Button
                className={styles.button_delete}
                type="primary"
                danger
                onClick={(e) => onRemoveSupermarket(e, i)}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </Row>
          <Row>
            {products.map((data, indexProduk) => (
              <Fragment key={indexProduk}>
                <div className={styles.box5}>
                  <Row style={{ marginTop: '1em' }}>
                    <Fragment>
                      <div className={styles.box4} style={{ marginTop: '10px' }}>
                        <label htmlFor="produk">Produk {indexProduk + 1}</label>
                      </div>
                      <div className={styles.box5} style={{ marginTop: '10px' }}>
                        {/* <SelectProduk
                          id_merchant={id_merchant}
                          handleChange={(v: any, o: any) => onChangeProduct(v, o, i, indexProduk)}
                        /> */}
                        <AutoProduk id_merchant={id_merchant} value={data.nama_product} onChange={(v: any) => onChangeProduct(v,i,indexProduk)} onSelect={(v: any, e:any) => onSelectProduct(v,e,i,indexProduk)} onClear={() => onClearProduct(i,indexProduk)}  />
                      </div>
                    </Fragment>
                  </Row>
                </div>
                <div className={styles.box3}>
                  <Row style={{ marginTop: '1em' }}>
                    <Fragment>
                      <div
                        className={styles.box3}
                        style={{ textAlign: 'center', marginTop: '10px' }}
                      >
                        <label>Jumlah</label>
                      </div>
                      <div className={styles.box3} style={{ marginTop: '10px' }}>
                        <Input
                          value={data.qty}
                          onChange={(e) => onChangeJumlah(e, i, indexProduk)}
                        />
                      </div>
                    </Fragment>
                  </Row>
                </div>
                <div className={styles.box2}>
                  <Row style={{ marginTop: '1em' }}>
                    <div className={styles.box10} key={indexProduk} style={{ marginTop: '10px' }}>
                      <Button
                        className={styles.button_delete}
                        onClick={(e) => onRemoveProduct(e, i, indexProduk)}
                        disabled={Boolean(!indexProduk)}
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
            ))}
          </Row>
        </Fragment>
      ))}
      </>
    );
}

export default SupermarketComponent
