'use strict'

import 'intersection-observer'

/**
 * @description DOMツリー読み込み完了後指定の関数を実行する
 * @param {Function} func [実行関数]
 */
export const mounted = func => {
  if (document.readyState !== 'loading') {
    func()
  } else {
    document.addEventListener('DOMContentLoaded', func)
  }
}

/**
 * @description Domの参照を取得する
 * @param {String} className [class名]
 * @returns {Object} 指定class名のDom参照
 */
export const elem = className => {
  const all = document.querySelectorAll(`.${className}`)

  return all.length > 1 ? all : all[0]
}

/**
 * @description 開始要素から最も近い親要素を取得する
 * @param {Object} el [要素]
 * @param {String} className [class名]
 * @returns {Object} 指定class名のDom参照
 */
export const closest = ({ el, className }) => {
  for (let item = el; item; item = item.parentElement) {
    if (item.classList.contains(className)) {
      return item
    }
  }
}
