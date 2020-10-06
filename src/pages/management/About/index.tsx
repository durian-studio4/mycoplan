import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row } from 'antd';
import ReactQuill from 'react-quill';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

import { PermissionContext } from '@/layouts/context';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';
import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

const modules = {
  toolbar: toolbarOptions,
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const ManagementAboutComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);
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
      <p className={styles.title}>Tentang mycoplan</p>
      {error_kontent || status_kontent !== 200 ? <PageError /> : null}
      {loading_kontent ? (
        <PageLoading />
      ) : (
        <Card>
          <Row justify="space-between">
            <p className={styles.title}>Konten tentang mycoplan</p>
            {management_access && management_access.update ? (
              <Button
                className={styles.button}
                disabled={!value || Boolean(loading_update)}
                onClick={updateSetting}
                type="primary"
              >
                Edit Konten
              </Button>
            ) : null}
          </Row>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
            style={{ display: management_access && management_access.read ? 'block' : 'none' }}
          />
        </Card>
      )}
    </div>
  );
};

export default ManagementAboutComponent;
