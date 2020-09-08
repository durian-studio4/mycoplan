import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {}

const { TextArea } = Input;

const ManagementWhatsappComponent: React.FC<Props> = () => {
  const [text, setText] = useState('');

  const [data_kontent, status_kontent, loading_kontent, error_kontent, fetchKontent] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchKontent(`${REACT_APP_ENV}/admin/globals/whatsapp_link`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (data_kontent[0]) {
        const data = data_kontent[0].value;
        const parse = JSON.parse(data);
        setText(parse.link);
      }
    }, 200);
    return () => clearTimeout(timeOut);
  }, [data_kontent]);

  const onChangeState = (e: any) => {
    const { value } = e.target;
    setText(value);
  };

  const onClearState = () => {
    setText('');
  };

  const updateSetting = () => {
    postUpdate(
      `${REACT_APP_ENV}/admin/globals/whatsapp_link`,
      { value: JSON.stringify({ link: text }) },
      onClearState,
    );
  };

  return (
    <div>
      <p className={styles.title}>WhatsApp Chat</p>
      {error_kontent || status_kontent !== 200 ? <PageError /> : null}
      {loading_kontent ? (
        <PageLoading />
      ) : (
        <Card>
          <Row justify="space-between">
            <p className={styles.title}>Link Whatsapp Chat</p>
            <Button
              className={styles.button}
              disabled={!text || Boolean(loading_update)}
              onClick={updateSetting}
              type="primary"
            >
              Edit Link
            </Button>
          </Row>
          <TextArea className={styles.area} value={text} onChange={onChangeState} />
        </Card>
      )}
    </div>
  );
};

export default ManagementWhatsappComponent;
