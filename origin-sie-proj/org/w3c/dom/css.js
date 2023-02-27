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
// File: http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.idl

#ifndef _CSS_IDL_
#define _CSS_IDL_

#include "dom.idl"
#include "stylesheets.idl"
#include "views.idl"

#pragma prefix "dom.w3c.org"
module css
{

  typedef dom::DOMString DOMString;
  typedef dom::Element Element;
  typedef dom::DOMImplementation DOMImplementation;

  interface CSSRule;
  interface CSSStyleSheet;
  interface CSSStyleDeclaration;
  interface CSSValue;
  interface Counter;
  interface Rect;
  interface RGBColor;
*/
/*CSSRuleList
 *Arrayで代用
function CSSRuleList {
    readonly attribute unsigned long    length;
    CSSRule            item(in unsigned long index);
  };
*/
/*CSSRule
 *CSSのルールを表現する。基底クラスなので削除不可。
 */
function CSSRule() {
  this.cssText = "";
/*CSSStyleSheet*/ this.parentStyleSheet;
/*CSSRule*/       this.parentRule = null;
};
/*// RuleType
CSSRule.UNKNOWN_RULE                   = 0;
CSSRule.STYLE_RULE                     = 1;
CSSRule.CHARSET_RULE                   = 2;
CSSRule.IMPORT_RULE                    = 3;
CSSRule.MEDIA_RULE                     = 4;
CSSRule.FONT_FACE_RULE                 = 5;
CSSRule.PAGE_RULE                      = 6;*/

function CSSStyleRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.STYLE_RULE*/ 1;
  this.selectorText = "";
/*CSSStyleDeclaration*/ this.style = new CSSStyleDeclaration();
  this.style.parentRule = null;
};
CSSStyleRule.prototype = Object._create(CSSRule);

function CSSMediaRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.MEDIA_RULE*/ 4;
/*stylesheets::MediaList*/ this.media = new MediaList();
/*CSSRuleList*/ this.cssRules = [];
};
CSSMediaRule.prototype = Object._create(CSSRule);
/*long*/ CSSMediaRule.prototype.insertRule = function( /*string*/ rule, /*long*/ index) {
  this.cssRules.splice(index,rule,1);
  this.media.appendMedium(rule);
  return this;
};
/*void*/ CSSMediaRule.prototype.deleteRule = function( /*long*/ index) {
};

function CSSFontFaceRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.FONT_FACE_RULE*/ 5;
/*CSSStyleDeclaration*/ this.style;
};
CSSFontFaceRule.prototype = Object._create(CSSRule);

function CSSPageRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.PAGE_RULE*/ 6;
  this.selectorText = "";
/*CSSStyleDeclaration*/ this.style;
};
CSSPageRule.prototype = Object._create(CSSRule);

function CSSImportRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.IMPORT_RULE*/ 3;
  this.href = "";
/*stylesheets::MediaList*/ this.media = new MediaList();
/*CSSStyleSheet*/ this.styleSheet = null;
};
CSSImportRule.prototype = Object._create(CSSRule);

function CSSCharsetRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.CHARSET_RULE*/ 2;
  this.encoding = "";
};
CSSCharsetRule.prototype = Object._create(CSSRule);

function CSSUnknownRule() {
  CSSRule.call(this);
  this.type = /*CSSRule.UNKNOWN_RULE*/ 0;
};
CSSUnknownRule.prototype = Object._create(CSSRule);

/*CSSStyleDeclaration
 *CSSの宣言ブロックを表現。削除不可。
 */
function CSSStyleDeclaration() {
  this._list = []; //内部のリスト
  this._list._fontSize = this._list._opacity = null;
};
CSSStyleDeclaration.prototype = {
  cssText : "",
  /*long*/ length : 0,
  /*CSSRule*/ parentRule : null,
  _urlreg : /url\(#([^)]+)/,
  /*getPropertyValueメソッド
   *CSSの値を返す。この値は継承ではなくて、明示的に表記されているもの
   */
/*string*/   getPropertyValue : function( /*string*/ propertyName) {
    var tg = this.getPropertyCSSValue(propertyName);
    if (tg) {                             //見つかった場合
      var tc = tg.cssText;
      return (tc.slice(tc.indexOf(":")+1));
    } else {
      return "";
    }
  },
  /*getPropertyCSSValueメソッド
   *CSSValueオブジェクトを返す。このメソッドは判別に用いているので、削除不可。
   */
/*CSSValue*/ getPropertyCSSValue : function( /*string*/ propertyName) {
    var prop = propertyName,
        ti, tc;
    propertyName += ":";
    if (propertyName === ":") { //どんなデータ型でも、文字列に変換する機能をJavaScriptが持つことに注意
      return null;
    }
    for (var i=0,tl=this._list,tli=tl.length;i<tli;++i) {
      ti = tl[i];
      tc = ti.cssText;
      if (tc.indexOf(propertyName) > -1) {  //プロパティ名に合致するCSSValueオブジェクトが見つかった場合 
        ti._empercents = tl._fontSize;
        i = tl = tli = tc = prop = propertyName = void 0;
        return ti;
      }
    }
    i = tl = tli = prop = propertyName = void 0;
    return null;
  },
  /*removePropertyメソッド
   *プロパティを宣言内から除去
   */
/*string*/   removeProperty : function( /*string*/ propertyName) {
    var tg = this.getPropertyCSSValue(propertyName);
    if (tg) {                        //見つかった場合
      this._list.splice(tg._num,1);  //Arrayのspliceを利用して、リストからCSSValueオブジェクトを排除
      --this.length;
    }
  },
  /*getPropertyPriorityメソッド
   *importantなどのpriorityを取得する
   */
/*string*/   getPropertyPriority : function( /*string*/ propertyName) {
    var tg = this.getPropertyCSSValue(propertyName);
    if (tg) {                        //見つかった場合
      return (tg._priority);
    } else {
      return "";
    }
  },
  _isFillStroke : {
    "fill" : 1,
    "stroke" : 1
  },
  _isColor : {
    "color" : 1
  },
  _isStop : {
    "stop-color" : 1
  },
  _isRS : {
    "r" : 1,
    "#" : 1
  },
  /*setPropertyメソッド
   *プロパティを宣言内で、明示的に設定。継承は無視する
   */
/*void*/     setProperty : function( /*string*/ propertyName, /*string*/ value, /*string*/ priority) {
    var cssText = propertyName,
        tg = null,
        ti, paintType,
        uri = null,
        color = null,
        fill, stroke, stop;
    if (this[propertyName]) {
      tg = this.getPropertyCSSValue(propertyName);
    }
    cssText += ":";
    cssText += value;
    if (this._isFillStroke[propertyName]) {
      /*fill、strokeプロパティは別途、SVGPaintで処理（JavaScriptでは、型キャストを使えないため）
       *CSSPrimitiveValueオブジェクトとSVGPaintオブジェクトを最後に置き換える
       */
      ti = tg ? tg : new SVGPaint();
      paintType = 
        (this._isRS[value.charAt(0)] || ti._keywords[value]) ? 
          /*SVGPaint.SVG_PAINTTYPE_RGBCOLOR*/ 1
        : (value === "none") ?
          /*SVGPaint.SVG_PAINTTYPE_NONE*/ 101
        : (this._urlreg.test(value)) ?                   //fill属性の値がurl(#id)ならば
          /*SVGPaint.SVG_PAINTTYPE_URI*/ 107
        :(value === "currentColor") ?
          /*SVGPaint.SVG_PAINTTYPE_CURRENTCOLOR*/ 102
        : /*SVGPaint.SVG_PAINTTYPE_UNKNOWN*/ 0;
      if (paintType === 1) {
        color = value;
      } else if (paintType === 107) {
        uri = RegExp.$1;
      }
      ti.setPaint(paintType, uri, color, null);
      paintType = uri = color = void 0;
    } else if (this._isStop[propertyName]) {
      ti = tg ? tg : new SVGColor();
      if (value === "currentColor") {
        ti.colorType = /*SVGColor.SVG_COLORTYPE_CURRENTCOLOR*/ 3;
      } else {
        ti.colorType = /*SVGColor.SVG_COLORTYPE_RGBCOLOR*/ 1;
        ti.setRGBColor(value);
      }
    } else {
      ti = tg ? tg : new CSSPrimitiveValue();
    }
    ti._priority = priority;
    ti.cssText = cssText;
    if (!tg) {
      //_numプロパティはremovePropertyメソッドで利用する
      ti._num = this._list.length;
      this._list[ti._num] = ti;
      this[propertyName] = 1;
      ++this.length;
    }
    if (value === "inherit") {
      ti.cssValueType = /*CSSValue.CSS_INHERIT*/ 0;
    } else if (propertyName === "opacity") {
      this._list._opacity = +value;
    } else if (propertyName === "font-size") {
      if (/(%|em|ex)/.test(value)) {
        tg = "_" +RegExp.$1;
        ti[tg] = parseFloat(value);
      } else {
        this._em = this._ex = this["_%"] = null;
        this._list._fontSize = parseFloat(value);
      }
    }
    cssText = ti = tg = void 0;
  },
  /*itemメソッド
   *リストの位置にあるプロパティ名を取得する。宣言内のすべてのプロパティ名を取得するのに便利
   */
/*string*/   item : function( /*long*/ index) {
    if (index >= this.length) { //indexの位置にCSSValueが指定されていないとき
      var s = "";
    } else {
      var s = this._list[index].cssText.substring(0, this._list[index].cssText.indexOf(":"));
    }
    return s;
  }
};

function CSSValue() {
};
/*    // UnitTypes
CSSValue.CSS_INHERIT                    = 0;
CSSValue.CSS_PRIMITIVE_VALUE            = 1;
CSSValue.CSS_VALUE_LIST                 = 2;
CSSValue.CSS_CUSTOM                     = 3;*/
CSSValue.prototype = {
  cssText : "",
  cssValueType : /*CSSValue.CSS_CUSTOM*/ 3,
  _isDefault : 0 //デフォルトであるかどうか（独自のプロパティ)
};

function CSSPrimitiveValue() {
};

(function(t) {
/*t.CSS_UNKNOWN                    = 0;
t.CSS_NUMBER                     = 1;
t.CSS_PERCENTAGE                 = 2;
t.CSS_EMS                        = 3;
t.CSS_EXS                        = 4;
t.CSS_PX                         = 5;
t.CSS_CM                         = 6;
t.CSS_MM                         = 7;
t.CSS_IN                         = 8;
t.CSS_PT                         = 9;
t.CSS_PC                         = 10;
t.CSS_DEG                        = 11;
t.CSS_RAD                        = 12;
t.CSS_GRAD                       = 13;
t.CSS_MS                         = 14;
t.CSS_S                          = 15;
t.CSS_HZ                         = 16;
t.CSS_KHZ                        = 17;
t.CSS_DIMENSION                  = 18;
t.CSS_STRING                     = 19;
t.CSS_URI                        = 20;
t.CSS_IDENT                      = 21;
t.CSS_ATTR                       = 22;
t.CSS_COUNTER                    = 23;
t.CSS_RECT                       = 24;
t.CSS_RGBCOLOR                   = 25;*/
t.prototype = Object._create(CSSValue);
})(CSSPrimitiveValue);

(function(){
  this._n = [1, 0.01, 1, 1, 1, 35.43307, 3.543307, 90, 1.25, 15, 1, 180 / Math.PI, 90/100, 1, 1000, 1, 1000, 1]; //CSS_PX単位への変換値（なお、CSS_SはCSS_MSに、CSS_RADとCSS_GRADはCSS_DEGに、CSS_KHZはCSS_HZに統一）
  this.cssValueType = /*CSSValue.CSS_PRIMITIVE_VALUE*/ 1;
  this.primitiveType = /*CSSPrimitiveValue.CSS_UNKNOWN*/ 0;
  this._value = null;
  this._percent = 0; //単位に%が使われていた場合、このプロパティの数値を1%として使う
  this._empercent = 0;
  this._em = this._ex = this["_%"] = null; //emが単位の場合、getComputedStyleメソッドなどで使う
  /*void*/ this.setFloatValue = function(/*short*/ unitType, /*float*/ floatValue) {
    if ((/*CSSPrimitiveValue.CSS_UNKNOWN*/ 0 >= unitType) && (unitType >= /*CSSPrimitiveValue.CSS_STRING*/ 19)) { //浮動小数点数単位型をサポートしないCSS単位である場合
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    this.primitiveType = unitType;
    this._value = floatValue * this._n[unitType-1];  //値はあらかじめ、利用しやすいように変換しておく
  };
  /*getFloatValueメソッド
   *別の単位に変換可能。
   */
  this._regd = /[\d\.]+/;
  /*float*/ this.getFloatValue = function(/*short*/ unitType) {
    if ((/*CSSPrimitiveValue.CSS_UNKNOWN*/ 0 >= unitType) && (unitType >= /*CSSPrimitiveValue.CSS_STRING*/ 19)) { //浮動小数点数単位型をサポートしないCSS単位である場合
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    if (this._value || (this._value === 0)) { //すでに、setFloatValueメソッドによって_valueプロパティが設定されていた場合
      return (this._value / this._n[unitType-1]);
    } else {
      var tc = this.cssText,
          n = tc.slice(-1),
          type = 0,
          s = +(tc.match(this._regd));
      s = isNaN(s) ? 0 : s;
      if (n >= "0" && n <= "9") {
        type = /*CSSPrimitiveValue.CSS_NUMBER*/ 1;
        if (unitType === 1) {
          unitType = tc = n = type = void 0;
          return s;
        }
      } else if (n === "%") {
        s *= this._percent;
        type = /*CSSPrimitiveValue.CSS_PERCENTAGE*/ 2;
      } else if ((n === "m") && (tc.charAt(tc.length-2) === "e")) {
        s *= this._empercent;
        type = /*CSSPrimitiveValue.CSS_EMS*/ 3;
      } else if ((n === "x") && (tc.charAt(tc.length-2) === "e")) {
        type = /*CSSPrimitiveValue.CSS_EXS*/ 4;
      } else if ((n === "x") && (tc.charAt(tc.length-2) === "p")) {
        type = /*CSSPrimitiveValue.CSS_PX*/ 5;
      } else if ((n === "m") && (tc.charAt(tc.length-2) === "c")) {
        type = /*CSSPrimitiveValue.CSS_CM*/ 6;
      } else if ((n === "m") && (tc.charAt(tc.length-2) === "m")) {
        type = /*CSSPrimitiveValue.CSS_MM*/ 7;
      } else if (n === "n") {
        type = /*CSSPrimitiveValue.CSS_IN*/ 8;
      } else if (n === "t") {
        type = /*CSSPrimitiveValue.CSS_PT*/ 9;
      } else if (n === "c") {
        type = /*CSSPrimitiveValue.CSS_PC*/ 10;
      }
      s = s * this._n[type-1] / this._n[unitType-1];
      tc = n = type = unitType = void 0;
      return s;
    }
  };
  /*void*/ this.setStringValue = function(/*short*/ stringType, /*string*/ stringValue) {
    if (/*CSSPrimitiveValue.CSS_DIMENSION*/ 18 >= stringType && stringType >= /*CSSPrimitiveValue.CSS_COUNTER*/ 23) { //文字列型をサポートしないCSS単位である場合
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    this._value = stringValue;
  };
  /*string*/ this.getStringValue = function(/*short*/ stringType) {
    if (/*CSSPrimitiveValue.CSS_DIMENSION*/ 18 >= stringType && stringType >= /*CSSPrimitiveValue.CSS_COUNTER*/ 23) { //文字列型をサポートしないCSS単位である場合
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    return (this._value);
  };
  /*Counter*/ this.getCounterValue = function() {
    if (this.primitiveType !== /*CSSPrimitiveValue.CSS_COUNTER*/ 23) { //Counter型ではないとき
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    return (new Counter());
  };
  /*Rect*/ this.getRectValue = function() {
    if (this.primitiveType !== /*CSSPrimitiveValue.CSS_RECT*/ 24) { //Rect型ではないとき
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    return (new Rect());
  };
  /*RGBColor*/ this.getRGBColorValue = function() {
    if (this.primitiveType !== /*CSSPrimitiveValue.CSS_RGBCOLOR*/ 25) { //RGBColor型ではないとき
      throw new DOMException(/*DOMException.INVALID_ACCESS_ERR*/ 15);
    }
    var s = new RGBColor(),
        rgbColor = this.cssText,
        n = SVGColor.prototype._keywords[rgbColor];
    if (rgbColor.indexOf("%", 5) > 0) {      // %を含むrgb形式の場合
      rgbColor = rgbColor.replace(/[\d.]+%/g, function(t) {
        return Math.round((2.55 * parseFloat(t)));
      });
    } else if (rgbColor.indexOf("#") > -1) {  //#を含む場合
      rgbColor = rgbColor.replace(/[\da-f][\da-f]/gi, function(s) {
        return parseInt(s, 16);
      });
    }
    n = n || rgbColor.match(/\d+/g);
    s.red.setFloatValue(/*CSSPrimitiveValue.CSS_NUMBER*/ 1, parseFloat(n[0]));
    s.green.setFloatValue(/*CSSPrimitiveValue.CSS_NUMBER*/ 1, parseFloat(n[1]));
    s.blue.setFloatValue(/*CSSPrimitiveValue.CSS_NUMBER*/ 1, parseFloat(n[2]));
    n = rgbColor = void 0;
    return (s);
  };
}).apply(CSSPrimitiveValue.prototype);
/*CSSValueList
 *Arrayで代用する
 */
function CSSValueList() {
  this.cssValueType = /*CSSValue.CSS_VALUE_LIST*/ 2;
  this.length = 0;
};
CSSValueList.prototype = Object._create(CSSValue);
/*CSSValue*/ CSSValueList.prototype.item = function( /*long*/ index) {
  return (this[index]);
};

function RGBColor() {
  var cs = CSSPrimitiveValue;
  this.red = new cs();
  this.green = new cs();
  this.blue = new cs();
  cs = void 0;
  this.red.primitiveType = this.green.primitiveType = this.blue.primitiveType = /*CSSPrimitiveValue.CSS_NUMBER*/ 1;
};

function Rect() {
  var cs = CSSPrimitiveValue;
  this.top = new cs();
  this.right = new cs();
  this.bottom = new cs();
  this.left = new cs();
  cs = void 0;
};

function Counter() {
  this.identifier = this.listStyle = this.separator = "";
};

function ElementCSSInlineStyle() {
  var cs = CSSStyleDeclaration;
  this.style = new cs();
  this._attributeStyle = new cs(); //プレゼンテーション属性の値を格納する
  cs = void 0;
};

/*CSS2Properties
 *削除不可
 *さらにSVG CSSを付け加えている
 */
var n = "none",
    m = "normal",
    a = "auto",
    CSS2Properties = {
  fill : "black",
  stroke : n,
  cursor : a,
  visibility : "visible",
  display : "inline-block",
  opacity : "1",
  fillOpacity : "1",
  strokeWidth : "1",
  strokeDasharray : n,
  strokeDashoffset : "0",
  strokeLinecap : "butt",
  strokeLinejoin : "miter",
  strokeMiterlimit : "4",
  strokeOpacity : "1",
  writingMode : "lr-tb",
  fontFamily : "serif",
  fontSize : "12",
  color : "black",
  fontSizeAdjust : n,
  fontStretch : m,
  fontStyle : m,
  fontVariant : m,
  fontWeight : m,
  font : "inline",

//# Gradient properties:

  stopColor : "black",
  stopOpacity : "1",
  textAnchor : "start",
  azimuth : "center",
                                        // raises(dom::DOMException) on setting
  //簡略プロパティに関しては、初期値を再考せよ
  clip : a,
  direction : "ltr",
  letterSpacing : m,
  lineHeight : m,
  overflow : "visible",
  textAlign : "left",
  textDecoration : n,
  textIndent : "0",
  textShadow : n,
  textTransform : n,
  unicodeBidi : m,
  verticalAlign : "baseline",
  whiteSpace : m,
  wordSpacing : m,
  zIndex : a,
//  #

  mask : n,
  markerEnd : n,
  markerMid : n,
  markerStart : n,
  fillRule : "nonzero",

//# Filter Effects properties:

  enableBackground : "accumulate",
  filter : n,
  floodColor : "black",
  floodOpacity : "1",
  lightingColor : "white",

//# Interactivity properties:

  pointerEvents : "visiblePainted",

//# Color and Painting properties:

  colorInterpolation : "sRGB",
  colorInterpolationFilters : "linearRGB",
  colorProfile : a,
  colorRendering : a,
  imageRendering : a,
  marker : "",
  shapeRendering : a,
  textRendering : a,

//# Text properties:

  alignmentBaseline : "",
  baselineShift : "baseline",
  dominantBaseline : a,
  glyphOrientationHorizontal : "0deg",
  glyphOrientationVertical : a,
  kerning : a
};
n = m = a = void 0;
CSS2Properties.visibility._n = 1; //初期値の設定（_setPaintで使う）

function CSSStyleSheet() {
  StyleSheet.apply(this);
/*CSSRule*/      this.ownerRule = null;
/*CSSRuleList*/  this.cssRules = [];
};
CSSStyleSheet.prototype = Object._create(StyleSheet);
/*long*/  CSSStyleSheet.prototype.insertRule = function( /*string*/ rule, /*long*/ index) {
  var s = new CSSStyleRule(), style = s.style, a, sc = rule.match(/\{[\s\S]+\}/), m;
  s.parentStyleSheet = this;
  style.cssText = rule;
  //style値の解析;
  sc = sc.replace(/^[^a-z\-]+/, "")
         .replace(/\:\s+/g, ":")
         .replace(/\s*;[^a-z\-]*/g, ";");
  a = sc.split(";");
  for (var i=0, ali=a.length;i<ali;++i) {
      ai = a[i],
      m = ai.split(":");
      if (ai !== "") {
        style.setProperty(m[0], m[1]);
      }
      ai = m = void 0;
    }
  a = sc = style = void 0;
  this.cssRules.splice(index,s,1);
};
/*void*/  CSSStyleSheet.prototype.deleteRule = function(/*long*/ index) {
  this.cssRules.splice(index, 1);
};


/*getComputedStyle関数
 *最近の計算値を取得する。Document.defaultViewはSafariがグローバル(window)にサポートしていないため付ける。
 */
/*interface ViewCSS : views::AbstractView {*/
Document.prototype.defaultView = new ViewCSS();
function ViewCSS(){
};
/*CSSStyleDeclaration*/ ViewCSS.prototype.getComputedStyle = function( /*Element*/ elt, /*string*/ pseudoElt) {
  var s = new CSSStyleDeclaration(),
      el, es,
      eso = 1;
  //クロージャを利用して、カスケーディングを実現する
  s.getPropertyCSSValue = (function(elt, td){
    return function( /*string*/ propertyName) {
      var el = elt,
          css = null,
          n;
      while (el && (!css || (css.cssValueType === /*CSSValue.CSS_INHERIT*/ 0))) {
        if (el._runtimeStyle && el._runtimeStyle[propertyName]) {
          css = el._runtimeStyle.getPropertyCSSValue(propertyName);
        } else if (el.style && el.style[propertyName]) {
          css = el.style.getPropertyCSSValue(propertyName);
        } else if (el._attributeStyle && el._attributeStyle[propertyName]) {
          //プレゼンテーション属性を探す
          css = el._attributeStyle.getPropertyCSSValue(propertyName);
        } else if (el._rules) {
          //スタイルシートのルールを探す
          for (var i=0,eli=el._rules.length;i<eli;++i) {
            el._rules[i].style[propertyName] && (css = el._rules[i].style.getPropertyCSSValue(propertyName));
          }
        }
        el = el.parentNode;
      }
      if (!css || (css.cssValueType === /*CSSValue.CSS_INHERIT*/ 0)) {
        //デフォルト値を探す
        td && (css = td[propertyName]);
      }
      if (css && css.setRGBColor && ((css.paintType === /*SVGPaint.SVG_PAINTTYPE_CURRENTCOLOR*/ 102) || (css.colorType === /*SVGColor.SVG_COLORTYPE_CURRENTCOLOR*/ 3))) {
        css.setRGBColor(this.getPropertyValue("color"));
      } else if (css && (css._em || css._ex || css["_%"])) {
        el = elt;
        n = 1;
        while (el) {
          if (el.style._list._fontSize) {
            n = el.style._list._fontSize;
            break;
          }
          el = el.parentNode;
        }
        if (css._em) {
          n *= css._em;
        } else if (css._ex) {
          n *= css._ex * 0.5;
        } else if (css["_%"]) {
          n *= css["_%"] / 100; 
        }
        css.cssText = "font-size:" +n+ "px";
      }
      el = void 0;
      return css;
    };
   })(elt, this._defaultCSS); //_defaultCSSはデフォルト値の設定
  el = elt;
  while (el) {
    if (el.style) {
      es = el.style._list._opacity || el._attributeStyle._list._opacity;
      eso *= es || 1;
    }
    el = el.parentNode;
  }
  s._list._opacity = eso;
  el = pelt = eso = es = void 0;
  s._document = elt.ownerDocument;
  return s;
};

/*getOverrideStyleメソッド
 *指定した要素の上書きスタイルシートを取得。
 */
/*function DocumentCSS : stylesheets::DocumentStyle {*/
/*CSSStyleDeclaration*/ Document.prototype.getOverrideStyle = function( /*Element*/ elt, /*string*/ pseudoElt) {
  var tar = elt;
  if (!!tar._runtimeStyle) {
    return (tar._runtimeStyle);
  } else {
    var s = new CSSStyleDeclaration(), setProp = s.setProperty;
    tar._runtimeStyle = s;
  }
  s.setProperty = (function(setProp, s){
    return function(propertyName, value, priority) {
      setProp.call(s, propertyName, value, priority);
      var tar = elt,
          el = tar._tar,
          isFill = false,
          isStroke = false;
      if ((tar.localName === "g") || (tar.localName === "a")) {
        var sl = tar.getElementsByTagNameNS("http://www.w3.org/2000/svg", "*");
        if (sl) {
          for (var i=0,sli=sl.length;i<sli;++i) {
            var di = sl[i];
            di.getScreenCTM && NAIBU._setPaint(di, di.getScreenCTM());
            di = void 0;
          }
          sl = void 0;
        }
        el = null;
      }
      if (!el) {
        return;
      }
      tar.getScreenCTM && NAIBU._setPaint(tar, tar.getScreenCTM());
      el = tar = value = void 0;
    };
  })(setProp, s);
  return s;
};
/*createCSSStyleSheetメソッド
 *文書のスタイルシートを作成
 */
/*interface DOMImplementationCSS : DOMImplementation {*/
/*CSSStyleSheet*/ DOMImplementation.createCSSStyleSheet = function( /*string*/ title, /*string*/ media) {
  var s = new CSSStyleSheet();
  s.title = title;
  var nm = new MediaList();
  nm.mediaText = media;
  if (media && (media !== "")) {
    var mes = media.split(",");  //文字列をコンマで区切って配列に
    for (var i=0,mli=mes.length;i<mli;++i) {
      nm.appendMedium(mes[i]);   //メディアリストに値を加えていく
    }
  }
  s.media = nm;
  return s;
};
/*
#endif // _CSS_IDL_
*/