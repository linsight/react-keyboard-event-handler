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
  <KeyboardEventHandler handleKeys={['a', 'b', 'c']}
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


const ComponentDCode =
  "&lt;KeyboardEventHandler handleKeys={['ctrl+a', 'alt+b', 'meta+c']} onKeyEvent={(key) =&gt; props.setEventKey(key)} /&gt;";
const ComponentD = (props) => (<div className="card card-with-margin">
  <div className="card-header">I handle <strong>'ctrl+a', 'alt+b', 'meta+c'</strong></div>
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


const modalStateConfig = { namespace: Symbol(), name: 'show' };

const ComponentModalCode = "&lt;KeyboardEventHandler \
isExclusive={props.show} \
handleKeys={['all']} \
onKeyEvent={(key, e) =&gt; { \
  props.setEventKey(key); \
  if (key === 'Escape') { \
    props.setShow(false) \
  } \
} } /&gt;";

const ComponentModal = (props) => (<div>
  <div className={`modal fade ${props.show ? 'show' : ''}`} style={{ display: "block" }}>
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
  <div className={`modal-backdrop fade ${props.show ? 'show' : ''}`}></div>
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
    <div className="card-footer text-success">Open a modal by keying 'ctrl+o'</div>
    <KeyboardEventHandler handleKeys={['ctrl+o']} onKeyEvent={(key, e) => props.setShow(true)} />
  </div>
</div>);
const ComponentTriggerWithKeyState = provideState(modalStateConfig)(ComponentTrigger);


ReactDom.render(
  <div className="row">
    <div className="col">
      <ComponentCWithKeyState />
    </div>
    <div className="col">
      <ComponentAWithKeyState />
    </div>
    <div className="col">
      <ComponentBWithKeyState />
    </div>
    <div className="col">
      <ComponentDWithKeyState />
    </div>
    <div className="col">
      <ComponentTriggerWithKeyState />
      <ComponentModalWithKeyState />
    </div>
  </div>,
  document.querySelector('#root')
);
