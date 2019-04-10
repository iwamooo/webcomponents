'use strict'

import { mounted } from '@utilities'
import { observer } from '@namespaces/observer'
import UiImg from '@components/UiImg'

mounted(() => {
  customElements.define('ui-img', UiImg)
  observer.init()
})
