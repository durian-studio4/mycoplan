import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Row, Upload, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor, EditorState } from 'draft-js';
import styles from './index.less';
import 'draft-js/dist/Draft.css';

import SelectUnit from '@/components/Select/SelectUnit';
import SelectKategori from '@/components/Select/SelectKategori';
import SelectSubKategori from '@/components/Select/SelectSubKategori';

import KemasanComponent from './Kemasan';

interface Props {}

const ProdukAddComponent: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleVisible = () => setVisible(!visible);

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
            <Row>
              <div className={styles.box_unit_left}>
                <Input
                  className={styles.input}
                  id="qty"
                  placeholder="0"
                  // value={qty}
                  // onChange={onChangeQty}
                />
              </div>
              <div className={styles.box_unit_right}>
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
            <SelectKategori />
          </div>
        </div>
        <div className={styles.box10}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="sub-kategori">
              Sub Kategori
            </label>
            <SelectSubKategori />
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
              Kemasan Lain (Opsional)
            </label>
            <div className={styles.group}>
              <Tag onClick={handleVisible}>
                <PlusOutlined /> New Tag
              </Tag>
            </div>
          </div>
        </div>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
      {visible ? <KemasanComponent visible={visible} onCancel={handleVisible} /> : null}
    </div>
  );
};

export default ProdukAddComponent;
