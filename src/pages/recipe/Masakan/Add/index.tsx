import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Row, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Editor, EditorState } from 'draft-js';
import styles from '../index.less';
import 'draft-js/dist/Draft.css';

import SelectKesulitan from '@/components/Select/SelectKesulitan';
import SelectJenisMakanan from '@/components/Select/SelectJenisMakanan';
import KategoriComponent from './Kategori';

interface Props {}

const AddComponent: React.FC<Props> = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [visible, setVisible] = useState(false);

  const handleVisibleKategori = () => setVisible(!visible);

  return (
    <div>
      <p className={styles.title}>Tambah Resep</p>
      <Card>
        <Row>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="name_recipe">
                Nama Resep
              </label>
              <Input
                className={styles.input}
                type="text"
                id="name_recipe"
                placeholder=""
                // value={name}
                // onChange={handleChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="pembuat">
                Pembuat
              </label>
              <Input
                type="text"
                id="pembuat"
                placeholder=""
                // value={name}
                // onChange={handleChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Bahan</label>
              <div className={styles.area}>
                <Editor
                  editorState={editorState}
                  onChange={(editorState) => setEditorState(editorState)}
                />
              </div>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Cara Masak</label>
              <div className={styles.area}>
                <Editor
                  editorState={editorState}
                  onChange={(editorState) => setEditorState(editorState)}
                />
              </div>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="link">
                Link Youtube
              </label>
              <Input
                type="text"
                id="link"
                placeholder=""
                // value={name}
                // onChange={handleChangeState}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="duration">
                Durasi Masak
              </label>
              <Input
                addonAfter="Menit"
                id="duration"
                placeholder="0"
                // value={qty}
                // onChange={onChangeQty}
              />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="porsi">
                Porsi
              </label>
              <Row>
                <div className={styles.box_porsi_left}>
                  <Input addonAfter="Orang" />
                </div>
                <ArrowRightOutlined />
                <div className={styles.box_porsi_right}>
                  <Input addonAfter="Orang" />
                </div>
              </Row>
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="kesulitan">
                Kesulitan
              </label>
              <SelectKesulitan />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="jenis">
                Jenis Makanan
              </label>
              <SelectJenisMakanan />
            </div>
          </div>
          <div className={styles.box10}>
            <div className={styles.group}>
              <label className={styles.label}>Kategori Resep</label>
              <div>
                <Button onClick={handleVisibleKategori}>
                  <PlusOutlined />
                </Button>
                <KategoriComponent visible={visible} onCancel={handleVisibleKategori} />
              </div>
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
            <Button className={styles.button} type="primary">
              + Tambah Supermarket
            </Button>
          </div>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <div className={styles.box1}>
            <label htmlFor="supermarket">Supermarket 1</label>
          </div>
          <div className={styles.box4}>
            <Input id="supermarket" />
          </div>
          <div className={styles.box1}>
            <Button className={styles.button_delete} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </div>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <div className={styles.box1}>
            <label htmlFor="produk">Produk 1</label>
          </div>
          <div className={styles.box2}>
            <Input id="produk" />
          </div>
          <div className={styles.box1} style={{ textAlign: 'center' }}>
            <label htmlFor="produk">Jumlah</label>
          </div>
          <div className={styles.box1}>
            <Input id="produk" />
          </div>
          <div className={styles.box1}>
            <Button className={styles.button_delete} type="primary" danger>
              <DeleteOutlined />
            </Button>
            <Button className={styles.button_add} type="primary">
              <PlusOutlined />
            </Button>
          </div>
        </Row>
        <Button className={styles.button} type="primary">
          Simpan
        </Button>
      </Card>
      {/* <KemasanComponent /> */}
    </div>
  );
};

export default AddComponent;
