'use strict'

import 'intersection-observer'

/**
 * @description 指定要素に対してイベントを設定する
 * @param {Object} el [要素]
 * @param {String} ev [イベント名]
 * @param {Function} func [実行関数]
 */
export const addEvent = ({ el, ev, func }) => {
  if (el && el.length) {
    for (const item of el) {
      item.addEventListener(ev, func, false)
    }
  } else {
    el.addEventListener(ev, func, false)
  }
}

/**
 * @description 指定要素に対してIntersectionObserverイベントを設定する
 * @param {Object} el [要素]
 * @param {Function} func [実行関数]
 */
export const addObserverEvent = ({ el, func }) => {
  const base = ({ observerEl, observerFunc }) => {
    const observer = new IntersectionObserver(e => {
      if (e[0].intersectionRatio) {
        const el = e[0].target

        observerFunc(el)

        observer.unobserve(observerEl)
      }
    })

    observer.observe(observerEl)
  }

  if (el && el.length) {
    for (const item of el) {
      base({
        observerEl: item,
        observerFunc: func
      })
    }
  } else {
    base({
      observerEl: el,
      observerFunc: func
    })
  }
}
