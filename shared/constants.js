import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const IP = '172.20.10.14';
//const IP = '192.168.1.23';
// const IP = "192.168.43.89";

export default {
  primary: '#342D2D',
  width: WIDTH,
  height: HEIGHT,
  localIP: IP,
  url: 'https://fluxroom-backend-beta.herokuapp.com',
};

export const light = {
  primary: '#4640C1',
  background1: 'white',
  background2: 'black',
  background3: 'white',
  background4: 'rgba(130,130,130, 0.1)',
  lineColor: 'rgb(220,220,220)',
  text1: 'rgb(16,12,8)',
  text2: 'white',
  width: WIDTH,
  height: HEIGHT,
  localIP: IP,
  url: 'fluxroom-backend-beta.herokuapp.com',
  headerText: {
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: 'white',
  },
  header: {
    width: WIDTH,
    height: 50,
    backgroundColor: '#4640C1',
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: '#4640C1',
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
  primary: '#4640C1',
  background1: '#0d0c0a',
  background2: '#f5f5f5',
  background3: '#0f0f0f',
  background4: 'rgba(81,81,81, 0.2)',
  lineColor: 'rgba(188,212,230, 0.2)',
  text1: 'white',
  text2: 'black',
  width: WIDTH,
  height: HEIGHT,
  localIP: IP,
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
    backgroundColor: '#0d0c0a',
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: '#0d0c0a',
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
