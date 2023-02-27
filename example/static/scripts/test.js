$(function() {
    var oldHtml = $.fn.html;
    $.fn.html = function()
    {
        var ret = oldHtml.apply(this, arguments);
        this.trigger("change");
        return ret;
    };

    $(".svgwrap").on("change",function(){
        var children = this.children;
        if (children.length > 0) {
            if (window.NAIBU) NAIBU._main('*', null, children[0]);
            if (window.EOS && window.EOS.run) EOS._main('*', null, children[0]);
        }
   });

   var nodeSearch = function(node) {
        if (node.tagName.toLowerCase() != 'svg') {
            if ((' ' + node.className + ' ').indexOf(' svg ') > -1) EOS._main('*', null, node);
            else {
                var children = node.children;
                if (children) for (var i = 0; i < children.length; i++) nodeSearch(children[i]);
            }
        }
   }

    $('body').on('DOMNodeInserted', function(e) {
        if (window.EOS && window.EOS.run) nodeSearch(e.target);
    });

    setTimeout(function(){
        var ua= navigator.userAgent,
            M= ua.match(/(msie|trident(?=\/))\/?\s*(\d+)/i),
            ie = M && M[1].toUpperCase() === 'MSIE' && M[2] < 9;
       var ele = document.getElementById('content');
       ele.innerHTML = '<object  class="svg object" data="../static/images/test7.svg" type="image/svg+xml" width="1280px" height="640px"></object> ';
       //ele = document.getElementById('inline');
       //ele.innerHTML = '<object class="svg" data="../static/images/test4.svg" type="image/svg+xml" width="1280px" height="640px"></object> ';  
        $( "#object" ).html((ie ? '<script' : '<span') + ' type="image/svg+xml" class="svg test" width="1024" height="436"><svg version="1.2" baseProfile="tiny" id="ad" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="1024px" height="436px" viewBox="0 0 1024 436" xml:space="preserve"><use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="340" y="70" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="320" y="20" width="60" height="60">							</use>		<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="60" x="430" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="400" y="100" width="60" height="60">								</use>													<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="704" width="320" height="150">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="804" y="50" width="320" height="150">								</use>									<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="256" width="350" height="180">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="-150" y="156" width="350" height="180">								</use>										<use xlink:href="/ui/portal/static/images/eight.svg#bayun" fill="black" x="128" y="180" width="768" height="256"/>						<use xlink:href="/ui/portal/static/images/eight.svg#logo1" fill="black" x="448" width="436" height="436" scale="true"><animate attributeName="fill" id="color" attributeType="XML" from="black" to="rgb(145, 12, 12)" begin="0s" dur="6s" fill="freeze"/>							</use>									</svg>					</' + (ie ? 'script>' : 'span>'));
        $( "#inline" ).html((ie ? '<div><div><script' : '<div><div><span') + ' type="image/svg+xml" class="svg object" width="1024" height="436"><svg version="1.2" baseProfile="tiny" id="ad" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="1024px" height="436px" viewBox="0 0 1024 436" xml:space="preserve"><use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="340" y="70" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="320" y="20" width="60" height="60">							</use>		<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="60" x="430" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="400" y="100" width="60" height="60">								</use>													<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="704" width="320" height="150">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="804" y="50" width="320" height="150">								</use>									<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="256" width="350" height="180">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="-150" y="156" width="350" height="180">								</use>										<use xlink:href="/ui/portal/static/images/eight.svg#bayun" fill="black" x="128" y="180" width="768" height="256"/>						<use xlink:href="/ui/portal/static/images/eight.svg#logo" fill="black" x="448" width="436" height="436" scale="true"><animate attributeName="fill" id="color" attributeType="XML" from="black" to="rgb(145, 12, 12)" begin="0s" dur="6s" fill="freeze"/>							</use>									</svg>					</' + (ie ? 'script></div></div>' : 'span></div></div>'));
        //$( "#content" ).html((ie ? '<script' : '<span') + ' type="image/svg+xml" width="1024" height="436"><svg version="1.2" baseProfile="tiny" id="ad" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="1024px" height="436px" viewBox="0 0 1024 436" xml:space="preserve"><use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="340" y="70" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="320" y="20" width="60" height="60">							</use>		<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="60" x="430" width="60" height="60">							</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_ele" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="400" y="100" width="60" height="60">								</use>													<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="704" width="320" height="150">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_rt" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="804" y="50" width="320" height="150">								</use>									<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" y="256" width="350" height="180">								</use>							<use xlink:href="/ui/portal/static/images/design.svg#cube_lb" stroke="rgb(175, 175, 175)" fill="rgb(175, 175, 175)" x="-150" y="156" width="350" height="180">								</use>										<use xlink:href="/ui/portal/static/images/eight.svg#bayun1" fill="black" x="128" y="180" width="768" height="256"/>						<use xlink:href="/ui/portal/static/images/eight.svg#logo" fill="black" x="448" width="436" height="436" scale="true"><animate attributeName="fill" id="color" attributeType="XML" from="black" to="rgb(145, 12, 12)" begin="0s" dur="6s" fill="freeze"/>							</use>									</svg>					</' + (ie ? 'script>' : 'span>'));
    }, 1000);
});