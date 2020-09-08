import React, { useState, useEffect } from 'react';
import { Button, Card, Row } from 'antd';
import ReactQuill from 'react-quill';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {}

const ManagementAboutComponent: React.FC<Props> = () => {
  const [value, setValue] = useState('');

  const [data_kontent, status_kontent, loading_kontent, error_kontent, fetchKontent] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchKontent(`${REACT_APP_ENV}/admin/globals/about`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data_kontent[0]) {
        const data = data_kontent[0].value;
        const parse = JSON.parse(data);
        setValue(parse.text);
      }
    }, 200);
    return () => clearTimeout(timeOut);
  }, [data_kontent]);

  const onClearState = () => {
    setValue('');
  };

  const updateSetting = () => {
    postUpdate(
      `${REACT_APP_ENV}/admin/globals/about`,
      { value: JSON.stringify({ text: value }) },
      onClearState,
    );
  };

  return (
    <div>
      <p className={styles.title}>Tentang mycoplan</p>
      {error_kontent || status_kontent !== 200 ? <PageError /> : null}
      {loading_kontent ? (
        <PageLoading />
      ) : (
        <Card>
          <Row justify="space-between">
            <p className={styles.title}>Konten tentang mycoplan</p>
            <Button
              className={styles.button}
              disabled={!value || Boolean(loading_update)}
              onClick={updateSetting}
              type="primary"
            >
              Edit Konten
            </Button>
          </Row>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </Card>
      )}
    </div>
  );
};

export default ManagementAboutComponent;
