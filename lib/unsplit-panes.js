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

  unsplit() {
    let items, targetPane, insertionIndex
    const focused = atom.workspace.getActivePane()
    const parent = focused.parent

    // Early exit if the focused pane is not part of a split
    if (parent.constructor.name !== 'PaneAxis') {
      return
    }

    // Panes get unsplit to left/up unless they are the first in the series
    const siblings = parent.children
    const focusedIndex = siblings.indexOf(focused)
    if (focusedIndex === 0) {  // The focused pane is the first in a split
      items = focused.getItems().reverse()
      targetPane = siblings[1]
      insertionIndex = 0
    } else {  // There is a pane before the focused one
      items = focused.getItems()
      targetPane = siblings[focusedIndex - 1]
      insertionIndex = -1
    }

    // Move all items to the target pane, then remove the empty pane
    items.forEach( item => {
      focused.moveItemToPane(item, targetPane, insertionIndex)
    })
    focused.destroy()

  }
}
