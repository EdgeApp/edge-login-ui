import { scale } from '../../util/scaling'

const HeaderParentButtons = {
  container: {
    top: scale(30),
    marginLeft: scale(15),
    marginRight: scale(15),
    flexDirection: 'row'
  },
  leftButtonContainer: {
    justifyContent: 'center',
    alignContents: 'center',
    height: scale(32)
  },
  leftButtonText: {
    color: '#FFF',
    fontSize: 16
  },
  rightButtonContainer: {
    justifyContent: 'flex-end',
    alignContents: 'flex-end',
    height: scale(32)
  },
  rightButtonText: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'right'
  },
  spacer: {
    flex: 1
  },
  image: {
    width: scale(74),
    height: scale(20)
  }
}

export { HeaderParentButtons }
