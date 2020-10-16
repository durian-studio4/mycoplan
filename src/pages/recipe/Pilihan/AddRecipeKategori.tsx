import React, { Fragment } from 'react';
import { Modal, Row, Button } from 'antd';
import styles from './index.less';

import AutoCompleteKategori from '@/components/Autocomplete/ResepKategori';

import useAutoComplete from '@/hooks/useAutoComplete';

interface Props {
  visible: boolean;
  onLoadButton: boolean;
  onCancel: () => void;
  onCreate: ({ json, clear }: any) => void;
}

const AddRecipeKategoriComponent: React.FC<Props> = ({
  visible,
  onLoadButton,
  onCancel,
  onCreate,
}) => {
  const kategori = useAutoComplete({
    idSelect: 0,
    textSelect: '',
  });

  const onClearState = () => {
    kategori.clearText();
    onCancel();
  };

  let DataJSON = JSON.stringify({
    id_recipe_category: kategori.id,
  });

  const createRecipe = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Tambah Kategori Resep Pilihan" closable={false} footer={null}>
      <Fragment>
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <AutoCompleteKategori
                value={kategori.text}
                onChange={kategori.changeText}
                onSelect={kategori.selectText}
              />
            </div>
          </div>
          {/* <div className={styles.box10}>
            <div className={styles.group}>
              <Input
                className={styles.input}
                placeholder="Nama Kategori Resep"
                value={name}
                onChange={onChangeState}
              />
            </div>
          </div> */}
        </div>
        <Row justify="end">
          {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
          <Button
            className={styles.button}
            onClick={onClearState}
            disabled={onLoadButton}
            type="primary"
            danger
          >
            Batal
          </Button>
          <Button
            className={styles.button}
            onClick={createRecipe}
            disabled={!kategori.id || onLoadButton}
            type="primary"
          >
            Simpan
          </Button>
        </Row>
      </Fragment>
    </Modal>
  );
};

export default AddRecipeKategoriComponent;
