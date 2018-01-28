import {
  observable,
  action,
  mobx,
  toJS,
} from 'globalImports';

class Store {
  @observable hunger = 0;
  @observable health = 10;
  @observable food = 0;
  @observable medicine = 0;
  @observable inventory = new Map();


  @action modHunger = (newHunger) => {
    this.hunger = newHunger;
  };
  @action modHealth = (newHealth) => {
    this.health = newHealth;
  };
  @action modFood = (newFood) => {
    this.food = newFood;
  };
  @action modMeds = (newMeds) => {
    this.medicine = newMeds;
  };
  @action addToInventory = (item) => {
    this.inventory.set(item.name, item);
  };
  @action removeFromInventory = (key) => {
    this.inventory.delete(key);
  };

  @computed inventoryItems() {
    return toJS(this.inventory);
  };
}

let playerStore = new Store();

module.exports = playerStore;