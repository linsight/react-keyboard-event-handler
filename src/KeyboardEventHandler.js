import React from 'react';
import PropTypes from 'prop-types';
import { matchKeyEvent } from './keyEvents';

let exclusiveHandlers = [];

export default class KeyboardEventHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.registerExclusiveHandler = this.registerExclusiveHandler.bind(this);
    this.deregisterExclusiveHandler = this.deregisterExclusiveHandler.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyboardEvent, false);
    document.addEventListener('keyup', this.handleKeyboardEvent, false);
    document.addEventListener('keypress', this.handleKeyboardEvent, false);

    const { isExclusive, isDisabled } = this.props;
    if (isExclusive && !isDisabled) {
      this.registerExclusiveHandler();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardEvent, false);
    document.removeEventListener('keyup', this.handleKeyboardEvent, false);
    document.removeEventListener('keypress', this.handleKeyboardEvent, false);

    this.deregisterExclusiveHandler();
  }

  componentWillReceiveProps(nextProps) {
    const { isExclusive, isDisabled } = nextProps;
    const hasChanged = this.props.isExclusive !== isExclusive ||
      this.props.isDisabled !== isDisabled;

    if (hasChanged) {
      if (isExclusive && !isDisabled) {
        this.registerExclusiveHandler();
      } else {
        this.deregisterExclusiveHandler();
      }
    }
  }

  registerExclusiveHandler() {
    this.deregisterExclusiveHandler();
    exclusiveHandlers.unshift(this);
  }

  deregisterExclusiveHandler() {
    if (exclusiveHandlers.includes(this)) {
      exclusiveHandlers = exclusiveHandlers.filter(h => h !== this);
    }
  }

  handleKeyboardEvent(event) {
    const { isDisabled, handleKeys, onKeyEvent, handleEventType } = this.props;
    const eventTypeMatched = handleEventType === event.type;
    const matchedKey = handleKeys.find((k) => matchKeyEvent(event, k));
    const exclusiveHandlerInPlace = exclusiveHandlers.length > 0;
    const isExcluded = exclusiveHandlerInPlace && exclusiveHandlers[0] !== this;

    if (!isDisabled && !isExcluded && eventTypeMatched && matchedKey) {
      onKeyEvent(matchedKey, event);
    }
  }

  render() {
    return this.props.children || null;
  }
}

KeyboardEventHandler.propTypes = {
  handleKeys: PropTypes.array,
  handleEventType: PropTypes.oneOf(['keydown', 'keyup', 'keypress']),
  onKeyEvent: PropTypes.func,
  isDisabled: PropTypes.bool,
  isExclusive: PropTypes.bool,
  children: PropTypes.any,
};

KeyboardEventHandler.defaultProps = {
  handleKeys: [],
  handleEventType: 'keydown',
  onKeyEvent: () => null,
};
