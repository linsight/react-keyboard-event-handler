const commonKeys = {
  backspace: 8,
  del: 46,
  delete: 46,
  tab: 9,
  enter: 13,
  return: 13,
  esc: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
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
      { [current]: index + 65 },
      { [current.toLowerCase()]: index + 65 }), {});


export const modifierKeys = {
  control: 'ctrl',
  ctrl: 'ctrl',
  shift: 'shift',
  meta: 'meta',
  cmd: 'meta',
  command: 'meta',
  option: 'alt',
  alt: 'alt',
};

export const keyAliasRegex = {
  all: /./,
  alphanumeric: /^[a-z0-9]$/i,
  alphabetic: /^[a-z]$/i,
  numeric: /^[0-9]$/i,
};

export const Keys = Object.assign({}, commonKeys, commonKeysInUpperCases, numberKeys, letterKeys);

export function matchKeyEvent(event, keyName) {
  const eventKeyCode = event.which || event.keyCode;
  const eventModifiers = Object.keys(modifierKeys).filter(modKey => event[`${modKey}Key`]).sort();
  const cleanKeyName = keyName.toLowerCase().trim();
  const keyNameParts = cleanKeyName.split(/\s?\+\s?/); // e.g. 'crtl + a'
  const mainKeyName = keyNameParts.pop();
  const mainKeyCode = Keys[mainKeyName];
  const modifierKeyNames = keyNameParts;

  if (keyAliasRegex[mainKeyName]) {
    const pressedChar = event.key || String.fromCharCode(event.charCode);
    const pattern = keyAliasRegex[mainKeyName];
    return pattern.test(pressedChar);
  }

  let isMatched = eventKeyCode === mainKeyCode;

  if (modifierKeyNames.length > 0) {
    const modifiers = modifierKeyNames.map(modKey => modifierKeys[modKey]).sort();
    const modifiersMatched = modifiers.length === eventModifiers.length &&
      modifiers.every((modKey, index) => eventModifiers[index] === modKey);

    isMatched = isMatched && modifiersMatched;
  }

  return isMatched;
}
