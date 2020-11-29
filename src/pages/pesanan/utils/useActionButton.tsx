import React from 'react';
import { Popconfirm, Button } from 'antd';
import styles from '../index.less';

interface PropsDelivery {
  id: string;
  id_status: number;
  nama: string | null;
  telepon: string | null;
  merchant: string | null;
  // notes: string | null;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (
    id: string,
    // notes: string | null,
    nama: string | null,
    telepon: string | null,
    merchant: string | null,
  ) => void;
}

interface PropsPickUp {
  id: string;
  id_status: number;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
}

const renderPembatalan = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Terima Pembatalan?"
      onConfirm={() => update(id, '8')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Terima Pembatalan
      </Button>
    </Popconfirm>

    <Popconfirm
      title="Apakah Anda Ingin Tolak Pembatalan?"
      onConfirm={() => update(id, '3')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Tolak Pembatalan
      </Button>
    </Popconfirm>
  </>
);

const renderTerima = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Terima?"
      onConfirm={() => update(id, '3')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Terima
      </Button>
    </Popconfirm>
  </>
);

const renderPenyesuaian = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Penyesuaian?"
      onConfirm={() => update(id, '6')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Penyesuaian
      </Button>
    </Popconfirm>
  </>
);

const renderSelesai = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Selesai?"
      onConfirm={() => update(id, '7')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Pesanan Selesai
      </Button>
    </Popconfirm>
  </>
);

const renderBatal = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Batalkan?"
      onConfirm={() => update(id, '8')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Batalkan
      </Button>
    </Popconfirm>
  </>
);

export const useDeliveryButton = (status_pengiriman: string) => {
  const renderButton = ({
    id,
    id_status,
    loading,
    nama,
    telepon,
    merchant,
    // notes,
    updateDelivery,
    handleVisible,
    handleVisiblePesanan,
  }: PropsDelivery) => {
    switch (id_status) {
      case 1:
        return (
          <>
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );
      case 2:
        return (
          <>
            {renderTerima({
              loading,
              update: updateDelivery,
              id,
            })}
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );
      case 3:
        return (
          <>
            <Button
              className={styles.button_action}
              id={id}
              onClick={() => handleVisible(id)}
              disabled={loading}
              type="primary"
            >
              Request Delivery
            </Button>
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );
      case 4:
        return (
          <>
            {status_pengiriman === 'dikirim' ? (
              <Button
                className={styles.button_action}
                id={id}
                onClick={() => handleVisible(id)}
                disabled={loading}
                type="primary"
              >
                Request Delivery
              </Button>
            ) : null}
            {renderPenyesuaian({
              loading,
              update: updateDelivery,
              id,
            })}
            <Button
              className={styles.button_action}
              id={id}
              onClick={() =>
                handleVisiblePesanan(
                  id,
                  // notes,
                  nama,
                  telepon,
                  merchant,
                )
              }
              disabled={loading}
              type="primary"
            >
              Lacak Pesanan
            </Button>
            {renderSelesai({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 6:
        return (
          <>
            {renderSelesai({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 10:
        return (
          <>
            {renderPembatalan({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      default:
        return null;
    }
  };
  return [renderButton];
};

export const usePickUpButton = () => {
  const renderButton = ({ id, id_status, loading, updateDelivery }: PropsPickUp) => {
    switch (id_status) {
      case 1:
        return (
          <>
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 2:
        return (
          <>
            {renderTerima({
              loading,
              update: updateDelivery,
              id,
            })}
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 3:
        return (
          <>
            <Button
              className={styles.button_action}
              id={id}
              onClick={() => updateDelivery(id, '5')}
              disabled={Boolean(loading)}
              type="primary"
            >
              Siap Untuk Pick Up
            </Button>
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 5:
        return (
          <>
            {renderPenyesuaian({
              loading,
              update: updateDelivery,
              id,
            })}
            {renderSelesai({
              loading,
              update: updateDelivery,
              id,
            })}
            {renderBatal({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 6:
        return (
          <>
            {renderSelesai({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      case 10:
        return (
          <>
            {renderPembatalan({
              loading,
              update: updateDelivery,
              id,
            })}
          </>
        );

      default:
        return null;
    }
  };
  return [renderButton];
};
