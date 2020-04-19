import { toast, Slide } from 'react-toastify';

export const addToast = (content) => {
  toast.info(content, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};
