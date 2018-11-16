# react-keyboard-event-handler

A React component for handling keyboard events (keyup, keydown and keypress<sup>\*</sup>).

## Main features

1. Supports combined keys ( e.g. CTRL + S and even CTRL + SHIFT + S );
1. Supports handling midifier key alone (e.g. handle pressing 'ctrl' key);
1. Supports almost all keys including function keys (e.g. 'F1');
1. Provides easy-to-use and consistent key names to free you from dealing with numeric key codes and/or browser compatibilities;
1. Supports key alias such 'alphanumeric' and 'all' as short cuts for handling multiple keys;
1. Supports multiple handler instances and provides an easy way to control enable/disable status for each handler via props `isDisabled` and `isExclusive`.

## Live demo

[demo/dist/index.html](https://linsight.github.io/react-keyboard-event-handler/demo/dist/index.html)

# Installation

```
npm install react-keyboard-event-handler
```

# Usage

## Handling global key events

By default, `KeyboardEventHandler` only handles global key events sourced from `document.body`.
That is, key events fired without any focused element (`event.target`). It will not
handle key events sourced from form controls (e.g. input ), links or any
tab-enabled(focusable) elements (e.g. elements with `tabIndex` attribute).

Web browsers come with default keyboard behaviors for tab-enabled elements. It may be more appropriate
to let the browser do its job in most cases.

```
import KeyboardEventHandler from 'react-keyboard-event-handler';

const ComponentA = (props) => (<div>
  <div>key detected: {props.eventKey}</div>
  <KeyboardEventHandler
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)} />
</div>);

```

You can change this default, however, by setting `handleFocusableElements` prop to `true`;

## Handling key events sourced from children elements

If `KeyboardEventHandler` wraps around any children elements, it will handle and ONLY handle key events sourced from its descendant elements, including any form controls, links or tab-enabled elements.

```
import KeyboardEventHandler from 'react-keyboard-event-handler';

const ComponentA = (props) => (<div>
  <div>key detected: {props.eventKey}</div>
  <KeyboardEventHandler
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)} >
    <input type="text" placeholder="Key events will be handled"/>
    <a href="#" >Key events from focusable element will be handled</a>
  </KeyboardEventHandler>
</div>);

```

For form control elements, React provides with `onKeyDown`, `onKeyPress` and `onKeyUp` synthetic events. However, you may find it easier to work with the key names/alias provided by `KeyboardEventHandler`.

# API summary

| Property                | Type     | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| handleKeys              | Array    | []           | An array of keys this handler should handle. <br/> There are also some handy alias for keys, see bellow for details. e.g. `['a', 'b', 'numeric']`                                                                                                                                                                                                                                                                                                                                                                                                      |
| handleEventType         | String   | keydown      | Keyboard event type. <br />This can be 'keyup', 'keydown' or 'keypress'. <br /><sup>\*</sup>**Note**: 'keypress' event only support printable keys. i.e. no support for modifier keys or 'tab', 'enter' etc.                                                                                                                                                                                                                                                                                                                                           |
| handleFocusableElements | Bool     | false        | By default, handler only handles key events sourced from `doucment.body`. When this props is set to `true`, it will also handle key events from all focusable elements. This props only apply when there's no children.                                                                                                                                                                                                                                                                                                                                |
| isDisabled              | Boolean  | false        | Enable/Disable handling keyboard events                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| isExclusive             | Boolean  | false        | When set to `true`, all other handler instances are suspended. <br />This is useful for temporary disabling all other keyboard event handlers. <br />For example, for suppressing any other handlers on a page when a modal opens with its own keyboard event handling.                                                                                                                                                                                                                                                                                |
| onKeyEvent              | function | `() => null` | <p>A callback function to call when the handler detects a matched key event.</p><p>The signature of the callback function is: <br />`function(key, event) { ... }`<p><dl><dh>`key`</dh><dd>The key name matches the current keyboard event.</dd><dh>`event`</dh><dd>The native [keyboard event](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent). e.g. you can use `event.keyCode` to get the numeric key code. This is useful for handling keys that are not supported (i.e. does not have a key name defined for the keys).</dd></dl> |
| children                | Any      | null         | If `KeyboardEventHandler` wraps around any children elements, it will handle and ONLY handle key events sourced from its descendant elements, including any form controls, links or tab-enabled elements. `handleFocusableElements` has no effect when `children` exists.                                                                                                                                                                                                                                                                              |

# Key names and key alias

The `handleKeys` prop accepts an array of key names. Key names and key alias free developers from dealing with numeric char codes and/or key codes and browser compatibility issues with `KeyboardEvent.code` and `KeyboardEvent.key`. (Ref: [JavaScript Madness: Keyboard Events](https://unixpapa.com/js/key.html))

- Key names are in **LOWER CASE** for consistency. `heandleKeys=['a']` will still handles key event for 'A' with caps lock on.
- To handle combined keys like `shift` and `a`, use key names in the format of `shift+a`;
- You can also use key name alias like 'numbers' or 'alphanumeric'.

### Common keys

You can handle one of more common keys by using an array of their names.

```
<KeyboardEventHandler
    handleKeys={['a']}
    onKeyEvent={(key, e) => console.log('only handle "a" key')} />

```

| Key name        | Description / key code                |
| --------------- | ------------------------------------- |
| a, b, ... z     | letter keys, 65 ~ 90 and 97 ~ 112     |
| 0, 1, ... 9     | number keys 48 ~ 57 and 41 , 96 ~ 105 |
| f1, f2, ... f19 | function keys 112 ~ 130               |
| backspace       | 8                                     |
| del/delete      | 46                                    |
| ins/insert      | 45                                    |
| tab             | 9                                     |
| enter/return    | 13                                    |
| esc             | 27                                    |
| space           | 32                                    |
| pageup          | 33                                    |
| pagedown        | 34                                    |
| end             | 35                                    |
| home            | 36                                    |
| left            | 37                                    |
| up              | 38                                    |
| right           | 39                                    |
| down            | 40                                    |
| shift           | 16                                    |
| ctrl            | 17                                    |
| alt             | 18                                    |
| cap             | 20                                    |
| num             | 144                                   | Num Lock |
| clear           | 12                                    |
| meta            | 91                                    | Meta, Win, Window, Cmd, Command |
| ;               | 186, 59                               |
| =               | 187, 61                               |
| ,               | 188, 44                               |
| -               | 189, 45, 173, 109                     |
| .               | 190, 110                              |
| /               | 191, 111                              |
| `| 192          |
| [               | 219                                   |
| &#92;           | 220                                   |
| ]               | 221                                   |
| \*              | 106                                   |
| +               | 107                                   |

**Note**: Native keyboard events with modifier key(s) will **NOT** match common keys in `handleKeys`. e.g. `handleKeys=['a']` will not handler events with combined keys 'Ctrl' and 'a'. To match native keyboard event with modifiers, read the next section.

### Modifier keys

You can handle modifier key combined with a common keys by using key name in the format of `ctrl+a` or `ctrl+shift+a`:

```
<KeyboardEventHandler
    handleKeys={['ctrl+a']}
    onKeyEvent={(key, e) => console.log('only handle "a" key with control key pressed')} />

```

| Key name | Description                    |
| -------- | ------------------------------ |
| ctrl     | control, ctrl key              |
| shift    | shift key                      |
| meta     | meta, cmd, Window, command key |
| alt      | option, alt key                |

**Tips**:

- Modifier keys only work well with common keys a-z. OS and/or browsers use other combinations for other purposes. For example, `cmd + right` is used as the shortcut to navigate 'forward' in some browsers.
- Modifier keys are themself common keys. You can handle key event of single 'ctrl' key with `handleKeys=['ctrl']`;

### Key alias

Key alias provide any easy way to specify common key sets. It is useful when you want to handle multiple keys
and put all handling logic for each key inside the handler callback function.

```
<KeyboardEventHandler
    handleKeys={['numeric']}
    onKeyEvent={(key, e) => console.log('only handle number key events')} />

```

| Alias          | Keys                 | Description                                                                                                                                                                                                                                                               |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'alphabetic'   | 'a', 'b', ...'z'     | 26 letter keys                                                                                                                                                                                                                                                            |
| 'numeric'      | '0', '1', ....'9     | 10 number keys                                                                                                                                                                                                                                                            |
| 'alphanumeric' | 'a'...'z', '0'...'9' | 36 alphanumeric keys                                                                                                                                                                                                                                                      |
| 'function'     | 'f1'...'f19'         | 19 Fn keys                                                                                                                                                                                                                                                                |
| 'all'          | n/a                  | Handle all keyboard events. If a key event does not match any common keys defined above, the `key` parameter to the callback function will have the value of 'other'. You can use the second parameter (the raw key event object) to implemnt you own key handling logic. |

**Note**:

1. Alias keys are alias to a list of common keys. Expect the same behavior as if the respective array of of common key names is in use.
1. When a keyboard event matches, the first (`key`) parameter to the callback function will be the matched lowercase common key name. e.g. `a` for alias `numeric`.
1. Alias key names do not work with modifiers. e.g. `handleKeys=['ctrl+numeric'] // doesn't work`
1. You can mix alias with common keys. e.g. `handleKeys=['numeric', 'a', 'enter', 'ctrl+b']`

# About exclusive handlers

For example, in an app with a list of products, you could have a handler for navigating (highlighting) the products with the up and down keys. Upon selecting (or hitting the 'enter' key on) a product, a modal pops up.

Within the modal is a list of options for the selected product. Another key handler can be used inside the modal using for navigating the options with the up and down keys, too.

However, the key handler for the product list should be first disabled (i.e. `isDisabled={true}`).
Otherwise, the user will be navigating the product options in the modal and the product list in the background at the same time.

There could be other key handlers in your app, they all should be disabled to avoid unexpected results.

The `isExclusive` prop can be really helpful in this situation. When a handler set to `isExclusive`, all other key handlers will be suspended.

In the above example, the key handler in the modal could set to be `isExclusive`. When the modal opens, all other handlers will be temporarily suspended. When the modal is closed/unmounted, they will be working again.

If more than one enabled handlers are `isExclusive`, the most recently mounted/assigned handler wins.

Technically, exclusive handlers are put into a stack upon mounted or when changed from non-exclusive to exclusive; Exclusive handlers are removed from the stack upon unmounted or disabled or changed to non-exclusive. The one left on the top of the stack is the one only exclusive handler.

# About Higher Order Component

I believe this is not a good use case of HoC.
I found it hard to come up with a meaningful use case for passing an keyboard event object or the relevant key to a component.

However, if you have a different view on this, please create an issue/request on GitHub.

# Testing

### Limitation

Unfortunately, there's no good way for testing keyboard events with [Enzyme](https://github.com/airbnb/enzyme) when using this react component.

Enzyme has two main limitations (ref: https://github.com/airbnb/enzyme/blob/master/docs/future.md):

1. Event simulation is limited for Shallow rendering. But this component needs `componentWillMount` for registering keyboard events;

2. Event propagation is not supported. However, Key events on wrapped components are bubbled up and handled by at the document level by this component.

Therefore, when teting with Enzyme:

1. We can only simulate keyboard events fired from `document.body`;
1. `mount` is required.
1. There's no good way, if there's any, for testing/simulating key events from wrapped child component;

### Example

```
  import simulateEvent from 'simulate-event';
  ...

  it('should be able to handle key events in case insensitive way ', () => {
    const handleKeyEvent = Sinon.spy();
    render(<KeyboardEventHandler handleKeys={['ctRl + A']} onKeyEvent={handleKeyEvent} />);
    simulateEvent.simulate(document.body, 'keydown', { keyCode: 65, ctrlKey: true });
    expect(handleKeyEvent.calledWith('ctRl + A')).to.be.true;
  });
```
