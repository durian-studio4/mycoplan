import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, Upload, DatePicker } from 'antd';
import { format } from 'date-fns';
import moment from 'moment';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from '../index.less';

import SelectPromo from '@/components/Select/SelectPromo';

import useSelect from '@/hooks/useSelect';
import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ formData, clear }: any) => void;
  onLoadButton: boolean;
}

const initialState = {
  name: '',
  code: '',
  discount: '',
  max_discount: '',
  min_purchase: '',
  quantity: '',
  user_limit: '',
  description: '',
  terms_conditions: '',
};

const initialDate = format(new Date(), 'yyyy-MM-dd');

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [
    {
      name,
      code,
      discount,
      max_discount,
      min_purchase,
      quantity,
      user_limit,
      description,
      terms_conditions,
    },
    setState,
  ] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);
  const [start, setStart] = useState(initialDate);
  const [end, setEnd] = useState(initialDate);

  const [image, setFileImg] = useState([]);
  const [clear, setClear] = useState([]);

  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  const [category, onChangeCategory, onClearCategory] = useSelect(data_update.category);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/vouchers/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setState(data_update);
      setStart(data_update.start);
      setEnd(data_update.end);
      setClear([data_update.image]);
    }, 100);
    return () => clearTimeout(timeOut);
  }, [data_update]);

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!code) {
      return setDisabled(true);
    }
    if (!discount) {
      return setDisabled(true);
    }
    if (!max_discount) {
      return setDisabled(true);
    }
    if (!min_purchase) {
      return setDisabled(true);
    }
    if (!quantity) {
      return setDisabled(true);
    }
    if (!description) {
      return setDisabled(true);
    }
    if (!terms_conditions) {
      return setDisabled(true);
    }
    if (!user_limit) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [
    name,
    code,
    discount,
    max_discount,
    min_purchase,
    quantity,
    user_limit,
    description,
    terms_conditions,
  ]);

  const onChangeStart = (date: any, dateString: any) => {
    setStart(dateString);
  };

  const onChangeEnd = (date: any, dateString: any) => {
    setEnd(dateString);
  };

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onRemoveImage = () => {
    setFileImg([]);
    setClear([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setStart(initialDate);
    setEnd(initialDate);
    onRemoveImage();
    onClearCategory();
    onCancel();
  };

  let DataJSON = {
    name,
    code,
    discount,
    max_discount,
    min_purchase,
    quantity,
    user_limit,
    start,
    end,
    category: String(category),
    description,
    terms_conditions,
  };

  const updatePromo = () => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    onUpdate({
      formData,
      clear: onClearState(),
    });
  };

  if (image.length) {
    DataJSON['image'] = image[0];
  }

  return (
    <Modal visible={visible} title="Edit Promo" closable={false} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="no_id">
                Kategori Promo
              </label>
              <SelectPromo
                handleChange={onChangeCategory}
                initial={data_update && data_update.category}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="name">
                Nama Promo
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
              <label className={styles.label} htmlFor="code">
                Kode Promo
              </label>
              <Input
                className={styles.input}
                type="text"
                id="code"
                placeholder=""
                value={code}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="discount">
                Diskon
              </label>
              <Input
                addonAfter="%"
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
              <label className={styles.label} htmlFor="max_discount">
                Maks. Diskon
              </label>
              <Input
                addonBefore="Rp."
                type="text"
                id="max_discount"
                placeholder=""
                value={max_discount}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="min_purchase">
                Min. Belanja
              </label>
              <Input
                addonBefore="Rp."
                type="text"
                id="min_purchase"
                placeholder=""
                value={min_purchase}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Waktu Mulai</label>
              <Row>
                <DatePicker
                  className={styles.picker}
                  onChange={onChangeStart}
                  style={{ marginRight: '5px' }}
                  defaultValue={moment(data_update.start)}
                />
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Waktu Akhir</label>
              <Row>
                <DatePicker
                  className={styles.picker}
                  onChange={onChangeEnd}
                  style={{ marginRight: '5px' }}
                  defaultValue={moment(data_update.end)}
                />
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="user_limit">
                Limit
              </label>
              <Input
                addonAfter="/ Pengguna"
                type="text"
                id="user_limit"
                placeholder=""
                value={user_limit}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="quantity">
                Maks. Penukaran
              </label>
              <Input
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
              <label className={styles.label} htmlFor="description">
                Deskripsi
              </label>
              <TextArea
                id="description"
                placeholder=""
                value={description}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="terms_conditions">
                Syarat & Ketentuan
              </label>
              <TextArea
                id="terms_conditions"
                placeholder=""
                value={terms_conditions}
                onChange={onChangeState}
              />
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
                  <Button className={styles.button} type="primary" disabled={Boolean(image.length)}>
                    Upload
                    <PlusOutlined />
                  </Button>
                </Upload>
                {Boolean(clear.length) ? (
                  <>
                    <Button className={styles.button} onClick={onRemoveImage} type="primary">
                      Clear
                      <MinusOutlined />
                    </Button>
                    <div className={styles.box10}>
                      <div className={styles.group}>
                        <img
                          alt="category-image"
                          src={data_update.image}
                          style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          disabled={onLoadButton}
          onClick={onClearState}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          onClick={updatePromo}
          disabled={isDisabled || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default UpdateComponent;
