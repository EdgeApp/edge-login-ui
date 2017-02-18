class ABCUI {
  // constructor (options) {
  //   // These arguments might be the api keys etc.
  //   // console.log(options)
  //   // this.bundlePath = options.bundlePath
  // }

  createIFrame (path) {
    const frame = document.createElement('iframe')
    const body = document.getElementsByTagName('BODY')[0]
    body.appendChild(frame, body)
    frame.setAttribute('src', path)
    frame.setAttribute('frameborder', '0')
    frame.setAttribute('allowtransparency', 'true')
    frame.setAttribute('style', 'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;')
    return frame
  }

  // removeIFrame (frame) {
  //   frame.parentNode.removeChild(frame)
  // }
  //
  // openLoginWindow () {
  //   const frame = this.createIFrame('/login')
  //
  //   window.exitCallback = () => {
  //     this.removeIFrame(frame)
  //   }
  // }
  //
  // openSignUpWindow () {
  //   const frame = this.createIFrame('/signup/username')
  //
  //   window.exitCallback = () => {
  //     this.removeIFrame(frame)
  //   }
  // }

}

// Let's make this a module later when we move this to a seperate app
// export default ABCUI
window.ABCUI = new ABCUI() || {}
