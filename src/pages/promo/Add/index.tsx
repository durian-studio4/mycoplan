import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, InputNumber, Button, Upload, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import styles from '../index.less';

import SelectPromo from '@/components/Select/SelectPromo';

import useSelect from '@/hooks/useSelect';

import { Promo } from '../index';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onCreate: ({ formData, clear }: Promo) => void;
  onLoadButton: boolean;
}

const initialState = {
  name: '',
  code: '',
  quantity: '',
  user_limit: '',
  description: '',
  terms_conditions: '',
};

const initialDate = format(new Date(), 'yyyy-MM-dd');

const AddComponent: React.FC<Props> = ({ visible, onCancel, onCreate, onLoadButton }) => {
  const [{ name, code, quantity, user_limit, description, terms_conditions }, setState] = useState(
    initialState,
  );
  const [isDisabled, setDisabled] = useState(false);
  const [start, setStart] = useState(initialDate);
  const [end, setEnd] = useState(initialDate);

  // const [file_img, setFileImg] = useState([]);

  const [max_discount, setMaxDiscount] = useState(0);
  const [min_purchase, setMinPurchase] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [category, onChangeCategory, onClearCategory] = useSelect('Pesanan');

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

  const onChangeDiscount = (value: any) => {
    setDiscount(value);
  };

  const onChangeMaxDiscount = (value: any) => {
    setMaxDiscount(value);
  };

  const onChangeMinPurchase = (value: any) => {
    setMinPurchase(value);
  };

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  // const onChangeImage = (file: any) => {
  //   setFileImg((state) => [...state, file]);
  //   return false;
  // };

  // const onRemoveImage = (e: any) => {
  //   setFileImg([]);
  // };

  const onClearState = () => {
    setState({ ...initialState });
    setStart(initialDate);
    setEnd(initialDate);
    // setFileImg([]);
    onClearCategory();
    onCancel();
  };

  const DataJSON = {
    name,
    code,
    discount: String(discount),
    max_discount: String(max_discount),
    min_purchase: String(min_purchase),
    quantity,
    user_limit,
    start,
    end,
    category: String(category),
    // image: file_img[0],
    description,
    terms_conditions,
    status: 'active',
  };

  const createPromo = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }
    onCreate({
      formData,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Buat Promo" width={600} closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="no_id">
              Kategori Promo
            </label>
            <SelectPromo handleChange={onChangeCategory} initial="Pesanan" />
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
              Diskon %
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
            <label className={styles.label} htmlFor="max_discount">
              Maks. Diskon
            </label>
            <InputNumber
              style={{ width: '100%' }}
              // className={styles.input}
              id="max_discount"
              placeholder=""
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              value={max_discount}
              onChange={onChangeMaxDiscount}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="min_purchase">
              Min. Belanja
            </label>
            <InputNumber
              style={{ width: '100%' }}
              // className={styles.input}
              id="min_purchase"
              placeholder=""
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              value={min_purchase}
              onChange={onChangeMinPurchase}
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
        {/* <div className={styles.box10}>
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
                  disabled={Boolean(file_img.length)}
                >
                  Upload
                  <PlusOutlined />
                </Button>
              </Upload>
            </div>
          </div>
        </div> */}
      </div>
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
          onClick={createPromo}
          disabled={isDisabled || onLoadButton}
          type="primary"
        >
          OK
        </Button>
      </Row>
    </Modal>
  );
};

export default AddComponent;
