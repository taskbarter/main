import { useToasts } from 'react-toast-notifications';
import React from 'react';

export const MyToaster = ({ content }) => {
  const { addToast } = useToasts();
  return (
    <button
      onClick={() =>
        addToast(content, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    >
      Add Toast
    </button>
  );
};

export default MyToaster;
