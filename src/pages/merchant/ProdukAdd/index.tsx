import React, { useState } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

import SelectUnit from '@/components/Select/SelectUnit';
import SelectKategori from '@/components/Select/SelectKategori';
import SelectSubKategori from '@/components/Select/SelectSubKategori';

import useSelect from '@/hooks/useSelect';

import KemasanComponent from './Kemasan';

interface Props {}

const initialState = {
  name: '',
  sku: '',
  quantity: '',
  price: '',
  discount: '',
};

const ProdukAddComponent: React.FC<Props> = () => {
  const [{ name, sku, quantity, price, discount }, setState] = useState(initialState);
  const [image, setFileImg] = useState([]);

  const [visible, setVisible] = useState(false);

  const [valueDeskripsi, setValueDeskripsi] = useState('');
  const [valueInformasi, setValueInformasi] = useState('');

  const [categories, onChangeCategories, onClearCategories] = useSelect('0');
  const [sub_categories, onChangeSubCategories, onClearSubCategories] = useSelect('0');

  const handleVisible = () => setVisible(!visible);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = () => {
    setFileImg([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setFileImg([]);
    setValueDeskripsi('');
    setValueInformasi('');
    onClearCategories();
    onClearSubCategories();
  };

  const DataJSON = {
    name,
    sku,
    quantity,
    price,
    discount,
    image,
    description: valueDeskripsi,
    information: valueInformasi,
  };

  return (
    <div>
      <p className={styles.title}>Tambah Produk</p>
      <Card>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama Produk
            </label>
            <Input
              className={styles.input}
              type="text"
              id="name"
              placeholder=""
              value={name}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="price">
              Harga
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="price"
              placeholder=""
              value={price}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="discount">
              Harga Diskon (Optional)
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="discount"
              placeholder=""
              value={discount}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="qty">
              Unit
            </label>
            <Row>
              <div className={styles.box_unit_left}>
                <Input
                  className={styles.input}
                  id="qty"
                  placeholder="0"
                  // value={qty}
                  // onChange={onChangeQty}
                />
              </div>
              <div className={styles.box_unit_right}>
                <SelectUnit />
              </div>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="sku">
              SKU
            </label>
            <Input
              className={styles.input}
              type="text"
              id="sku"
              placeholder=""
              value={sku}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="quantity">
              Stok
            </label>
            <Input
              className={styles.input}
              type="text"
              id="quantity"
              placeholder=""
              value={quantity}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="deskripsi">
              Deskripsi Produk
            </label>
            <ReactQuill theme="snow" value={valueDeskripsi} onChange={setValueDeskripsi} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="informasi">
              Informasi Lain
            </label>
            <ReactQuill theme="snow" value={valueInformasi} onChange={setValueInformasi} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="kategori">
              Kategori
            </label>
            <SelectKategori />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="sub-kategori">
              Sub Kategori
            </label>
            <SelectSubKategori />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="gambar">
              Gambar
            </label>
            <div>
              <Upload
                name="avatar"
                listType="picture"
                onRemove={onRemoveImage}
                beforeUpload={onChangeImage}
              >
                <Button
                  className={styles.button}
                  type="primary"
                  id="gambar"
                  disabled={Boolean(image.length)}
                >
                  Upload
                  <PlusOutlined />
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="">
              Kemasan Lain (Opsional)
            </label>
            <div className={styles.group}>
              <Tag onClick={handleVisible}>
                <PlusOutlined /> New Tag
              </Tag>
            </div>
          </div>
        </div>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
      {visible ? <KemasanComponent visible={visible} onCancel={handleVisible} /> : null}
    </div>
  );
};

export default ProdukAddComponent;
