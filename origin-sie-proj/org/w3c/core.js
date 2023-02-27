/*!SIE-SVG without Plugin under LGPL2.1 & GPL2.0 & Mozilla Public License
 *公式ページは http://sie.sourceforge.jp/
 *利用方法は <script defer="defer" type="text/javascript" src="sie.js"></script>
 *http://sie.sourceforge.jp/
 *Usage: <script defer="defer" type="text/javascript" src="sie.js"></script>
 */
/*! ***** BEGIN LICENSE BLOCK *****
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
/*!
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
/*Function Object.create
 *関数Object.createはオブジェクトを新規に作り出すときに使う。
 *SIEでスーパークラスに引数が指定されているときの対策として使う。
 *example: function SuperClass (ng) {ng.e();};
 *function SubClass () {};
 *SubClass.prototype = new SuperClass(); // Error
 *SubClass.prototype = Object.create(SuperClass) // OK*/
if (!Object._create) {
  Object._create = function (/*Function*/ cl) {
    var s = function () {};
    s.prototype = cl.prototype;
    cl = void 0;
    return new s;
  };
}
// File: http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/dom.idl
/*W3CのDOMのIDLを参照にコードを起こしている
 *変数やプロパティ、メソッドの名前の頭に、「_」がついているときはSIE独自のもの
 */
/*
#ifndef _DOM_IDL_
#define _DOM_IDL_

#pragma prefix "w3c.org"
module dom
{

  valuetype DOMString sequence<unsigned short>;

  typedef   unsigned long long DOMTimeStamp;

  interface DocumentType;
  interface Document;
  interface NodeList;
  interface NamedNodeMap;
  interface Element;
*/
function DOMException(n){
 Error.apply(this, arguments);
 this.code = n;
 var s = [
   "", //数合わせのため
   "Index Size Error",
   "DOMString Size Error",
   "Hierarchy Request Error",
   "Wrong　Document　Error",
   "Invalid　Character　Error",
   "No Data Allowed　Error",
   "No Modification Allowed Error",
   "Not Found Error",
   "Not Supported　Error",
   "Inuse　Attribute　Error",
   "Invalid State　Error",
   "Syntax Error",
   "Invalid Modification　Error",
   "Namespace Error",
   "Invalid Access Error"
 ];
 this.message = s[n];
/*DOMSTRING_SIZE_ERR
テキストの指定された範囲がDOMStringに合致しない。 2
HIERARCHY_REQUEST_ERR
コードが属さない場所に挿入されている。 3
INDEX_SIZE_ERR
インデクス若しくは大きさが負数，又は許された値よりも大きい。 1
INUSE_ATTRIBUTE_ERR
他で既に使用されている属性を追加しようとしている。 10
INVALID_ACCESS_ERR，DOM水準2で導入 
パラメタ又は操作が基礎になるオブジェクトによってサポートされていない。 15
INVALID_CHARACTER_ERR
名前の中などで，妥当でない又は不正な文字が指定されている。文法に合った文字の定義についてはXML規定の 生成規則2 を，文法に合った名前文字については 生成規則5 を参照すること。5 
INVALID_MODIFICATION_ERR，DOM水準2で導入 
基礎となるオブジェクトの型を修正しようとしている。 13
INVALID_STATE_ERR，DOM水準2で導入 
利用不可能又はもはや利用可能ではないオブジェクトを使用しようとしている。 11
NAMESPACE_ERR，DOM水準2で導入 
名前空間に関して正しくない方法でオブジェクトを生成又は変更しようとしている。 14
NOT_FOUND_ERR
ノードが存在しない文脈でそのノードを参照しようとしている。 8
NOT_SUPPORTED_ERR
実装は，オブジェクト又は操作の要求された型をサポートしていない。9 
NO_DATA_ALLOWED_ERR
データをサポートしないノードに対してデータを指定している。 6
NO_MODIFICATION_ALLOWED_ERR
修正が許されない場所でオブジェクトを修正しようとしている。 7
SYNTAX_ERR，DOM水準2で導入 
妥当ではない又は不正な文字列が指定されている。 12
WRONG_DOCUMENT_ERR
ノードを生成した文書以外の(そのノードをサポートしない)異なる文書で，ノードが使用されている。4
*/
};
(function(t) {
/*マジックナンバーは軽量化のため原則コメントで記述するのみ
t.INDEX_SIZE_ERR                 = 1;
t.DOMSTRING_SIZE_ERR             = 2;
t.HIERARCHY_REQUEST_ERR          = 3;
t.WRONG_DOCUMENT_ERR             = 4;
t.INVALID_CHARACTER_ERR          = 5;
t.NO_DATA_ALLOWED_ERR            = 6;
t.NO_MODIFICATION_ALLOWED_ERR    = 7;
t.NOT_FOUND_ERR                  = 8;
t.NOT_SUPPORTED_ERR              = 9;
t.INUSE_ATTRIBUTE_ERR            = 10;
t.INVALID_STATE_ERR              = 11;
t.SYNTAX_ERR                     = 12;
t.INVALID_MODIFICATION_ERR       = 13;
t.NAMESPACE_ERR                  = 14;
t.INVALID_ACCESS_ERR             = 15;*/
t.prototype = new Error();
})(DOMException);

/*DOMImplementation
 *DOMの基本的な機能をつかさどる
 */
DOMImplementation = {
    /* hasFeature
     *文字列によって、機能をサポートしているかどうかをチェックする。削除不可。
     */
    /*boolean*/ hasFeature : function(/*string*/ feature, version) {
      switch (feature) {
        case "CORE" :
        case "XML" :
        case "Events" :              //DOM level2 Eventを参照
        case "StyleSheets" :         //DOM level2 StyleSheetを参照
        case "org.w3c.svg.static" :  //SVG1.1の仕様を参照
        case "org.w3c.dom.svg.static" :
          return true;
        default :
          if (version === "2.0") {   //DOM level2 Coreにおいて策定されたバージョン情報
            return true;
          } else {
            return false;
          }
      }
    },

    /* createDocumentType
     *ドキュメントタイプを作るためのもの。削除可。
     */
    /*DocumentType*/ createDocumentType : function(/*string*/ qualifiedName, publicId, systemId) {
      var s = new Node();
      s.publicId = publicId;
      s.systemId = systemId;
      return s;
    },
    /* createDocument
     * ドキュメントオブジェクトを作るためのもの。削除不可。
     */
    /*Document*/ createDocument : function( /*string*/ ns, qname, /*DocumentType*/ doctype) {
      try {
        var s;
        if (ns && DOMImplementation[ns] && DOMImplementation[ns].Document) {
          s = new (DOMImplementation[ns].Document);
          this._doc_ && (s._document_ = this._doc_);          //_document_プロパティはcreateElementNSメソッドやradialGradient要素やNAIBU._setPaintなどで使う
        } else {
          s = new Document();
        }
        s.implementation = this;
        s.doctype = doctype || null;
        s.documentElement = s.createElementNS(ns,qname); //ルート要素を作る
        return s;
      } catch(e){}
    },
    "http://www.w3.org/2000/xmlns": {}
};

/* Node
 *ノード（節）はすべての雛形となる重要なものである。削除不可。
 */

function Node(){
  this.childNodes = [];
  this._capter = []; //eventで利用
}
/*軽量化のためにマジックナンバーはコメントで代替
 *(function(t) {
// NodeType
/*const unsigned short  t.ELEMENT_NODE                   = 1;
/*const unsigned short  t.ATTRIBUTE_NODE                 = 2;
/*const unsigned short  t.TEXT_NODE                      = 3;
/*const unsigned short  t.CDATA_SECTION_NODE             = 4;
/*const unsigned short  t.ENTITY_REFERENCE_NODE          = 5;
/*const unsigned short  t.ENTITY_NODE                    = 6;
/*const unsigned short  t.PROCESSING_INSTRUCTION_NODE    = 7;
/*const unsigned short  t.COMMENT_NODE                   = 8;
/*const unsigned short  t.DOCUMENT_NODE                  = 9;
/*const unsigned short  t.DOCUMENT_TYPE_NODE             = 10;
/*const unsigned short  t.DOCUMENT_FRAGMENT_NODE         = 11;
/*const unsigned short  t.NOTATION_NODE                  = 12;
})(Node);*/
Node.prototype = {
  //以下は初期値として設定
  tar : null,
  firstChild : null,
  previousSibling : null,
  nextSibling : null,
  attributes : null,
  namespaceURI : null,
  localName : null,
  lastChild : null,
  prefix : null,
  ownerDocument : null,
  parentNode : null,
/*insertBeforeメソッド
 *指定したrefノードの前に、新たなnノードを入れる。貼り付け（ペースト）機能。
 */
/*Node*/ insertBefore : function( /*Node*/ n, ref) {
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
  tp = rp = evt = te =j = t = s = descend = di = void 0;
  return n;
},
/*replaceChildメソッド
 *指定したoldChildノードの代わりに、新たなnewChildノードを入れる。切り替え機能。
 */
/*Node*/ replaceChild : function( /*Node*/ newChild, oldChild) {
  this.insertBefore(newChild, oldChild);
  return this.removeChild(oldChild);
},
/*removeChildメソッド
 *eleノードをリストから取り除く。eleノードそのものは削除されない。切り取り（カット）機能。
 */
/*Node*/ removeChild : function( /*Node*/ ele) {
  if (!(ele instanceof Node)) {                   //Nodeでなければ
    throw new Error();
  }
  if (ele.parentNode !== this) {                                        //親が違う場合
    throw new DOMException(/*DOMException.NOT_FOUND_ERR*/ 8);
  }
  if (ele.ownerDocument !== this.ownerDocument) { //所属ドキュメントが違う場合
    throw new Error();
  }
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
},
/*appendChildメソッド
 *eleノードをリストの最後尾に追加する
 */
/*Node*/ appendChild : function( /*Node*/ ele) {
  return this.insertBefore(ele, null);
},
/*hasChildNodesメソッド
 *子ノードがあるかどうか
 */
/*boolean*/ hasChildNodes : function() {
  return (this.childNodes.length > 0);
},
/*cloneNodeメソッド
 *ノードのコピーを作る。引数は、子ノードのコピーも作るかどうか。コピー機能。
 */
/*Node*/ cloneNode : function( /*boolean*/ deep) {
  return (this.hasOwnProperty("ownerDocument") ?
            this.ownerDocument.importNode(this, deep)
          : new Node());
},
/*normalizeメソッド
 *二つ以上の重複したテキストノードを一つにまとめる
 */
/*void*/ normalize : function() {
  var tcn = this.childNodes;
  try {
  for (var i=tcn.length-1;i<0;--i) {
    var tcni = tcn[i], tcnip = tcni.nextSibling;
    if (tcnip) {
      if (tcni.nodeType === /*Node.TEXT_NODE*/ 3 && tcnip.nodeType === /*Node.TEXT_NODE*/ 3) {
        tcni.appendData(tcnip.data);    //次ノードの文字列データを、現ノード文字列の後に付け加える
        tcni.legnth = tcni.data.length;
        this.removeChild(tcnip);        //次ノードを排除
      } else {
        tcni.normalize();
      }
    } else {
      tcni.normalize();
    }
  }
  } catch(e){};
},
/*isSupportedメソッド
 *どんな機能をサポートしているかどうかをチェック
 */
/*boolean*/ isSupported : function( /*string*/ feature, version) {
  return (this.ownerDocument.implementation.hasFeature(feature+"", version+""));
},
/*hasAttributesメソッド
 *ノードが属性を持っているかどうか
 */
/*boolean*/ hasAttributes : function() {
  return (this.attributes.length > 0);
}
};


Array.prototype.item = function( /*long*/ index) {
  if (!this[index]) {
    return null;
  }
  return (this[index]);
};
/*ノードリストはArrayで代用。
  interface NodeList {
    Node               item(in unsigned long index);
    readonly attribute unsigned long    length;
  };
*/

/*NamedNodeMap
 *ノードの集合。ノードリストと違って、順序が決まっていない。削除不可
 */
function NamedNodeMap() {
};

NamedNodeMap.prototype = {
 /*number*/ length : 0,
/*
 *名前空間に対応していないメソッドは、軽量化のため、機能させないようにする。代わりに、**NSメソッドを利用すること
 */
/*Node*/ getNamedItem : function(/*string*/ name){
  },
/*Node*/ setNamedItem : function(/*Node*/ arg){
  },
/*Node*/ removeNamedItem : function(/*string*/ name){
  },
/*Node*/ item : function( /*long*/ index) {
    return this[index];
  },
/*getNamedItemNSメソッド
 *名前空間と名前を使って、ノードの集合から特定のノードを取り出す
 */
/*Node*/ getNamedItemNS : function(/*string*/ namespaceURI, /*string*/ localName) {
    var ta;
    for (var i=0,tali=this.length;i<tali;i++) {
      ta = this[i];
      if ((ta.namespaceURI === namespaceURI) && (ta.localName === localName)) { //名前空間と名前がそれぞれ一致すれば
        this._num = i;                                                      //場所をいったん記録しておく。（setNamedItemNSで使う）
        return ta;
      }
    }
    i = ta = void 0;
    return null;
  },
/*setNamedItemNSメソッド
 *ノードの集合に特定のノードを設定
 */
/*Node*/ setNamedItemNS : function(/*Node*/ arg) {
    var tgans = this.getNamedItemNS(arg.namespaceURI, arg.localName),
        s;
    if (tgans) {                          //ノードがすでにあるならば、
      s = this[this._num];
      this[this._num] = arg;
      arg = tgans = void 0;
      return s;
    } else {
      if (arg.ownerElement !== void 0) { //ノードがもはや別の要素で使われている
        throw new DOMException(/*DOMException.INUSE_ATTRIBUTE_ERR*/ 10);
      }
      this[this.length] = arg;            //新たに、argを項目として追加する
      this.length +=  1;
      arg = void 0;
      return null;
    }
  },
/*removeNamedItemNSメソッド
 *名前空間と名前を使って、ノードの集合から特定のノードを排除
 */
/*Node*/ removeNamedItemNS : function(/*string*/ namespaceURI, /*string*/ localName) {
    var tgans = this.getNamedItemNS(namespaceURI, localName);
    if (!tgans) {                          //ノードが見当たらない場合、
      throw new DOMException(/*DOMException.NOT_FOUND_ERR*/ 8);
    } else {
      var s = this[this._num];
      delete (this[this._num]);
      this.length -= 1;
      tgas = void 0;
      return s;
    }
  }
};

/*CharacterData
 *文字データ。Textノードなどの元となる。削除不可。
 */
function CharacterData(){
};
CharacterData.prototype = Object._create(Node);                    //ノードのプロトタイプチェーンを作って、継承
(function(cproto){
  cproto.length = 0;
  cproto.childNodes = [];
  cproto._capter = []; //eventで利用
  /*substringDataメソッド
   *offsetから数えてcount分の文字列を取り出す
   */
  /*string*/ cproto.substringData = function(/*long*/ offset, /*long*/ count) {
    if (offset < 0 || count < 0 || offset > this.length) { //値が負か、データの長さよりoffsetが長いとき、サイズエラーを起こす
      throw new DOMException(/*INDEX_SIZE_ERR*/ 1);
    }
    if (offset + count > this.length) {                    //offsetとcountの和が文字全体の長さを超える場合、offsetから最後までのを取り出す
      count = this.length - offset;
    }
    var s = this.data.substr(offset, count);
    return s;
  };
  /*void*/ cproto.appendData = function( /*string*/ arg) {
    this.data += arg;
    this.length = this.data.length;
  };
  /*void*/ cproto.insertData = function( /*long*/ offset, /*string*/ arg) {
    var pre = this.substring(0, offset - 1);                 //文字列を二つに分けた、前半部分
    var next = this.substring(offset, this.length - offset); //後半部分
    this.data = pre + this.data + next;
    this.length = this.data.length;
  };
  /*void*/ cproto.deleteData = function( /*long*/ offset, /*long*/ count) {
    var pre = this.substring(0, offset - 1);                    //残すべき前半部分
    var next = this.substring(offset + count, this.length - 1); //後半部分
    if (offset + count > this.length) {                         //offsetとcountの和が文字全体の長さを超える場合、offsetから最後までのを削除
      next = "";
    }
    this.data = pre + next;
    this.length = this.data.length;
  };
  /*void*/ cproto.replaceData = function( /*long*/ offset, /*long*/ count, /*string*/ arg) {
    if (offset < 0 || count < 0 || offset > this.length) { //値が負か、データの長さよりoffsetが長いとき、サイズエラーを起こす
      throw new DOMException(/*INDEX_SIZE_ERR*/ 1);
    }
    this.deleteData(offset, count);
    this.insertData(offset, arg);
  };
  cproto = void 0;
})(CharacterData.prototype);

/*Attr
 *属性ノード。削除不可。
 */
function Attr() {
};
Attr.prototype = Object._create(Node);                    //ノードのプロトタイプチェーンを作って、継承
(function(aproto){
  aproto.nodeType = /*Node.ATTRIBUTE_NODE*/ 2;
  aproto.nodeValue = null;
  aproto.childNodes = [];
  aproto._capter = []; //eventで利用
  aproto = void 0;
})(Attr.prototype);

/*Element
 *要素ノード。削除不可。
 */
function Element() {
  Node.call(this);
  this.attributes = new NamedNodeMap();          //属性を収納
};
Element.prototype = Object._create(Node);                  //ノードのプロトタイプチェーンを作って、継承
(function(eproto){
  eproto.nodeType = /*Node.ELEMENT_NODE*/ 1;
  eproto.nodeValue = null;
  /*
   *名前空間に対応していないメソッドは、軽量化のため、機能させないようにする。代わりに、**NSメソッドを利用すること
   *(getAttributeとsetAttributeは普及しているので機能させる
   */
  /*string*/ eproto.getAttribute = function( /*string*/ name) {
    return (this.getAttributeNS(null, name));
  };
  /*void*/ eproto.setAttribute = function( /*string*/ name, /*string*/ value) {
    this.setAttributeNS(null, name, value);
  };
  /*void*/ eproto.removeAttribute = function( /*string*/ name) {
    this.removeAttributeNS(null, name);
  };
  /*Attr*/ eproto.getAttributeNode = function( /*string*/ name) {
  };
  /*Attr*/ eproto.setAttributeNode = function( /*Attr*/ newAttr) {
  };
  /*Attr*/ eproto.removeAttributeNode = function( /*Attr*/ oldAttr) {
    var s = this.attributes.removeNamedItemNS(oldAttr.namespaceURI, oldAttr.localName);  //attributesから該当するノードを排除
    return s;
  };
  /*NodeList(Array)*/ eproto.getElementsByTagName = function( /*string*/ name) {
  };
  /*string*/ eproto.getAttributeNS = function( /*string*/ namespaceURI, /*string*/ localName) {
    var n = this.getAttributeNodeNS(namespaceURI, localName);                      //属性ノードを取得する
    if (!n) {
      return null;
    } else {
      return (n.nodeValue);
    }
  };
  /*void*/ eproto.setAttributeNS = function( /*string*/ namespaceURI, /*string*/ qualifiedName, /*string*/ value) {
    var atn = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    /*元来、string型以外の型を許容すべきではないが、他のブラウザ（FirefoxやOpera)でエラーが出ないため許容する*/
    atn.nodeValue = value+"";
    atn.value = value+"";
    this.setAttributeNodeNS(atn);
  };
  /*void*/ eproto.removeAttributeNS = function( /*string*/ namespaceURI, /*string*/ localName) {
  };
  /*Attr*/ eproto.getAttributeNodeNS = function( /*string*/ namespaceURI, /*string*/ localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  };
  /*Attr*/ eproto.setAttributeNodeNS = function( /*Attr*/ newAttr){
    if (newAttr.ownerDocument !== this.ownerDocument) { //所属ドキュメントが違う場合
      throw new DOMException(/*DOMException.WRONG_DOCUMENT_ERR*/ 4);
    }
    var s = this.attributes.setNamedItemNS(newAttr);
    newAttr.ownerElement = this;
    if ((newAttr.localName === "id") && !this.ownerDocument._id[newAttr.nodeValue]) {                   //id属性であったならば
      this.ownerDocument._id[newAttr.nodeValue] = this; //ドキュメントに登録しておく
    }
    return s;
  };
  /*NodeList(Array)*/ eproto.getElementsByTagNameNS = function( /*string*/ namespaceURI, /*string*/ localName) {
    var f = this.firstChild;
    if (f) {
      var s = [],
          n = 0,
          na, ta, d;
      /*　文字列'*'　は、どのような値でも一致させることができるワイルドカード*/
      (namespaceURI === "*") && (na = true);
      (localName === "*") && (ta = true);
    } else {
      namespaceURI = localName = void 0;
      return null;
    }
    while(f) {
      if (f.nodeType === /*Node.ELEMENT_NODE*/ 1) {
        if((ta || (f.localName === localName)) && (na || (f.namespaceURI === namespaceURI))) {
          s[n] = f;
          n++;
        }
        if (f.firstChild) { //子要素があれば
          d = f.getElementsByTagNameNS(namespaceURI, localName);
          if (d) {
            for (var i=0,dli=d.length;i<dli;++i) {
              s[n] = d[i];
              n++;
            }
          }
        }
      }
      f = f.nextSibling;
    }
    namespaceURI = localName = f = d = ta = na = void 0;
    if (n === 0) {
      s = n = void 0;
      return null; //該当する要素なし
    } else {
      n = void 0;
      return s;
    }
  };
  /*boolean*/ eproto.hasAttribute = function( /*string*/ name) {
    return (this.hasAttributeNS(null, name));
  };
  /*boolean*/ eproto.hasAttributeNS = function( /*string*/ namespaceURI, /*string*/ localName) {
    if (this.getAttributeNodeNS(namespaceURI, localName)) { //ノードの取得に成功した場合
     return true;
    } else {
     return false;
    }
  };
  eproto = void 0;
})(Element.prototype);

/*Text
 *テキストノード。削除不可。
 */
function Text() {
};
Text.prototype = Object._create(CharacterData);                       //文字データのプロトタイプチェーンを作って、継承
(function(tproto){
  tproto.nodeType = /*Node.TEXT_NODE*/ 3;
  tproto.nodeName = "#text";

  /*Text*/ tproto.splitText = function(/*long*/ offset) {
    var pre = this.substringData(0, offset - 1);              //このノードからoffsetまでの文字列を取り出して、
    this.replaceData(0, this.length - 1, pre);                //このノードの文字列と置き換える
    var next = "";
    if (this.length !== offset) {                             //このノードの文字列の長さがoffsetに等しくない場合
      next = this.substringData(offset, this.length - 1);     //文字列を取り出す。（等しい場合は文字列を取り出さない）
    }
    var nnode = this.ownerDocument.createTextNode(next);
    if (this.parentNode) {
      this.parentNode.insertBefore(nnode, this.nextSibling);
    }
    return nnode;
  };
  tproto = void 0;
})(Text.prototype);

/*Comment
 *コメントノード。<!-- --!>で表現される。削除不可。
 */
function Comment() {
};
Comment.prototype = Object._create(CharacterData);                    //文字データのプロトタイプチェーンを作って、継承
Comment.prototype.nodeType = /*Node.COMMENT_NODE*/ 8;
Comment.prototype.nodeName = "#comment";
/*CDATASection
 *CDATA領域を示すノード。<![CDATA[ ]]!>で表現される。削除不可。
 */
function CDATASection() {
  this.nodeType = /*Node.CDATA_SECTION_NODE*/ 4;
  this.nodeName = "#cdata-section";
};
CDATASection.prototype = Object._create(Text);                        //テキストノードのプロトタイプチェーンを作って、継承

/*DocumentType
 *DTD（文書型定義）の情報を取り扱うノード。DTDは<!DOCTYPE[ ]>で表現されうる。削除可
 */
function DocumentType() {
  Node.call(this);
  //以下のメンバは削除可
  this.name = "";
  this.entities = new NamedNodeMap();   //パラメタ実体を除く実体の集まり
  this.notations = new NamedNodeMap();  //DTDで示した記法の集まり
  this.publicId = "";                   //外部サブセットの公開識別子
  this.systemId = "";                   //上同のシステム識別子
  this.internalSubset = "";             //内部サブセットの内容（文字列）
  this.nodeValue = null;
  this.nodeType = /*Node.DOCUMENT_TYPE_NODE*/ 10;
};
DocumentType.prototype = Object._create(Node);   //ノードのプロトタイプチェーンを作って、継承

/*Notation
 *DTDの記法の情報を取り扱うノード。<!NOTATION >か、処理命令で記法は表現されうる。削除可
 */
function Notation() {
  Node.call(this);
  this.publicId = this.systemId = this.nodeValue = null;
  this.nodeType = /*Node.NOTATION_NODE*/ 12;
};
Notation.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承

/*注意
 *以下のノードは、もし、DOMを展開する前に、XMLプロセッサが実体参照の読み込みを行うのであれば、文書中に挿入される必要はない。
 */
/*Entity
 *解析対象（外）実体ノード。削除可
 */
function Entity() {
  Node.call(this);
  this.publicId = this.systemId = this.notationName = null; //解析対象外実体のための記法名。解析対象実体ではnull
  this.nodeValue = null;
  this.nodeType = /*Node.ENTITY_NODE*/ 6;
};
Entity.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承

/*EntityReference
 *実態参照の代わりに挿入されるノード。削除可
 */
function EntityReference() {
  Node.call(this);
  this.nodeValue = null;
  this.nodeType = /*Node.ENTITY_REFERENCE_NODE*/ 5;
};
EntityReference.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承

/*ProcessingInstruction
 *処理命令ノード。スタイルシート処理命令で使うので、削除不可
 */
function ProcessingInstruction() {
  Node.call(this);
  this.nodeType = /*Node.PROCESSING_INSTRUCTION_NODE*/ 7;
};
ProcessingInstruction.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承

/*DocumentFragment
 *複数のノードを移したりするのに便宜上、用いられる文書ノード。削除可
 */
function DocumentFragment() {
  this.nodeName = "#document-fragment";
  this.nodeValue = null;
  this.nodeType = /*Node.DOCUMENT_FRAGMENT_NODE*/ 11;
};
DocumentFragment.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承

/*Document
 *文書ノード。
 */
function Document() {
  Node.call(this);
  this.nodeName = "#document";
  this.nodeValue = null;
  this.nodeType = /*Node.DOCUMENT_NODE*/ 9;
  this._id = {};  //getElementByIdで使う
};
Document.prototype = Object._create(Node);  //ノードのプロトタイプチェーンを作って、継承
(function(dproto, Text, Element, Attr, Comment) {
  /*
   *名前空間に対応していないメソッドは、軽量化のため、機能させないようにする。代わりに、**NSメソッドを利用すること。
   *また、createメソッドは工場メソッドである。クラス名をユーザから隠蔽するのに役に立つ。
   *突然、クラス名が変更されても、ライブラリを利用したユーザは、コードを書き換える必要がないなどのメリットがある。
   */
  /*Element*/ dproto.createElement = function( /*string*/ tagName) {
  };
  /*createDocumentFragmentメソッド
   *切り貼り用のドキュメントを作る。削除可
   */
  /*DocumentFragment*/   dproto.createDocumentFragment = function() {
    var s = new DocumentFragment();
    s.ownerDocument = this;
    return s;
  };
  /*createTextNodeメソッド
   *テキストのノードを作る
   */
  /*Text*/               dproto.createTextNode = function( /*string*/ data) {
    var s = new Text();
    s.data = s.nodeValue = data+"";
    s.length = data.length;
    s.ownerDocument = this;
    return s;
  };
  /*createCommentメソッド
   *コメントノードを作る
   */
  /*Comment*/            dproto.createComment = function( /*string*/ data) {
    var s = new Comment();
    s.data = s.nodeValue = data;
    s.length = data.length;
    s.ownerDocument = this;
    return s;
  };
  /*createCDATASectionメソッド
   *CDATA領域ノードを作る
   */
  /*CDATASection*/       dproto.createCDATASection = function( /*string*/ data) {
    var s = new CDATASection();
    s.data = s.nodeValue = data;
    s.length = data.length;
    s.ownerDocument = this;
    return s;
  };
  /*createProcessingInstructionメソッド
   *処理命令ノードを作る
   */
  /*ProcessingInstruction*/ dproto.createProcessingInstruction = function( /*string*/ target, /*string*/ data) {
    var s = new ProcessingInstruction();
    s.target = s.nodeName = target;
    s.data = s.nodeValue = data;
    s.ownerDocument = this;
    return s;
  };
  /*createAttribute
   *createAttributeNSを推奨
   */
  /*Attr*/               dproto.createAttribute = function( /*string*/ name) {
  };
  /*createEntityReferenceメソッド
   *実体参照ノードを作る
   */
  /*EntityReference*/    dproto.createEntityReference = function( /*string*/ name) {
    var s = new EntityReference();
    s.nodeName = name;
    s.ownerDocument = this;
    return s;
  };
  /*getElementsByTagNameメソッド
   *getElementsByTagNameNSを推奨
   */
  /*NodeList*/           dproto.getElementsByTagName = function( /*string*/ tagname) {
    return this.getElementsByTagNameNS("*", tagname);
  };
  /*importNodeメソッド
   *自身のドキュメントノードに、他のドキュメントノードから作られたノードを取り込みたいときに用いる
   */
  /*Node*/               dproto.importNode = function( /*Node*/ importedNode, /*boolean*/ deep) {
    var s,
        imn = importedNode.nodeType,
        attr, att, fi, n, uri, ch;
    /*以下の処理は引き渡されたimportedNodeがMSXMLによって解析された
     *データであることを前提にしている
     */
    if (imn === /*Node.ATTRIBUTE_NODE*/ 2) {
      uri = importedNode.namespaceURI;
      uri = (uri === "") ? null : uri; //空文字列はnullとして扱うようにする(MSXMLが空文字列を返す時の対策)
      s = this.createAttributeNS(uri, importedNode.nodeName);
      s.nodeValue = importedNode.nodeValue;
    } else if (imn === /*Node.TEXT_NODE*/ 3) {
      s = this.createTextNode(importedNode.data);
    } else if (imn === /*Node.ELEMENT_NODE*/ 1) {
      s = this.createElementNS(importedNode.namespaceURI, importedNode.nodeName);
      attr = importedNode.attributes;
      for (var i=0;attr[i];++i) { //NamedNodeMapを検索する
        ch = attr[i];
        uri = ch.namespaceURI;
        uri = (uri === "") ? null : uri; //空文字列はnullとして扱うようにする(MSXMLが空文字列を返す時の対策)
        att = this.createAttributeNS(uri, ch.nodeName);
        att.nodeValue = ch.nodeValue;
        s.setAttributeNodeNS(att);
      }
      if (deep) {
        fi = importedNode.firstChild;
        while (fi) { //子ノードを検索して、子供がいれば、importNodeメソッドを再帰的に実行する
          n = this.importNode(fi, true);
          s.appendChild(n);
          fi = fi.nextSibling;
        }
      }
      i = void 0;
    } else if (imn === /*Node.COMMENT_NODE*/ 8) {
      s = this.createComment(importedNode.data);
    } else if (imn === /*Node.DOCUMENT_FRAGMENT_NODE*/ 11) {
      s = this.createDocumentFragment();
      if (deep) {
        ch = importedNode.childNodes;
        for (var i=0,chli=ch.length;i<chli;i++) { //子ノードを検索して、子供がいれば、importNodeメソッドを再帰的に実行する
          n = this.importNode(ch[i], true);
          s.appendChild(n);
        }
      }
      i = chli = void 0;
    } else if (imn === /*Node.CDATA_SECTION_NODE*/ 4) {
      s = this.createCDATASection(importedNode.data);
    } else if (imn === /*Node.ENTITY_REFERENCE_NODE*/ 5) {
      s = this.createEntityReference(importedNode.nodeName);
      if (deep) {
        fi = importedNode.firstChild;
        while (fi) {
          n = this.importNode(fi, true);
          s.appendChild(n);
          fi = fi.nextSibling;
        }
      }    
    } else if (imn === /*Node.ENTITY_NODE*/ 6) {
      s = new Entity();
      s.publicId = importedNode.publicId;
      s.systemId = importedNode.systemId;
      s.notationName = importedNode.notationName;
    } else if (imn === /*Node.PROCESSING_INSTRUCTION_NODE*/ 7) {
      s = this.createProcessingInstruction(importedNode.nodeName, importedNode.nodeValue);
    } else if (imn === /*Node.NOTATION_NODE*/ 12) {
      s = new Notation();
      s.publicId = importedNode.publicId;
      s.systemId = importedNode.systemId;
    } else {
      throw new DOMException(/*DOMException.NOT_SUPPORTED_ERR*/ 9);
    }
    importedNode = deep = imn = attr = att = fi = n = uri = ch = void 0;
    return s;
  };
  /*createElementNSメソッド
   *要素ノードを作る。削除不可
   *例:var s = DOC.createElementNS("http://www.w3.org/2000/svg", "svg:svg");
   */
  /*Element*/            dproto.createElementNS = function( /*string*/ namespaceURI, /*string*/ qualifiedName) {
    var ele,
        prefix = null,
        localName = null;
    if (!qualifiedName) {
      throw new DOMException(/*DOMException.INVALID_CHARACTER_ERR*/ 5);
    }
    if (qualifiedName.indexOf(":") !== -1){
      var p = qualifiedName.split(":");
      prefix = p[0];
      localName = p[1];
    } else {
      localName = qualifiedName;
    }
    var ti = this.implementation;
    if (namespaceURI && ti[namespaceURI] 
         && ti[namespaceURI][localName]) { //もし、名前空間とローカル名によって、オブジェクトがあった場合
      ele = new (ti[namespaceURI][localName])(this._document_);
    } else {
      ele = new Element();
    }
    ele.namespaceURI = namespaceURI;
    ele.nodeName = ele.tagName = qualifiedName;
    ele.localName = localName;
    ele.prefix = prefix;
    ele.ownerDocument = this;
    ti = namespaceURI = qualifiedName = prefix = localName = void 0;
    return ele;
  };
  dproto._document_ = document;
  /*createAttributeNSメソッド
   *属性ノードを作る。setAttributeNSで使うため、削除不可
   */
  /*Attr*/               dproto.createAttributeNS = function( /*string*/ namespaceURI, /*string*/ qualifiedName) {
    var attr = new Attr(),
        p;
    attr.namespaceURI = namespaceURI;
    attr.nodeName = attr.name = qualifiedName;
    if (namespaceURI && (qualifiedName.indexOf(":") !== -1)){
     p = qualifiedName.split(":");
      attr.prefix = p[0];
      attr.localName = p[1];
    } else {
      attr.localName = qualifiedName;
    }
    attr.ownerDocument = this;
    p = qualifiedName = void 0;
    return attr;
  };
  /*getElementsByTagNameNSメソッド
   *タグ名と名前空間URIを元に、要素ノード達を取得
   */
  /*NodeList*/           dproto.getElementsByTagNameNS = function(/*string*/ namespaceURI, /*string*/ localName) {
    if ((typeof namespaceURI !== "string") || (typeof localName !== "string")) {
      throw new Error("Argument not string");
    }
    var td = this.documentElement,
        NodeList = td.getElementsByTagNameNS(namespaceURI, localName);
    if (((localName === td.localName) || (localName === "*"))
        && ((namespaceURI === td.namespaceURI) || (namespaceURI === "*")))  {
      /*documentElementをノードリストに追加*/
      if (NodeList) {
        NodeList.unshift(td);
      } else {
        NodeList = [td];
      }
    }
    td = void 0;
    return NodeList;
  };
  /*getElementByIdメソッド
   *id属性の値で要素ノードを指定
   */
  /*Element*/            dproto.getElementById = function( /*string*/ elementId) {
    elementId += "";
    var s = !!this._id[elementId] ? this._id[elementId] : null;
    if (s && (s.id !== elementId)) {
      s = null;
    }
    return s;
  };
  dproto = void 0;
  Document._destroy = function() {
    Text = Element = Attr = Comment = void 0;
  };
})(Document.prototype, Text, Element, Attr, Comment);
/*
#endif // _DOM_IDL_*/
