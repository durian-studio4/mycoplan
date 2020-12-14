import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Input, Button, TimePicker, Modal, Upload } from 'antd';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';

import MapsComponent from './Maps';

interface Props {
  visible: boolean;
  onLoadButton: boolean;
  onCreate: ({ formData, clear }: any) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const { RangePicker } = TimePicker;
const format = 'HH:mm';

const initialSchedule = [
  {
    id: 0,
    day: 'Senin',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 1,
    day: 'Selasa',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 2,
    day: 'Rabu',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 3,
    day: 'Kamis',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 4,
    day: 'Jumat',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 5,
    day: 'Sabtu',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
  {
    id: 6,
    day: 'Minggu',
    open_time: '07:00',
    close_time: '18:00',
    is_close: false,
  },
];

const initialLatLng = {
  lat: '',
  lng: '',
};

const initialState = {
  name: '',
  email: '',
  password: '',
  // push_notif_key: '',
  confirm_password: '',
  description: '',
};

const AddComponent: React.FC<Props> = ({ visible, onCreate, onCancel, onLoadButton }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [
    {
      name,
      email,
      password,
      // push_notif_key,
      confirm_password,
      description,
    },
    setState,
  ] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);

  const [logo, setLogo] = useState([]);

  const [address, setAddress] = useState('');

  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState(initialLatLng);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  useEffect(() => {
    if (!name) {
      return setDisabled(true);
    }
    if (!email) {
      return setDisabled(true);
    }
    if (!description) {
      return setDisabled(true);
    }
    if (!address) {
      return setDisabled(true);
    }
    if (!currentPosition.lat) {
      return setDisabled(true);
    }
    if (!currentPosition.lng) {
      return setDisabled(true);
    }
    if (!logo.length) {
      return setDisabled(true);
    }
    if (!password) {
      return setDisabled(true);
    }
    if (!confirm_password) {
      return setDisabled(true);
    }
    if (password !== confirm_password) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, email, password, confirm_password, logo, description, address, currentPosition]);

  const onSuccess = (position: any) => {
    console.log(position, 'position');
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const onSelect = (item: any) => {
    console.log(item, 'item');
    setSelected(item);
  };

  const onClearSelect = () => setSelected({});

  const onMarkerDragEnd = (e: any) => {
    console.log(e, 'marker');
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const onChangeAddress = (address: any) => {
    setAddress(address);
  };

  const onSelectAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
        setAddress(results[0].formatted_address);
        return getLatLng(results[0]);
      })
      .then((latLng: any) => setCurrentPosition(latLng))
      .catch((error: any) => console.error('Error', error));
  };

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
    setSchedule(initialSchedule);
    setState({ ...initialState });
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
    password_confirmation: confirm_password,
    description,
    address,
    latitude: currentPosition.lat,
    longitude: currentPosition.lng,
    schedule: JSON.stringify(data_schedule),
    logo: logo[0],
    // push_notif_key,
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
        <MapsComponent
          address={address}
          selected={selected}
          currentPosition={currentPosition}
          onSelect={onSelect}
          onClearSelect={onClearSelect}
          onMarkerDragEnd={onMarkerDragEnd}
          onHandleChange={onChangeAddress}
          onHandleSelect={onSelectAddress}
        />
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
        {schedule.map((data: any, i: number) => (
          <div className={styles.box10} key={i}>
            <div className={styles.group}>
              <label className={styles.label}>{data.day}</label>
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
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="confirm_password">
              Konfirmasi Kata Sandi
            </label>
            <Input
              type="password"
              id="confirm_password"
              placeholder=""
              value={confirm_password}
              onChange={onChangeState}
            />
          </div>
        </div>
        {/* <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="push_notif_key">
              Notif Key
            </label>
            <Input
              type="text"
              id="push_notif_key"
              placeholder=""
              value={push_notif_key}
              onChange={onChangeState}
            />
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
          onClick={createMerchant}
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
