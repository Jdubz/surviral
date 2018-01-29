import {
    observable,
    action,
    mobx,
    toJS,
    computed,
} from 'globalImports';

import { playerStore, locationStore, actionStore } from '../stores';
import actions from 'assets/json/actions.json';
import items from 'assets/json/items.json';
import sounds from 'assets/json/sounds.json';

const parseMapFromString = (inStr) => {
    if (inStr === "" || inStr === null || inStr === undefined) {
        return inStr;
    }

    let splitString = inStr.split(",");
    let map = {};
    splitString.forEach((keyValue) => {
        let [key, value] = keyValue.split(":");
        value = parseInt(value);
        map[key] = value;
    });
    return map;
};

const parseAction = (action) => {
    action.prereq = parseMapFromString(action.prereq);
    action.player_effects = parseMapFromString(action.player_effects);
    action.sound = sounds.find((sound) => action.sound_effect === sound.id);
    return action;
};

const validateAction = (action) => {
    let prereqs = action.prereq;
    let valid = true;
    Object.keys(prereqs).forEach((prereq) => {
        let prereqInPlayerInventory = playerStore.inventoryItems.hasOwnProperty(prereq);
        let prereqInLocationInventory = locationStore.inventoryItems.hasOwnProperty(prereq);
        if (!prereqInLocationInventory && !prereqInPlayerInventory) {
            valid = false;
        }
    });
    return valid;
};

let _actions = actions.map(parseAction);

module.exports.getValidActions = () => {
    return _actions.filter(validateAction);
};
