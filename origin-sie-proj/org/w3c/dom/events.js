/*SIE-SVG without Plugin under LGPL2.1 & GPL2.0 & Mozilla Public License
 *公式ページは http://sie.sourceforge.jp/
 *利用方法は <script defer="defer" type="text/javascript" src="sie.js"></script>
 *http://sie.sourceforge.jp/
 *Usage: <script defer="defer" type="text/javascript" src="sie.js"></script>
 */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is the Mozilla SVG Cairo Renderer project.
 *
 * The Initial Developer of the Original Code is IBM Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2004
 * the Initial Developer. All Rights Reserved.
 *
 * Parts of this file contain code derived from the following files(s)
 * of the Mozilla SVG project (these parts are Copyright (C) by their
 * respective copyright-holders):
 *    layout/svg/renderer/src/libart/nsSVGLibartBPathBuilder.cpp
 *
 * Contributor(s):DHRNAME revulo
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.
 * See W3C License http://www.w3.org/Consortium/Legal/ for more details.
 */
/*

// File: http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.idl

#ifndef _EVENTS_IDL_
#define _EVENTS_IDL_

#include "dom.idl"
#include "views.idl"

#pragma prefix "dom.w3c.org"
module events
{

  typedef dom::DOMString DOMString;
  typedef dom::DOMTimeStamp DOMTimeStamp;
  typedef dom::Node Node;

  interface EventListener;
  interface Event;
*/
/*EventExceptionクラス
 *イベント専用の例外クラス。
 */
function EventException() {
  DOMException.call(this);
  if (this.code === 0) {
    this.message = "Uuspecified Event Type Error";
  }
};
/*unsigned short  EventException.UNSPECIFIED_EVENT_TYPE_ERR = 0;*/

EventException.prototype = Object._create(DOMException);


/*  // Introduced in DOM Level 2:*/

/*EventTarget Mix-in
 * ミックスイン用のクラス
 * 使い方: EventTarget.call(F.prototype);*/
var EventTarget = (function(EventListener) {
  return function() {
    this.addEventListener = addEventListener;
    this.removeEventListener = removeEventListener;
    this.dispatchEvent = dispatchEvent;
  };
/*void*/  function addEventListener( /*string*/ type, /*EventListener*/ listener, /*boolean*/ useCapture) {
  this.removeEventListener(type, listener, useCapture);  //いったん、（あれば）リスナーを離す。
  var s = new EventListener(useCapture, type, listener), //リスナーを作成
      t = type.charAt(0),
      that;
  this._capter.push(s);                 //このノードにリスナーを登録しておく
  if ((t !== "D") && (t !== "S") && (type !== "beginEvent") && (type !== "endEvent") && (type !== "repeatEvent")) { //MouseEventsならば
    that = this;
    that._tar && that._tar.attachEvent("on" +type, (function(node, type) { 
      return  function(){
        var evt = node.ownerDocument.createEvent("MouseEvents");
        evt.initMouseEvent(type, true, true, node.ownerDocument.defaultView, 0);
        node.dispatchEvent(evt);
        /*cancelBubbleプロパティについては、IEのMSDNなどを参照*/
        node.ownerDocument._window.event.cancelBubble = true;
        evt = void 0;
      };
    })(that, type)
    );
  }
  type = listener = useCapture = s = t = that = void 0;
};
/*void*/  function removeEventListener( /*string*/ type, /*EventListener*/ listener, /*boolean*/ useCapture) {
  var tce = this._capter;
  for (var i=0,tcli=tce.length;i<tcli;i++){
    if (tce[i]._listener === listener) {  //登録したリスナーと一致すれば
      tce[i] = void 0;
    }
  }
  i = tcli = tce = void 0;
};
/*boolean*/ function dispatchEvent( /*Event*/ evt) {
  if (!evt.type) { //Eventの型が設定されていないとき
    throw new EventException(/*EventException.UNSPECIFIED_EVENT_TYPE_ERR*/ 0);
  }
  var te = this,
      td = te.ownerDocument,
      etime = evt.timeStamp,
      etype = evt.type,
      ebub = evt.bubbles,
      tob,
      toli,
      type = /*Event.CAPTURING_PHASE*/ 1,
      ecptype = /*Event.CAPTURING_PHASE*/ "1",
      ebptype = /*Event.BUBBLING_PHASE*/ "3",
      tce;
  if (!td._isLoaded) {
    /*以下では、画像の処理に時間がかかりそうな場合、処理落ちとして、遅延処理
     *を行い、バッファリングにイベント送付処理をためていく作業となる
     */
    if (!td._limit_time_) {
      td._limit_time_ = etime;
    } else if ((etime - td._limit_time_) > 1000) {
      /*1秒を超えたらバッファにため込んで後で使う*/
      tob = td.implementation._buffer_ || [];
      toli = tob.length;
      tob[toli] = this;
      tob[toli+1] = evt;
      td.implementation._buffer_ = tob;
      te = td = etime = etype = ebub = tob = toli = type = void 0;
      return true;
    }
  }
  evt.target = te;
  evt.eventPhase = 1;//Event.CAPTURING_PHASE
  //このノードからドキュメントノードにいたるまでの、DOMツリーのリストを作成しておく
  td[ebptype] = null;
  /*以下の処理では、documentElementのparentNodeが
   *Documentノードではなく、nullになっていることを前提としている。
   *したがって、documentElementのparentNodeがもし、Documentノードのオブジェクトならば、以下を書き換えるべきである
   */
  while (te.parentNode) {
    te.parentNode[ecptype] = te;
    te[ebptype] = te.parentNode;
    te = te.parentNode;
  }
  td[ecptype] = te;
  te[ebptype] = td;
  /*最初に捕獲フェーズでDOMツリーを下っていき、イベントのターゲットについたら、
   *そこで、浮上フェーズとして折り返すように、反復処理をおこなう。
   */
  te = this;
  while (td) {
    evt.currentTarget = td;
    if (td === te) { //イベントのターゲットに到着（折り返し地点）
      type = 2;//Event.AT_TARGET;
    }
    evt.eventPhase = type;
    tce = td._capter; //tceは登録しておいたリスナーのリスト
    for (var j=0,tcli=tce.length;j<tcli;++j){
      if (tce[j] && (etype === tce[j]._type)) {
        tce[j].handleEvent(evt);
      }
    }
    if (evt._stop) {
      break; //stopPropagationメソッドが呼ばれたら、停止する
    }
    if (td === te) {
      if (!ebub) {
        break; //浮上フェーズに移行せず、停止する
      }
      type = 3;//Event.BUBBLING_PHASE;
    }
    td = td[type];
  }
  var ed = evt._default;
  evt = te = tce = n = td = type = tob = j = tcli = etype = etime = ebub = ecptype = ebptype = void 0;
  return ed;
};

/*内部のローカル変数を解放*/
EventTarget._destroy = function() {
  EventListener = addEventListener = removeEventListener = dispatchEvent = void 0;
};
})(EventListener);
EventTarget.call(Node.prototype);

function EventListener(cap, type, listener) {
  this._cap = cap;
  this._type = type;
  this._listener = listener;
};

EventListener.prototype = {
/*void*/ handleEvent : function( /*Event*/ evt) {
    try {
      var ph = evt.eventPhase,
          cap = this._cap;
      if (ph === /*Event.CAPTURING_PHASE*/ 1) { //イベントフェーズが捕獲段階であることを示し
        cap = cap ? false : true;         //このオブジェクト（EventListenr)が捕獲フェーズを指定するならば、リスナーを作動させる。指定しなければ、作動しない。
      }
      if (!cap && (evt.type === this._type)) {
        this._listener(evt);
      }
      evt = ph = cap = void 0;
    } catch (e) {
    }
  }
};

/*Eventクラス
 *イベントの雛形となる。プロパティもすべて含めて、必須
 */
function Event() {
};
// PhaseType
/*unsigned short Event.CAPTURING_PHASE   = 1;
/*unsigned short Event.AT_TARGET         = 2;
/*unsigned short Event.BUBBLING_PHASE    = 3;*/

Event.prototype = {
  /*DOMTimeStamp*/     timeStamp : 0,
  /*DOMString*/        type : null,
  /*EventTarget*/      target : null,
  /*EventTarget*/      currentTarget : null,
  /*unsigned short*/   eventPhase : /*Event.CAPTURING_PHASE*/ 1,
  /*boolean*/          bubbles : false,
  /*boolean*/          cancelable : false,
  _stop : false, //stopPropagationメソッドで使う
  _default : true, //preventDefaultメソッドで使う
  /*void*/ stopPropagation : function(){
    this._stop = true;
  },
  /*void*/ preventDefault : function(){
    if (this.cancelable) {
      this._default = false;
      /*IEのみで使えるreturnValueプロパティ*/
      this.target.ownerDocument._window.event.returnValue = false;
    }
  },
  /*void*/ initEvent : function( /*string*/ eventTypeArg, /*boolean*/ canBubbleArg, /*boolean*/ cancelableArg) {
    this.type = eventTypeArg;
    this.bubbles = canBubbleArg;
    this.cancelable = cancelableArg;
    eventTypeArg = canBubbleArg = cancelableArg = void 0;
  }
};
/*Documentノードに直接結びつける
function DocumentEvent() {
}*/
/*Event*/ Document.prototype.createEvent = function( /*string*/ eventType) {
  var tc = this._cevent[eventType],
      evt = tc ? new tc()
          : (eventType === "SVGEvents") ?  new SVGEvent()
          : (eventType === "TimeEvents") ? new TimeEvent()
          :  new Event();
  evt.type = eventType;
  evt.timeStamp = +(new Date());
  tc = eventType = void 0;
  return evt;
};

function UIEvent() {
/*views::AbstractView*/  this.view;
/*long*/                 this.detail = 0;
};

UIEvent.prototype = Object._create(Event);
/*void*/ UIEvent.prototype.initUIEvent = function( /*string*/ typeArg, /*boolean*/ canBubbleArg, /*boolean*/ cancelableArg, /*views::AbstractView*/ viewArg, /*long*/ detailArg) {
  this.initEvent(typeArg, canBubbleArg, cancelableArg);
  this.detail = detailArg;
  this.view = viewArg;
};
function MouseEvent(evt) {
  UIEvent.apply(this, arguments);
/*long*/             this.screenX;
/*long*/             this.screenY;
/*long*/             this.clientX = this.clientY = 0;
/*boolean*/          this.ctrlKey = this.shiftKey = this.altKey = this.metaKey = false;
/*unsigned short*/   this.button;
/*EventTarget*/      this.relatedTarget;
};
MouseEvent.prototype = Object._create(UIEvent);
/*void*/ MouseEvent.prototype.initMouseEvent = function( /*string*/ typeArg, /*boolean*/ canBubbleArg, /*boolean*/ cancelableArg, /*views::AbstractView*/ viewArg, /*long*/ detailArg, /*long*/ screenXArg, /*long*/ screenYArg, /*long*/ clientXArg, /*long*/ clientYArg, /*boolean*/ ctrlKeyArg, /*boolean*/ altKeyArg, /*boolean*/ shiftKeyArg, /*boolean*/ metaKeyArg, /*unsigned short*/ buttonArg, /*EventTarget*/ relatedTargetArg) {
  this.initUIEvent(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg);
  this.screenX = screenXArg;
  this.screenY = screenYArg;
  this.clientX  = clientXArg;
  this.clientY  = clientYArg;
  this.ctrlKey  = ctrlKeyArg;
  this.shiftKey = shiftKeyArg;
  this.altKey   = altKeyArg;
  this.metaKey  = metaKeyArg;
  this.button = buttonArg;
  this.relatedTarget = relatedTargetArg;
};

function MutationEvent(){
};
MutationEvent.prototype = Object._create(Event);
(function() {
/*void*/  this.initMutationEvent = function(/*string*/ typeArg, /*boolean*/ canBubbleArg,
    /*boolean*/ cancelableArg, /*Node*/ relatedNodeArg, /*string*/ prevValueArg, /*string*/ newValueArg,
    /*string*/ attrNameArg, /*unsigned short*/ attrChangeArg) {
    this.initEvent(typeArg, canBubbleArg, cancelableArg);
    this.relatedNode = relatedNodeArg;
    this.prevValue = prevValueArg;
    this.newValue = newValueArg;
    this.attrName = attrNameArg;
    this.attrChange = attrChangeArg;
    typeArg = canBubbleArg = cancelableArg = relatedNodeArg = prevValueArg = newValueArg = attrNameArg = attrChangeArg = void 0;
  };
  /*Node*/  this.relatedNode = null;
  /*string*/  this.prevValue = this.newValue = this.attrName = null;
  /*unsigned short*/  this.attrChange = 2;
}).apply(MutationEvent.prototype);
    // attrChangeType
/*unsigned short  MutationEvent.MODIFICATION  = 1;
/*unsigned short  MutationEvent.ADDITION      = 2;
/*unsigned short  MutationEvent.REMOVAL       = 3;*/

/*MutationEventsの発動のために、setAttributeNodeNSを上書きする。ファイル統合やmakeの際は、
 *重複するのでコアモジュールのメソッドは削除する。モジュールテストを行うために、
 *このような形式をとることにする。なお、追加部分には区別を付けるために、前後にコメントを挿入する。
 */
/*Attr*/ Element.prototype.setAttributeNodeNS = function( /*Attr*/ newAttr){
  if (newAttr.ownerDocument !== this.ownerDocument) { //所属ドキュメントが違う場合
    throw new DOMException(/*DOMException.WRONG_DOCUMENT_ERR*/ 4);
  }
  var s = this.attributes.setNamedItemNS(newAttr);
  newAttr.ownerElement = this;
  if ((newAttr.localName === "id") && !this.ownerDocument._id[newAttr.nodeValue]) {  //id属性であったならば
    this.ownerDocument._id[newAttr.nodeValue] = this; //ドキュメントに登録しておく
  }
  /*ここから*/
  var evt = this.ownerDocument.createEvent("MutationEvents");
  if (!s) { //ノードがなければ
    /*initMutationEventメソッドは軽量化のため省略する*/
    evt.initEvent("DOMAttrModified", true, false);
    evt.relatedNode = newAttr;
    evt.newValue = newAttr.nodeValue;
    evt.attrName = newAttr.nodeName;
  } else {
    evt.initMutationEvent("DOMAttrModified", true, false, newAttr, s.nodeValue, newAttr.nodeValue, newAttr.nodeName, /*MutationEvent.MODIFICATION*/ 1);
  }
  this.dispatchEvent(evt); //このとき、MutationEventsが発動
  evt = void 0;
  /*ここまで追加*/
  return s;
};

/*Node*/ Node.prototype.insertBefore = function( /*Node*/ n, ref) {
  var tp = this.parentNode,
      rp, evt,
      te = this,
      j = 0,
      t,
      s, descend, di;
  while (tp) {                               //先祖をたどっていく
    if (tp === n) {                          //先祖要素が追加ノードならばエラー
      throw new DOMException(/*DOMException.HIERARCHY_REQUEST_ERR*/ 3);
    }
    tp = tp.parentNode;
  }
  if (this.ownerDocument !== n.ownerDocument) { //所属Documentの生成元が違うならば
    throw new DOMException(/*DOMException.WRONG_DOCUMENT_ERR*/ 4);
  }
  if (n.parentNode) {                  //親要素があれば
    n.parentNode.removeChild(n);
  }
  if (!ref) {
    /*参照要素がNULLの場合、要素を追加する(appendChildと同じ効果）*/
    if (!this.firstChild) {
      this.firstChild = n;
    }
    if (this.lastChild) {
      n.previousSibling = this.lastChild;
      this.lastChild.nextSibling = n;
    }
    this.lastChild = n;
    this.childNodes.push(n);
    n.nextSibling = null;
  } else {
    if (ref.parentNode !== this) {              //参照ノードが子要素でない場合
      throw new DOMException(/*DOMException.NOT_FOUND_ERR*/ 8);
    }
    t = this.firstChild;
    if (t === ref) {
      this.firstChild = n;
    }
    while (t) {
      if (t === ref) {
        this.childNodes.splice(j, 1, n, ref);   //Arrayのspliceを利用して、リストにnノードを追加
        break;
      }
      ++j;
      t = t.nextSibling;
    }
    rp = ref.previousSibling;
    if (rp) {
      rp.nextSibling = n;
    }
    ref.previousSibling = n;
    n.previousSibling = rp;
    n.nextSibling = ref;
  }
  n.parentNode = this;
  if ((n.nodeType===/*Node.ENTITY_REFERENCE_NODE*/ 5) || (n.nodeType===/*Node.DOCUMENT_FRAGMENT_NODE*/ 11)) {
    /*実体参照や、文書フラグメントノードだけは子ノードを検索して、
     *それらを直接文書に埋め込む作業を以下で行う
     */
    var ch = n.childNodes.concat([]); //Arrayのコピー
    for (var i=0,chli=ch.length;i<chli;i++) {
      this.insertBefore(ch[i], n);
    }
    ch = void 0;
  }
  /*ここから*/
  evt = this.ownerDocument.createEvent("MutationEvents");
  evt.initMutationEvent("DOMNodeInserted", true, false, this, null, null, null, null);
  n.dispatchEvent(evt);
  /*以下のDOMNodeInsertedIntoDocumentイベントは、間接的、あるいは直接ノードが
   *挿入されたときに発火する。間接的な挿入とは、サブツリーを作っておいて、それをいっぺんに挿入する場合など。
   *このイベントは浮上しないことに注意を要する
   */
  do {
    s = te;
    te = te.parentNode;
  } while (te);
  if (s !== this.ownerDocument.documentElement) {
    evt = descend = tp = rp = te = s = di = void 0;
    return n;
  }
  evt = this.ownerDocument.createEvent("MutationEvents");
  evt.initMutationEvent("DOMNodeInsertedIntoDocument", false, false, null, null, null, null, null);
  n.dispatchEvent(evt);
  if (!n.hasChildNodes()) {                       //子ノードがないので終了
    return n;
  }
  if (n.getElementsByTagNameNS) {
    descend = n.getElementsByTagNameNS("*", "*"); //全子孫要素を取得
  } else {
    descend = n.childNodes;
  }
  if (descend) {
    for (var i=0,dli=descend.length;i<dli;++i) {
      di = descend[i];
      di.dispatchEvent(evt);
      di = null;
    }
  }
  evt = descend = tp = rp = j = t = te = s = di = void 0;
  return n;
};

/*Node*/ Node.prototype.removeChild = function( /*Node*/ ele) {
  if (!(ele instanceof Node)) {                   //Nodeでなければ
    throw new Error();
  }
  if (ele.parentNode !== this) {                                        //親が違う場合
    throw new DOMException(/*DOMException.NOT_FOUND_ERR*/ 8);
  }
  if (ele.ownerDocument !== this.ownerDocument) { //所属ドキュメントが違う場合
    throw new Error();
  }
  /*ここから*/
  var evt = this.ownerDocument.createEvent("MutationEvents"),
      descend;
  /*以下のDOMNodeRemovedFromDocumentイベントは、間接的、あるいは直接ノードが
   *除去されたときに発火する。間接的な除去とは、サブツリーをいっぺんに除去する場合など。
   *このイベントは浮上しないことに注意を要する
   */
  evt.initMutationEvent("DOMNodeRemovedFromDocument", false, false, null, null, null, null, null);
  ele.dispatchEvent(evt);
  if (ele.getElementsByTagNameNS) {
    descend = ele.getElementsByTagNameNS("*", "*"); //全子孫要素を取得
  } else {
    descend = ele.childNodes;
  }
  if (descend) {
    evt.initMutationEvent("DOMNodeRemovedFromDocument", false, false, null, null, null, null, null);
    for (var i=0,dli=descend.length;i<dli;++i) {
      var di = descend[i];
      evt.target = di;
      di.dispatchEvent(evt);
      di = void 0;
    }
  }
  evt.initMutationEvent("DOMNodeRemoved", true, false, this, null, null, null, null);
  ele.dispatchEvent(evt);
  evt = descend = void 0;
  /*ここまで追加*/
  ele.parentNode = null;
  var t = this.firstChild,
      j = 0;
  while (t) {
    if (t === ele) {
      this.childNodes.splice(j, 1);      //Arrayのspliceを利用して、リストからeleノードを排除
      break;
    }
    ++j;
    t = t.nextSibling;
  }
  if (this.firstChild === ele) {
    this.firstChild = ele.nextSibling;
  }
  if (this.lastChild === ele) {
    this.lastChild = ele.previousSibling;
  }
  ele.previousSibling && (ele.previousSibling.nextSibling = ele.nextSibling);
  ele.nextSibling && (ele.nextSibling.previousSibling = ele.previousSibling);
  ele.nextSibling = ele.previousSibling = null;
  t = j = void 0;
  return ele;
};

/*void*/ CharacterData.prototype.appendData = function( /*string*/ arg) {
  var pd = this.data,
      evt;
  this.data += arg;
  this.length = this.data.length;
  /*ここから*/
  evt = this.ownerDocument.createEvent("MutationEvents");
  evt.initMutationEvent("DOMCharacterDataModified", true, false, null, pd, this.data, null, null);
  this.parentNode.dispatchEvent(evt);
  evt = arg = pd = void 0;
  /*ここまで追加*/
};
/*void*/ CharacterData.prototype.insertData = function( /*long*/ offset, /*string*/ arg) {
  var pd = this.data,
      pre = this.substring(0, offset - 1),                 //文字列を二つに分けた、前半部分
      next = this.substring(offset, this.length - offset), //後半部分
      evt;
  this.data = pre + this.data + next;
  this.length = this.data.length;
  /*ここから*/
  evt = this.ownerDocument.createEvent("MutationEvents");
  evt.initMutationEvent("DOMCharacterDataModified", true, false, null, pd, this.data, null, null);
  this.parentNode.dispatchEvent(evt);
  evt = arg = pd = pre = next = void 0;
  /*ここまで追加*/
};
/*void*/ CharacterData.prototype.deleteData = function( /*long*/ offset, /*long*/ count) {
  var pd = this.data;
      pre = this.substring(0, offset - 1),                    //残すべき前半部分
      next = this.substring(offset + count, this.length - 1), //後半部分
      evt;
  if (offset + count > this.length) {                         //offsetとcountの和が文字全体の長さを超える場合、offsetから最後までのを削除
    next = "";
  }
  this.data = pre + next;
  this.length = this.data.length;
  /*ここから*/
  evt = this.ownerDocument.createEvent("MutationEvents");
  evt.initMutationEvent("DOMCharacterDataModified", true, false, null, pd, this.data, null, null);
  this.parentNode.dispatchEvent(evt);
  evt = pd = void 0;
  /*ここまで追加*/
};

/*_ceventプロパティはcreateEventメソッドで軽量化のために使う。*/
Document.prototype._cevent = {
    "MutationEvents" : MutationEvent,
    "MouseEvents" : MouseEvent,
    "UIEvents" : UIEvent
};


// _EVENTS_IDL_
