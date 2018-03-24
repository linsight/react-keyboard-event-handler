import { expect } from 'chai';
import { Keys, matchKeyEvent } from './keyEvents';

describe('[Utils] EventKeys', () => {
  describe('EventKeys', () => {
    it('should be contain key code maps', () => {
      expect(Keys.a).to.equal(65);
      expect(Keys.A).to.equal(65);
      expect(Keys.down).to.equal(40);
      expect(Keys.DOWN).to.equal(40);
      expect(Keys.delete).to.equal(46);
      expect(Keys.DEL).to.equal(46);
      expect(Keys['=']).to.equal(187);
      expect(Keys['0']).to.equal(48);
      expect(Keys['9']).to.equal(57);
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
    });

    it('should match modified key event by name', () => {
      expect(matchKeyEvent({ which: 48, ctrlKey: true }, 'ctrl + 0')).to.be.true;
      expect(
        matchKeyEvent({ which: 65, ctrlKey: true, shiftKey: true }, 'ctrl + shift+a')
      ).to.be.true;
      expect(matchKeyEvent({ which: 65, metaKey: true }, 'cmd + A')).to.be.true;
    });

    it('should match "all" key alias', () => {
      expect(matchKeyEvent({ which: 48, ctrlKey: true }, 'all')).to.be.true;
      expect(matchKeyEvent({ which: 65 }, 'all')).to.be.true;
    });

    it('should match "alphanumeric" key alias', () => {
      expect(matchKeyEvent({ key: 'a', ctrlKey: true }, 'alphanumeric')).to.be.true;
      expect(matchKeyEvent({ charCode: 119 }, 'alphanumeric')).to.be.true;
      expect(matchKeyEvent({ key: 'Arrow Left' }, 'alphanumeric')).to.be.false;
      expect(matchKeyEvent({ charCode: 61 }, 'alphanumeric')).to.be.false;
    });
  });
});
