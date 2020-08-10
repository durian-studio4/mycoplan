import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Row, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor, EditorState } from 'draft-js';
import styles from './index.less';
import 'draft-js/dist/Draft.css';

import SelectUnit from '@/components/Select/SelectUnit';

import KemasanComponent from './Kemasan';

interface Props {}

const ProdukAddComponent: React.FC<Props> = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  useEffect(() => {
    focusEditor();
  }, []);

  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div>
      <p className={styles.title}>Tambah Produk</p>
      <Card>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="name_produk">
              Nama Produk
            </label>
            <Input
              className={styles.input}
              type="text"
              id="name_produk"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="harga">
              Harga
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="harga"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="harga_diskon">
              Harga Diskon (Optional)
            </label>
            <Input
              addonBefore="Rp."
              type="text"
              id="harga_diskon"
              placeholder=""
              // value={name}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="qty">
              Unit
            </label>
            <Row justify="space-between">
              <div className={styles.box5}>
                <Input
                  className={styles.input}
                  id="qty"
                  placeholder="0"
                  // value={qty}
                  // onChange={onChangeQty}
                />
              </div>
              <div className={styles.box2}>
                <SelectUnit />
              </div>
            </Row>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="sku">
              SKU
            </label>
            <Input
              className={styles.input}
              type="text"
              id="sku"
              placeholder=""
              // value={email}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="stok">
              Stok
            </label>
            <Input
              className={styles.input}
              type="text"
              id="stok"
              placeholder=""
              // value={password}
              // onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="deskripsi">
              Deskripsi Produk
            </label>
            <div onClick={focusEditor} className={styles.area}>
              <Editor
                ref={editor}
                editorState={editorState}
                onChange={(editorState) => setEditorState(editorState)}
              />
            </div>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="informasi">
              Informasi Lain
            </label>
            <div onClick={focusEditor} className={styles.area}>
              <Editor
                ref={editor}
                editorState={editorState}
                onChange={(editorState) => setEditorState(editorState)}
              />
            </div>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="kategori">
              Kategori
            </label>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="sub-kategori">
              Sub Kategori
            </label>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="gambar">
              Gambar
            </label>
            <Upload name="avatar" listType="picture-card">
              <div className={styles.group}>
                <PlusOutlined />
              </div>
            </Upload>
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="">
              Kemasan Lain
            </label>
          </div>
        </div>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
      {/* <KemasanComponent /> */}
    </div>
  );
};

export default ProdukAddComponent;
