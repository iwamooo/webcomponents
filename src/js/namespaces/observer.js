'use strict'

import { elem } from '@utilities'
import { addObserverEvent } from '@utilities/event'

export const observer = {
  init() {
    this.uiImg()
    this.uiImgDynamicImport()
  },

  /**
   * @description data-srcに設定されている画像をbackground-imageとshadowRoot内のimgに設定する
   * @param {Object} el [要素]
   */
  imgDisplay(el) {
    el.setAttribute('style', `background-image: url(${el.dataset.src})`)
    el.dataset.isIntersection = true

    const imgEl = el.shadowRoot.querySelector('img')

    imgEl.setAttribute('src', el.dataset.src)
    imgEl.setAttribute('alt', el.dataset.alt)
  },

  uiImg() {
    addObserverEvent({
      el: elem('js-Lazy'),
      func: this.imgDisplay
    })
  },

  uiImgDynamicImport() {
    const intersectionFunction = async el => {
      try {
        const UiImgDynamicImport = await import('@components/UiImgDynamicImport')

        customElements.define(
          'ui-img-dynamic-import',
          UiImgDynamicImport.default
        )

        this.imgDisplay(el)
      } catch (error) {
        /* eslint no-console: 0 */
        console.log(error)
      }
    }

    addObserverEvent({
      el: elem('js-LazyDynamicImport'),
      func: intersectionFunction
    })
  }
}
