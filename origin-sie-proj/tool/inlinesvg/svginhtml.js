/*SIE svginhtml.js - SVG in HTML LGPL2.1 & GPL1.1 & Mozilla Public Lisence*/
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
function _wo(){
  var sc = document.getElementsByTagName("script"), source = "";
  for (var i=0;i<sc.length;++i) {
    if (sc[i].getAttribute("type") === "text/svg") {
      source = sc[i].text.replace(/<svg[^>]*/g, (function(s) {
                s = s.replace(/xmlns(\:xlink)?=["'][^"']+?["']/g, "").replace(/<svg/, "");
                s = '<script type="image/svg+xml"' +s+ '><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +s;
                return s;
             }))
             .replace(/<\/svg>/g, "</svg></script>")
             .replace(/<\/(body|html)>/g, "");
    }
  }
  if (navigator.userAgent.indexOf('WebKit') > -1 || navigator.userAgent.indexOf('Safari') > -1) { //WebKit系ならば、Ajaxを使って自分自身のページを再読み込み
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", document.location.href, true);
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlhttp.onreadystatechange = function() {
      if ((xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
        _webkit_wo(xmlhttp.responseText);
      }
    };
    xmlhttp.send(null);
    return;
  }
  document.getElementById("hogehoge").innerHTML = source;
  var isOpera = (window.opera !== void 0); //Operaだったらtrueを返す
  if (isOpera){
    NAIBU._main();
  }
};
function _webkit_wo(content) {
  var source = "";
  source = content.replace(/<svg[^>]*/g, (function(s) {
              s = s.replace(/xmlns(\:xlink)?=["'][^"']+?["']/g, "").replace(/<svg/, "");
              s = '<script type="image/svg+xml"' +s+ '><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +s;
              return s;
           }))
           .replace(/<\/svg>/g, "</svg></script>")
           .replace(/<\/(body|html)>/g, "");
  var n = source.indexOf("svginhtml.js");
  source = source.substring(n+24, source.length-1);
  document.getElementById("hogehoge").innerHTML = source;
  NAIBU._main();
};
if (navigator.userAgent.indexOf('Chrome') === -1) { //WebKit系ならば、Ajaxを使って自分自身のページを再読み込み
  window.onload = _wo;
  document.write('<div id="hogehoge"></div>');
  document.write('<script type="text/svg"><p style="display:none;">n</p>');
}