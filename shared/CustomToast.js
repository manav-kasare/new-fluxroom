import Toast from 'react-native-tiny-toast';

const CustomToast = (message) => {
  return Toast.show(message, {
    duration: Toast.duration.SHORT,
    position: Toast.position.BOTTOM,
    containerStyle: {backgroundColor: '#4640C1', padding: 10},
  });
};

export default CustomToast;
