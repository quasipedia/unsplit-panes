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

    console.log('ACTIVATED')
  },

  serialize() {
    return ''
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  unsplit() {
    console.log('I AM LEGEND')
    console.log(atom.workspace.getActivePane())
    console.log(atom.workspace.getActivePane().parent)
    console.log(atom.workspace.getActivePane().parent.children)
  }

}
