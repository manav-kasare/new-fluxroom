export const CustomToast = (message) => {
  toast.show(message, {type: 'success'});
};

export const CustomErrorTost = (message) => {
  toast.show(message, {type: 'danger'});
};
