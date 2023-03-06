/*!
EIS (Eight's IE SVG)
licensed for use under the GNU Lesser General Public License (LGPL) Version 3.
Copyright © 2023 Beijing Manhuiweidu Technology Co., Ltd.
You may find more information @ https://github.com/jekler/eis
***** BEGIN LICENSE BLOCK *****
This file is part of EIS (Eight's IE SVG).
EIS is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License (LGPL) Version 3 as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
EIS is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License (and the GNU Lesser General Public License) along with EIS. If not, see <https://www.gnu.org/licenses/>.
***** END LICENSE BLOCK *****
origgin from:
*
MIT License
Copyright (c) 2006 Sam Ruby

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the Software), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var EOS = {
  run : false,
  _main : function(type, value, elm, tag) {
    var MathML = {
      // Jacques Distler subset of Presentational MathML
      root: 'math',
      ns: 'http://www.w3.org/1998/Math/MathML',
      elements: ['maction', 'math', 'merror', 'mfrac', 'mi',
        'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom',
        'mprescripts', 'mroot', 'mrow', 'mspace', 'msqrt', 'mstyle', 'msub',
        'msubsup', 'msup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder',
        'munderover', 'none']
    }
  
    var SVG = {
      // svgtiny + class + opacity + offset + style
      root: 'svg',
      ns: 'http://www.w3.org/2000/svg',
      elements: ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion',
        'animateTransform', 'circle', 'clipPath', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'font-face',
        'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feFuncA',
        'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset','fePointLight',
        'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face-format', 'font-face-uri', 'foreignObject',
        'font-face-name', 'font-face-src', 'g', 'glyph', 'glyphRef', 'hkern', 'image',
        'linearGradient', 'line', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern',
        'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'style', 'set', 'stop','svg', 'symbol', 'switch',
        'textPath', 'text', 'title', 'tref', 'tspan', 'use', 'view', 'vkern']
    }
  
    var getElementsByTypeName = function (document, type, value, tag, elm){
      if (type === "*" && elm) {
          return Object.prototype.toString.call(elm) === '[object Array]' ? elm : [elm];
      } else if (document.evaluate) {
          getElementsByTypeName = function (type, value, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
              var xhtmlNamespace = "http://www.w3.org/1999/xhtml",
              namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
              returnElements = [],
              elements,
              node,
              typesToCheck = '',
              values = value.split(" ");
              for(var j=0, jl=values.length; j<jl; j+=1){
                typesToCheck += " | .//" + tag + "[contains(concat(' ', @" + type + ", ' '), ' " + values[j] + " ')]";
              }
              typesToCheck = typesToCheck.substring(3);
            try	{
              elements = document.evaluate(typesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
              elements = document.evaluate(typesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
              returnElements.push(node);
            }
            return returnElements;
          };
        } else {
          getElementsByTypeName = function (type, value, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
              values = value ? value.split(" ") : null,
              current,
              returnElements = [];
            for(var l=0, ll=elements.length; l<ll; l+=1){
              current = elements[l];
              try {
                if (current[type] && value) {
                  var types = current[type].split(" ");
     outer:       for(var m=0; m < types.length;  m++){
                    for (var n=0; n < values.length;  n++) if (values[n] == types[m]) {
                      returnElements.push(current);
                      break outer;
                    }
                  }
                }
              }catch(e) {}
            }
            return returnElements;
          };
        }
        return getElementsByTypeName(type, value, tag, elm);
      };
  
    // clone a DOM subtree
    function deepcopy(module, source, dest, nsmap) {
      // copy attributes
      for (var i=0; i<source.attributes.length; i++) {
        var oldattr = source.attributes[i];
        var colon = oldattr.name.indexOf(':');
        if (colon == -1) {
            dest.setAttribute(oldattr.name, oldattr.value);
        } else { // namespace prefixed attribute
          var prefix = oldattr.name.slice(0,colon);
          var name = oldattr.name.slice(colon+1);
          if (prefix == 'xmlns') {
            var oldmap = nsmap;
            nsmap = {};
            for (var property in oldmap) nsmap[property] = oldmap[property];
            nsmap[name] = oldattr.value;
          } else {
            for (var ns in nsmap) {
              if (ns == prefix) {
                dest.setAttributeNS(nsmap[prefix], name, oldattr.value);
              }
            }
          }
        }
      }
  
      // copy children
      for (var i=0; i<source.childNodes.length; i++) {
        var oldchild = source.childNodes[i];
        if (oldchild.nodeType == 1) { // element
          for (var j=0; j<module.elements.length; j++) {
            if (module.elements[j].toUpperCase() != oldchild.nodeName) continue;
            var newchild = document.createElementNS(module.ns,module.elements[j]);
            deepcopy(module, oldchild, newchild, nsmap);
            dest.appendChild(newchild);
            break;
          }
        } else if (oldchild.nodeType == 3) { // text
          var newchild = document.createTextNode(oldchild.nodeValue);
          dest.appendChild(newchild);
        }
      }
    }
  
    // copy modules into their appropriate namespaces
    var modules = [MathML, SVG],
        roots = type ? getElementsByTypeName(document, type, value, tag, elm) : getElementsByTypeName(document, "type", "image/svg+xml", tag, elm);
    for (var j=0; j<roots.length; j++) {
      var source = roots[j].firstElementChild;
      if (source) for (var i=0; i<modules.length; i++) {
        var module = modules[i];
        if (source.tagName.toLowerCase() == module.root) {
          if (document.createElementNS) {
            var dest = document.createElementNS(module.ns, module.root);
            deepcopy(module, source, dest, {});
            roots[j].insertBefore(dest, source);
            roots[j].removeChild(source);
          } else {
            // fallback browsers that don't support DOM namespaces
            var img = document.createElement('img');
            img.src = module.root + ' image';
            img.title = module.root + ' image';
            roots[j].insertBefore(img, source);
          }
        }
      }
    }
  }
};

window.onload = function() {
  var ua= navigator.userAgent,
      M= ua.match(/(opera|firefox(?=\/))\/?\s*(\d+)/i),
      tem = ua.match(/version\/(\d+).(\d+)/i); 
  if(M && tem) {
    M[0] = tem[2];
    M[2] = tem[1];
  }
  if (M && M.length > 2 && (M[1] == "Opera" && (M[2] < 11 || M[2] < 12 && M[0] < 60) || (M[1] == "Firefox" && M[2] < 4))) {
    EOS.run = true;
    if (window.eos) {
      var eos = window.eos;
      if (eos.delay) {
        if (eos.delay > 0) setTimeout(function() {
          EOS._main(window.eos.type, window.eos.value, window.eos.elm, window.eos.tag);
      }, eos.delay);
      } else EOS._main(eos.type, eos.value, eos.elm, eos.tag);
      eos = void 0;
    } else {
      EOS._main();
    }
  }
};