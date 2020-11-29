import React, { useState, useEffect, Fragment } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { history } from 'umi';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from '../index.less';

import SelectKesulitan from '@/components/Select/SelectKesulitan';
import SelectJenisMakanan from '@/components/Select/SelectJenisMakanan';

import KategoriComponent from './Kategori';
import SupermarketComponent from './Supermarket';

import QuillComponent from '@/components/Quill';

import useCreate from '@/hooks/useCreateForm';
import useSelect from '@/hooks/useSelect';

interface Props {}

export interface Supermarket {
  id_merchant: string;
  name_merchant: string;
  products: [
    {
      nama_product: string;
      id_product: string;
      qty: string;
    },
  ];
}

const initialState = {
  name: '',
  author: '',
  video: '',
  production_time: '',
  portion_min: '',
  portion_max: '',
};

const AddComponent: React.FC<Props> = () => {
  const [{ name, author, video, production_time, portion_max, portion_min }, setState] = useState(
    initialState,
  );
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [supermarket, setSupermarket] = useState<Supermarket[]>([]);

  const [image, setFileImg] = useState([]);
  const [categories, setCategories] = useState([]);

  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const [difficulty, onChangeDifficult, onClearDifficult] = useSelect('mudah');
  const [id_recipe_type, onChangeRecipeType, onClearRecipeType] = useSelect('1');

  const [loading_update, status_update, postCreate] = useCreate();

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!author) {
      return setDisabled(true);
    }
    if (!production_time) {
      return setDisabled(true);
    }
    if (!portion_min) {
      return setDisabled(true);
    }
    if (!portion_max) {
      return setDisabled(true);
    }
    if (!ingredients) {
      return setDisabled(true);
    }
    if (!steps) {
      return setDisabled(true);
    }
    if (!image.length) {
      return setDisabled(true);
    }
    if (!categories.length) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [
    name,
    author,
    categories,
    production_time,
    portion_min,
    portion_max,
    ingredients,
    steps,
    image,
  ]);

  const handleVisibleKategori = () => setVisible(!visible);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onAddSupermarket = () => {
    setSupermarket((state) => [
      ...state,
      {
        id_merchant: '',
        name_merchant: '',
        products: [
          {
            nama_product: '',
            id_product: '',
            qty: '',
          },
        ],
      },
    ]);
  };

  const onAddProduct = (e: any, i: number) => {
    const state = [...supermarket];
    state[i].products.push({
      nama_product: '',
      id_product: '',
      qty: '',
    });
    setSupermarket(state);
  };

  const onRemoveSupermarket = (e: any, i: number) => {
    const state = [...supermarket];
    state.splice(i, 1);
    setSupermarket(state);
  };

  const onRemoveProduct = (e: any, i: number, indexProduk: number) => {
    const state = [...supermarket];
    state[i].products.splice(indexProduk, 1);
    setSupermarket(state);
  };

  const onChangeName = (value: any, option: any, i: number) => {
    const state = [...supermarket];
    state[i].id_merchant = option.id;
    state[i].name_merchant = option.value;
    setSupermarket(state);
  };

  const onSelectProduct = (value: any, e: any, i: number, indexProduct: number) => {
    const state = [...supermarket];
    state[i].products[indexProduct].id_product = e.id;
    setSupermarket(state);
  };

  const onChangeProduct = (value: string, i: number, indexProduct: number) => {
    const state = [...supermarket];
    state[i].products[indexProduct].nama_product = value;
    setSupermarket(state);
  };

  const onChangeJumlah = (e: any, i: number, indexProduct: number) => {
    const { value } = e.target;
    const state = [...supermarket];
    state[i].products[indexProduct].qty = value;
    setSupermarket(state);
  };

  const onRemoveImage = (e: any) => {
    let list = image.filter((data) => data.uid !== e.uid);
    setFileImg(list);
  };

  const onClearProduct = (i: number, indexProduct: number) => {
    const state = [...supermarket];
    state[i].products[indexProduct].id_product = '';
    state[i].products[indexProduct].nama_product = '';
    setSupermarket(state);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setFileImg([]);
    setIngredients('');
    setSteps('');
    onClearDifficult();
    onClearRecipeType();
    history.push('/recipe/masakan');
  };

  let id_recipe_categories = [];

  for (let key in categories) {
    id_recipe_categories.push(categories[key].id);
  }

  const DataJSON = {
    name,
    author,
    video: !video ? '' : video,
    production_time,
    portion_max,
    portion_min,
    ingredients,
    steps,
    supermarkets: JSON.stringify(supermarket),
    difficulty: String(difficulty),
    id_recipe_type: String(id_recipe_type),
    id_recipe_categories: JSON.stringify(id_recipe_categories),
    status: 'active',
  };

  const createResep = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    for (let key in image) {
      formData.append('images[]', image[key]);
    }

    postCreate(`${REACT_APP_ENV}/admin/recipes`, formData, onClearState);
  };

  return (
    <div>
      <p className={styles.title}>Tambah Resep</p>
      <Card>
        <Row>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="name">
                Nama Resep
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
              <label className={styles.label} htmlFor="author">
                Pembuat
              </label>
              <Input
                type="text"
                id="author"
                placeholder=""
                value={author}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="bahan">
                Bahan
              </label>
              <QuillComponent value={ingredients} id="bahan" onChange={setIngredients} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="step">
                Cara Masak
              </label>
              <QuillComponent value={steps} id="step" onChange={setSteps} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="video">
                Link Youtube (Optional)
              </label>
              <Input type="text" id="video" placeholder="" value={video} onChange={onChangeState} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="production_time">
                Durasi Masak
              </label>
              <Input
                addonAfter="Menit"
                id="production_time"
                placeholder="0"
                value={production_time}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="portion_min">
                Porsi
              </label>
              <Row>
                <div className={styles.box_porsi_left}>
                  <Input
                    addonAfter="Orang"
                    id="portion_min"
                    value={portion_min}
                    onChange={onChangeState}
                  />
                </div>
                <ArrowRightOutlined />
                <div className={styles.box_porsi_right}>
                  <Input
                    addonAfter="Orang"
                    id="portion_max"
                    value={portion_max}
                    onChange={onChangeState}
                  />
                </div>
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Kesulitan</label>
              <SelectKesulitan handleChange={onChangeDifficult} initial="mudah" />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Jenis Makanan</label>
              <SelectJenisMakanan handleChange={onChangeRecipeType} initial="Menu Utama" />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Kategori Resep</label>
              <div>
                {categories.map((data, i) => (
                  <Tag key={i}>{data.name}</Tag>
                ))}
                <Button onClick={handleVisibleKategori}>
                  <PlusOutlined />
                </Button>
                {visible ? (
                  <KategoriComponent
                    visible={visible}
                    onSet={setCategories}
                    onCancel={handleVisibleKategori}
                  />
                ) : null}
              </div>
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
                  <Button className={styles.button} id="gambar" type="primary">
                    Upload
                    <PlusOutlined />
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <div className={styles.box10}>
            <Button className={styles.button_search} type="primary" onClick={onAddSupermarket}>
              + Tambah Supermarket
            </Button>
          </div>
        </Row>
        <SupermarketComponent
          supermarket={supermarket}
          onAddProduct={onAddProduct}
          onChangeProduct={onChangeProduct}
          onSelectProduct={onSelectProduct}
          onClearProduct={onClearProduct}
          onChangeJumlah={onChangeJumlah}
          onChangeName={onChangeName}
          onRemoveProduct={onRemoveProduct}
          onRemoveSupermarket={onRemoveSupermarket}
        />
        <Button
          className={styles.button}
          disabled={disabled || Boolean(loading_update)}
          onClick={createResep}
          type="primary"
        >
          OK
        </Button>
      </Card>
      {/* <KemasanComponent /> */}
    </div>
  );
};

export default AddComponent;
