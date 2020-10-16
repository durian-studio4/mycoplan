import React, { Fragment } from 'react';
import { Modal, Row, Button } from 'antd';
import styles from './index.less';

import AutoCompleteRecipe from '@/components/Autocomplete/Resep';

import useAutoComplete from '@/hooks/useAutoComplete';

interface Props {
  visible: boolean;
  onLoadButton: boolean;
  onCancel: () => void;
  onCreate: ({ json, clear }: any) => void;
}

const AddRecipeComponent: React.FC<Props> = ({ visible, onLoadButton, onCancel, onCreate }) => {
  const recipe = useAutoComplete({
    idSelect: 0,
    textSelect: '',
  });

  const onClearState = () => {
    recipe.clearText();
    onCancel();
  };

  let DataJSON = JSON.stringify({
    id_recipe: recipe.id,
  });

  const createRecipe = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Tambah Resep Pilihan" closable={false} footer={null}>
      <Fragment>
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <AutoCompleteRecipe
                value={recipe.text}
                onChange={recipe.changeText}
                onSelect={recipe.selectText}
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
            disabled={!recipe.id || onLoadButton}
            type="primary"
          >
            Simpan
          </Button>
        </Row>
      </Fragment>
    </Modal>
  );
};

export default AddRecipeComponent;
