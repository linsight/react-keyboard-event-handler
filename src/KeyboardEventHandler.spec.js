import React from 'react';
import { expect } from 'chai';
import { render, mount } from 'enzyme';
import Sinon from 'sinon';
import KeyboardEventHandler from './KeyboardEventHandler';
import simulateEvent from 'simulate-event';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('KeyboardEventHandler', () => {
  it('should be able to handle key event', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['a']} onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });
    expect(handleKeyEvent.calledWith('a')).to.be.true;
  });

  it('should be able to disable handling key event', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['a']} isDisabled onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });
    expect(handleKeyEvent.called).to.equal(false);
  });

  it('should be able to handle combined key event', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['ctrl + a']} onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65, ctrlKey: true });
    expect(handleKeyEvent.calledWith('ctrl + a')).to.be.true;
  });

  it('should be able to handle key events in case insensitive way ', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['ctRl + A']} onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65, ctrlKey: true });
    expect(handleKeyEvent.calledWith('ctRl + A')).to.be.true;
  });

  it('should be able to handle multiple keys', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['a', 'b', 'C']} onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });
    expect(handleKeyEvent.lastCall.calledWith('a')).to.be.true;

    simulateEvent.simulate(document.body, 'keydown', { keyCode: 66 });
    expect(handleKeyEvent.lastCall.calledWith('b')).to.be.true;

    simulateEvent.simulate(document.body, 'keydown', { keyCode: 67 });
    expect(handleKeyEvent.lastCall.calledWith('C')).to.be.true;
  });

  it('should be able to handle 2 other key event types', () => {
    let handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['a']} handleEventType="keyup"
                                 onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keyup', { keyCode: 65 });
    expect(handleKeyEvent.calledWith('a')).to.be.true;

    handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['b']} handleEventType="keypress"
                                 onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keypress', { keyCode: 66 });
    expect(handleKeyEvent.calledWith('b')).to.be.true;
  });

  it('should be able to work with multiple instances', () => {
    const handleKeyEventA = Sinon.spy();
    const handleKeyEventB = Sinon.spy();

    render(<div>
      <KeyboardEventHandler
        handleKeys={['a']}
        onKeyEvent={handleKeyEventA} />
      <KeyboardEventHandler
        handleKeys={['a']}
        onKeyEvent={handleKeyEventB} />
    </div>);

    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });

    expect(handleKeyEventA.calledWith('a')).to.be.true;
    expect(handleKeyEventB.calledWith('a')).to.be.true;
  });


  it('should be able to work exclusively within multiple instances', () => {
    const handleKeyEventA = Sinon.spy();
    const handleKeyEventB = Sinon.spy();

    const Comp = (props) => (<div>
      <KeyboardEventHandler
        isExclusive={props.isExclusiveA}
        handleKeys={['a', 'b', 'c']}
        onKeyEvent={handleKeyEventA} />
      <KeyboardEventHandler
        isDisabled={props.isDisabledB}
        isExclusive={props.isExclusiveB}
        handleKeys={['a', 'b', 'c']}
        onKeyEvent={handleKeyEventB} />
    </div>);

    const wrapper = mount(<Comp isExclusiveA />);

    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });
    expect(handleKeyEventA.lastCall.calledWith('a')).to.be.true;
    expect(handleKeyEventB.called).to.be.false;

    wrapper.setProps({ isExclusiveA: false });
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 66 });
    expect(handleKeyEventA.lastCall.calledWith('b')).to.be.true;
    expect(handleKeyEventB.lastCall.calledWith('b')).to.be.true;

    wrapper.setProps({ isExclusiveA: false, isExclusiveB: true });
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65 });
    expect(handleKeyEventA.lastCall.calledWith('a')).to.be.false;
    expect(handleKeyEventB.lastCall.calledWith('a')).to.be.true;


    wrapper.setProps({ isExclusiveA: false, isExclusiveB: true, isDisabledB: true });
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 67 });
    expect(handleKeyEventA.lastCall.calledWith('c')).to.be.true;
    expect(handleKeyEventB.lastCall.calledWith('c')).to.be.false;

    wrapper.setProps({ isExclusiveA: true, isExclusiveB: true, isDisabledB: false });
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 66 });
    expect(handleKeyEventA.lastCall.calledWith('b')).to.be.false;
    expect(handleKeyEventB.lastCall.calledWith('b')).to.be.true;
  });
});
