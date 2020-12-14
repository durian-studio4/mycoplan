import React, { useState, useEffect, Fragment } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { history, useParams } from 'umi';
import { PlusOutlined, MinusOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './index.less';

import SelectKesulitan from '@/components/Select/SelectKesulitan';
import SelectJenisMakanan from '@/components/Select/SelectJenisMakanan';

import KategoriComponent from './Add/Kategori';
import SupermarketComponent from './Add/Supermarket';

import QuillComponent from '@/components/Quill';

import useCreate from '@/hooks/useCreateForm';
import useFetch from '@/hooks/useFetch';
import useSelect from '@/hooks/useSelect';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

import { Supermarket } from './Add/index';
interface Props {}

const initialState = {
  name: '',
  author: '',
  video: '',
  production_time: '',
  portion_min: '',
  portion_max: '',
};

const UpdateComponent: React.FC<Props> = () => {
  const { id } = useParams();
  const [{ name, author, video, production_time, portion_max, portion_min }, setState] = useState(
    initialState,
  );
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [supermarket, setSupermarket] = useState<Supermarket[]>();

  const [image, setFileImg] = useState([]);
  const [categories, setCategories] = useState([]);

  const [deleteImages, setDeleteImages] = useState([]);
  const [clear, setClear] = useState([]);

  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate] = useCreate();

  const [difficulty, onChangeDifficult, onClearDifficult] = useSelect(data_list.difficulty);
  const [id_recipe_type, onChangeRecipeType, onClearRecipeType] = useSelect(
    data_list.id_recipe_type,
  );

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/recipes/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data_list) {
      const {
        name,
        author,
        video,
        production_time,
        portion_max,
        portion_min,
        ingredients,
        steps,
        recipe_categories,
        supermarkets,
        images,
      } = data_list;

      setState({
        name,
        author,
        video: video === null ? '' : video,
        production_time,
        portion_max,
        portion_min,
      });
      setClear(images);
      setSteps(steps);
      setIngredients(ingredients);
      setCategories(recipe_categories);

      supermarkets && supermarkets.length
        ? setSupermarket(supermarkets)
        : setSupermarket(() => [
            {
              alias: '',
              qty: '',
            },
          ]);
    }
  }, [data_list]);

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
    return setDisabled(false);
  }, [name, author, categories, production_time, portion_min, portion_max, ingredients, steps]);

  const handleVisibleKategori = () => setVisible(!visible);

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  // const onAddSupermarket = () => {
  //   setSupermarket((state) => [
  //     ...state,
  //     {
  //       id_merchant: '',
  //       name_merchant: '',
  //       products: [
  //         {
  //           id_product: '',
  //           nama_product: '',
  //           qty: '',
  //         },
  //       ],
  //     },
  //   ]);
  // };

  const onAddProduct = (e: any, i: number) => {
    const state = [...supermarket];
    state.push({
      alias: '',
      qty: '',
    });
    setSupermarket(state);
  };

  // const onRemoveSupermarket = (e: any, i: number) => {
  //   const state = [...supermarket];
  //   state.splice(i, 1);
  //   setSupermarket(state);
  // };

  const onRemoveProduct = (e: any, i: number) => {
    const state = [...supermarket];
    state.splice(i, 1);
    setSupermarket(state);
  };

  // const onChangeName = (value: any, option: any, i: number) => {
  //   const state = [...supermarket];
  //   state[i].id_merchant = option.id;
  //   state[i].name_merchant = option.value;
  //   setSupermarket(state);
  // };

  const onSelectProduct = (value: any, e: any, i: number) => {
    const state = [...supermarket];
    state[i].alias = e.children;
    setSupermarket(state);
  };

  const onChangeProduct = (value: string, i: number) => {
    const state = [...supermarket];
    state[i].alias = value;
    setSupermarket(state);
  };

  const onChangeJumlah = (e: any, i: number) => {
    const { value } = e.target;
    const state = [...supermarket];
    state[i].qty = value;
    setSupermarket(state);
  };

  const onRemoveImage = (e: any) => {
    let list = image.filter((data) => data.uid !== e.uid);
    setFileImg(list);
  };

  const onClearProduct = (i: number) => {
    const state = [...supermarket];
    state[i].alias = '';
    setSupermarket(state);
  };

  const onClearImage = (id: string) => {
    let list = clear.filter((data: any) => data.id !== id);
    setDeleteImages((state) => [...state, id]);
    setClear(list);
  };

  const onClearState = () => {
    // setState({ ...initialState });
    // setFileImg([]);
    // setIngredients('');
    // setSteps('');
    // setSupermarket([initialSupermarket]);
    // onClearDifficult();
    // onClearRecipeType();
    history.push('/recipe/masakan');
  };

  let id_recipe_categories = [];

  for (let key in categories) {
    id_recipe_categories.push(categories[key].id);
  }

  const DataJSON = {
    name,
    author,
    video: !video ? JSON.stringify('') : video,
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

  const updateResep = () => {
    const formData = new FormData();
    // let data_supermarket = [];

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    // for (let key in supermarket) {
    //   data_supermarket.push({
    //     products: supermarket[key].products.map((item: any) => ({
    //       id_product: item.id_product,
    //       qty: item.qty,
    //     })),
    //   });
    // }

    // formData.append('supermarkets', JSON.stringify(data_supermarket));

    if (image.length) {
      for (let key in image) {
        formData.append('images[]', image[key]);
      }
    }

    if (deleteImages.length) {
      for (let key in deleteImages) {
        formData.append('delete_image_ids[]', deleteImages[key]);
      }
    }

    postCreate(`${REACT_APP_ENV}/admin/recipes/${id}?_method=put`, formData, onClearState);
  };

  return (
    <div>
      <p className={styles.title}>Update Resep</p>
      {status_list !== 200 || error_list ? <PageError /> : null}
      {Boolean(loading_list) ? (
        <PageLoading />
      ) : (
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
                <QuillComponent value={ingredients || ''} id="bahan" onChange={setIngredients} />
              </div>
            </div>
            <div className={styles.box10}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="step">
                  Cara Masak
                </label>
                <QuillComponent value={steps || ''} id="step" onChange={setSteps} />
              </div>
            </div>
            <div className={styles.box10}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor="video">
                  Link Youtube
                </label>
                <Input
                  type="text"
                  id="video"
                  placeholder=""
                  value={video}
                  onChange={onChangeState}
                />
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
                  {categories && categories.map((data, i) => <Tag key={i}>{data.name}</Tag>)}
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
            {clear &&
              clear.map((data: any, i: number) => (
                <div className={styles.box10} key={i}>
                  <div className={styles.group}>
                    <Row>
                      <img
                        alt="recipe-image"
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
              {/* <Button className={styles.button_search} type="primary" onClick={onAddSupermarket}>
                + Tambah Supermarket
              </Button> */}
              <label className={styles.label} htmlFor="produk">
                Produk
              </label>
            </div>
          </Row>
          <SupermarketComponent
            supermarket={supermarket}
            onAddProduct={onAddProduct}
            onChangeProduct={onChangeProduct}
            onSelectProduct={onSelectProduct}
            onClearProduct={onClearProduct}
            onChangeJumlah={onChangeJumlah}
            // onChangeName={onChangeName}
            onRemoveProduct={onRemoveProduct}
            // onRemoveSupermarket={onRemoveSupermarket}
          />
          <Button
            className={styles.button}
            disabled={disabled || Boolean(loading_update)}
            onClick={updateResep}
            type="primary"
          >
            Simpan
          </Button>
        </Card>
      )}
      {/* <KemasanComponent /> */}
    </div>
  );
};

export default UpdateComponent;
