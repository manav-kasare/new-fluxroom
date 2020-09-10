export const CustomToast = (message) => {
  toast.show(message, {type: 'success'});
};

export const CustomErrorToast = (message) => {
  toast.show(message, {type: 'danger'});
};
