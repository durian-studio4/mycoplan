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

const initialState = {};

const initialDate = format(new Date(), 'yyyy-MM-dd');

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [{}, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);
  const [start, setStart] = useState(initialDate);
  const [end, setEnd] = useState(initialDate);

  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      // fetchUpdate(`${REACT_APP_ENV}/admin/vouchers/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {}, 100);
    return () => clearTimeout(timeOut);
  }, [data_update]);

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
  };

  const onClearState = () => {};

  const DataJSON = {};

  const updatePromo = () => {
    onUpdate({
      json: DataJSON,
    });
    onClearState();
  };

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
                  <DatePicker onChange={onChangeStart} />
                </div>
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Waktu Akhir</label>
              <Row>
                <div className={styles.box3}>
                  <DatePicker onChange={onChangeEnd} />
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
                handleChange={onChangeVoucher}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="tipe">
                Tipe Banner
              </label>
              <SelectBannerTipe initial="Gambar Saja" handleChange={onChangeBannerType} />
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
