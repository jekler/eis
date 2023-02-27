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
// File: smil.idl
/*
#ifndef _SMIL_IDL_
#define _SMIL_IDL_

#include "dom.idl"

#pragma prefix "dom.w3c.org"
module smil
{
  typedef dom::DOMString DOMString;
*/
/*ElementTimeControlはSVGAnimationElementに統合させる。
 *というのは、多重継承が難しいため
 */
function ElementTimeControl(ele) {
  this._tar = ele;
  /*_startと_endプロパティはミリ秒数を収納する。
   *_startはアニメ開始時の秒数のリスト。_finishはアニメ終了時の秒数のリスト。
   *なお、文書読み込み終了時（アニメ開始時刻）の秒数を0とする。
   */
  this._start = [];
  this._finish = null;
};
ElementTimeControl.prototype = {
  /*void*/  beginElement : function() {
    var ttd = this.ownerDocument, evt = ttd.createEvent("TimeEvents");
    evt.initTimeEvent("beginEvent", ttd.defaultView, 0);
    this.dispatchEvent(evt);
  },
  /*void*/  endElement : function() {
    var ttd = this.ownerDocument, evt = ttd.createEvent("TimeEvents");
    evt.initTimeEvent("endEvent", ttd.defaultView, 0);
    this.dispatchEvent(evt);
  },
  /*void*/  beginElementAt : function(/*float*/ offset) {
    var ntc = this.ownerDocument.documentElement.getCurrentTime(),
        start = this._start || [];
    for (var i=0,sli=start.length;i<sli;++i) {
      if (start[i] === (offset+ntc)) {
        ntc = start = offset = void 0;
        return;
      }
    }
    start.push(offset + ntc);
    this._start = start;
  },
  /*void*/  endElementAt : function(/*float*/ offset) {
    var ntc = this.ownerDocument.documentElement.getCurrentTime(),
        fin = this._finish || [];
    for (var i=0,fli=fin.length;i<fli;++i) {
      if (fin[i] === (offset+ntc)) {
        ntc = fin = offset = void 0;
        return;
      }
    }
    fin.push(offset + ntc);
    this._finish = fin;
  }
};

function TimeEvent() {
  Event.apply(this);
  /*readonly attribute views::AbstractView*/  this.view;
  /*readonly attribute long*/             this.detail;
};
TimeEvent.counstructor = Event;
TimeEvent.prototype = Object._create(Event);
/*void*/  TimeEvent.prototype.initTimeEvent = function(/*DOMString*/ typeArg, 
                                     /*views::AbstractView*/ viewArg, 
                                     /*long*/ detailArg) {
  this.type = typeArg;
  this.view = viewArg;
  this.detail = detailArg;
};
//#endif // _SMIL_IDL_