'use strict'

import 'intersection-observer'

export default class Observer {
  constructor () {
    this.uiImg()
    this.uiImgDynamicImport()
  }

  base (target, intersectionFunction) {
    const items = document.body.querySelectorAll(target)

    for (const item of items) {
      const observer = new IntersectionObserver((e) => {
        if (e[0].intersectionRatio) {
          const el = e[0].target

          intersectionFunction(el)

          observer.unobserve(item)
        }
      })

      observer.observe(item)
    }
  }

  imgDisplay (el) {
    el.setAttribute('style', `background-image: url(${el.dataset.src})`)
    el.dataset.isIntersection = true

    const imgEl = el.shadowRoot.querySelector('img')

    imgEl.setAttribute('src', el.dataset.src)
    imgEl.setAttribute('alt', el.dataset.alt)
  }

  uiImg () {
    this.base('.js-Lazy', this.imgDisplay)
  }

  async uiImgDynamicImport () {
    try {
      const intersectionFunction = async (el) => {
        const UiImgDynamicImport = await import('../components/UiImgDynamicImport')

        customElements.define('ui-img-dynamic-import', UiImgDynamicImport.default)

        this.imgDisplay(el)
      }

      this.base('.js-LazyDynamicImport', intersectionFunction)
    } catch (error) {
      /* eslint no-console: 0 */
      console.log(error)
    }
  }
}
