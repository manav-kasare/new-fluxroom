import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default {
  primary: '#342D2D',
  width: WIDTH,
  height: HEIGHT,
  url: 'https://fluxroom-backend-beta.herokuapp.com',
};

export const light = {
  primary: '#6300f7',
  background1: '#f5f5f5',
  background2: '#0d0c0a',
  background3: 'white',
  background4: 'rgba(130,130,130, 0.1)',
  lineColor: 'rgb(220,220,220)',
  text1: '#0d0c0a',
  text2: '#f5f5f5',
  width: WIDTH,
  height: HEIGHT,
  url: 'fluxroom-backend-beta.herokuapp.com',
  headerText: {
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: 'white',
  },
  header: {
    width: WIDTH,
    height: 50,
    backgroundColor: '#6300f7',
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: '#6300f7',
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    height: 100,
  },
  input: {
    fontFamily: 'Helvetica',
    marginVertical: 10,
    width: WIDTH * 0.8,
    height: 45,
    paddingHorizontal: 15,
    color: 'black',
    borderRadius: 8,
    backgroundColor: 'rgba(130,130,130, 0.1)',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
};

export const dark = {
  primary: '#6300f7',
  background1: '#0d0c0a',
  background2: '#f5f5f5',
  background3: '#141414',
  background4: 'rgba(81,81,81, 0.2)',
  lineColor: 'rgba(188,212,230, 0.2)',
  text1: 'white',
  text2: '#0d0c0a',
  width: WIDTH,
  height: HEIGHT,
  url: 'fluxroom-backend-beta.herokuapp.com',
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
  header: {
    width: WIDTH,
    height: 50,
    backgroundColor: '#141414',
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: '#141414',
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  input: {
    fontFamily: 'Helvetica',
    marginVertical: 10,
    width: WIDTH * 0.8,
    height: 45,
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 8,
    backgroundColor: 'rgba(130,130,130, 0.1)',
  },
  screen: {
    flex: 1,
    backgroundColor: '#0d0c0a',
  },
};
