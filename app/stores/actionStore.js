import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

import actions from 'assets/json/actions.json'

class Store {
    @observable actions = new Map();

    @action addToActions = (action) => {
        this.actions.set(action.name, action);
    };
    @action removeFromActions = () => {
        this.actions.delete(action);
    };
    @action addActions = () => {
        actions.forEach((action) => this.addToActions(action));
    };

    @computed get currentActions() {
        return toJS(this.actions);
    };
}

let actionStore = new Store();
actionStore.addActions();

module.exports = actionStore;
