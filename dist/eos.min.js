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
;var EOS={run:false,_main:function(m,o,l,r){var k={root:"math",ns:"http://www.w3.org/1998/Math/MathML",elements:["maction","math","merror","mfrac","mi","mmultiscripts","mn","mo","mover","mpadded","mphantom","mprescripts","mroot","mrow","mspace","msqrt","mstyle","msub","msubsup","msup","mtable","mtd","mtext","mtr","munder","munderover","none"]};var b={root:"svg",ns:"http://www.w3.org/2000/svg",elements:["a","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","cursor","defs","desc","ellipse","feBlend","feColorMatrix","font-face","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face-format","font-face-uri","foreignObject","font-face-name","font-face-src","g","glyph","glyphRef","hkern","image","linearGradient","line","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","style","set","stop","svg","symbol","switch","textPath","text","title","tref","tspan","use","view","vkern"]};var q=function(j,s,t,i,u){if(s==="*"&&u){return Object.prototype.toString.call(u)==="[object Array]"?u:[u]}else{if(j.evaluate){q=function(D,G,I,C){I=I||"*";C=C||j;var A="http://www.w3.org/1999/xhtml",F=(j.documentElement.namespaceURI===A)?A:null,x=[],v,w,E="",H=G.split(" ");for(var y=0,z=H.length;y<z;y+=1){E+=" | .//"+I+"[contains(concat(' ', @"+D+", ' '), ' "+H[y]+" ')]"}E=E.substring(3);try{v=j.evaluate(E,C,F,0,null)}catch(B){v=j.evaluate(E,C,null,0,null)}while((w=v.iterateNext())){x.push(w)}return x}}else{q=function(E,G,I,D){I=I||"*";D=D||j;var v=(I==="*"&&D.all)?D.all:D.getElementsByTagName(I),H=G?G.split(" "):null,C,z=[];for(var y=0,F=v.length;y<F;y+=1){C=v[y];try{if(C[E]&&G){var A=C[E].split(" ");outer:for(var x=0;x<A.length;x++){for(var w=0;w<H.length;w++){if(H[w]==A[x]){z.push(C);break outer}}}}}catch(B){}}return z}}}return q(s,t,i,u)};function d(u,s,F,A){for(var x=0;x<s.attributes.length;x++){var v=s.attributes[x];var z=v.name.indexOf(":");if(z==-1){F.setAttribute(v.name,v.value)}else{var y=v.name.slice(0,z);var t=v.name.slice(z+1);if(y=="xmlns"){var C=A;A={};for(var G in C){A[G]=C[G]}A[t]=v.value}else{for(var E in A){if(E==y){F.setAttributeNS(A[y],t,v.value)}}}}}for(var x=0;x<s.childNodes.length;x++){var B=s.childNodes[x];if(B.nodeType==1){for(var w=0;w<u.elements.length;w++){if(u.elements[w].toUpperCase()!=B.nodeName){continue}var D=document.createElementNS(u.ns,u.elements[w]);d(u,B,D,A);F.appendChild(D);break}}else{if(B.nodeType==3){var D=document.createTextNode(B.nodeValue);F.appendChild(D)}}}}var e=[k,b],p=m?q(document,m,o,r,l):q(document,"type","image/svg+xml",r,l);for(var f=0;f<p.length;f++){var a=p[f].firstElementChild;if(a){for(var h=0;h<e.length;h++){var c=e[h];if(a.tagName.toLowerCase()==c.root){if(document.createElementNS){var n=document.createElementNS(c.ns,c.root);d(c,a,n,{});p[f].insertBefore(n,a);p[f].removeChild(a)}else{var g=document.createElement("img");g.src=c.root+" image";g.title=c.root+" image";p[f].insertBefore(g,a)}}}}}}};window.onload=function(){var b=navigator.userAgent,d=b.match(/(opera|firefox(?=\/))\/?\s*(\d+)/i),a=b.match(/version\/(\d+).(\d+)/i);if(d&&a){d[0]=a[2];d[2]=a[1]}if(d&&d.length>2&&(d[1]=="Opera"&&(d[2]<11||d[2]<12&&d[0]<60)||(d[1]=="Firefox"&&d[2]<4))){EOS.run=true;if(window.eos){var c=window.eos;if(c.delay){if(c.delay>0){setTimeout(function(){EOS._main(window.eos.type,window.eos.value,window.eos.elm,window.eos.tag)},c.delay)}}else{EOS._main(c.type,c.value,c.elm,c.tag)}c=void 0}else{EOS._main()}}};