import React, { useState, useEffect } from 'react';
import { Card, Input, InputNumber, Button, Row, Upload, Tag } from 'antd';
import { useHistory } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import Quill from '@/components/Quill';
import styles from './index.less';

import SelectUnit from './Select/SelectUnit';
import SelectKategori from './Select/SelectKategori';
import SelectSubKategori from './Select/SelectSubKategori';

import useSelect from '@/hooks/useSelect';
import useCreate from '@/hooks/useCreateForm';

import KemasanComponent from './Kemasan';

interface Props {}

const initialState = {
  name: '',
  sku: '',
  quantity: '',
  weight: '',
};

const ProdukAddComponent: React.FC<Props> = () => {
  const history = useHistory();

  const [{ name, sku, quantity, weight }, setState] = useState(initialState);
  const [images, setFileImg] = useState([]);
  const [other_packaging, setOtherPackaging] = useState([]);

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [visible, setVisible] = useState(false);

  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [categories, onChangeCategories, onClearCategories] = useSelect('');
  const [subcategories, onChangeSubCategories, onClearSubCategories] = useSelect('');
  const [id_unit, onChangeUnit, onClearUnit] = useSelect('');

  const [loading_update, status_update, postCreate] = useCreate();

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!sku) {
      return setDisabled(true);
    }
    if (!weight) {
      return setDisabled(true);
    }
    if (!quantity) {
      return setDisabled(true);
    }
    if (!price) {
      return setDisabled(true);
    }
    if (!description) {
      return setDisabled(true);
    }
    if (!images.length) {
      return setDisabled(true);
    }
    if (!categories) {
      return setDisabled(true);
    }
    if (!subcategories) {
      return setDisabled(true);
    }
    if (!id_unit) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, sku, quantity, weight, price, description, images, subcategories, categories, id_unit]);

  const handleVisible = () => setVisible(!visible);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangePrice = (value: any) => {
    setPrice(value);
  };

  const onChangeDiscount = (value: any) => {
    setDiscount(value);
  };

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = (e: any) => {
    let list = images.filter((data) => data.uid !== e.uid);
    setFileImg(list);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setFileImg([]);
    setDescription('');
    setInformation('');
    onClearCategories();
    onClearSubCategories();
    onClearUnit();
    // onClearSubCategories();
    history.push(`/merchant/produk/select`);
  };

  let data_packaging = [];

  for (let key in other_packaging) {
    // data_packaging.push({
    //   id_product: other_packaging[key].id_product,
    //   name: other_packaging[key].name,
    // });
    data_packaging.push(other_packaging[key].id_product);
  }

  const DataJSON = {
    name,
    sku,
    quantity,
    price,
    weight,
    discount,
    id_unit: Number(id_unit),
    id_product_category: Number(categories),
    id_product_subcategory: Number(subcategories),
    other_packaging: JSON.stringify(data_packaging),
    description,
    information: !information ? '' : information,
    status: 'active',
  };

  const createProduk = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }
    for (let key in images) {
      formData.append('images[]', images[key]);
    }

    postCreate(`${REACT_APP_ENV}/merchant/products`, formData, onClearState);
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
            <InputNumber
              style={{ width: '100%' }}
              // className={styles.input}
              id="price"
              placeholder=""
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              value={price}
              onChange={onChangePrice}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="discount">
              Discount (Optional)
            </label>
            <InputNumber
              style={{ width: '100%' }}
              // className={styles.input}
              id="discount"
              placeholder=""
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              value={discount}
              onChange={onChangeDiscount}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Unit</label>
            <SelectUnit handleChange={onChangeUnit} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="weight">
              Berat Unit
            </label>
            <Input
              className={styles.input}
              type="text"
              id="weight"
              placeholder=""
              value={weight}
              onChange={onChangeState}
            />
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
            <Quill id="deskripsi" value={description} onChange={setDescription} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="informasi">
              Informasi Lain (Optional)
            </label>
            <Quill id="informasi" value={information} onChange={setInformation} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Kategori</label>
            <SelectKategori handleChange={onChangeCategories} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Sub Kategori</label>
            {categories ? (
              <SelectSubKategori
                id={String(categories)}
                handleChange={onChangeSubCategories}
                onReset={onClearSubCategories}
              />
            ) : null}
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
                <Button className={styles.button} type="primary" id="gambar">
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
            {categories && subcategories ? (
              <div className={styles.group}>
                {other_packaging.map((data, i) => (
                  <Tag key={i}>{data.name}</Tag>
                ))}
                <Tag onClick={handleVisible}>
                  <PlusOutlined /> New Tag
                </Tag>
              </div>
            ) : null}
          </div>
        </div>

        <Button
          className={styles.button}
          onClick={createProduk}
          disabled={Boolean(loading_update) || disabled}
          type="primary"
        >
          OK
        </Button>
      </Card>
      {visible ? (
        <KemasanComponent
          visible={visible}
          category={String(categories)}
          subcategory={String(subcategories)}
          onSet={setOtherPackaging}
          onCancel={handleVisible}
        />
      ) : null}
    </div>
  );
};

export default ProdukAddComponent;
