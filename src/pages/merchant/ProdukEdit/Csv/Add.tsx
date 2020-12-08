import React, { useState } from 'react';
import { Modal, Row, Button, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../index.less';

// import useDownloadCsv from '@/hooks/useDownloadCsv';
// import useUploadCsv from '@/hooks/useUploadCsv';

interface Props {
  visible: boolean;
  id_merchant: string;
  onCancel: () => void;
}

export const AddCsvComponent: React.FC<Props> = ({ visible, id_merchant, onCancel }) => {
  // const [loading_download, onDownloadCSV] = useDownloadCsv();

  const [file_img, setFileImg] = useState([]);

  const onChangeImage = (file: any) => {
    setFileImg((state) => [...state, file]);
    return false;
  };

  const onRemoveImage = (e: any) => {
    setFileImg([]);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={700}
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
              Download dan isi file Excel
            </p>
            <DownloadOutlined style={{ fontSize: 40 }} />
            <Button
              type="primary"
              // disabled={Boolean(loading_download)}
              // onClick={() =>
              //   onDownloadCSV({
              //     url: `${REACT_APP_ENV}/admin/products?merchant=${id_merchant}&download=1`,
              //     file: 'Produk',
              //   })
              // }
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
              Upload file Excel
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Upload listType="picture" onRemove={onRemoveImage} beforeUpload={onChangeImage}>
                {file_img.length ? null : (
                  <UploadOutlined style={{ fontSize: 40, cursor: 'pointer' }} />
                )}
              </Upload>
            </div>
            <Button type="primary">Upload Template</Button>
          </div>
        </Row>
      </div>
    </Modal>
  );
};
