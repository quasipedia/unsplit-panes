'use babel';

import UnsplitPanesView from './unsplit-panes-view';
import { CompositeDisposable } from 'atom';

export default {

  unsplitPanesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.unsplitPanesView = new UnsplitPanesView(state.unsplitPanesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.unsplitPanesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'unsplit-panes:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.unsplitPanesView.destroy();
  },

  serialize() {
    return {
      unsplitPanesViewState: this.unsplitPanesView.serialize()
    };
  },

  toggle() {
    console.log(atom.workspace.getActivePane());
    console.log(atom.workspace.getActivePane().parent);
    console.log(atom.workspace.getActivePane().parent.children);
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
