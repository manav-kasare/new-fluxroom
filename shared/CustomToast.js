import Toast from "react-native-tiny-toast";

const CustomToast = (message) => {
  return Toast.show(message, {
    duration: Toast.duration.SHORT,
    position: Toast.position.BOTTOM,
    containerStyle: {
      borderRadius: 10,
    },
  });
};

export default CustomToast;
