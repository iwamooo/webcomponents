'use strict'

export default class UiImg extends HTMLElement {
  constructor () {
    super()
  }

  static get template () {
    return `
      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="opacity:0">
    `
  }

  connectedCallback () {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = UiImg.template
  }
}
