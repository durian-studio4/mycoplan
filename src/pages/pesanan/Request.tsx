import React, { useState } from 'react';
import { Modal, Row, Input, Button } from 'antd';
import styles from './index.less';

interface Props {
  visible: boolean;
  id_transaction: number;
  onCreate: ({ json, clear }: any) => void;
  onCancel: () => void;
  onLoadButton: boolean;
}

const RequestComponent: React.FC<Props> = ({
  visible,
  id_transaction,
  onCreate,
  onCancel,
  onLoadButton,
}) => {
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('');

  const onChangeNote = (e: { target: HTMLInputElement }) => setNote(e.target.value);
  const onChangePhone = (e: { target: HTMLInputElement }) => setPhone(e.target.value);

  const onClearState = () => {
    onCancel();
    setPhone('');
    setNote('');
  };

  const DataJSON = JSON.stringify({
    id_transaction,
    origin_note: note,
    origin_contact_phone: phone,
  });

  const requestPesanan = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Request Delivery" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="note">
              Note Pengirim
            </label>
            <Input
              id="note"
              placeholder="Pesan untuk driver"
              value={note}
              onChange={onChangeNote}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="phone">
              Nomor Pengirim
            </label>
            <Input id="phone" placeholder="0812xxx" value={phone} onChange={onChangePhone} />
          </div>
        </div>

        <Row justify="end">
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
            disabled={!note || !phone || onLoadButton}
            onClick={requestPesanan}
            type="primary"
          >
            OK
          </Button>
        </Row>
      </div>
    </Modal>
  );
};

export default RequestComponent;
