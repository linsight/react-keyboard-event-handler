const commonKeys = {
  backspace: 8,
  del: 46,
  delete: 46,
  tab: 9,
  enter: 13,
  return: 13,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
};

const commonKeysInUpperCases = Object.keys(commonKeys)
  .reduce((accumulator, current) =>
    Object.assign(accumulator, { [current.toUpperCase()]: commonKeys[current] }), {});


const numberKeys = '0123456789'.split('')
  .reduce((accumulator, current, index) =>
    Object.assign(accumulator, { [current]: index + 48 }), {});


const letterKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  .reduce((accumulator, current, index) =>
    Object.assign(
      accumulator,
      { [current.toLowerCase()]: index + 65 },
      { [current]: index + 65 }), {});


const modifierKeys = {
  control: 'ctrl',
  ctrl: 'ctrl',
  shift: 'shift',
  meta: 'meta',
  cmd: 'meta',
  command: 'meta',
  option: 'alt',
  alt: 'alt',
};

export const AllKeys = Object.assign({}, commonKeys, commonKeysInUpperCases, numberKeys, letterKeys);
const alphanumericKeys = Object.assign({}, numberKeys, letterKeys);

const aliasKeys = {
  all: Object.keys(AllKeys),
  alphanumeric: Object.keys(alphanumericKeys),
  numeric: Object.keys(numberKeys),
  alphabetic: Object.keys(letterKeys),
};

export function matchKeyEvent(event, keyName) {
  const eventKeyCode = event.which || event.keyCode;
  const eventType = event.type;
  const eventModifiers = Object.keys(modifierKeys).filter(modKey => event[`${modKey}Key`]).sort();
  const cleanKeyName = keyName.toLowerCase().trim();
  const keyNameParts = cleanKeyName.split(/\s?\+\s?/); // e.g. 'crtl + a'
  const mainKeyName = keyNameParts.pop();
  const mainKeyCode = AllKeys[mainKeyName];
  const modifierKeyNames = keyNameParts;

  if (eventType === 'keypress') {
    const eventKeyCodeString = String.fromCharCode(eventKeyCode);
    return keyName == eventKeyCodeString.toLowerCase();
  }

  if (modifierKeyNames.length === 0 && eventModifiers.length === 0) {
    return eventKeyCode === mainKeyCode;
  }

  if (modifierKeyNames.length > 0 && eventModifiers.length > 0) {
    const modifiers = modifierKeyNames.map(modKey => modifierKeys[modKey]).sort();
    const modifiersMatched = modifiers.length === eventModifiers.length &&
      modifiers.every((modKey, index) => eventModifiers[index] === modKey);

    return eventKeyCode === mainKeyCode && modifiersMatched;
  }

  return false;
}

export function findMatchedKey(event, keys) {
  const lookupAlias = (k) => {
    const found = aliasKeys[k.toLowerCase()];
    return found ? [...found, k.toLowerCase()] : k;
  };

  const expandedKeys = keys.map(lookupAlias).reduce((a, b) => a.concat(b), []);

  let matchedKey = expandedKeys.find(k => matchKeyEvent(event, k));

  if (!matchedKey && expandedKeys.includes('all')) {
    matchedKey = 'other';
  }

  return matchedKey;
}
