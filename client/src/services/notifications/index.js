import { toast } from 'react-toastify';

const toastProperty = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

export const sendSuccessNotification = (message) =>{
    toast.success(message,toastProperty);
}

export const sendErrorNotification = (message) => {
    toast.error(message, toastProperty);
}

export const sendWarningNotification = (message) => {
    toast.warn(message, toastProperty);
}

export const sendInfoNotification = (message) => {
    toast.info(message, toastProperty);
}