import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BG1 = '#f5f5f5';
const BG2 = 'black';
const NAV = 'white';
const TXT1 = 'black';
const TXT2 = 'white';
const LINE = 'rgb(220,220,220)';
const LOW_OPACITY_GREY = 'rgba(130,130,130, 0.1)';

// const BG1 = "#0d0c0a";
// const BG2 = "#f5f5f5";
// const NAV = "#0f0f0f";
// const TXT1 = "white";
// const TXT2 = "BG1";
// const LINE = 'rgba(188,212,230, 0.2)"';
// const LOW_OPACITY_GREY = "rgba(81,81,81, 0.2)";

export default {
  primary: '#342D2D',
  background1: BG1,
  background2: BG2,
  background3: NAV,
  background4: LOW_OPACITY_GREY,
  lineColor: LINE,
  text1: TXT1,
  text2: TXT2,
  width: WIDTH,
  height: HEIGHT,
  // localIP: "172.20.10.14",
  localIP: '192.168.1.23',
  // localIP: "192.168.43.89",
  headerText: {
    color: TXT1,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
  header: {
    width: WIDTH,
    height: 50,
    backgroundColor: BG1,
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: BG1,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  input: {
    fontFamily: 'Helvetica',
    marginVertical: 10,
    width: WIDTH * 0.75,
    height: 45,
    paddingHorizontal: 15,
    color: TXT1,
    borderRadius: 8,
    backgroundColor: LOW_OPACITY_GREY,
  },
  screen: {
    flex: 1,
    backgroundColor: BG1,
  },
};

const dark = {
  primary: '#342D2D',
  background1: 'BG1',
  background2: BG2,
  background3: NAV,
  background4: LOW_OPACITY_GREY,
  lineColor: LINE,
  text1: TXT1,
  text2: TXT2,
  width: WIDTH,
  height: HEIGHT,
  // localIP: "172.20.10.14",
  localIP: '192.168.1.23',
  // localIP: "192.168.43.89",
  headerText: {
    color: TXT1,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
  header: {
    width: WIDTH,
    height: 50,
    backgroundColor: BG1,
    borderColor: 'transparent',
    elevation: 0,
  },
  headerStyle: {
    backgroundColor: BG1,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  input: {
    fontFamily: 'Helvetica',
    marginVertical: 10,
    width: WIDTH * 0.75,
    height: 45,
    paddingHorizontal: 15,
    color: TXT1,
    borderRadius: 8,
    backgroundColor: LOW_OPACITY_GREY,
  },
  screen: {
    flex: 1,
    backgroundColor: BG1,
  },
};
