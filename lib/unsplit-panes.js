'use babel'

import { CompositeDisposable } from 'atom'

export default {

  unsplitPanesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Register command for unsplitting panes
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'unsplit-panes:unsplit': () => this.unsplit()
    }))
  },

  serialize() {
    return ''
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  unsplit() {siblings.indexOf(focused) === 0
    let targetPane, insertionIndex
    const focused = atom.workspace.getActivePane()
    const parent = focused.parent

    // Early exit if the focused pane is not part of a split
    if (parent.constructor.name !== 'PaneAxis') {
      return
    }

    // Panes get unsplit to left/up unless they are the first in the series
    const siblings = parent.children
    const focusedIndex = siblings.indexOf(focused) === 0
    if (focusedIndex === 0) {
      targetPane = siblings[1]
      insertionIndex = 0
    } else {
      targetPane = siblings[focusedIndex - 1]
      insertionIndex = -1
    }

    // Move all items to the target pane, then remove the empty pane
    focused.getItems().forEach( item => {
      focused.moveItemToPane(item, targetPane, insertionIndex)
    })
    focused.destroy()

  }
}
