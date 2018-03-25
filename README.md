# react-keyboard-event-handler

A React component for handling keyboard events (keyup, keydown and keypress).


## Main features

1. Supports combined keys ( e.g. CTRL + S and even CTRL + SHIFT + S )
2. Supports multiple handler instances and provides an easy way to control the enable/disable status for each handler via props `isDisabled` and `isExclusive`.
3. Provides easy-to-use key names and key alisa such as `numeric` and `alphanumeric` to free you from dealing with numeric key codes;
4. Supports handling multiple keys (as an array) by one handler;


## Live demo 

[demo/dist/index.html](https://linsight.github.io/react-keyboard-event-handler/demo/dist/index.html)


# Installation

```
npm install react-keyboard-event-handler
```


# API


## Basic usage

```
import KeyboardEventHandler from 'react-keyboard-event-handler';

const ComponentA = (props) => (<div>
  <div>key detected: {props.eventKey}</div>
  <KeyboardEventHandler 
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => console.log('do someting upon matched keydown event')} />
</div>);

```

### API summary

Property|Description|Type|Default
---|---|---|---
handleKeys|An array of keys this handler should handle. <br/> There are also some handy alias for keys, see bellow for details.| Array | []
handleEventType|Keyboard event type. <br />This can be 'keyup', 'keydown' or 'keypress'| String | keydown
isDisabled|Enable/Disable handling keyboard events| Boolean | false
isExclusive|When set to `true`, all other handler instances are suspended. <br />This is useful for temporary disabling all other keyboard event handlers. <br />For example, suppressing any other handlers on a page when a modal opens with its own keyboard event handling. | Boolean | false
onKeyEvent|<p>A callback function to call when the handler detects a matched key event.</p><p>The signature of the callback function is: <br />`function(key, event) { ... }`<p><dl><dh>`key`</dh><dd>The key string as one of the elements in `HandleKeys` props that matches the current keyboard event. <br />If alias key name is used, it will be the lowercase key name (see bellow) matching the event.</dd><dh>`event`</dh><dd>The native [keyboard event](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent). e.g. you can use `event.keyCode` to get the numeric key code.</dd></dl>| function | `() => null` 

 
# Key names and key alias

The `handleKeys` prop accepts an array of key names.

1. Key names are **CASE INSENSITIVE**.

   1. Key names given in the `heandleKeys` prop will be converted to lower case before matching a keyboard event;
   1. Therefore, 'A' is the same as 'a' and 'ALT' or 'Alt' is the same as 'alt';
   1. Event if you set `heandleKeys` to handle lowercase 'a', it will still handles key event for 'A' with caps lock on or with shift key pressed;
   1. To handle combined keys like `shift` and `a`, use key names in the format of `shift+a`;
   3. The first parameter to the `onKeyEvent` callback function will always use the exact string given in `handleKeys` prop regardless of its letter cases.
   
1. It is recommended to always use lower case names just for consistency.
1. You can also use key name alias like 'numbers' or 'alphanumeric'. When a keyboard event matches, the first (`key`) parameter to the callback function will be a lowercase key name (see bellow for all key names).  


### Common keys

You can handle one of more common keys by using an array of their names

```
<KeyboardEventHandler 
    handleKeys={['a']}
    onKeyEvent={(key, e) => console.log('only handle "a" key')} />
    
```

Key name|Description / key code
---|---
a, b, ... z | letter keys, 65 ~ 90
0, 1, ... 9 | number keys 48 ~ 57
backspace|8
del/delete| 46
tab| 9
enter/return| 13
esc| 27
space| 32
pageUp| 33
pageDown| 34
end| 35
home| 36
left| 37
up| 38
right| 39
down| 40
`;`| 186
`=`| 187
`,`| 188
`-`| 189
`.`| 190
`/`| 191
```| 192
`[`| 219
`\\`| 220
`]`| 221

### Modifier keys

You can handle modifier key combined with a common keys by using key name in the format of `ctrl+a` or `ctrl+shift+a`:

```
<KeyboardEventHandler 
    handleKeys={['ctrl+a']}
    onKeyEvent={(key, e) => console.log('only handle "a" key with control key pressed')} />
    
```

Key name|Description
---|---
ctrl| control, ctrl key
shift| shift key
meta| meta, cmd, Window, command key
alt| option, alt key


### Key alias

Key alias provide any easy way to specify common key sets. It is useful when you want handles multiple keys
and put the handling logic for each keys inside one handler callback function.

```
<KeyboardEventHandler 
    handleKeys={['numeric']}
    onKeyEvent={(key, e) => console.log('only handle number key events')} />
    
```

Alias|Keys|Description
---|---|---
'alphabetic' | 'a', 'b', ...'z'| 26 letter keys
'numeric' | '0', '1', ....'9 | 10 number keys
'alphanumeric' | 'a'...'z', '0'...'9' |  36 alphanumeric keys
'all' | n/a | handle all keyboard events
 
 
When a keyboard event matches, the first (`key`) parameter to the callback function will be a 
lowercase key name.
 
# About exclusive handlers

For example, in an app with a list of products, 
you could have a handler for navigating (highlighting) a list of products using up and down keys. 
Upon clicking (or hitting the 'enter' key on) the item, a modal pops up.

Within the modal is a list of options for the selected product. 
You could also use a key handler in the modal using the up and down keys to navigate the options.
 
However, the key handler for the product list (i.e. `isDisabled={true}`) should be first disabled. 
Otherwise, the user will be navigating
the product options in the modal and the product list in the background at the same time.

You could have other key handlers in your app, they all should be disabled to avoid unexpected results.

The `isExclusive` prop can be really helpful in this situation. When a handler set to `isExclusive`,
all other key handlers will be suspended.

In the above example, the key handler in the modal could set to be `isExclusive`. When the modal opens,
all other handlers will be temporary suspended. When the modal is closed/unmounted, they will be working again.

If more than one enabled handlers are `isExclusive`, the most recently mounted/assigned handler win.
 
Technically, exclusive handlers are put into a stack upon mounted or when changed from non-exclusive to exclusive;
exclusive handlers are removed from the stack upon unmounted or disabled or changed to non-exclusive.
The one left on the top of the stack is the one only exclusive handler.

 

# About Higher Order Component

I believe this is not a good use case of HoC.
I found it hard to come up with a use case for passing an keyboard event object or the relevant key to a component.

However, if you have a different view on this, please create an issue/request on github.

