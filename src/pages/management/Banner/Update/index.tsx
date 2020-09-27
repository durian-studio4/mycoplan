import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, DatePicker, Upload } from 'antd';
import moment from 'moment';
import { format } from 'date-fns';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from '../index.less';

import SelectBannerTipe from '@/components/Select/SelectBannerTipe';
import SelectAll from '@/components/Select/SelectAll';

import useSelect from '@/hooks/useSelect';
import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ formData, clear }: any) => void;
  onLoadButton: boolean;
}

const { TextArea } = Input;

const initialDate = format(new Date(), 'yyyy-MM-dd');

const initialState = {
  title: '',
  description: '',
  terms_conditions: '',
};

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [{ description, terms_conditions, title }, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);
  const [start, setStart] = useState(initialDate);
  const [end, setEnd] = useState(initialDate);

  const [file_img, setFileImg] = useState([]);
  const [clear, setClear] = useState([]);

  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  const [banner_type, onChangeBannerType, onClearBannerType] = useSelect(data_update.banner_type);
  const [id_voucher, onChangeVoucher, onClearVoucher] = useSelect(data_update.id_voucher);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/banners/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_update) {
      const { description, terms_conditions, title, start, end, image } = data_update;
      setState({
        title,
        description,
        terms_conditions,
      });
      setStart(start);
      setEnd(end);
      setClear([image]);
    }
  }, [data_update]);

  useEffect(() => {
    if (!terms_conditions) {
      return setDisabled(true);
    }
    if (!title) {
      return setDisabled(true);
    }
    if (!description) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [terms_conditions, title, description]);

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

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = (e: any) => {
    setFileImg([]);
    setClear([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setStart(initialDate);
    setEnd(initialDate);
    setFileImg([]);
    onClearBannerType();
    onClearVoucher();
    onCancel();
  };

  let DataJSON = {
    id_voucher: String(id_voucher),
    title,
    description,
    terms_conditions,
    start,
    end,
    owner: 'global',
    banner_type: String(banner_type),
    status: 'active',
  };

  const updatePromo = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    onUpdate({
      formData,
      clear: onClearState,
    });
  };

  if (file_img.length) {
    DataJSON['image'] = file_img[0];
  }

  return (
    <Modal visible={visible} title="Update Banner" closable={false} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="title">
                Judul Banner
              </label>
              <Input
                className={styles.input}
                type="text"
                id="title"
                placeholder=""
                value={title}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="tipe">
                Tipe Banner
              </label>
              <SelectBannerTipe
                initial={data_update.banner_type === 'gambar' ? 'Gambar Saja' : 'Gambar & Detail'}
                handleChange={onChangeBannerType}
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
                  <Button
                    className={styles.button}
                    type="primary"
                    disabled={Boolean(file_img.length)}
                  >
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
                          style={{ width: '100%', height: '50%' }}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="description">
                Deskripsi Banner
              </label>
              <TextArea
                className={styles.area}
                id="description"
                onChange={onChangeState}
                value={description}
                placeholder="Masukkan Keterangan..."
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Waktu Mulai</label>
              <Row>
                <div className={styles.box3}>
                  <DatePicker
                    onChange={onChangeStart}
                    defaultValue={moment(new Date(start), 'yyyy-MM-dd')}
                  />
                </div>
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Waktu Akhir</label>
              <Row>
                <div className={styles.box3}>
                  <DatePicker
                    onChange={onChangeEnd}
                    defaultValue={moment(new Date(end), 'yyyy-MM-dd')}
                  />
                </div>
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="terms_conditions">
                Syarat & Ketentuan
              </label>
              <TextArea
                className={styles.area}
                id="terms_conditions"
                onChange={onChangeState}
                value={terms_conditions}
                placeholder="Masukkan Keterangan..."
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="kode">
                Kode Promo
              </label>
              <SelectAll
                address={`${REACT_APP_ENV}/admin/vouchers`}
                initial={data_update.voucher && data_update.voucher.name}
                handleChange={onChangeVoucher}
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
