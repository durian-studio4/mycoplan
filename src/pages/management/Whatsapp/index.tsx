import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Input } from 'antd';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';
import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const { TextArea } = Input;

const ManagementWhatsappComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

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

  const management_access = context && context[7];

  if (
    management_access &&
    !management_access.read &&
    !management_access.delete &&
    !management_access.update &&
    !management_access.create
  ) {
    return <PageUnauthorized />;
  }

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
            {management_access && management_access.update ? (
              <Button
                className={styles.button}
                disabled={!text || Boolean(loading_update)}
                onClick={updateSetting}
                type="primary"
              >
                OK
              </Button>
            ) : null}
          </Row>
          <TextArea
            className={styles.area}
            value={text}
            onChange={onChangeState}
            style={{ display: management_access && management_access.read ? 'block' : 'none' }}
          />
        </Card>
      )}
    </div>
  );
};

export default ManagementWhatsappComponent;
