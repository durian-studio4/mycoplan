import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Upload, InputNumber, Tag } from 'antd';
import { history, useParams } from 'umi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Quill from '@/components/Quill';
import styles from './index.less';

import SelectUnit from './Select/SelectUnit';
import SelectKategori from './Select/SelectKategori';
import SelectSubKategori from './Select/SelectSubKategori';

import useSelect from '@/hooks/useSelect';
import useCreate from '@/hooks/useCreateForm';
import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

import KemasanComponent from './Kemasan';

interface Props {}

const initialState = {
  name: '',
  sku: '',
  quantity: '',
  weight: '',
};

const ProdukUpdateComponent: React.FC<Props> = () => {
  const { id } = useParams();

  const [{ name, sku, quantity, weight }, setState] = useState(initialState);
  const [images, setFileImg] = useState([]);
  const [other_packaging, setOtherPackaging] = useState([]);

  const [deleteImages, setDeleteImages] = useState([]);
  const [clear, setClear] = useState([]);

  const [visible, setVisible] = useState(false);

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('');

  const [id_merchant, setIdMerchant] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate] = useCreate();

  const [categories, onChangeCategories, onClearCategories] = useSelect(
    data_list.id_product_category,
  );
  const [subcategories, onChangeSubCategories, onClearSubCategories] = useSelect(
    data_list.id_product_subcategory,
  );
  const [id_unit, onChangeUnit, onClearUnit] = useSelect(data_list.id_unit);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/merchant/products/${id}`);
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
          images,
          information,
          description,
          id_merchant,
          weight,
        } = data_list;
        setState({
          name,
          sku,
          quantity,
          weight,
        });
        setPrice(price);
        setDiscount(discount);
        setIdMerchant(id_merchant);
        setInformation(information);
        setDescription(description);
        setOtherPackaging(other_packaging);
        setClear(images);
      }
    }, 0);
    return () => clearTimeout(timeOut);
  }, [data_list]);

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
  }, [name, sku, weight, quantity, price, description, subcategories, categories, id_unit]);

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

  const onClearImage = (id: string) => {
    let list = clear.filter((data: any) => data.id !== id);
    setDeleteImages((state) => [...state, id]);
    setClear(list);
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

  let data_packaging: any = [];

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
    weight,
    discount,
    id_unit: String(id_unit),
    id_product_category: String(categories),
    id_product_subcategory: String(subcategories),
    other_packaging: JSON.stringify(data_packaging),
    description,
    information: !information ? '' : information,
    status: 'active',
  };

  const updateProduk = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    if (images.length) {
      for (let key in images) {
        formData.append('images[]', images[key]);
      }
    }

    if (deleteImages.length) {
      for (let key in deleteImages) {
        formData.append('delete_image_ids[]', deleteImages[key]);
      }
    }

    postCreate(`${REACT_APP_ENV}/merchant/products/${id}?_method=put`, formData, onClearState);
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
                Harga Final
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
                Harga Discount (Optional)
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
              <SelectUnit
                handleChange={onChangeUnit}
                initial={data_list.unit && data_list.unit.name}
              />
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
              <Quill id="deskripsi" value={description || ''} onChange={setDescription} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="informasi">
                Informasi Lain (Optional)
              </label>
              <Quill id="informasi" value={information || ''} onChange={setInformation} />
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
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Sub Kategori</label>
              {categories ? (
                <SelectSubKategori
                  id={String(categories)}
                  initial={data_list.product_subcategory && data_list.product_subcategory.name}
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
          {clear &&
            clear.map((data: any, i: number) => (
              <div className={styles.box10} key={i}>
                <div className={styles.group}>
                  <Row>
                    <img
                      alt="produk-image"
                      src={data.url}
                      style={{ width: '50%', height: '200px', objectFit: 'contain' }}
                    />
                    <Button
                      className={styles.button}
                      type="primary"
                      onClick={() => onClearImage(data.id)}
                    >
                      <MinusOutlined />
                    </Button>
                  </Row>
                </div>
              </div>
            ))}
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="">
                Kemasan Lain (Opsional)
              </label>
              {categories && subcategories ? (
                <div className={styles.group}>
                  {other_packaging &&
                    other_packaging.map((data, i) => <Tag key={i}>{data.name}</Tag>)}
                  <Tag onClick={handleVisible}>
                    <PlusOutlined /> New Tag
                  </Tag>
                </div>
              ) : null}
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
        <KemasanComponent
          visible={visible}
          onSet={setOtherPackaging}
          onCancel={handleVisible}
          id_merchant={id_merchant}
          category={String(categories)}
          subcategory={String(subcategories)}
        />
      ) : null}
    </div>
  );
};

export default ProdukUpdateComponent;
