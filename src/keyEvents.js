const commonKeys = {
  backspace: [8],
  del: [46],
  delete: [46],
  ins: [45],
  insert: [45],
  tab: [9],
  enter: [13],
  return: [13],
  esc: [27],
  space: [32],
  pageup: [33],
  pagedown: [34],
  end: [35],
  home: [36],
  left: [37],
  up: [38],
  right: [39],
  down: [40],
  shift: [16],
  ctrl: [17],
  alt: [18],
  cap: [20],
  num: [144],
  clear: [12],
  meta: [91],
  ';': [186, 59],
  '=': [187, 61],
  ',': [188, 44],
  '-': [189, 45, 173, 109],
  '.': [190, 110],
  '/': [191, 111],
  '`': [192],
  '[': [219],
  '\\': [220],
  ']': [221],
  '*': [106],
  '+': [107],
};

const commonKeysInUpperCases = Object.keys(commonKeys)
  .reduce((accumulator, current) =>
    Object.assign(accumulator, { [current.toUpperCase()]: commonKeys[current] }), {});


const numberKeys = '0123456789'.split('')
  .reduce((accumulator, current, index) =>
    Object.assign(accumulator, { [current]: [index + 48, index + 96] }), {});


const letterKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  .reduce((accumulator, current, index) =>
    Object.assign(
      accumulator,
      { [current.toLowerCase()]: [index + 65] },
      { [current]: [index + 65] }), {});

const fnKeys = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19'.split(',')
  .reduce((accumulator, current, index) =>
    Object.assign(accumulator, { [`f${current}`]: [index + 112] }), {});


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

export const AllKeys = Object.assign({}, commonKeys, commonKeysInUpperCases, numberKeys, letterKeys, fnKeys);
const alphanumericKeys = Object.assign({}, numberKeys, letterKeys);

const aliasKeys = {
  all: Object.keys(AllKeys),
  alphanumeric: Object.keys(alphanumericKeys),
  numeric: Object.keys(numberKeys),
  alphabetic: Object.keys(letterKeys),
  function: Object.keys(fnKeys),
};

export function matchKeyEvent(event, keyName) {
  const eventKeyCode = event.which || event.keyCode;
  const eventType = event.type;
  const eventModifiers = Object.keys(modifierKeys).filter(modKey => event[`${modKey}Key`]).sort();
  const cleanKeyName = keyName.toLowerCase().trim();
  const keyNameParts = cleanKeyName === '+' ? ['+'] : cleanKeyName.split(/\s?\+\s?/); // e.g. 'crtl + a'
  const mainKeyName = keyNameParts.pop();
  const mainKeyCode = AllKeys[mainKeyName];
  const modifierKeyNames = keyNameParts;

  if (eventType === 'keypress') {
    const eventKeyCodeString = String.fromCharCode(eventKeyCode);
    return keyName == eventKeyCodeString.toLowerCase();
  }

  if (modifierKeyNames.length === 0 && eventModifiers.length === 0) {
    return mainKeyCode.indexOf(eventKeyCode) >= 0;
  }

  if (modifierKeyNames.length > 0 && eventModifiers.length > 0) {
    const modifiers = modifierKeyNames.map(modKey => modifierKeys[modKey]).sort();
    const modifiersMatched = modifiers.length === eventModifiers.length &&
      modifiers.every((modKey, index) => eventModifiers[index] === modKey);

    return mainKeyCode.indexOf(eventKeyCode) >= 0 && modifiersMatched;
  }

  if (modifierKeyNames.length == 0 && eventModifiers.length === 1) {
    return mainKeyName === eventModifiers[0];
  }

  return false;
}

export function findMatchedKey(event, keys) {
  const lookupAlias = (k) => {
    const lowerK = k.toLowerCase();
    const found = aliasKeys[lowerK];
    return found ? found : [k];
  };

  const expandedKeys = keys.map(lookupAlias).reduce((a, b) => a.concat(b), []);

  let matchedKey = expandedKeys.find(k => matchKeyEvent(event, k));

  if (!matchedKey && keys.includes('all')) {
    matchedKey = 'other';
  }

  return matchedKey;
}
