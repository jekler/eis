/*MIT License
See Also MIT-LICENSE.txt
Copyright (c) 2013 dhrname*/

if (!Function.prototype.open) {
  Function.prototype.open = function() {
    if (!arguments[0] || (typeof arguments[0] !== "string")) {
      throw new Error("no arguments error");
    }
    var that = this,               // Callback Function
        handle = [],               // File Handler
        fileNames = Array.prototype.slice.call(arguments),
        fileName = fileNames.shift(),
        args = fileNames.concat([]),
        xhr = new XMLHttpRequest();
    handle.read = function () {
      var data = this.join(""),
          xml,
          doc = document;
      if (arguments[0] && (arguments[0] === "element")) {
        if (doc.importNode) {
          try {
            xml = (new DOMParser()).parseFromString( data , "text/xml" );
          } catch( e ) {
            xml = null;
          }
          if ( !xml || !xml.documentElement
              || xml.getElementsByTagName( "parsererror" ).length ) {
            throw new Error( "Invalid XML: " + data );
          }
          var s = doc.importNode(xml.documentElement);
          doc.documentElement.appendChild(s);
          return s;
        } else {
          doc.documentElement.lastChild.insertAdjacentHTML("afterend", data);
          return doc.documentElement.lastChild;
        }
      } else {
        return data;
      }
    };
    handle.xhr = xhr;
    handle.write = function (text) {
      if ((typeof text !== "string") && text.nodeName) {
        text = (new XMLSerializer()).serializeToString(text);
      }
      this.xhr.open("POST", fileName);
      this.xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
      this.xhr.send(text);
      return text;
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status === 200) || (xhr.status > 400)) {
          var text = (xhr.status === 200) ? xhr.responseText : "";
          fileName && handle.push((handle[fileName] = text));
          if (fileNames.length !== 0) {
            fileName = fileNames.shift();
            f();
          } else {                                   //Load End
            xhr.onreadystatechange = Function.empty; //to solve the problem about a memory leak for IE 8
            that.apply(that, [handle].concat(args));
            text = fileNames = xhr = handle = f = that = args = void 0;
          }
        }
      }
    };
    var f = function() {
      if (!fileName || (typeof fileName !== "string")) {
        /*stop loading files*/
        fileNames = [];
        fileName = null;
        xhr.onreadystatechange();
        return;
      }
      if (Function.SIE) { //for IE 8 (SIE)
        fileName = Function.SIE.openPath + fileName;
      }
      xhr.open("GET", fileName, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(null);
    };
    f();
    return this;
  };
  
  Function.empty = function(){};
  
  if (typeof DOMParser === "undefined") {
    /*DOMParser Polyfill*/
    DOMParser = function () {
      if ((typeof window !== "undefined") && window.ActiveXObject ) { // IE
        this.xml = new ActiveXObject( "MSXML2.DomDocument" );
      }
    };
    DOMParser.prototype.parseFromString = function(data, type) {
      if (this.xml) {
        var xml = this.xml;      
        /**ResolveExternals Property [Second-level DOM]
         * http://msdn.microsoft.com/en-us/library/ms761375%28VS.85%29.aspx
         *ValidateOnParse Property [Second-level DOM]
         * http://msdn.microsoft.com/en-us/library/ms760286%28VS.85%29.asp
         */
        xml.async = xml.validateOnParse = xml.resolveExternals = false;
        xml.preserveWhiteSpace = true;
        xml.loadXML( data.replace(/^[\s\S]*?<([^!\?])/, "<$1") ); //XML宣言のUTF-8は問題が起きるので削除
        if (xml.doctype) {
          /*以下の処理は、実体参照を使ったとき
           *代替の処理を用いて、実体参照を処理するもの
           */
          var tmp = data,
              enti = xml.doctype.entities,
              map;
          for (var i=0; i<enti.length; ++i) {
            map = enti.item(i);
            tmp = tmp.replace((new RegExp("&"+map.nodeName+";", "g")), map.firstChild.xml);
          }
          xml.loadXML(tmp);
          tmp = enti = map = void 0;
        }
        return xml;
      }
    };
  }
  
  if (typeof XMLSerializer === "undefined") {
    /*XMLSerializer Polyfill*/
    XMLSerializer = function() {
      
    };
    XMLSerializer.prototype.serializeToString = function(node) {
      if (!arguments[0]) {
      } else if (node.xml) {
        return node.xml;
      } else if (node.outerHTML) {
        return node.outerHTML.replace(/<\?XML[^>]+>/, "");
      }
      throw new Error ("arguments error");
    };
  }
}