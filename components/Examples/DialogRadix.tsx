import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';

const AddModal = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleClose = () => {
    setText('');
  };

  const handleSubmit = () => {
    onAdd(text);
    setText('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Add</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Item</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Enter the item details below:
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="text">
              Text
            </label>
            <input
              className="Input"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmit}>
                Add
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close" onClick={handleClose}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddModal;