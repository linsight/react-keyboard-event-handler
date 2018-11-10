import { expect } from 'chai';
import { AllKeys, matchKeyEvent, findMatchedKey } from './keyEvents';

describe('keyEvents', () => {
  describe('AllKeys', () => {
    it('should be contain key code maps', () => {
      expect(AllKeys.a).to.deep.equal([65]);
      expect(AllKeys.A).to.deep.equal([65]);
      expect(AllKeys.down).to.deep.equal([40]);
      expect(AllKeys.DOWN).to.deep.equal([40]);
      expect(AllKeys.delete).to.deep.equal([46]);
      expect(AllKeys.DEL).to.deep.equal([46]);
      expect(AllKeys['=']).to.deep.equal([187, 61]);
      expect(AllKeys['0']).to.deep.equal([48, 96]);
      expect(AllKeys['9']).to.deep.equal([57, 105]);
      expect(AllKeys['+']).to.deep.equal([107]);
      expect(AllKeys['*']).to.deep.equal([106]);
    });
  });

  describe('matchKeyEvent', () => {
    it('should match single key event by name', () => {
      expect(matchKeyEvent({ which: 48 }, '0')).to.be.true;
      expect(matchKeyEvent({ which: 37 }, 'left')).to.be.true;
      expect(matchKeyEvent({ which: 37 }, 'right')).to.be.false;
      expect(matchKeyEvent({ which: 40 }, 'down')).to.be.true;
      expect(matchKeyEvent({ which: 40 }, 'DOWN')).to.be.true;
      expect(matchKeyEvent({ which: 65 }, 'a')).to.be.true;
      expect(matchKeyEvent({ which: 65 }, 'A')).to.be.true;
      expect(matchKeyEvent({ which: 16 }, 'shift')).to.be.true;
    });

    it('should match modified key event by name', () => {
      expect(matchKeyEvent({ which: 48, ctrlKey: true }, 'ctrl + 0')).to.be.true;
      expect(
        matchKeyEvent({ which: 65, ctrlKey: true, shiftKey: true }, 'ctrl + shift+a')
      ).to.be.true;
      expect(matchKeyEvent({ which: 65, metaKey: true }, 'cmd + A')).to.be.true;
    });

    it('should not match single key with an event with modify key', () => {
      expect(matchKeyEvent({ which: 48 }, '0')).to.be.true;
      expect(matchKeyEvent({ which: 48, ctrlKey: true }, '0')).to.be.false;
      expect(matchKeyEvent({ which: 65, shiftKey: false }, 'a')).to.be.true;
      expect(matchKeyEvent({ which: 65, shiftKey: true }, 'a')).to.be.false;
    });

  });

  describe('findMatchedKey', () => {
    it('should find matched key for event', () => {
      expect(findMatchedKey({ which: 48 }, ['0', 'left', 'down', 'DOWN', 'a', 'A'])).to.equal('0');
      expect(findMatchedKey({ which: 37 }, ['0', 'left', 'down', 'DOWN', 'a', 'A'])).to.equal('left');
      expect(findMatchedKey({ which: 37 }, ['0', 'LEFT', 'down', 'DOWN', 'a', 'A'])).to.equal('LEFT');
      expect(findMatchedKey({ which: 40 }, ['0', 'left', 'down', 'DOWN', 'a', 'A'])).to.equal('down');
      expect(findMatchedKey({ which: 40 }, ['0', 'left', 'DOWN', 'a', 'A'])).to.equal('DOWN');
      expect(findMatchedKey({ which: 65 }, ['0', 'left', 'down', 'DOWN', 'a'])).to.equal('a');
      expect(findMatchedKey({ which: 65 }, ['0', 'left', 'down', 'DOWN', 'A'])).to.equal('A');
    });

    it('should find combine key', () => {
      expect(findMatchedKey({ which: 48, ctrlKey: true }, ['ctrl + 0', 'a'])).to.equal('ctrl + 0');
      expect(
        findMatchedKey({ which: 65, ctrlKey: true, shiftKey: true }, ['ctrl + shift+a'])
      ).to.equal('ctrl + shift+a');
      expect(findMatchedKey({ which: 65, metaKey: true }, ['cmd + A'])).to.equal('cmd + A');
    });

    it('should find alias key', () => {
      expect(findMatchedKey({ which: 48 }, ['numeric', '1'])).to.equal('0');
      expect(findMatchedKey({ which: 96 }, ['numeric', '1'])).to.equal('0');
      expect(findMatchedKey({ which: 65 }, ['alphabetic', 'c'])).to.equal('a');
      expect(findMatchedKey({ which: 66 }, ['alphanumeric', 'c'])).to.equal('b');
      expect(findMatchedKey({ which: 49 }, ['alphanumeric', 'c'])).to.equal('1');
      expect(findMatchedKey({ which: 113 }, ['function', 'c'])).to.equal('f2');
      expect(findMatchedKey({ which: 49 }, ['all'])).to.equal('1');
      expect(findMatchedKey({ which: 46 }, ['all'])).to.equal('del');
    });
  });
});
