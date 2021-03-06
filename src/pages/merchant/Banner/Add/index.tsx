import React, { useState, useEffect } from 'react';
import { Row, Input, Button, DatePicker, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import styles from '../index.less';

import SelectBannerTipe from '@/components/Select/SelectBannerTipe';
import SelectMerchant from '@/components/Select/SelectMerchant';
import SelectAll from '@/components/Select/SelectAll';

import useSelect from '@/hooks/useSelect';
interface Props {
  visible: boolean;
  onCreate: ({ formData, clear }: any) => void;
  onCancel: () => void;
  onLoadButton: boolean;
}

const { TextArea } = Input;

const initialDate = format(new Date(), 'yyyy-MM-dd');

const initialState = {
  title: '',
  description: '',
  terms_conditions: '',
};

const AddComponent: React.FC<Props> = ({ visible, onCreate, onCancel, onLoadButton }) => {
  const [{ description, terms_conditions, title }, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);
  const [start, setStart] = useState(initialDate);
  const [end, setEnd] = useState(initialDate);

  const [file_img, setFileImg] = useState([]);

  const [banner_type, onChangeBannerType, onClearBannerType] = useSelect('gambar');
  const [id_voucher, onChangeVoucher, onClearVoucher] = useSelect('');
  const [id_merchant, onChangeMerchant, onClearMerchant] = useSelect('');

  useEffect(() => {
    if (!title) {
      return setDisabled(true);
    }
    if (!file_img.length) {
      return setDisabled(true);
    }
    if (!id_merchant) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [file_img, id_merchant, title]);

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

  const onClearState = () => {
    setState({ ...initialState });
    setStart(initialDate);
    setEnd(initialDate);
    setFileImg([]);
    onClearMerchant();
    onClearBannerType();
    onClearVoucher();
    onCancel();
  };

  const DataJSON = {
    id_merchant: String(id_merchant),
    title,
    description,
    terms_conditions,
    start,
    end,
    owner: 'merchant',
    image: file_img[0],
    banner_type: String(banner_type),
    status: 'active',
  };

  const createBanner = () => {
    const formData = new FormData();

    if (id_voucher) {
      formData.append('id_voucher', String(id_voucher));
    }

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    onCreate({
      formData,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Tambah Banner" width={600} closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama Merchant
            </label>
            <SelectMerchant handleChange={onChangeMerchant} />
          </div>
        </div>
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
            <SelectBannerTipe initial="Gambar Saja" handleChange={onChangeBannerType} />
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
        {banner_type !== 'gambar' ? (
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
        ) : null}
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
        {banner_type !== 'gambar' ? (
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
        ) : null}
        {banner_type !== 'gambar' ? (
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
        ) : null}
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
          onClick={createBanner}
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
