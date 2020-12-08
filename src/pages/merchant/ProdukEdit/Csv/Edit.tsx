import React from 'react';
import { Modal, Row, Button } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../index.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

export const EditCsvComponent: React.FC<Props> = ({ visible, onCancel }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={700}
      title="Ubah Sekaligus"
      closable={false}
      footer={null}
    >
      <div className={styles.modal_body}>
        <Row justify="space-between">
          <div
            className={styles.box4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 200,
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
              Download dan isi file Excel
            </p>
            <DownloadOutlined style={{ fontSize: 40 }} />
            <Button type="primary">Download Template</Button>
          </div>
          <div
            className={styles.box4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 200,
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
              Upload file Excel
            </p>
            <UploadOutlined style={{ fontSize: 40 }} />
            <Button type="primary">Upload Template</Button>
          </div>
        </Row>
      </div>
    </Modal>
  );
};
