import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Input, Button, TimePicker, Modal, Upload } from 'antd';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';

import MapsComponent from './Add/Maps';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

import useFetch from '@/hooks/useFetch';

interface Props {
  visible: boolean;
  onLoadButton: boolean;
  id_update: string;
  onCreate: ({ formData, clear }: any) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const { RangePicker } = TimePicker;
const format = 'HH:mm';

const initialLatLng = {
  lat: '',
  lng: '',
};

const initialState = {
  name: '',
  email: '',
  push_notif_key: '',
  description: '',
};

const UpdateComponent: React.FC<Props> = ({
  visible,
  id_update,
  onCreate,
  onCancel,
  onLoadButton,
}) => {
  const [schedule, setSchedule] = useState([]);
  const [{ name, email, push_notif_key, description }, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(false);

  const [logo, setLogo] = useState([]);
  const [clear, setClear] = useState([]);

  const [address, setAddress] = useState('');

  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState(initialLatLng);

  const [
    data_merchant,
    status_merchant,
    loading_merchant,
    error_merchant,
    fetchMerchant,
  ] = useFetch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMerchant(`${REACT_APP_ENV}/admin/merchants/${id_update}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data_merchant) {
        const {
          name,
          email,
          push_notif_key,
          description,
          schedule,
          address,
          latitude,
          longitude,
          logo,
        } = data_merchant;
        const merchant = JSON.parse(schedule);
        setState({ name, email, push_notif_key, description });
        setSchedule(merchant);
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
        setAddress(address);
        setClear([logo]);
      }
    }, 0);
    return () => clearTimeout(timeOut);
  }, [data_merchant]);

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
    return setDisabled(false);
  }, [name, email, description, address, currentPosition]);

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
    setClear([]);
  };

  const onClearState = () => {
    setState({ ...initialState });
    setSchedule([]);
    setLogo([]);
    setClear([]);
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
    description,
    address,
    latitude: currentPosition.lat,
    longitude: currentPosition.lng,
    schedule: JSON.stringify(data_schedule),
    push_notif_key,
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

  if (logo.length) {
    DataJSON['logo'] = logo[0];
  }

  return (
    <Modal visible={visible} title="Update Merchant" width={800} closable={false} footer={null}>
      {status_merchant !== 200 || error_merchant ? <PageError /> : null}
      {loading_merchant ? (
        <PageLoading />
      ) : data_merchant ? (
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
              <Row>
                <div className={styles.group}>
                  <Upload
                    name="avatar"
                    listType="picture"
                    onRemove={onRemoveImage}
                    beforeUpload={onChangeImage}
                  >
                    <Button
                      className={styles.button}
                      type="primary"
                      disabled={Boolean(logo.length)}
                    >
                      Upload
                      <PlusOutlined />
                    </Button>
                  </Upload>
                </div>
                {Boolean(clear.length) ? (
                  <div className={styles.group}>
                    <Button className={styles.button} onClick={onRemoveImage} type="primary">
                      Clear
                      <MinusOutlined />
                    </Button>
                  </div>
                ) : null}
              </Row>
            </div>
          </div>
          {Boolean(clear.length) ? (
            <div className={styles.box10}>
              <div className={styles.group}>
                <img
                  alt="logo-image"
                  src={data_merchant.logo}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          ) : null}
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
          {schedule
            ? schedule &&
              schedule.map((data: any, i: number) => (
                <div className={styles.box10} key={i}>
                  <div className={styles.group}>
                    <label className={styles.label}>{data.name}</label>
                    <Row>
                      <RangePicker
                        className={styles.picker}
                        disabled={data.is_close}
                        format={format}
                        defaultValue={[
                          moment(data.open_time, 'HH:mm'),
                          moment(data.close_time, 'HH:mm'),
                        ]}
                        onChange={(values: any, formatString: [string, string]) =>
                          onChangeTime(values, formatString, i)
                        }
                      />
                      <Checkbox
                        className={styles.button_schedule}
                        checked={data.is_close}
                        onChange={(e: any) => onChangeDisabled(e, i)}
                      >
                        Disabled
                      </Checkbox>
                    </Row>
                  </div>
                </div>
              ))
            : null}
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder=""
                value={email}
                onChange={onChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
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
          </div>
        </div>
      ) : null}
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
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default UpdateComponent;
