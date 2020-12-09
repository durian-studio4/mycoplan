import React from 'react';
import { Modal, Row, Button, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../index.less';

import useUploadCsv from '@/hooks/useUploadCsv';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

export const AddCsvComponent: React.FC<Props> = ({ visible, onCancel }) => {
  const [file_csv, loading_upload, onChangeFile, onRemoveFile, onUpload] = useUploadCsv();

  const DataJSON = {
    file_csv: file_csv[0],
  };

  const uploadFile = () => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(DataJSON)) {
      formData.append(key, value);
    }

    onUpload({
      url: `${REACT_APP_ENV}/merchant/products/bulk-create`,
      data: formData,
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={800}
      title="Tambah Sekaligus"
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
              height: 250,
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
              Download dan isi file CSV
            </p>
            <DownloadOutlined style={{ fontSize: 40, color: '#FF4D4F' }} />
            <Button
              type="primary"
              onClick={() =>
                window.open('https://api.mycoplan.id/storage/templates/product_template.csv')
              }
            >
              Download Template
            </Button>
          </div>
          <div
            className={styles.box4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 250,
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
              Upload file CSV
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Upload listType="picture" onRemove={onRemoveFile} beforeUpload={onChangeFile}>
                {file_csv.length ? null : (
                  <UploadOutlined style={{ fontSize: 40, cursor: 'pointer', color: '#FFC234' }} />
                )}
              </Upload>
            </div>
            <Button
              type="primary"
              disabled={Boolean(loading_upload) || !file_csv.length}
              onClick={uploadFile}
            >
              Upload Template
            </Button>
          </div>
        </Row>
      </div>
    </Modal>
  );
};
