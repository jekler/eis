SIE - SVG's JavaScript Library


1, What's SIE

SIE is a OpenSource JavaScript library to display SVG files on the almost browser. SVG is a standard language for drawing vector graphics.

2, Licenses

SIE is distributed under the Mozilla Public License (MPL). You may copy, modify and re-distribute it. 
You may obtain a copy of the License at
 http://www.mozilla.org/MPL/
 
3, Usage
 
 3.1, Requirements
 
    IE6-8 (enabled ActiveX), or other browser. The HTTP server (as like Apache)

 3.1, Edit HTML file

	To display SVG files on the web browser, you need to edit the HTML file as the next:
	
	<html>
	  <head>
	    <title>Your Web Page</title>
	    <script defer="defer" type="text/javascript" src="sie.js"></script>
	  </head>
	  <body>
	    <object data="zeimusu_sakura_.svg" type="image/svg+xml" width="1000" height="1000"></object>
	  </body>
	</html>

 3.2, The 'script' element

	Upload the 'sie.js' file to your web server, and write this in the 'head' element of your HTML document.
	
	<script defer="defer" type="text/javascript" src="sie.js"></script>

 3.3, The 'object' element
 
 	Upload the 'zeimusu_sakura_.svg' file to your web server, and write in your HTML document as the next:
 	
 	<object data="zeimusu_sakura_.svg" type="image/svg+xml" width="1000" height="1000"></object>


 3.4 Inline SVG

       See Demo: http://sie.sourceforge.jp/svginhtml.html
 
4, Community

 4.1 Mailing List

	sie-developers@lists.sourceforge.jp

 4.2 Twitter
 
    http://twitter.com/dhrname

5, Acknowledgement

	revulo, bellbind, SourceForge.jp (http://sourceforge.JP/), the Mozilla project. thank you.