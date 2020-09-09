import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import styles from '../index.less';
import 'react-quill/dist/quill.snow.css';

import SelectKesulitan from '@/components/Select/SelectKesulitan';
import SelectJenisMakanan from '@/components/Select/SelectJenisMakanan';
import KategoriComponent from './Kategori';

import useCreate from '@/hooks/useCreateForm';
import useSelect from '@/hooks/useSelect';

interface Props {}

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

  const [image, setFileImg] = useState([]);

  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const [difficulty, onChangeDifficult, onClearDifficult] = useSelect('0');
  const [id_recipe_type, onChangeRecipeType, onClearRecipeType] = useSelect('1');

  const [loading_update, status_update, postCreate] = useCreate();

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!author) {
      return setDisabled(true);
    }
    if (!video) {
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
    return setDisabled(false);
  }, [name, author, video, production_time, portion_min, portion_max, ingredients, steps, image]);

  const handleVisibleKategori = () => setVisible(!visible);

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
    setIngredients('');
    setSteps('');
    onClearDifficult();
    onClearRecipeType();
  };

  const DataJSON = {
    name,
    author,
    video,
    production_time,
    portion_max,
    portion_min,
    images: image[0],
    ingredients,
    steps,
    difficulty: String(difficulty),
    id_recipe_type: String(id_recipe_type),
    status: 'active',
  };

  const createResep = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    postCreate(`${REACT_APP_ENV}/admin/recipes`, formData, onClearState);
  };

  // const updateResep = ({ json }: any) => {
  //   postUpdate(`${REACT_APP_ENV}/admin/recipes/${id_update}`, json);
  // };

  // const deleteResep = (id: string) => {
  //   postDelete(`${REACT_APP_ENV}/admin/recipes/${id}`);
  // };

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
              <ReactQuill theme="snow" id="bahan" value={ingredients} onChange={setIngredients} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="step">
                Cara Masak
              </label>
              <ReactQuill theme="snow" id="step" value={steps} onChange={setSteps} />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="video">
                Link Youtube
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
                <Button onClick={handleVisibleKategori}>
                  <PlusOutlined />
                </Button>
                {visible ? (
                  <KategoriComponent visible={visible} onCancel={handleVisibleKategori} />
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
                  <Button
                    className={styles.button}
                    id="gambar"
                    type="primary"
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
            <Button className={styles.button_search} type="primary">
              + Tambah Supermarket
            </Button>
          </div>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <div className={styles.box1}>
            <label htmlFor="supermarket">Supermarket 1</label>
          </div>
          <div className={styles.box4}>
            <Input id="supermarket" />
          </div>
          <div className={styles.box1}>
            <Button className={styles.button_delete} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </div>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <div className={styles.box1}>
            <label htmlFor="produk">Produk 1</label>
          </div>
          <div className={styles.box2}>
            <Input id="produk" />
          </div>
          <div className={styles.box1} style={{ textAlign: 'center' }}>
            <label htmlFor="produk">Jumlah</label>
          </div>
          <div className={styles.box1}>
            <Input id="produk" />
          </div>
          <div className={styles.box1}>
            <Button className={styles.button_delete} type="primary" danger>
              <DeleteOutlined />
            </Button>
            <Button className={styles.button_add} type="primary">
              <PlusOutlined />
            </Button>
          </div>
        </Row>
        <Button
          className={styles.button}
          disabled={disabled || Boolean(loading_update)}
          onClick={createResep}
          type="primary"
        >
          Simpan
        </Button>
      </Card>
      {/* <KemasanComponent /> */}
    </div>
  );
};

export default AddComponent;
