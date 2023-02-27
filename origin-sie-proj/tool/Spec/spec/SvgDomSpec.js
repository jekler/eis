/*SIE-SVG without Plugin under LGPL2.1 & GPL2.0 & Mozilla Public Lisence
 *公式ページは http://sie.sourceforge.jp/
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
 * Contributor(s):DHRNAME revulo bellbind
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
 *Copyright (c) 2008-2010 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

describe("SVG Spec in JavaScript", function() {
  /*Refer to W3C SVG1.1 (second edition)*/
  var doc, svg;
  beforeEach(function() {
    /*前もって実行しておく変数(The variable 'doc' is a document node, and the 'svg' is a root element node.)*/
    doc = DOMImplementation.createDocument("http://www.w3.org/2000/svg", "svg");
    svg = doc.documentElement;
  });
  describe("SVG Unit :: SVG Length", function() {
    var s;
    beforeEach(function() {
      s = svg.createSVGLength();
    });
    /*まずは、あるべきデフォルト値かどうかをチェックしていく(Checking the default value of a SVGLength interface.)*/
    it("for the default value on the property of SVGLength", function() {
      /*See http://www.w3.org/TR/SVG/struct.html#InterfaceSVGDocument
       * *createSVGLength()
       * *Creates an SVGLength object outside of any document trees. The object is initialized to the value of 0 user units. 
       *see also http://www.w3.org/TR/SVG/types.html#InterfaceSVGLength
       * *SVG_LENGTHTYPE_NUMBER (unsigned short)
       * *No unit type was provided (i.e., a unitless value was specified), which indicates a value in user units.
       */
      expect(s.value).toEqual(0);
      expect(s.valueInSpecifiedUnits).toEqual(0);
      expect(s.unitType).toEqual(1);
    });
    /*境界条件を調べておく (limit value analysis)*/
    it("should be this for the value, when it calls a newValueSpecifiedUnits method", function() {
      var t = [Number.MAX_VALUE, Number.MIN_VALUE, 0, Number.MAX_VALUE/2, -Number.MIN_VALUE];
      for (var i=0,tli=t.length;i<tli;++i) {
        s.newValueSpecifiedUnits(1, t[i]);
        expect(s.valueInSpecifiedUnits).toEqual(t[i]);
        expect(s.value).toEqual(t[i]);
        expect(s.valueAsString).toEqual(t[i]+"");
        expect(s.unitType).toEqual(1);
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a newValueSpecifiedUnits method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1; //無理数を作って、ぎりぎりの有効数字の桁数numをはじき出しておく
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        s.newValueSpecifiedUnits(1, t[i]);
        expect(s.valueInSpecifiedUnits).toEqual(t[i]);
        expect(s.value).toEqual(t[i]);
        expect(s.valueAsString).toEqual(t[i]+"");
        expect(s.unitType).toEqual(1);
      }
      t = null;
    });
    /*同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'Not Supported Error', when it calls a newValueSpecifiedUnits method", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          s.newValueSpecifiedUnits(ti, 0);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a convertToSpecifiedUnits method", function() {
      var unit = ["", "%", "em", "ex", "px", "cm", "mm", "in", "pt", "pc"];
      for (var i=1,tli=11;i<tli;++i) {
        s.convertToSpecifiedUnits(i);
        expect(s.valueInSpecifiedUnits).toEqual(0);
        expect(s.value).toEqual(0);
        expect(s.valueAsString).toEqual("0" + unit[i-1]);
        expect(s.unitType).toEqual(i);
      }
      /*2cmにまず設定しておいて、その後、convertToSpecifiedUnitsメソッドで"mm"単位に変換する。
       * (The 's' value set to "2cm", and convert from "cm" to "mm" unit in convertToSpecifiedUnits method.
       */
      s.newValueSpecifiedUnits(6, 2);
      var sv = s.value;
      s.convertToSpecifiedUnits(7);
      expect(s.valueInSpecifiedUnits).toEqual(20);
      expect(s.value).toEqual(sv);
      expect(s.valueAsString).toEqual("20mm");
      expect(s.unitType).toEqual(7);
      unit = sv = null;
    });
    /*同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'Not Supported Error', when it calls a convertToSpecifiedUnits method", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          s.convertToSpecifiedUnits(ti);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
  });
  describe("SVG Unit :: SVG Matrix", function() {
    var s;
    beforeEach(function() {
      s = svg.createSVGMatrix();
    });
    it("for the default value on the property of SVGMatrix", function() {
      /*See http://www.w3.org/TR/SVG/struct.html#InterfaceSVGSVGElement
       * *The object is initialized to the identity matrix.
       *以下では、createSVGElementが単位行列を返しているかどうかをチェック
       */
      expect(s.a).toEqual(1);
      expect(s.b).toEqual(0);
      expect(s.c).toEqual(0);
      expect(s.d).toEqual(1);
      expect(s.e).toEqual(0);
      expect(s.f).toEqual(0);
    });
    /*境界条件を調べておく (limit value analysis about a 'multiply')*/
    it("should be this for the value, when it calls a 'multiply' method", function() {
      var t = [Number.MAX_VALUE, Number.MIN_VALUE, 0, Number.MAX_VALUE/2, Number.MIN_VALUE, 0];
      for (var i=0,tli=t.length;i<tli;++i) {
        var n = svg.createSVGMatrix();
        n.a = t[i];
        n.b = t[i];
        n.c = t[i];
        n.d = t[i];
        n.e = t[i];
        s.multiply(n);
        n = null;
      }
      t = null;
    });
    it("should return the SVGMatrix Object, when it calls a 'multiply' method", function() {
      var t = s.multiply(svg.createSVGMatrix());
      expect(t.a).toEqual(1);
      expect(t.b).toEqual(0);
      expect(t.c).toEqual(0);
      expect(t.d).toEqual(1);
      expect(t.e).toEqual(0);
      expect(t.f).toEqual(0);
      /*See http://www.w3.org/TR/SVG/coords.html#InterfaceSVGMatrix
       * *..returning the resulting new matrix. 
       *以下では新しいSVGMatrixオブジェクトを返しているかどうかをチェック
       */
      expect(t).toNotBe(s);
      var u = svg.createSVGMatrix();
      t.a = u.a = 2;
      t.b = u.b = 2;
      t.c = u.c = 2;
      t.d = u.d = 2;
      t.e = u.e = 2;
      t.f = u.f = 2;
      var m = t.multiply(u);
      expect(m.a).toEqual(8);
      expect(m.b).toEqual(8);
      expect(m.c).toEqual(8);
      expect(m.d).toEqual(8);
      expect(m.e).toEqual(10);
      expect(m.f).toEqual(10);
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1; //無理数を作って、ぎりぎりの有効数字の桁数numをはじき出しておく
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var n = svg.createSVGMatrix(), ti = t[i];
        n.a = ti;
        n.b = ti;
        n.c = ti;
        n.d = ti;
        n.e = ti;
        n.f = ti;
        var d = s.multiply(n);
        /*注:sが単位行列であることに注意すること (Note that the variable 's' is a identity matrix)*/
        expect(d.a).toEqual(ti);
        expect(d.b).toEqual(ti);
        expect(d.c).toEqual(ti);
        expect(d.d).toEqual(ti);
        expect(d.e).toEqual(ti);
        expect(d.f).toEqual(ti);
        n = d = null;
      }
      t = null;
    });
    /*同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw an Error, when it calls a 'multiply' method", function() {
      var t = [Number.NEGATIVE_INFINITY,
               Number.POSITIVE_INFINITY,
               Number.NaN,
               undefined];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          var n = svg.createSVGMatrix();
          n.a = 0;
          n.b = 0;
          n.c = 0;
          n.d = 0;
          n.e = 0;
          n.f = ti;
          s.multiply(n);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
    /*逆行列に関する境界条件を調べておく (limit value analysis about a 'inverse')*/
    it("should be this for the value, when it calls a 'inverse' method ((limit value analysis)", function() {
      var si = s.inverse(), t = [s.multiply(si), si.multiply(s)];
      s.a = -1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.a = 1;
      s.d = -1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.b = -1;
      s.c = 1;
      s.d = 1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.b = 1;
      s.c = -1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      for (var i=0;i<t.length;++i) {
        var d = t[i];
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        d = null;
      }
      si = t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'inverse' method (Equivalence partitioning, the following is the valid partion)", function() {
      var si = s.inverse(), t = [];
      s.a = -1;
      s.e = 0;
      s.f = 1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.a = 1;
      s.d = -1;
      s.e = 10000;
      s.f = -10000;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.b = -1;
      s.c = 1;
      s.d = 1;
      s.e = 0.0001;
      s.f = -0.0001;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      s.b = 1;
      s.c = -1;
      s.d = 1;
      s.e = 1;
      s.f = 1;
      si = s.inverse();
      t[t.length] = s.multiply(si);
      t[t.length] = si.multiply(s);
      for (var i=0;i<t.length;++i) {
        var d = t[i];
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        d = null;
      }
      si = t = null;
    });
    it("should throw an Error, when it calls a 'inverse' method", function() {
      /*以下では行列式が0なので、逆行列が成り立たない (it is invalid　in these cases because the determint is zero)*/
      var t = [1, 1, 1, 1,
               0, 0, 0, 0,
               2, 4, 2, 4,
               2.5, -1, 2.5, -1];
      for (var i=0;i<t.length;i+=4) {
        s.a = t[i];
        s.b = t[i+1];
        s.c = t[i+2];
        s.d = t[i+3];
      };
      expect(s.inverse).toThrow();
      t = null;
    });
    /*併進変換に関する境界条件を調べておく (limit value analysis about the 'translate')*/
    it("should be this for the value, when it calls the 'translate' method", function() {
      var t = [0, 0,
               -1, 0,
               1, -1,
               Number.MAX_VALUE, Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.translate(t[i], t[i+1]);
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(t[i]);
        expect(d.f).toEqual(t[i+1]);
        expect(d).toNotBe(s);
      }      
    });
    /*伸縮変換に関する境界条件を調べておく (limit value analysis about the 'scale')*/
    it("should be this for the value, when it calls the 'scale' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.scale(t[i]);
        expect(d.a).toEqual(t[i]);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(t[i]);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*比率の違う伸縮変換に関する境界条件を調べておく (limit value analysis about the 'scaleNonUniform')*/
    it("should be this for the value, when it calls the 'scaleNonUniform' method", function() {
      var t = [0, 0,
               -1, 0,
               1, -1,
               Number.MAX_VALUE, Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.scaleNonUniform(t[i], t[i+1]);
        expect(d.a).toEqual(t[i]);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(t[i+1]);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*回転変換に関する境界条件を調べておく (limit value analysis about the 'rotate')*/
    it("should be this for the value, when it calls the 'rotate' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.rotate(t[i]);
        expect(d.a).toEqual(Math.cos(t[i] / 180 * Math.PI));
        expect(d.b).toEqual(Math.sin(t[i] / 180 * Math.PI));
        expect(d.c).toEqual(-Math.sin(t[i] / 180 * Math.PI));
        expect(d.d).toEqual(Math.cos(t[i] / 180 * Math.PI));
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*座標指定による回転変換に関する境界条件を調べておく (limit value analysis about the 'rotateFromVector')*/
    it("should be this for the value, when it calls the 'rotateFromVector'", function() {
      var t = [1, 1,
               -1, -1,
               1, -1,
               -1, 1,
               Number.MAX_VALUE, Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.rotateFromVector(t[i], t[i+1]);
        expect(d.a).toEqual(Math.cos(Math.atan2(t[i+1], t[i])));
        expect(d.b).toEqual(Math.sin(Math.atan2(t[i+1], t[i])));
        expect(d.c).toEqual(-Math.sin(Math.atan2(t[i+1], t[i])));
        expect(d.d).toEqual(Math.cos(Math.atan2(t[i+1], t[i])));
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }
    });
    /*座標指定による回転変換に関して同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw an SVG Invalid Value Error, when it calls the 'rotateFromVector' method", function() {
      var t = [0,
               Number.NEGATIVE_INFINITY,
               Number.POSITIVE_INFINITY,
               Number.NaN,
               undefined];
      for (var i=0;i<t.length;++i) {
        var f = function() {
          var d = s.rotateFromVector(t[i], 1);
        };
        expect(f).toThrow();
        f = function() {
          var d = s.rotateFromVector(1, t[i]);
        };
        expect(f).toThrow();
      }
      t = f = null;
    });
    /*x軸によって向き合わせとなる変換に関する境界条件を調べておく (limit value analysis about the 'flipX')*/
    it("should be this for the value, when it calls the 'flipX' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.a = t[i];
        s.d = t[i];
        var d = s.flipX();
        expect(d.a).toEqual(-t[i]);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(t[i]);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*y軸によって向き合わせとなる変換に関する境界条件を調べておく (limit value analysis about the 'flipY')*/
    it("should be this for the value, when it calls the 'flipY' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.a = t[i];
        s.d = t[i];
        var d = s.flipY();
        expect(d.a).toEqual(t[i]);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(-t[i]);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*横の傾き変換に関する境界条件を調べておく (limit value analysis about the 'skewX')*/
    it("should be this for the value, when it calls the 'skewX' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.skewX(t[i]);
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(Math.tan(t[i] / 180 * Math.PI));
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
    /*縦の傾き変換に関する境界条件を調べておく (limit value analysis about the 'skewY')*/
    it("should be this for the value, when it calls the 'skewY' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE];
      for (var i=0;i<t.length;i+=2) {
        var d = s.skewY(t[i]);
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(Math.tan(t[i] / 180 * Math.PI));
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        expect(d).toNotBe(s);
      }      
    });
  });
  describe("SVG Unit :: SVG Transform", function() {
    var s;
    beforeEach(function() {
      s = svg.createSVGTransform();
    });
    it("for the default value on the property of SVGTransform", function() {
      /*5.11.2 Interface SVGSVGElement
       *http://www.w3.org/TR/SVG/struct.html#InterfaceSVGSVGElement
       *
       * *The object is initialized to an identity matrix transform (SVG_TRANSFORM_MATRIX).
       */
      expect(s.type).toEqual(1); //SVG_TRANSFORM_MATRIX = 1
      expect(s.angle).toEqual(0);
      var d = s.matrix;
      expect(d.a).toEqual(1);
      expect(d.b).toEqual(0);
      expect(d.c).toEqual(0);
      expect(d.d).toEqual(1);
      expect(d.e).toEqual(0);
      expect(d.f).toEqual(0);
      d = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setMatrix')*/
    it("should be this for the value, when it calls the 'setMatrix' method", function() {
      /*7.14.4 Interface SVGTransform
       *http://www.w3.org/TR/SVG/coords.html#InterfaceSVGTransform
       *
       * *void setMatrix(in SVGMatrix matrix)
       * *values from the parameter matrix are copied, the matrix parameter does not replace SVGTransform::matrix.
       */
      var m = svg.createSVGMatrix(), t = [0,
                                          -1,
                                          1,
                                          Number.MAX_VALUE,
                                          Number.MIN_VALUE,
                                          -Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        m.a = t[i];
        m.b = t[i];
        m.c = t[i];
        m.d = t[i];
        m.e = t[i];
        m.f = t[i];
        s.setMatrix(m);
        expect(s.type).toEqual(1);
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
        expect(d).toNotBe(m);
      }
      d = m = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setMatrix' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var n = svg.createSVGMatrix(), ti = t[i];
        n.a = ti;
        n.b = ti;
        n.c = ti;
        n.d = ti;
        n.e = ti;
        n.f = ti;
        s.setMatrix(n);
        s.setMatrix(n); //二重に指定しても問題はないはず (No problem is to call the 'setMatirx' method twice)
        expect(s.type).toEqual(1);
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        /*注:sが単位行列であることに注意すること (Note that the variable 's' is a identity matrix)*/
        expect(d.a).toEqual(ti);
        expect(d.b).toEqual(ti);
        expect(d.c).toEqual(ti);
        expect(d.d).toEqual(ti);
        expect(d.e).toEqual(ti);
        expect(d.f).toEqual(ti);
        expect(d).toNotBe(n);
        n = d = null;
      }
      t = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setTranslate')*/
    it("should be this for the value, when it calls the 'setTranslate' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE,
               -Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.setTranslate(t[i], t[i]);
        expect(s.type).toEqual(2); //SVG_TRANSFORM_TRANSLATE = 2
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(t[i]);
        expect(d.f).toEqual(t[i]);
      }
      d = m = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setTranslate' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i];
        s.setTranslate(ti, ti);
        s.setTranslate(ti, ti);
        expect(s.type).toEqual(2);
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        expect(d.a).toEqual(1);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(1);
        expect(d.e).toEqual(ti);
        expect(d.f).toEqual(ti);
        ti = n = d = null;
      }
      t = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setScale')*/
    it("should be this for the value, when it calls the 'setScale' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE,
               -Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.setScale(t[i], t[i]);
        expect(s.type).toEqual(3); //SVG_TRANSFORM_SCALE = 3
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        expect(d.a).toEqual(t[i]);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(t[i]);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
      }
      d = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setScale' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i];
        s.setScale(ti, ti);
        s.setScale(ti, ti);
        expect(s.type).toEqual(3);
        expect(s.angle).toEqual(0);
        var d = s.matrix;
        expect(d.a).toEqual(ti);
        expect(d.b).toEqual(0);
        expect(d.c).toEqual(0);
        expect(d.d).toEqual(ti);
        expect(d.e).toEqual(0);
        expect(d.f).toEqual(0);
        ti = n = d = null;
      }
      t = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setRotate')*/
    it("should be this for the value, when it calls the 'setRotate' method", function() {
      var t = [0,
               -1,
               1];
      for (var i=0;i<t.length;++i) {
        s.setRotate(10, t[i], t[i]);
        var m = svg.createSVGMatrix();
        m = m.rotate(10);
        m.e = (1-m.a)*t[i] - m.c*t[i];
        m.f = -m.b*t[i] + (1-m.d)*t[i];
        expect(s.type).toEqual(4); //SVG_TRANSFORM_ROTATE = 4
        expect(s.angle).toEqual(10);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
      }
      d = m = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setRotate' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], m = svg.createSVGMatrix();
        m = m.rotate(10);
        m.e = (1-m.a)*ti - m.c*ti;
        m.f = -m.b*ti + (1-m.d)*ti;
        s.setRotate(10, ti, ti);
        s.setRotate(10, ti, ti);
        expect(s.type).toEqual(4);
        expect(s.angle).toEqual(10);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
        ti = n = d = null;
      }
      t = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setSkewX')*/
    it("should be this for the value, when it calls the 'setSkewX' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE,
               -Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.setSkewX(t[i]);
        var m = svg.createSVGMatrix();
        m = m.skewX(t[i]);
        expect(s.type).toEqual(5); //SVG_TRANSFORM_SKEWX = 5
        expect(s.angle).toEqual(t[i]);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setSkewX' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], m = svg.createSVGMatrix();
        m = m.skewX(ti);
        s.setSkewX(ti);
        s.setSkewX(ti);
        expect(s.type).toEqual(5);
        expect(s.angle).toEqual(ti);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
        ti = n = d = null;
      }
      t = null;
    });
    /*境界条件を調べておく (limit value analysis about the 'setSkewY')*/
    it("should be this for the value, when it calls the 'setSkewY' method", function() {
      var t = [0,
               -1,
               1,
               Number.MAX_VALUE,
               Number.MIN_VALUE,
               -Number.MIN_VALUE];
      for (var i=0;i<t.length;++i) {
        s.setSkewY(t[i]);
        var m = svg.createSVGMatrix();
        m = m.skewY(t[i]);
        expect(s.type).toEqual(6); //SVG_TRANSFORM_SKEWY = 6
        expect(s.angle).toEqual(t[i]);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a 'setSkewY' method", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1;
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], m = svg.createSVGMatrix();
        m = m.skewY(ti);
        s.setSkewY(ti);
        s.setSkewY(ti);
        expect(s.type).toEqual(6);
        expect(s.angle).toEqual(ti);
        var d = s.matrix;
        expect(d.a).toEqual(m.a);
        expect(d.b).toEqual(m.b);
        expect(d.c).toEqual(m.c);
        expect(d.d).toEqual(m.d);
        expect(d.e).toEqual(m.e);
        expect(d.f).toEqual(m.f);
        ti = n = d = null;
      }
      t = null;
    });
  });
  describe("SVG Unit :: SVGNumber", function() {
    var s;
    beforeEach(function() {
      s = svg.createSVGNumber();
    });
    /*デフォルト値かどうかをチェックしていく(Checking the default value of a SVGNumber interface.)*/
    it("for the default value on the property of SVGNumber", function() {
      expect(s.value).toEqual(0);
    });
  });
  describe("SVG Unit :: SVGAngle", function() {
    var s;
    beforeEach(function() {
      s = svg.createSVGAngle();
    });
    /*デフォルト値かどうかをチェックしていく(Checking the default value of a SVGNumber interface.)*/
    it("for the default value on the property of SVGAngle", function() {
      expect(s.value).toEqual(0);
      expect(s.valueInSpecifiedUnits).toEqual(0);
      expect(s.unitType).toEqual(1);
    });
    /*境界条件を調べておく (limit value analysis)*/
    it("should be this for the value, when it calls a newValueSpecifiedUnits method (limit value analysis)", function() {
      var t = [Number.MAX_VALUE, Number.MIN_VALUE, 0, Number.MAX_VALUE/2, -Number.MIN_VALUE];
      for (var i=0,tli=t.length;i<tli;++i) {
        s.newValueSpecifiedUnits(1, t[i]);
        expect(s.valueInSpecifiedUnits).toEqual(t[i]);
        expect(s.value).toEqual(t[i]);
        expect(s.valueAsString).toEqual(t[i]+"");
        expect(s.unitType).toEqual(1);
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a newValueSpecifiedUnits method (the valid partion)", function() {
      var t = [Math.PI, 10/3], num = (t[0]+"").length - 1; //無理数を作って、ぎりぎりの有効数字の桁数numをはじき出しておく
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        s.newValueSpecifiedUnits(1, t[i]);
        expect(s.valueInSpecifiedUnits).toEqual(t[i]);
        expect(s.value).toEqual(t[i]);
        expect(s.valueAsString).toEqual(t[i]+"");
        expect(s.unitType).toEqual(1);
      }
      t = null;
    });
    /*同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'Not Supported Error', when it calls a newValueSpecifiedUnits method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i],
            sn = function() {
              s.newValueSpecifiedUnits(ti, 0);
            };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a convertToSpecifiedUnits method (the valid partion)", function() {
      var unit = ["", "deg", "rad", "grad"];
      for (var i=1,tli=4;i<tli;++i) {
        s.convertToSpecifiedUnits(i);
        expect(s.valueInSpecifiedUnits).toEqual(0);
        expect(s.value).toEqual(0);
        expect(s.valueAsString).toEqual("0" + unit[i-1]);
        expect(s.unitType).toEqual(i);
      }
      /*2gradにまず設定しておいて、その後、convertToSpecifiedUnitsメソッドで"deg"単位に変換する。
       * (The 's' value set to "2cm", and convert from "cm" to "mm" unit in convertToSpecifiedUnits method.
       */
      s.newValueSpecifiedUnits(4, 2);
      var sv = s.value;
      s.convertToSpecifiedUnits(2);
      expect(s.valueInSpecifiedUnits).toEqual(1.8);
      expect(s.value).toEqual(sv);
      expect(s.valueAsString).toEqual("1.8deg");
      expect(s.unitType).toEqual(2);
      unit = sv = null;
    });
    /*同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'Not Supported Error', when it calls a convertToSpecifiedUnits method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          s.convertToSpecifiedUnits(ti);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
  });
  describe("SVG Unit :: SVGColor (the SVGColor interface is deprecated by W3C)", function() {
    /*SVGColorインターフェースは廃止予定　(The SVGColor interface is deprecated by W3C.)*/
    var s;
    beforeEach(function() {
      svg.style.setProperty("stop-color", "white");
      s = svg.style.getPropertyCSSValue("stop-color"); //stop-colorプロパティはSVGColor型オブジェクトを返す
    });
    /*デフォルト値かどうかをチェックしていく(Checking the default value of the SVGColor interface.)*/
    it("for the default value on the property of SVGColor", function() {
      expect(s.rgbColor.red.getFloatValue(1)).toEqual(255);
      expect(s.rgbColor.green.getFloatValue(1)).toEqual(255);
      expect(s.rgbColor.blue.getFloatValue(1)).toEqual(255);
      expect(s.colorType).toEqual(1);
    });
    /*境界条件を調べておく (limit value analysis, when it calls a setRGBColor method)*/
    it("should be this for the value, when it calls a setRGBColor method (limit value analysis)", function() {
      var cls = ["black", "rgb(0, 0, 0)", "#000000", "#000", "rgb(0%, 0%, 0%)", "white", "rgb(255, 255, 255)", "#ffffff", "#fff", "rgb(100%, 100%, 100%)"];
      for (var i=0;i<5;++i) {
        /*すべて黒色を示す値  (All value indicate a black color)*/
        s.setRGBColor(cls[i]);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(0);
        expect(s.colorType).toEqual(1);
      }
      for (var i=5;i<10;++i) {
        /*すべて白色を示す値  (All value indicate a white color)*/
        s.setRGBColor(cls[i]);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(255);
        expect(s.colorType).toEqual(1);
      }
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion, when it calls a setRGBColor method)*/
    it("should be this for the value, when it calls a setRGBColor method (the valid partion)", function() {
      var cls = ["gainsboro", "rgb(220, 220, 220)", "#dcdcdc", "magenta", "rgb(255, 0, 255)", "#ff00ff", "#f0f", "rgb(100%, 0%, 100%)"];
      for (var i=0;i<3;++i) {
        /*すべてgainsboro色を示す値  (All value indicate a gainsboro color)*/
        s.setRGBColor(cls[i]);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(220);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(220);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(220);
        expect(s.colorType).toEqual(1);
      }
      for (var i=3;i<8;++i) {
        /*すべてgainsboro色を示す値  (All value indicate a gainsboro color)*/
        s.setRGBColor(cls[i]);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(255);
        expect(s.colorType).toEqual(1);
      }
      s.setRGBColor("rgb(20%, 40%, 99%)");
      expect(s.rgbColor.red.getFloatValue(1)).toEqual(51);
      expect(s.rgbColor.green.getFloatValue(1)).toEqual(102);
      expect(s.rgbColor.blue.getFloatValue(1)).toEqual(252);
      expect(s.colorType).toEqual(1);
    });
    /*setRGBColorメソッドの同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'SVG_INVALID_VALUE_ERR', when it calls a setRGBColor method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          s.setRGBColor(ti);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      t = null;
    });
    /*setColorメソッドの境界条件を調べておく (limit value analysis, when it calls a setColor method)*/
    it("should be this for the value, when it calls a setColor method (limit value analysis)", function() {
      var cls = ["black", "rgb(0, 0, 0)", "#000000", "#000", "rgb(0%, 0%, 0%)", "white", "rgb(255, 255, 255)", "#ffffff", "#fff", "rgb(100%, 100%, 100%)"];
      for (var i=0;i<5;++i) {
        /*すべて黒色を示す値  (All value indicate a black color)*/
        s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, cls[i], null);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(0);
        expect(s.colorType).toEqual(1);
      }
      for (var i=5;i<10;++i) {
        /*すべて白色を示す値  (All value indicate a white color)*/
        s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, cls[i], null);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(255);
        expect(s.colorType).toEqual(1);
      }
      s.setColor(/*SVG_COLORTYPE_CURRENTCOLOR*/ 3, null, null);
      expect(s.colorType).toEqual(3);
    });
    /*setColorメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion, when it calls a setColor method)*/
    it("should be this for the value, when it calls a setColor method (the valid partion)", function() {
      var cls = ["gainsboro", "rgb(220, 220, 220)", "#dcdcdc", "magenta", "rgb(255, 0, 255)", "#ff00ff", "#f0f", "rgb(100%, 0%, 100%)"];
      for (var i=0;i<3;++i) {
        /*すべてgainsboro色を示す値  (All value indicate a gainsboro color)*/
        s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, cls[i], null);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(220);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(220);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(220);
        expect(s.colorType).toEqual(1);
      }
      for (var i=3;i<8;++i) {
        /*すべてgainsboro色を示す値  (All value indicate a gainsboro color)*/
        s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, cls[i], null);
        expect(s.rgbColor.red.getFloatValue(1)).toEqual(255);
        expect(s.rgbColor.green.getFloatValue(1)).toEqual(0);
        expect(s.rgbColor.blue.getFloatValue(1)).toEqual(255);
        expect(s.colorType).toEqual(1);
      }
      s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, "rgb(20%, 40%, 99%)", null);
      expect(s.rgbColor.red.getFloatValue(1)).toEqual(51);
      expect(s.rgbColor.green.getFloatValue(1)).toEqual(102);
      expect(s.rgbColor.blue.getFloatValue(1)).toEqual(252);
      expect(s.colorType).toEqual(1);
    });
    /*setColorメソッドの同値分割をして、無効同値クラスを調べておく (equivalence partitioning, the following is the invalid partion)*/
    it("should throw a DOMException 'SVG_INVALID_VALUE_ERR', when it calls a setColor method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], "", "1", "-1", undefined, null, 0, -1, 11, 1.1, 10.1];
      var cls = ["gainsboro", "rgb(220, 220, 220)", "#dcdcdc", "magenta", "rgb(255, 0, 255)", "#ff00ff", "#f0f", "rgb(100%, 0%, 100%)"];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i], sn = function() {
          s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, ti, null);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      for (var i=0,tli=cls.length;i<tli;++i) {
        var ci = cls[i], sn = function() {
          s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, ci, ci);
        };
        expect(sn).toThrow();
        ci = sn = null;
      }
      for (var i=0,tli=cls.length;i<tli;++i) {
        var ci = cls[i], sn = function() {
          s.setColor(/*SVG_COLORTYPE_RGBCOLOR*/ 1, null, ci);
        };
        expect(sn).toThrow();
        ci = sn = null;
      }
      for (var i=0,tli=t.length,ci=cls[0];i<tli;++i) {
        var ti = t[i], sn = function() {
          s.setColor(/*SVGColor.SVG_COLORTYPE_RGBCOLOR_ICCCOLOR*/ 2, null, ti);
          s.setColor(/*SVGColor.SVG_COLORTYPE_RGBCOLOR_ICCCOLOR*/ 2, ci, ti);
        };
        expect(sn).toThrow();
        ti = sn = null;
      }
      for (var i=0,tli=cls.length;i<tli;++i) {
        var ci = cls[i], sn = function() {
          s.setColor(/*SVGColor.SVG_COLORTYPE_UNKNOWN*/ 0, ci, null);
          s.setColor(/*SVGColor.SVG_COLORTYPE_UNKNOWN*/ 0, ci, ci);
        };
        expect(sn).toThrow();
        ci = sn = null;
      }
      t = cls = null;
    });
  });
  describe("SVG Unit :: SVG Point", function() {
    /*http://www.w3.org/TR/SVG/coords.html#InterfaceSVGPoint
     * 7.15.1 Interface SVGPoint
     *  An SVGPoint is an (x, y) coordinate pair.
     */
    var s;
    beforeEach(function() {
      s = svg.createSVGPoint();
    });
    it("for the default value on the property of SVGPoint", function() {
      /*http://www.w3.org/TR/SVG/struct.html#InterfaceSVGSVGElement
       * SVGPoint createSVGPoint()
       * 'The object is initialized to the point (0,0) in the user coordinate system.'
       */
      expect(s.x).toEqual(0);
      expect(s.y).toEqual(0);
    });
    /*境界条件を調べておく (limit value analysis, when it calls a matrixTransform method)*/
    it("should be this for the value, when it calls a matrixTransform method (limit value analysis)", function() {
      var matrix = svg.createSVGMatrix(), t = [0,
                                               -1,
                                               1,
                                               Number.MAX_VALUE,
                                               Number.MIN_VALUE,
                                               -Number.MIN_VALUE],
          n;
      for (var i=0;i<t.length;++i) {
        matrix.a = t[i];
        matrix.c = t[i];
        n = s.matrixTransform(matrix);
        expect(n.x).toEqual(0);
        expect(n.y).toEqual(0);
      }
      for (var i=0;i<t.length;++i) {
        matrix.e = t[i];
        matrix.f = t[i];
        n = s.matrixTransform(matrix);
        expect(n.x).toEqual(t[i]);
        expect(n.y).toEqual(t[i]);
      }
    });
    /*同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a matrixTransform method (the valid partion)", function() {
      var matrix = svg.createSVGMatrix(),
          t = [Math.PI, 10/3], num = (t[0]+"").length - 1; //無理数を作って、ぎりぎりの有効数字の桁数numをはじき出しておく
      for (var i=1;i<num;++i) {
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
        t[t.length] = Math.pow(10, i);
        t[t.length] = Math.pow(10, -i);
      }
      for (var i=0,tli=t.length;i<tli;++i) {
        matrix.a = t[i];
        matrix.c = t[i];
        n = s.matrixTransform(matrix);
        expect(n.x).toEqual(0);
        expect(n.y).toEqual(0);
      }
      for (var i=0;i<t.length;++i) {
        matrix.e = t[i];
        matrix.f = t[i];
        n = s.matrixTransform(matrix);
        expect(n.x).toEqual(t[i]);
        expect(n.y).toEqual(t[i]);
      }
    });
    /*同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should throw a Error, when it calls a matrixTransform method (the invalid partion)", function() {
      var matrix = svg.createSVGMatrix(),
          t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}];
      for (var i=0,tli=t.length;i<tli;++i) {
        var ti = t[i],
            sn = function() {
              s.matrixTransform(ti);
            },
            stn = function() {
              s.matrixTransform();
            },
            an = function() {
              matrix.a = ti;
              s.matrixTransform(matrix);
            },
            bn = function() {
              matrix.a = 0;
              matrix.b = ti;
              s.matrixTransform(matrix);
            },
            cn = function() {
              matrix.b = 0;
              matrix.c = ti;
              s.matrixTransform(matrix);
            },
            dn = function() {
              matrix.c = 0;
              matrix.d = ti;
              s.matrixTransform(matrix);
            },
            en = function() {
              matrix.d = 0;
              matrix.e = ti;
              s.matrixTransform(matrix);
            },
            fn = function() {
              matrix.e = 0;
              matrix.f = ti;
              s.matrixTransform(matrix);
              console.log(ti);
            };
        expect(sn).toThrow();
        expect(stn).toThrow();
        expect(an).toThrow();
        expect(bn).toThrow();
        expect(cn).toThrow();
        expect(dn).toThrow();
        expect(en).toThrow();
        expect(fn).toThrow();
        ti = sn = an = bn = cn = dn = en = fn = null;
      }
    });
  });
  describe("SVG Element :: SVG TextContent Element", function() {
    var s;
    beforeEach(function() {
      s = doc.createElementNS("http://www.w3.org/2000/svg", "text");
    });
    /*まずは、あるべきデフォルト値かどうかをチェックしていく(Checking the default value of a SVGTextContentElement interface.)*/
    it("for the default value on the property of SVGTextContentElement", function() {
      expect(s.getAttributeNS(null, "textLength")).toBeNull();
      expect(s.getNumberOfChars()).toEqual(0);
    });
    /*境界条件を調べておく (limit value analysis)*/
    it("should be this for the value(limit value analysis)", function() {
      var t = [0,
               1,
               100],
          str = "";
      for (var i=0;i<t.length;++i) {
        /*文字列の生成 (created a string for the test)*/
        for (var j=0, ti=t[i];j<ti;++j) {
          str += "nん曖昧模糊@";
        }
        s.appendChild(s.ownerDocument.createTextNode(str));
        expect(s.getNumberOfChars()).toEqual(s.firstChild.length);
        s.removeChild(s.firstChild);
        s.appendChild(s.ownerDocument.createElementNS("http://sie.sourceforge.jp", "hoge"))
         .appendChild(s.ownerDocument.createTextNode(str));
        expect(s.getNumberOfChars()).toEqual(s.firstChild.firstChild.length);
        s.removeChild(s.firstChild);
        s.appendChild(s.ownerDocument.createElementNS("http://www.w3.org/svg/2000", "a"))
         .appendChild(s.ownerDocument.createElementNS("http://www.w3.org/svg/2000", "tspan"))
         .appendChild(s.ownerDocument.createTextNode(str));
        expect(s.getNumberOfChars()).toEqual(str.length);
        s.firstChild.appendChild(s.ownerDocument.createTextNode(str));
        expect(s.getNumberOfChars()).toEqual(str.length*2);
        s.removeChild(s.firstChild);
        str = "";
      }
    });
    it("a getStartPositionOfChar method", function() {
      expect(function(){
        s.getStartPositionOfChar(1);
      }).toThrow();
      var str = "hoge",
          doc = s.ownerDocument;
      doc.documentElement.appendChild(s);
      s.setAttributeNS(null, "font-size", "20");
      s.appendChild(doc.createTextNode(str));
      expect(s.getStartPositionOfChar(0).x).toEqual(0);
      expect(s.getStartPositionOfChar(1).x).toEqual(11);

      s.insertBefore(doc.createElementNS("http://www.w3.org/2000/svg", "a"), s.firstChild);
      s.firstChild.appendChild(doc.createTextNode(str));
      expect(s.getStartPositionOfChar(1).x).toEqual(11);
      
      /*a要素の前にテキストノードがない場合*/
      s.insertBefore(doc.createElementNS("http://www.w3.org/2000/svg", "a"), s.firstChild);
      var a = s.firstChild;
      a.appendChild(doc.createElementNS("http://www.w3.org/2000/svg", "tspan"));
      a.firstChild.appendChild(doc.createTextNode(str+str));
      expect(s.getStartPositionOfChar(1).x).toEqual(11);
      expect(s.getStartPositionOfChar(5).x).toEqual(55);      

      /*a要素の前にテキストノードがある場合*/
      s.insertBefore(doc.createElementNS("http://www.w3.org/2000/svg", "a"), s.firstChild);
      var a = s.firstChild;
      a.appendChild(doc.createTextNode(str));
      a.appendChild(doc.createElementNS("http://www.w3.org/2000/svg", "tspan"));
      a.lastChild.appendChild(doc.createTextNode(str));
      expect(s.getStartPositionOfChar(1).x).toEqual(11);
      expect(s.getStartPositionOfChar(5).x).toEqual(55); 
    });
  });
  describe("DOM level 2 Core :: Node", function() {
    var s, t;
    beforeEach(function() {
      s = doc.createElementNS("http://www.w3.org/2000/svg", "text");
      t = doc.createElementNS("http://sie.sourceforge.jp/", "hoge");
    });
    /*まずは、あるべきデフォルト値かどうかをチェックしていく(Checking the default value of a Node interface.)*/
    it("for the default value on the property of Node", function() {
      expect(s.firstChild).toBeNull();
      expect(s.lastChild).toBeNull();
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
    });
    /*insertBeforeメソッドの境界条件を調べておく (limit value analysis, when it calls a insertBefore method)*/
    it("should be this for the value, when it calls a insertBefore method (limit value analysis)", function() {
      s.insertBefore(t, null);
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(t);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.insertBefore(u, null);
      s.insertBefore(t, u);
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.childNodes.item(1)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toEqual(u);
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      
      u.insertBefore(t, null);
      expect(s.firstChild).toEqual(u);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(u.firstChild).toEqual(t);
      expect(u.lastChild).toEqual(t);
      expect(u.childNodes.item(0)).toEqual(t);
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.parentNode).toEqual(s);
      expect(t.parentNode).toEqual(u);
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      u = void 0;
    });
    /*appendChildメソッドの境界条件を調べておく (limit value analysis, when it calls a appendChild method)*/
    it("should be this for the value, when it calls a appendChild method (limit value analysis)", function() {
      s.appendChild(t);
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(t);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
    });
    /*removeChildメソッドの境界条件を調べておく (limit value analysis, when it calls a removeChild method)*/
    it("should be this for the value, when it calls a removeChild method (limit value analysis)", function() {
      s.insertBefore(t, null);
      s.removeChild(t);
      expect(s.firstChild).toBeNull();
      expect(s.lastChild).toBeNull();
      expect(s.childNodes.item(0)).toBeNull();
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toBeNull();
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
    });
    /*replaceChildメソッドの境界条件を調べておく (limit value analysis, when it calls a replaceChild method)*/
    it("should be this for the value, when it calls a replaceChild method (limit value analysis)", function() {
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.insertBefore(t, null);
      s.replaceChild(u, t);
      expect(s.firstChild).toEqual(u);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(u.parentNode).toEqual(s);
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.firstChild).toBeNull();
      expect(u.lastChild).toBeNull();
      expect(t.parentNode).toBeNull();
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
    });
    /*hasChildNodesメソッドの境界条件を調べておく (limit value analysis, when it calls a hasChildNodes method)*/
    it("should be this for the value, when it calls a hasChildNodes method (limit value analysis)", function() {
      expect(s.hasChildNodes()).toEqual(false);
      s.appendChild(t);
      expect(s.hasChildNodes()).toEqual(true);
      s.removeChild(t);
      expect(s.hasChildNodes()).toEqual(false);
    });
    /*cloneNodeメソッドの境界条件を調べておく (limit value analysis, when it calls a cloneNode method)*/
    it("should be this for the value, when it calls a cloneNode method (limit value analysis)", function() {
      s.appendChild(t);
      var u = s.cloneNode(false),
          v = s.cloneNode(true);
      expect(u).toNotBe(s);
      expect(u.firstChild).toBeNull();
      expect(u.lastChild).toBeNull();
      expect(u.childNodes.item(0)).toBeNull();
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.parentNode).toBeNull();
      expect(v).toNotBe(s);
      expect(v.hasChildNodes()).toEqual(true);
      expect(v.firstChild.parentNode).toEqual(v);
      expect(v.lastChild.parentNode).toEqual(v);
      expect(v.childNodes.item(0).parentNode).toEqual(v);
      expect(v.nextSibling).toBeNull();
      expect(v.previousSibling).toBeNull();
      expect(v.parentNode).toBeNull();
    });
    /*normalizeメソッドの境界条件を調べておく (limit value analysis, when it calls a normalize method)*/
    it("should be this for the value, when it calls a normalize method (limit value analysis)", function() {
      var text, ttext,
          tle = [doc.createTextNode(""), doc.createTextNode("0"), doc.createTextNode("a")];
      s.normalize();
      expect(s.firstChild).toBeNull();
      expect(s.lastChild).toBeNull();
      s.appendChild(tle[0]);
      s.normalize();
      expect(s.firstChild).toNotBe(null);
      expect(s.lastChild).toNotBe(null);
      expect(s.firstChild.nodeValue).toEqual("");
      for (var i=0; i<tle.legnth-1; ++i) {
        text = tle[i],
        ttext = tle[i+1];
        s.appendChild(text);
        s.appendChild(ttext);
        expect(s.firstChild).toEqual(text);
        expect(s.lastChild).toEqual(ttext);
        s.norbalize();
        expect(s.firstChild.nodeValue).toEqual(text.nodeValue+ttext.nodeValue);
        expect(s.firstChild).toNotBe(text);
        expect(s.lastChild).toNotBe(ttext);
      }
    });
    /*hasAttributesメソッドの境界条件を調べておく (limit value analysis, when it calls a hasAttributes method)*/
    it("should be this for the value, when it calls a hasAttributes method (limit value analysis)", function() {
      expect(s.hasAttributes()).toEqual(false);  
      s.setAttributeNS(null, "a", "b");
      expect(s.hasAttributes()).toEqual(true);
      expect(t.hasAttributes()).toEqual(false);  
      t.setAttributeNS(null, "c", "d");
      expect(t.hasAttributes()).toEqual(true);
    });
    
    /*insertBeforeメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a insertBefore method (the valid partion)", function() {
      var ti = [10, 500, 1000];
      for (var i=0;i<ti.length;++i) {
        for (var j=0,tili=ti[i];j<tili;++j) {
          s.insertBefore(t, null);
        }
      }
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(t);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.insertBefore(u, null);
      for (var i=0;i<ti.length;++i) {
        for (var j=0,tili=ti[i];j<tili;++j) {
          s.insertBefore(t, u);
        }
      }
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.childNodes.item(1)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toEqual(u);
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      
      for (var i=0;i<ti.length;++i) {
        for (var j=0,tili=ti[i];j<tili;++j) {
          u.insertBefore(t, null);
        }
      }
      expect(s.firstChild).toEqual(u);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(u.firstChild).toEqual(t);
      expect(u.lastChild).toEqual(t);
      expect(u.childNodes.item(0)).toEqual(t);
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.parentNode).toEqual(s);
      expect(t.parentNode).toEqual(u);
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      u = void 0;
    });
    /*appendChildメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a appendChild method (the valid partion)", function() {
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.appendChild(t);
      s.appendChild(u);
      expect(s.firstChild).toEqual(t);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(t);
      expect(s.childNodes.item(1)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toEqual(s);
      expect(t.nextSibling).toEqual(u);
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      expect(u.parentNode).toEqual(s);
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toEqual(t);
      expect(u.firstChild).toBeNull();
      expect(u.lastChild).toBeNull();
      u = void 0;
    });
    /*removeChildメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a removeChild method (the valid partion)", function() {
      s.insertBefore(t, null);
      s.removeChild(t);
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.appendChild(u);
      s.removeChild(u);
      expect(s.firstChild).toBeNull();
      expect(s.lastChild).toBeNull();
      expect(s.childNodes.item(0)).toBeNull();
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toBeNull();
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      for (var i=0;i<50;++i) {
        s.appendChild(u);
        s.removeChild(u);
      }
      expect(s.firstChild).toBeNull();
      expect(s.lastChild).toBeNull();
      expect(s.childNodes.item(0)).toBeNull();
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(t.parentNode).toBeNull();
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
      u = void 0;
    });
    /*replaceChildメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a replaceChild method (the valid partion)", function() {
      var u = doc.createElementNS("http://sie.sourceforge.jp/", "ho");
      s.insertBefore(t, null);
      s.replaceChild(u, t);
      s.replaceChild(t, u);
      s.replaceChild(u, t);
      expect(s.firstChild).toEqual(u);
      expect(s.lastChild).toEqual(u);
      expect(s.childNodes.item(0)).toEqual(u);
      expect(s.nextSibling).toBeNull();
      expect(s.previousSibling).toBeNull();
      expect(s.parentNode).toBeNull();
      expect(u.parentNode).toEqual(s);
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.firstChild).toBeNull();
      expect(u.lastChild).toBeNull();
      expect(t.parentNode).toBeNull();
      expect(t.nextSibling).toBeNull();
      expect(t.previousSibling).toBeNull();
      expect(t.firstChild).toBeNull();
      expect(t.lastChild).toBeNull();
    });
    /*hasChildNodesメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a hasChildNodes method (the valid partion)", function() {
      for (var i=0;i<10;++i) {
        s.appendChild(t);
        expect(s.hasChildNodes()).toEqual(true);
        s.appendChild(t);
        expect(s.hasChildNodes()).toEqual(true);
        s.removeChild(t);
        expect(s.hasChildNodes()).toEqual(false);
      }
    });
    /*cloneNodeメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a cloneNode method (the valid partion)", function() {
      s.appendChild(t);
      var u = s.cloneNode(false),
          v = s.cloneNode(true);
      for (var i=0;i<10;++i) {
        u = u.cloneNode(false);
        v = v.cloneNode(true);
      }
      expect(u).toNotBe(s);
      expect(u.firstChild).toBeNull();
      expect(u.lastChild).toBeNull();
      expect(u.childNodes.item(0)).toBeNull();
      expect(u.nextSibling).toBeNull();
      expect(u.previousSibling).toBeNull();
      expect(u.parentNode).toBeNull();
      expect(v).toNotBe(s);
      expect(v.hasChildNodes()).toEqual(true);
      expect(v.firstChild.parentNode).toEqual(v);
      expect(v.lastChild.parentNode).toEqual(v);
      expect(v.childNodes.item(0).parentNode).toEqual(v);
      expect(v.nextSibling).toBeNull();
      expect(v.previousSibling).toBeNull();
      expect(v.parentNode).toBeNull();
    });
    /*hasAttributesメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a hasAttributes method (the valid partion)", function() {
      s.setAttributeNS(null, "a", "b");
      s.setAttributeNS(null, "c", "b");
      expect(s.hasAttributes()).toEqual(true);
    });
    
    /*insertBeforeメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a insertBefore method (the invalid partion)", function() {
      var sn = function() {
          s.insertBefore(t, null);
          /*HIERARCHY_REQUEST_ERR DOMException */
          t.insertBefore(s, null);
        },
        tn = function() {
          /*WRONG_DOCUMENT_ERR DOMException*/
          s.insertBefore(DOMImplementation.createDocument("svg", "svg").createElementNS("o","n"), null);
        },
        un = function() {
          /*NOT_FOUND_ERR DOMException*/
          s.insertBefore(t, t.cloneNode(false));
        };
      expect(sn).toThrow();
      expect(tn).toThrow();
      expect(un).toThrow();
    });
    /*appendChildメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a appendChild method (the invalid partion)", function() {
      var sn = function() {
        s.appendChild(t);
        /*HIERARCHY_REQUEST_ERR DOMException */
        t.appendChild(s);
      },
      tn = function() {
        /*WRONG_DOCUMENT_ERR DOMException*/
        s.appendChild(DOMImplementation.createDocument("svg", "svg").createElementNS("o","n"));
      };
      expect(sn).toThrow();
      expect(tn).toThrow();
    });
    /*removeChildメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a removeChild method (the invalid partion)", function() {
      var sn = function() {
        s.removeChild(s.cloneNode(false));
      },
      tn = function() {
        /*NOT_FOUND_ERR DOMException*/
        s.removeChild(DOMImplementation.createDocument("svg", "svg").createElementNS("o","n"));
      };
      expect(sn).toThrow();
      expect(tn).toThrow();
    });
    /*replaceChildメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a replaceChild method (the invalid partion)", function() {
      s.appendChild(t);
      t.appendChild(t.cloneNode(false));
      var sn = function() {
        /*HIERARCHY_REQUEST_ERR DOMException */
        t.replaceChild(s, t.firstChild);
      },
      tn = function() {
        /*WRONG_DOCUMENT_ERR DOMException*/
        s.replaceChild(DOMImplementation.createDocument("svg", "svg").createElementNS("o","n"), s.firstChild);
      },
      un = function() {
        /*NOT_FOUND_ERR DOMException*/
        s.replaceChild(t, t.cloneNode(false));
      };
      expect(sn).toThrow();
      expect(tn).toThrow();
      expect(un).toThrow();
    });
  });
  describe("DOM level 2 Core :: Document", function() {
    /*まずは、あるべきデフォルト値かどうかをチェックしていく(Checking the default value of a Document interface.)*/
    it("for the default value on the property of Document", function() {
      expect(doc.doctype).toBeNull();
      expect(doc.nodeName).toEqual("#document");
      expect(doc.nodeValue).toBeNull();
      expect(doc.attributes).toBeNull();
      expect(svg.ownerDocument).toEqual(doc);
      expect(svg.nodeName).toEqual("svg");
      expect(svg.namespaceURI).toEqual("http://www.w3.org/2000/svg");
    });
    /*getElementByIdメソッドの境界条件を調べておく (limit value analysis, when it calls a getElementById method)*/
    it("should be this for the value, when it calls a getElementById method (limit value analysis)", function() {
      expect(doc.getElementById("a")).toBeNull();
      svg.setAttributeNS(null, "id", "a");
      expect(doc.getElementById("a")).toEqual(svg);
      svg.setAttributeNS(null, "id", "x");
      expect(doc.getElementById("x")).toEqual(svg);
      expect(doc.getElementById("a")).toBeNull();
      expect(doc.getElementById("")).toBeNull();
    });
    /*getElementsByTagNameメソッドの境界条件を調べておく (limit value analysis, when it calls a getElementsByTagName method)*/
    it("should be this for the value, when it calls a getElementsByTagName method (limit value analysis)", function() {
      expect(doc.getElementsByTagName("a")).toBeNull();
    });
    /*getElementsByTagNameNSメソッドの境界条件を調べておく (limit value analysis, when it calls a getElementsByTagNameNS method)*/
    it("should be this for the value, when it calls a getElementsByTagNameNS method (limit value analysis)", function() {
      var svgns = "http://www.w3.org/2000/svg",
          ele = doc.createElementNS(svgns, "a");
      expect(doc.getElementsByTagNameNS(svgns, "a")).toBeNull();
      expect(doc.getElementsByTagNameNS("http://www.d.hatena.jp/dhrname", "a")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "a")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "*").item(0)).toEqual(svg);
      expect(doc.getElementsByTagNameNS(svgns, "svg").item(0)).toEqual(svg);
      expect(doc.getElementsByTagNameNS(svgns, "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("http://www.d.hatena.jp/dhrname", "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "b")).toBeNull();
      svg.appendChild(ele);
      expect(doc.getElementsByTagNameNS(svgns, "a").item(0)).toEqual(ele);
      expect(doc.getElementsByTagNameNS("http://www.d.hatena.jp/dhrname", "a")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "a").item(0)).toEqual(ele);
      expect(doc.getElementsByTagNameNS(svgns, "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("http://www.d.hatena.jp/dhrname", "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "b")).toBeNull();
      expect(doc.getElementsByTagNameNS("*", "b")).toBeNull();
      
      expect(doc.getElementsByTagNameNS("", "a")).toBeNull();
      expect(doc.getElementsByTagNameNS(svgns, "")).toBeNull();
      svgns = ele = void 0;
    });
    /*importNodeメソッドの境界条件を調べておく (limit value analysis, when it calls a importNode method)*/
    it("should be this for the value, when it calls a importNode method (limit value analysis)", function() {      var ele = doc.createElementNS("http://www.w3.org/2000/svg", "a");
      var ele = doc.createElementNS("http://www.w3.org/2000/svg", "a"),
          cdoc = doc.implementation.createDocument("http://", "a"),
          cele = cdoc.importNode(doc.documentElement);
      expect(cele.nodeName).toEqual("svg");
      expect(cele.namespaceURI).toEqual("http://www.w3.org/2000/svg");
      expect(cele.ownerDocument).toEqual(cdoc);
      expect(cele.firstChild).toBeNull();
      doc.documentElement.appendChild(ele);
      expect(cele.firstChild).toBeNull();
      
      ele = cdoc.importNode(doc.documentElement.firstChild);
      expect(ele.nodeName).toEqual("a");
      expect(ele.namespaceURI).toEqual("http://www.w3.org/2000/svg");
      expect(ele.ownerDocument).toEqual(cdoc);
      cdoc.documentElement.appendChild(ele);
      expect(cdoc.documentElement.firstChild).toEqual(ele);
   });
    /*getElementByIdメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a getElementById method (the valid partion)", function() {
      expect(doc.getElementById("ax")).toBeNull();
      expect(doc.getElementById("hoge-hoge")).toBeNull();
      expect(doc.getElementById("a102930")).toBeNull();
      svg.setAttributeNS(null, "id", "ax");
      expect(doc.getElementById("ax")).toEqual(svg);
      svg.setAttributeNS(null, "id", "hoge-hoge");
      expect(doc.getElementById("hoge-hoge")).toEqual(svg);
      svg.setAttributeNS(null, "id", "a102930");
      expect(doc.getElementById("a102930")).toEqual(svg);
    });
    /*getElementsByTagNameNSメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a getElementsByTagNameNS method (the valid partion)", function() {
      var svgns = "http://www.w3.org/2000/svg",
          ele = doc.createElementNS(svgns, "a"),
          a;
      for (var i=0;i<10;++i) {
        doc.documentElement.appendChild(ele.cloneNode(true));
      }
      a = doc.getElementsByTagNameNS(svgns, "a");
      expect(a.length).toEqual(10);
      for (var i=0;i<10;++i) {
        expect(a.item(i).nodeName).toBe("a");
        expect(a.item(i).namespaceURI).toBe(svgns);
      }
      /*深い階層の要素を作っておく*/
      a = a[0];
      for (var i=0;i<10;++i) {
        a.appendChild(ele.cloneNode(true));
        a = a.firstChild;
      }
      a = doc.getElementsByTagNameNS(svgns, "a");
      expect(a.length).toEqual(20);
      for (var i=0;i<20;++i) {
        expect(a.item(i).nodeName).toBe("a");
        expect(a.item(i).namespaceURI).toBe(svgns);
      }
      ele = doc.createElementNS("http:://www", "st");
      ele.appendChild(doc.documentElement.lastChild);
      doc.documentElement.appendChild(ele);
      a = doc.getElementsByTagNameNS(svgns, "a");
      expect(a.length).toEqual(20);
      for (var i=0;i<20;++i) {
        expect(a.item(i).nodeName).toBe("a");
        expect(a.item(i).namespaceURI).toBe(svgns);
      }
    });
    /*importNodeメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a importNode method (the valid partion)", function() {
      var ele = doc.createElementNS("http://www.w3.org/2000/svg", "a"),
          cdoc = doc.implementation.createDocument("http://", "a"),
          c = cdoc.importNode(ele);
      ele.appendChild(doc.createTextNode("abc"));
      ele.appendChild(doc.createElementNS("http://", "x:ab"));
      expect(c.firstChild).toBeNull();
      expect(c.lastChild).toBeNull();
      
      c = cdoc.importNode(ele, true);
      expect(c.firstChild.data).toBe("abc");
      expect(c.lastChild.namespaceURI).toBe("http://");
      expect(c.lastChild.localName).toBe("ab");
      expect(c.firstChild).not.toBe(ele.firstChild);
      expect(c.lastChild).not.toBe(ele.lastChild);
      
      c = cdoc.importNode(ele, false);
      expect(c.firstChild).toBeNull();
      expect(c.lastChild).toBeNull();
      
      ele.appendChild(doc.createTextNode("abc"));
      expect(c.firstChild).toBeNull();
      expect(c.lastChild).toBeNull();
      
      var ds = doc.createElementNS("http://oo", "t:abc");
      ds.appendChild(doc.createTextNode("def"));
      ele.appendChild(ds);
      c = cdoc.importNode(ele, true);
      expect(c.lastChild.firstChild.data).toBe("def");
      expect(c.lastChild.namespaceURI).toBe("http://oo");
      expect(c.lastChild.localName).toBe("abc");
      expect(c.firstChild).not.toBe(ele.firstChild);
      expect(c.lastChild).not.toBe(ele.lastChild);
    });
    /*getElementByIdメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a getElementById method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0;i<t.length;++i) {
        var ti = t[i];
        expect(doc.getElementById(ti)).toBeNull();
      }
    });
    /*getElementsByTagNameNSメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a getElementsByTagNameNS method (the invalid partion)", function() {
      var t = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN, {}, [], undefined, null, 0, -1, 11, 1.1, 10.1];
      for (var i=0;i<t.length;++i) {
        var ti = t[i];
        expect(function(){
          doc.getElementsByTagNameNS(ti, ti);
        }).toThrow();
      }
    });
    /*importNodeメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a importNode method (the invalid partion)", function() {
    }); 
  });
  describe("DOM level 2 Core :: Element", function() {
    var s, t;
    beforeEach(function() {
      s = doc.createElementNS("http://www.w3.org/2000/svg", "text");
      t = doc.createElementNS("http://sie.sourceforge.jp/", "hoge");
    });
    /*まずは、あるべきデフォルト値かどうかをチェックしていく(Checking the default value of a Node interface.)*/
    it("for the default value on the property of Element", function() {
      expect(s.nodeType).toEqual( /*Node.ELEMENT_NODE*/ 1);
      expect(s.nodeValue).toBeNull();
      expect(t.nodeType).toEqual( /*Node.ELEMENT_NODE*/ 1);
      expect(t.nodeValue).toBeNull();
      expect(s.attributes.length).toEqual(0);
    });
    
    /*setAttributeNodeNSメソッドの境界条件を調べておく (limit value analysis, when it calls a setAttributeNodeNS method)*/
    it("should be this for the value, when it calls a setAttributeNodeNS method (limit value analysis)", function() {
      expect(function() {
        s.setAttributeNodeNS();
      }).toThrow();
      var attr = s.ownerDocument.createAttributeNS(null, "h"),
          sat = s.attributes;
      s.setAttributeNodeNS(attr);
      expect(sat.length).toEqual(1);
      expect(sat.getNamedItemNS(null, "h")).toBe(attr);
      /*同じことを繰り返して試行処理*/
      s.setAttributeNodeNS(attr);
      expect(sat.length).toEqual(1);
      expect(sat.getNamedItemNS(null, "h")).toBe(attr);
      attr = s.ownerDocument.createAttributeNS("urn:wo", "h");
      s.setAttributeNodeNS(attr);
      expect(sat.length).toEqual(2);
      expect(sat.getNamedItemNS("urn:", "h")).toBeNull();
    });
    /*setAttributeNodeNSメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a setAttributeNodeNS method (the valid partion)", function() {
      for (var i=0;i<10;++i) {
        var attr = s.ownerDocument.createAttributeNS(null, "h"),
            sat = s.attributes;
        s.setAttributeNodeNS(attr);
      }
      expect(sat.length).toEqual(1);
      expect(sat.getNamedItemNS(null, "h")).toBe(attr);
      for (var i=0;i<10;++i) {
        attr = s.ownerDocument.createAttributeNS("urn:" +i+ "o", "h");
        s.setAttributeNodeNS(attr);
      }
      expect(sat.length).toEqual(11);
      expect(sat.getNamedItemNS("urn:9o", "h")).toBe(attr);
      
      attr = s.ownerDocument.createAttributeNS("urn:wo", "0");
      s.setAttributeNodeNS(attr);
      expect(sat.getNamedItemNS("urn:wo", "0")).toBe(attr);
    });
    /*setAttributeNodeNSメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a setAttributeNodeNS method (the invalid partion)", function() {
      var attr = s.ownerDocument.createAttributeNS(null, "h"),
          sat = s.attributes;
      s.setAttributeNodeNS(attr);
      expect(function() {
        /*すでに使われている属性ノードを別の要素に移した場合はエラー*/
        t.setAttrributeNodeNS(attr);
      }).toThrow();
      
      attr = s.ownerDocument.implementation
              .createDocument("http://www.w3.org/svg/2000", "svg")
              .createAttributeNS("urn:", "h");
      expect(function() {
        /*別の文書ノードに属する属性ノードを設定した場合はエラー*/
        t.setAttrributeNodeNS(attr);
      }).toThrow();
    });
    
    
    /*hasAttributeNSメソッドの境界条件を調べておく (limit value analysis, when it calls a insertBefore method)*/
    it("should be this for the value, when it calls a hasAttributeNS method (limit value analysis)", function() {
    });
    /*hasAttributeNSメソッドの同値分割をして、有効同値クラスを調べておく (Equivalence partitioning, the following is the valid partion)*/
    it("should be this for the value, when it calls a hasAttributeNS method (the valid partion)", function() {
    });
    /*hasAttributeNSメソッドの同値分割をして、無効同値クラスを調べておく (Equivalence partitioning, the following is the invalid partion)*/
    it("should be this for the value, when it calls a hasAttributeNS method (the invalid partion)", function() {
    });
  });
});