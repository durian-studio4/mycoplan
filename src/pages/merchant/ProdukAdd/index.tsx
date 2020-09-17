import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

import SelectUnit from '@/components/Select/SelectUnit';
import SelectKategori from '@/components/Select/SelectKategori';
import SelectMerchant from '@/components/Select/SelectMerchant';
// import SelectSubKategori from '@/components/Select/SelectSubKategori';

import useSelect from '@/hooks/useSelect';
import useCreate from '@/hooks/useCreateForm';

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
  const [images, setFileImg] = useState([]);
  const [other_packaging, setOtherPackaging] = useState([]);

  const [visible, setVisible] = useState(false);

  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [categories, onChangeCategories, onClearCategories] = useSelect('');
  const [id_merchant, onChangeMerchant, onClearMerchant] = useSelect('');
  const [id_unit, onChangeUnit, onClearUnit] = useSelect('');

  const [loading_update, status_update, postCreate] = useCreate();

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!sku) {
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
    if (!information) {
      return setDisabled(true);
    }
    if (!images.length) {
      return setDisabled(true);
    }
    if (!other_packaging.length) {
      return setDisabled(true);
    }
    if (!categories) {
      return setDisabled(true);
    }
    if (!id_merchant) {
      return setDisabled(true);
    }
    if (!id_unit) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [
    name,
    sku,
    quantity,
    price,
    description,
    information,
    images,
    other_packaging,
    categories,
    id_merchant,
    id_unit,
  ]);

  const handleVisible = () => setVisible(!visible);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
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
    onClearMerchant();
    onClearCategories();
    onClearUnit();
    // onClearSubCategories();
    history.push('/merchant/produk');
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
    discount,
    id_merchant: String(id_merchant),
    id_unit: String(id_unit),
    id_product_category: String(categories),
    other_packaging: JSON.stringify(data_packaging),
    description,
    information,
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

    postCreate(`${REACT_APP_ENV}/admin/products`, formData, onClearState);
  };

  return (
    <div>
      <p className={styles.title}>Tambah Produk</p>
      <Card>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama Merchant
            </label>
            <SelectMerchant handleChange={onChangeMerchant} />
          </div>
        </div>
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
            <label className={styles.label} htmlFor="quantity">
              Unit
            </label>
            <SelectUnit handleChange={onChangeUnit} />
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
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="informasi">
              Informasi Lain
            </label>
            <ReactQuill theme="snow" value={information} onChange={setInformation} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Kategori</label>
            <SelectKategori handleChange={onChangeCategories} />
          </div>
        </div>
        {/* <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label}>Sub Kategori</label>
            <SelectSubKategori handleChange={onChangeSubCategories} />
          </div>
        </div> */}
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
            <div className={styles.group}>
              {other_packaging.map((data) => (
                <Tag>{data.name}</Tag>
              ))}
              <Tag onClick={handleVisible}>
                <PlusOutlined /> New Tag
              </Tag>
            </div>
          </div>
        </div>

        <Button
          className={styles.button}
          onClick={createProduk}
          disabled={Boolean(loading_update) || disabled}
          type="primary"
        >
          Simpan
        </Button>
      </Card>
      {visible ? (
        <KemasanComponent visible={visible} onSet={setOtherPackaging} onCancel={handleVisible} />
      ) : null}
    </div>
  );
};

export default ProdukAddComponent;
