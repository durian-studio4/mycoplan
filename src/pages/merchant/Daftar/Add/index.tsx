import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Input, Button, TimePicker, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';

import MapsComponent from './Maps';

interface Props {
  visible: boolean;
  onCreate: ({ formData, clear }: any) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const { RangePicker } = TimePicker;
const format = 'HH:mm';

const initialSchedule = [
  {
    id: 0,
    name: 'Senin',
    day: 'mon',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 1,
    name: 'Selasa',
    day: 'tue',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 2,
    name: 'Rabu',
    day: 'wed',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 3,
    name: 'Kamis',
    day: 'thu',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 4,
    name: 'Jumat',
    day: 'fri',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 5,
    name: 'Sabtu',
    day: 'sat',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 6,
    name: 'Minggu',
    day: 'sun',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
];

const initialState = {
  name: '',
  email: '',
  password: '',
  description: '',
  address: '',
};

const AddComponent: React.FC<Props> = ({ visible, onCreate, onCancel }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [{ name, email, password, description, address }, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);

  const [logo, setLogo] = useState([]);

  const onChangeTime = (time: any, timeString: any, i: number) => {
    const state = [...schedule];
    state[i].open_time = timeString[0];
    state[i].close_time = timeString[1];
    setSchedule(state);
  };

  const onChangeDisabled = (e: any, i: number) => {
    const { checked } = e.target;
    const state = [...schedule];
    state[i].is_close = checked;
    setSchedule(state);
  };

  const onChangeState = (e: any) => {
    const { id, value } = e.target;

    setState((state) => ({ ...state, [id]: value }));
  };

  const onChangeImage = (file: any) => {
    setLogo((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = (e: any) => {
    setLogo([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setSchedule({ ...initialSchedule });
    setLogo([]);
    onCancel();
  };

  let data_schedule = [];

  for (let key in schedule) {
    data_schedule.push({
      day: schedule[key].day,
      open_time: schedule[key].open_time,
      close_time: schedule[key].close_time,
      is_close: schedule[key].is_close,
    });
  }

  const DataJSON = {
    name,
    email,
    password,
    description,
    address,
    schedule: JSON.stringify(data_schedule),
    logo: logo[0],
    status: 'active',
  };

  const createMerchant = () => {
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
    <Modal visible={visible} title="Tambah Merchant" width={800} closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name">
              Nama Merchant
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
            <label className={styles.label} htmlFor="logo">
              Logo Merchant
            </label>
            <div>
              <Upload
                name="avatar"
                listType="picture"
                onRemove={onRemoveImage}
                beforeUpload={onChangeImage}
              >
                <Button className={styles.button} type="primary" disabled={Boolean(logo.length)}>
                  Upload
                  <PlusOutlined />
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="max_diskon">
              Pin Alamat
            </label>
            <MapsComponent />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="address">
              Alamat Merchant
            </label>
            <TextArea
              className={styles.area}
              id="address"
              placeholder="Masukkan Keterangan..."
              value={address}
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="description">
              Deskripsi Merchant
            </label>
            <TextArea
              className={styles.area}
              id="description"
              placeholder="Masukkan Keterangan..."
              value={description}
              onChange={onChangeState}
            />
          </div>
        </div>
        {initialSchedule.map((data: any, i: number) => (
          <div className={styles.box10} key={i}>
            <div className={styles.group}>
              <label className={styles.label}>{data.name}</label>
              <Row>
                <RangePicker
                  className={styles.picker}
                  disabled={data.is_close}
                  format={format}
                  onChange={(values: any, formatString: [string, string]) =>
                    onChangeTime(values, formatString, i)
                  }
                />
                <Checkbox
                  className={styles.button_schedule}
                  onChange={(e: any) => onChangeDisabled(e, i)}
                >
                  Disabled
                </Checkbox>
              </Row>
            </div>
          </div>
        ))}
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <Input type="email" id="email" placeholder="" value={email} onChange={onChangeState} />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="password">
              Kata Sandi
            </label>
            <Input
              type="password"
              id="password"
              placeholder=""
              value={password}
              onChange={onChangeState}
            />
          </div>
        </div>
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          // disabled={onLoadButton}
          onClick={onClearState}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          onClick={createMerchant}
          // disabled={isDisabled || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default AddComponent;
