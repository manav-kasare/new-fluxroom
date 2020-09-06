import Toast from 'react-native-tiny-toast';

const CustomToast = (message) => {
  return Toast.show(message, {
    duration: Toast.duration.SHORT,
    position: Toast.position.BOTTOM,
    containerStyle: {backgroundColor: 'rgba(70, 64, 193, 0.9)', padding: 10},
  });
};

export default CustomToast;
