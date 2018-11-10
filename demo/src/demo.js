import React from 'react';
import ReactDom from 'react-dom';
import KeyboardEventHandler from '../../src/KeyboardEventHandler';
import provideState from 'react-provide-state';

const ComponentACode =
  "&lt;KeyboardEventHandler handleKeys={['a', 'b', 'c']} onKeyEvent={(key, e) =&gt; props.setEventKey(key)}/&gt;";
const ComponentA = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle 'a', 'b' and 'c' only</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentACode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentAWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentA);


const ComponentBCode =
  "&lt;KeyboardEventHandler handleKeys={['numeric']} onKeyEvent={(key, e) =&gt; props.setEventKey(key)} /&gt;";
const ComponentB = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle all <strong>numeric</strong> keys</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentBCode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler handleKeys={['numeric']}
                        onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentBWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentB);


const ComponentCCode =
  "&lt;KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key) =&gt; props.setEventKey(key)} /&gt;";
const ComponentC = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>all</strong> keys</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentCCode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentCWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentC);

const ComponentJCode =
  "&lt;KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) =&gt; props.setEventData({key, e})} /&gt;";
const ComponentJ = (props) => (<div className="card card-with-margin">
  <div className="card-header">Using the <strong>raw</strong> key event</div>
  <div className="card-body ">
    <p><small className="text-success">You can use the raw key event if you want to handle keys outside of the provided key names/alias. E.g. You keyboard has special keys.</small></p>
    <small dangerouslySetInnerHTML={{ __html: ComponentJCode }}></small>
  </div>
  <div className="card-footer">
    <table>
      <tbody>
      <tr><td className="text-success">key</td><td>{props.eventData.key}</td></tr>
      <tr><td className="text-success">event.key</td><td>{props.eventData.e.key}</td></tr>
      <tr><td className="text-success">event.which</td><td>{props.eventData.e.which}</td></tr>
      <tr><td className="text-success">event.code</td><td>{props.eventData.e.code}</td></tr>
      </tbody>
    </table>
  </div>
  <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => props.setEventData({key, e})} />
</div>);
const ComponentJWithKeyState = provideState({ namespace: Symbol(), name: 'eventData', initValue:{key: null, e: {}}})(ComponentJ);


const ComponentDCode =
  "&lt;KeyboardEventHandler handleKeys={['ctrl+a', 'alt+b', 'meta+c']} onKeyEvent={(key) =&gt; props.setEventKey(key)} /&gt;";
const ComponentD = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>'ctrl+a', 'alt+b', and 'meta+c'</strong></div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentDCode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler handleKeys={['ctrl+a', 'alt+b', 'meta+c']}
                        onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentDWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentD);


const ComponentHCode =
  "&lt;KeyboardEventHandler handleKeys={['function']} onKeyEvent={(key) =&gt; props.setEventKey(key)} /&gt;";
const ComponentH = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>'f1' ... 'f19'</strong> function keys</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentHCode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler handleKeys={['function']}
                        onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentHWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentH);


const ComponentICode =
  "&lt;KeyboardEventHandler handleKeys={['alphanumeric']} onKeyEvent={(key) =&gt; props.setEventKey(key)} /&gt;";
const ComponentI = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>alphanumeric</strong> keys</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentICode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong></div>
  <KeyboardEventHandler handleKeys={['alphanumeric']}
                        onKeyEvent={(key, e) => props.setEventKey(key)} />
</div>);
const ComponentIWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentI);



const modalStateConfig = { namespace: Symbol(), name: 'show' };

const ComponentModalCode = "&lt;KeyboardEventHandler \
isExclusive={props.show} \
handleKeys={['all']} \
onKeyEvent={(key, e) =&gt; { \
  props.setEventKey(key); \
  if (key === 'esc') { \
    props.setShow(false) \
  } \
} } /&gt;";

const ComponentModal = (props) => (<div>
  <div className={`modal fade ${props.show ? 'show' : ''}`} style={{ display: props.show ? "block": "none" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Exclusive Key handler</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
          <p>When prop `isExclusive` is set, this `KeyboardEventHandler` instance suppress all other
            handlers. <strong>Note that handlers in the background stop working.</strong></p>

          <p>You can press 'ESC' key to close this modal.</p>

          <small dangerouslySetInnerHTML={{ __html: ComponentModalCode }}></small>
        </div>
        <div className="modal-footer">
          key detected:
          <strong>
            <mark>{props.eventKey}</mark>
          </strong>
        </div>
        <KeyboardEventHandler
          isExclusive={props.show}
          isDisabled={!props.show}
          handleKeys={['all']}
          onKeyEvent={(key, e) => {
            props.setEventKey(key);
            if (key === 'esc') {
              props.setShow(false)
            }
          } } />
      </div>
    </div>
  </div>
  <div className={props.show ? 'modal-backdrop fade show' : ''}></div>
</div>);

let ComponentModalWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentModal);
ComponentModalWithKeyState = provideState(modalStateConfig)(ComponentModalWithKeyState);


const ComponentTriggerCode = "&lt;KeyboardEventHandler handleKeys={['ctrl+o']} onKeyEvent={(key, e) =&gt; props.setShow(true)}/&gt;";
const ComponentTrigger = (props) => (<div>
  <div className="card card-with-margin">
    <div className="card-header">Open a Model <strong>ctrl+o</strong></div>
    <div className="card-body ">
      <small dangerouslySetInnerHTML={{ __html: ComponentTriggerCode }}></small>
    </div>
    <div className="card-footer text-success">Open a modal by keying 'ctrl+o' to see how 'exclusive handler' works</div>
    <KeyboardEventHandler handleKeys={['ctrl+o']} onKeyEvent={(key, e) => props.setShow(true)} />
  </div>
</div>);
const ComponentTriggerWithKeyState = provideState(modalStateConfig)(ComponentTrigger);

const ComponentECode = `&lt;KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) =&gt; props.setEventKey(key)} &gt;
      &lt;p&gt;
        &lt;input type="text" placeholder="Key events will be handled"/&gt;
      &lt;/p&gt;
      &lt;p&gt;
        &lt;a href="#" &gt;Example focusable element. Key event will be handled&lt;/a&gt;
      &lt;/p&gt;
    &lt;/KeyboardEventHandler&gt;`;
const ComponentE = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>all</strong> key events from my wrapped children</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentECode }}></small>
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
    <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => props.setEventKey(key)} >
      <p>
        <input type="text" placeholder="Key events will be handled"/>
      </p>
      <p>
        <a href="#" >Example focusable element. Key event will be handled</a>
      </p>
    </KeyboardEventHandler>
  </strong></div>

</div>);
const ComponentECodeWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentE);

const ComponentF = (props) => (<div className="card card-with-margin">
  <div className="card-header">I <strong>don't</strong> handle form controls or links by default</div>
  <div className="card-body ">
    <small>By default, key events on focusable elements (i.e. form controls, links, tab-enabled elements) are not handled.
      Handler will not interfere form controls.</small>
    <input type="text" placeholder="Please type" size="20"/>
  </div>
</div>);


const ComponentGCode = `&lt;KeyboardEventHandler
      handleKeys={[&#39;all&#39;]}
      handleFocusableElements
      onKeyEvent={(key, e) =&gt; props.setEventKey(key)} /&gt;`;
const ComponentG = (props) => (<div className="card card-with-margin">
  <div className="card-header">I <strong>DO</strong> handle key events from all elements</div>
  <div className="card-body ">
    <small dangerouslySetInnerHTML={{ __html: ComponentGCode }}></small>
    <KeyboardEventHandler
      handleKeys={['all']}
      handleFocusableElements
      onKeyEvent={(key, e) => props.setEventKey(key)} />

    <p>
      If 'handleFocusableElements' props is 'true', key events sourced from all elements will be handled.
    </p>

    <input type="text" placeholder="Please type" size="20" />
  </div>
  <div className="card-footer text-success">key detected: <strong>
    <mark>{props.eventKey}</mark>
  </strong>
  </div>
</div>);

const ComponentGCodeWithKeyState = provideState({ namespace: Symbol(), name: 'eventKey' })(ComponentG);



ReactDom.render(
  <div className="row">
    <div className="col-4">
      <ComponentCWithKeyState />
    </div>
    <div className="col-4">
      <ComponentAWithKeyState />
    </div>
    <div className="col-4">
      <ComponentBWithKeyState />
    </div>
    <div className="col-4">
      <ComponentDWithKeyState />
    </div>
    <div className="col-4">
      <ComponentHWithKeyState />
    </div>
    <div className="col-4">
      <ComponentIWithKeyState />
    </div>
    <div className="col-4">
      <ComponentTriggerWithKeyState />
      <ComponentModalWithKeyState />
    </div>
    <div className="col-4">
      <ComponentF />
    </div>
    <div className="col-12">
      <ComponentJWithKeyState />
    </div>
    <div className="col-12">
      <ComponentECodeWithKeyState />
    </div>
    <div className="col-12">
      <ComponentGCodeWithKeyState />
    </div>
  </div>,
  document.querySelector('#root')
);
