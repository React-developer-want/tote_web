import { toast } from 'react-toastify';

const toastProperty = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
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