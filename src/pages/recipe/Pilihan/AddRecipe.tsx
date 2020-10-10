import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Row, Input, Upload, Button } from 'antd';
import styles from './index.less';

import SelectRecipe from '@/components/Select/SelectRecipe';

import useSelect from '@/hooks/useSelect';

interface Props {
  visible: boolean;
  onLoadButton: boolean;
  onCancel: () => void;
  onCreate: ({ json, clear }: any) => void;
}

const AddRecipeComponent: React.FC<Props> = ({ visible, onLoadButton, onCancel, onCreate }) => {
  const [name, setName] = useState('');
  const [id_recipe, onChangeRecipe, onClearRecipe] = useSelect('');

  const onChangeState = (e: any) => {
    const { value } = e.target;

    setName(value);
  };

  const onClearState = () => {
    setName('');
    onClearRecipe();
    onCancel();
  };

  let DataJSON = JSON.stringify({
     id_recipe
  })

  const createRecipe = () => {
    onCreate({
      json: DataJSON,
      clear: onClearState,
    });
  };

  return (
    <Modal visible={visible} title="Create Recipe Pilihan" closable={false} footer={null}>
      <Fragment>

        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <div className={styles.group}>
              <SelectRecipe handleChange={onChangeRecipe}
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
          disabled={!id_recipe || onLoadButton}
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
