import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { findMatchedKey } from './keyEvents';

// let exclusiveHandlers = [];

export default KeyboardEventHandler = ({
  handleKeys,
  handleEventType,
  handleFocusableElements,
  onKeyEvent,
  isDisabled,
  isExclusive,
  children,
  ...props,
}) => {
  const childrenEl = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEvent, false);
    document.addEventListener('keyup', handleKeyboardEvent, false);
    document.addEventListener('keypress', handleKeyboardEvent, false);
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent, false);
      document.removeEventListener('keyup', handleKeyboardEvent, false);
      document.removeEventListener('keypress', handleKeyboardEvent, false);
      // deregisterExclusiveHandler();
    };
  }, []);

  // useEffect(() => {
  //   if (isExclusive && !isDisabled) {
  //     registerExclusiveHandler();
  //   } else {
  //     deregisterExclusiveHandler();
  //   }
  // }, [isExclusive, isDisabled]);

  // function registerExclusiveHandler() {
  //   deregisterExclusiveHandler();
  //   exclusiveHandlers.unshift(this);
  // }

  // function deregisterExclusiveHandler() {
  //   if (exclusiveHandlers.includes(this)) {
  //     exclusiveHandlers = exclusiveHandlers.filter(h => h !== this);
  //   }
  // }

  function handleKeyboardEvent(event) {
    if (isDisabled) {
      return false;
    }

    const isEventTypeMatched = handleEventType === event.type;

    if (!isEventTypeMatched) {
      return false;
    }

    // const exclusiveHandlerInPlace = exclusiveHandlers.length > 0;
    // const isExcluded = exclusiveHandlerInPlace && exclusiveHandlers[0] !== this;

    // if (isExcluded) {
    //   return false;
    // }

    const isEligibleEvent = event.target === document.body || handleFocusableElements;
    const isChildrenEvent = childrenEl && childrenEl.contains(event.target);
    const isValidSource = children ? isChildrenEvent : isEligibleEvent;

    if (!isValidSource) {
      return false;
    }

    const matchedKey = findMatchedKey(event, handleKeys);

    if (matchedKey) {
      onKeyEvent(matchedKey, event);
      return true;
    }

    return false;
  }
   
  return (
    <>
      {children && (
        <span ref={childrenEl} {...props}>{children}</span>
      )}
      {!children && null}
    </>
  );
}

KeyboardEventHandler.propTypes = {
  handleKeys: PropTypes.array,
  handleEventType: PropTypes.oneOf(['keydown', 'keyup', 'keypress']),
  handleFocusableElements: PropTypes.bool,
  onKeyEvent: PropTypes.func,
  isDisabled: PropTypes.bool,
  isExclusive: PropTypes.bool,
  children: PropTypes.any,
};

KeyboardEventHandler.defaultProps = {
  handleKeys: [],
  handleEventType: 'keydown',
  handleFocusableElements: false,
  onKeyEvent: () => null,
  isDisabled: false,
  isExclusive: false,
  children: null,
};
