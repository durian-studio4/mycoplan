import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { history, useParams } from 'umi';
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
import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

import KemasanComponent from '../ProdukAdd/Kemasan';

interface Props {}

const initialState = {
  name: '',
  sku: '',
  quantity: '',
  price: '',
  discount: '',
};

const ProdukUpdateComponent: React.FC<Props> = () => {
  const { id } = useParams();

  const [{ name, sku, quantity, price, discount }, setState] = useState(initialState);
  const [images, setFileImg] = useState([]);
  const [other_packaging, setOtherPackaging] = useState([]);

  const [visible, setVisible] = useState(false);

  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate] = useCreate();

  const [categories, onChangeCategories, onClearCategories] = useSelect(
    data_list.id_product_category,
  );
  const [id_merchant, onChangeMerchant, onClearMerchant] = useSelect(data_list.id_merchant);
  const [id_unit, onChangeUnit, onClearUnit] = useSelect(data_list.id_unit);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/products/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data_list) {
        const {
          name,
          sku,
          quantity,
          price,
          discount,
          other_packaging,
          information,
          description,
        } = data_list;
        setState({
          name,
          sku,
          quantity,
          price,
          discount,
        });
        setInformation(information);
        setDescription(description);
        setOtherPackaging(other_packaging);
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [data_list]);

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

  // // reCreate new Object and set File Data into it
  // let data_img: any = [];

  // for (let key in images) {
  //   data_img.push({
  //     uid: images[key].uid,
  //     name: images[key].name,
  //     lastModified: images[key].lastModified,
  //     lastModifiedDate: images[key].lastModifiedDate,
  //     webkitRelativePath: images[key].webkitRelativePath,
  //     size: images[key].size,
  //     type: images[key].type,
  //   });
  // }

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

  const updateProduk = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    for (let key in images) {
      formData.append('images[]', images[key]);
    }

    postCreate(`${REACT_APP_ENV}/admin/products/${id}?_method=put`, formData, onClearState);
  };

  return (
    <div>
      <p className={styles.title}>Edit Produk</p>
      {status_list !== 200 || error_list ? <PageError /> : null}
      {Boolean(loading_list) ? (
        <PageLoading />
      ) : (
        <Card>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="name">
                Nama Merchant
              </label>
              <SelectMerchant
                handleChange={onChangeMerchant}
                initial={data_list.merchant && data_list.merchant.name}
              />
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
              <label className={styles.label}>Unit</label>
              <SelectUnit
                handleChange={onChangeUnit}
                initial={data_list.unit && data_list.unit.name}
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
              <ReactQuill theme="snow" value={description || ''} onChange={setDescription} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="informasi">
                Informasi Lain
              </label>
              <ReactQuill theme="snow" value={information || ''} onChange={setInformation} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Kategori</label>
              <SelectKategori
                handleChange={onChangeCategories}
                initial={data_list.product_category && data_list.product_category.name}
              />
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
                {other_packaging && other_packaging.map((data) => <Tag>{data.name}</Tag>)}
                <Tag onClick={handleVisible}>
                  <PlusOutlined /> New Tag
                </Tag>
              </div>
            </div>
          </div>

          <Button
            className={styles.button}
            onClick={updateProduk}
            disabled={Boolean(loading_update) || disabled}
            type="primary"
          >
            Simpan
          </Button>
        </Card>
      )}
      {visible ? (
        <KemasanComponent visible={visible} onSet={setOtherPackaging} onCancel={handleVisible} />
      ) : null}
    </div>
  );
};

export default ProdukUpdateComponent;
