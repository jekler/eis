<html>
<head><title>build.php for SIE</title></head>
<body>
<!--
/*build.php under LGPL2.1 & GPL2.0 & Mozilla Public Lisence
d */
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

-->
<?php
$filelist = array("w3c/core.js", "w3c/dom/events.js", "w3c/dom/stylesheet.js", "w3c/dom/css.js", "w3c/dom/smil.js", "w3c/dom/svg.js");
$s = "";
foreach ($filelist as $file) {
    $st = file_get_contents($file);
    $st = str_replace('new STLog(true', 'new STLog(false', $st);
    preg_match("/\/\*SIE\-SVG[\s\S]+?Legal\/ for more details[^\*]+\*\//", $st, $matches);
    $st = preg_replace("/\/\*SIE\-SVG[\s\S]+?Legal\/ for more details[^\*]+\*\//", "", $st);
    $s .= $st;
}
$s = $matches[0] .$s;
file_put_contents("sie-uncompressed.js", $s);
echo "success!";
?>
</body>
</html>