import constants from './constants';
export default {
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    width: constants.width * 0.8,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 0.3,
  },
  textInput: {
    fontWeight: '300',
    fontSize: 13,
    flex: 1,
    height: 50,
    height: 50,
    paddingLeft: 10,
  },
  error: {
    alignSelf: 'flex-start',
    color: 'crimson',
    fontSize: 16,
  },
  button: {
    width: constants.width * 0.8,
    height: 50,
    backgroundColor: '#3f00a6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 5,
  },
  screenButton: {
    width: constants.width * 0.9,
    height: 50,
    backgroundColor: '#3f00a6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: 'Helvetica',
  },
  rootAppbarHeader: {
    width: constants.width,
    height: constants.height * 0.075,
    backgroundColor: 'transparent',
  },
  rootAppbarTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: '200',
    fontFamily: 'Helvetica',
  },
};
