import React, { useState, useEffect } from 'react';
import { Modal, Row, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';
import useSelect from '@/hooks/useSelect';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

import SelectGender from '@/components/Select/SelectGender';

interface Props {
  visible: boolean;
  id: string;
  onCancel: () => void;
  onUpdate: ({ json, clear }: any) => void;
  onLoadButton: boolean;
}

const initialState = {
  name: '',
  phone: '',
};

const UpdateComponent: React.FC<Props> = ({ visible, id, onCancel, onUpdate, onLoadButton }) => {
  const [{ name, phone }, setState] = useState(initialState);
  const [date, setDate] = useState('');

  const [data, status, loading, error, fetchUpdate] = useFetch();

  const [gender, onChangeGender, onClearGender] = useSelect(data.gender);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/admin/users/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data) {
        setState({
          name: data.name,
          phone: data.phone,
        });
        setDate(data.dob);
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [data]);

  const onChangeState = (e: { target: HTMLInputElement }) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangeDate = (date: any, dateString: any) => {
    setDate(dateString);
  };

  const onClearState = () => {
    setState({ ...initialState });
    onClearGender();
    onCancel();
  };

  const DataJSON = {
    name,
    phone,
    gender: String(gender),
    dob: String(date),
  };

  const updateUser = () => {
    onUpdate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Buat Promo" closable={false} footer={null}>
      {status !== 200 || error ? <PageError /> : null}
      {loading ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="name">
                Nama
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
              <label className={styles.label} htmlFor="phone">
                Nomor Telepon
              </label>
              <Input
                className={styles.input}
                type="text"
                id="phone"
                placeholder=""
                value={phone}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Gender</label>
              <SelectGender
                handleChange={onChangeGender}
                initial={data.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Tanggal Lahir</label>
              <div className={styles.box10}>
                <DatePicker defaultValue={moment(date)} onChange={onChangeDate} />
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
          onClick={updateUser}
          disabled={onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default UpdateComponent;
