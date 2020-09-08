import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, DatePicker } from 'antd';
import { format } from 'date-fns';
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
  onUpdate: ({ json }: any) => void;
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

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onClearState = () => {
    setState({ ...initialState });
    setStart(initialDate);
    setEnd(initialDate);
    onClearCategory();
    onCancel();
  };

  const DataJSON = {
    name,
    code,
    discount,
    max_discount,
    min_purchase,
    quantity,
    user_limit,
    start,
    end,
    category,
    description,
    terms_conditions,
  };

  const updatePromo = () => {
    onUpdate({
      json: DataJSON,
    });
    onClearState();
  };

  return (
    <Modal visible={visible} title="Buat Promo" closable={false} footer={null}>
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
