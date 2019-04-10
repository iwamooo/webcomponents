'use strict'

import { elem } from '@utilities'
import { addObserverEvent } from '@utilities/event'

const uiImg = {
  /**
   * @description data-srcに設定されている画像をbackground-imageとshadowRoot内のimgに設定する
   * @param {Object} el [要素]
   */
  display(el) {
    el.setAttribute('style', `background-image: url(${el.dataset.src})`)
    el.dataset.isIntersection = true

    const imgEl = el.shadowRoot.querySelector('img')

    imgEl.setAttribute('src', el.dataset.src)
    imgEl.setAttribute('alt', el.dataset.alt)
  },

  async dynamicImport(el) {
    try {
      const UiImgDynamicImport = await import('@components/UiImgDynamicImport')

      customElements.define('ui-img-dynamic-import', UiImgDynamicImport.default)

      this.display(el)
    } catch (error) {
      /* eslint no-console: 0 */
      console.log(error)
    }
  }
}

export default () => {
  addObserverEvent({
    el: elem('js-Lazy'),
    func: uiImg.display
  })

  addObserverEvent({
    el: elem('js-LazyDynamicImport'),
    func: uiImg.dynamicImport
  })
}
