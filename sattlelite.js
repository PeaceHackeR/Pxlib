/* ============= :: CHECK JAVASCRIPT VERSION :: ============ */

function get_js_version() {
    this.jsv = {
        versions: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"],
        version: ""
    };
    var d = document;
    for (i = 0; i < jsv.versions.length; i++) {
        var g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.setAttribute("language", "JavaScript" + jsv.versions[i]);
        g.text = "this.jsv.version='" + jsv.versions[i] + "';";
        s.parentNode.insertBefore(g, s);
    }
    return jsv.version;
}
document.write('JavaScript Version: ' + get_js_version());

/* ============= :: DEVICE SPEC :: ============ */

var _standalone = window.navigator.standalone,
    _userAgent = window.navigator.userAgent.toLowerCase(),
    _safari = /safari/.test(_userAgent),
    _ios = /iphone|ipod|ipad/.test(_userAgent),
    _mobile = false;
var _deviceSize = (screen.width>screen.height) ? screen.height : screen.width;
function is_touch_device() {
  return !!('ontouchstart' in window);
}

/* ============= :: BASH OPTIMIZE Image with Imagemagick :: ============ */
mogrify -path OUTPUT_PATH -filter Triangle -define filter:support=2 -thumbnail OUTPUT_WIDTH -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip INPUT_PATH

/* ============= :: Document Ready :: ============ */
(function(funcName, baseObj) {
    "use strict";
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

/* ============= :: COOKIE :: ============ */

function setCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function deleteCookie(name){
    setCookie(name,"",-1);
}

/* ============= :: TIMESTAMP :: ============ */

function timeStamp() {
    return Date.now().toString(36);
}


/* ============= :: ADD & REMOVE CLASS JAVASCRIPT :: ============ */

function hasClass(el, d) {
    return new RegExp('(\\s|^)' + d + '(\\s|$)').test(el.className);
}

function addClass(el, d) {
    if (!hasClass(el, d)) {
        el.className += (el.className ? ' ' : '') + d;
    }
}

function removeClass(ele, d) {
    if (hasClass(el, d)) {
        el.className = el.className.replace(new RegExp('(\\s|^)' + d + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
    }
}



/* ============= :: VALIDATE :: ============ */
// mail
var reg_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



/* ============= :: CALCULATE DISTANCE BY LAT,LNG :: ============ */
// result in KM.
function divKM(lat1, lon1, lat2, lon2) {
    var R = 6371,
        dLat = deg2rad(lat2 - lat1),
        dLon = deg2rad(lon2 - lon1);
    var _s0 = Math.sin(dLat / 2),
        _s1 = Math.sin(dLon / 2);
    var a = _s0*_s0 + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*_s1*_s1;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

//for short cal
function divKM(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295,
        c = Math.cos,
        a = 0.5-c((lat2 - lat1)*p)/2+c(lat1*p)*c(lat2*p)*(1-c((lon2-lon1)*p))/2;
    return 12742 * Math.asin(Math.sqrt(a));
}

/* ============= :: DISABLED SCROLLING :: ============ */
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


/* ============= :: GET PARAMETER :: ============ */
// ex. 
// var param = getQueryParams(document.location.search)
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}


/* ============= :: CHECK VALID DATE :: ============ */

function isDate(dd,mm,yy) {
    var d = new Date(yy, mm - 1, dd);
    var c = "" + d.getFullYear() + (d.getMonth() + 1) + d.getDate();
    var g = "" + yy + mm + dd;
    return (g == c);
}



/* ============= :: MOVETO ID :: ============ */

function moveToID(id){
	if(id.charAt(0)!="#"){location.href = id;return 0;}
	var pY = $(id).offset().top-0;
	$('html,body').animate({ scrollTop:pY+2 },400,"easeInOutSine");
}


/* ============= :: FORM FUNCTION :: ============ */

//https://jsfiddle.net/Behseini/ue8gj52t/
/*
    reg = /\d/gi;
        var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!reg.test(key)) {
            e.preventDefault();
            return false;
        }
*/

jQuery.fn.forceNumber = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var reg = /[\d\.\-]/gi,
                key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if(reg.test(key)){
                e.preventDefault();
                return false;
            }
        });
    });
}
jQuery.fn.forceNumber = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var reg = /[\d\.\-]/,
                key = e.charCode || e.keyCode || 0,
                fn = (e.key=="Enter") || (e.key=="Backspace") || (e.key=="Tab") || (e.key=="Decimal") || (e.key=="ArrowRight") || (e.key=="ArrowLeft"),
                flg = fn || (reg.test(e.key)) || (e.key==null);
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return flg && (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};
jQuery.fn.forceDecNumber = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var m = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
                mobilekey = m ? parseInt(e.originalEvent.keyIdentifier.substring(2),16) : 0;
            var reg = /[\d\.\-]/,
                key = mobilekey || e.charCode || e.keyCode || 0,
                fn = (e.key=="Enter") || (e.key=="Backspace") || (e.key=="Tab") || (e.key=="Decimal") || (/(Arrow)?(Right|Left)$/.test(e.key)),
                flg = fn || (reg.test(e.key)) || (e.key==null),
                flgdec = (e.key=="Decimal") || (e.key==".") || (e.key==null),
                dec = (/\./.test(this.value)) && ((key==190) || (key == 110)) && flgdec;
            
            return !dec && flg && (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40 && !m) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

function convertToNumber(s){
	if(s=="")s="0";
	s += '';
	var n = s.replace(/[,]/g, "");
	if(isNaN(n))return 0;
	return parseFloat(n);
}
function formatNumber(n){
    var d = String(n).match(/\.\d+/g);
    (d == null) && ( d = "");
    n = n>>0;
	n += '';
	return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+d;
}
function formatToNumber(s){
	return parseFloat(s.replace(/[,]/g, ""));
}

Number.prototype.formatNumber = function(){
    var n = this.valueOf(),
        d = String(n).match(/\.\d+/g);
    (d == null) && ( d = "");
    n = Math.floor(n);
	n += '';
	return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+d;
}
Number.prototype.fixed = function(d,u){
    // u -> undefined,0 for Round
    // u -> 1 for Ceil, -1 for Floor.
    var e = Math.pow(10,d),
        n = this.valueOf()*e;
    return (+!u?Math.round(n):u>0?Math.ceil(n):Math.floor(n))/e;
}



/* Placeholder for ICWEB */
$(function () {
    $('input[placeholder]').each(function(i){
        $(this).data('def',$(this).attr('placeholder'))
        .focusin(function(){
            if($(this).val()==''){
                $(this).attr('placeholder','');
            }
        })
        .focusout(function(){
            if($(this).val().length==0){
                $(this).attr('placeholder',$(this).data('def'));
            }
        });
    });
});

/* ============= :: STICKY FUNCTION :: ============ */
$(function () {
    if ($('.px-sticky').length) {
        var _window = $(window),
            _bound = $('.px-sticky'),
            _nav = _bound.find(".px-sticky-nav"),
            _offsetH = 0,
            _alloc = true;

        function moveScroll() {
            var _pY = _window.scrollTop()+_offsetH,
                _top = _bound.offset().top;
            
            if (_pY > _top) {
                if(_alloc){
                    _alloc = false;
                    _bound.addClass('fixed');
                }
            } else {
                if(!_alloc){
                    _alloc = true;
                    _bound.removeClass('fixed');
                }
            }
        }
        
        moveScroll();
        $(window).scroll(moveScroll);
    }
});

/* ============= :: PARALLAX FUNCTION :: ============ */
function diffFn(_start, _end, _val) {
     var _d1 = _val - _start,
         _d2 = _val - _end;

     if (_d1 == 0) return 0;
     if (_d2 == 0) return 1;

     var _diff = _end - _start;

     if (_d1 * _d2 < 0) return _d1 / _diff;
     if (_d1 < 0) return 0;
     return 1;
 }
$(function(){
    var _parallax = $(".px-parallax");
    function moveScroll() {
        var _pY = $(window).scrollTop(),
            _intY = _pY - window.innerHeight,
            _endY = _pY + window.innerHeight;

        _parallax.each(function () {
            var _anchor = this.offsetTop;
            this.style.backgroundPosition = "center " + (150 * diffFn(_intY, _endY, _anchor) - 75) + 'px';
        });
    }

    moveScroll();
    $(window).scroll(moveScroll).resize(moveScroll);
});


/* ============= :: SCROLLING FOCUS SECTION :: ============ */
$(function(){
    var _vH = window.innerHeight;
    
    var _section = $(".section"),
        _max = _section.length,
        _navIndex = -1;
    
    function moveScroll(){
        var _pY = $(window).scrollTop(),
            _intY = _pY-_vH,
            _endY = _pY+_vH;
        
        /**/
        // elements.getBoundingClientRect().top  -- can replace this function
        var _reflow = true;
        for( var i = 0; i < _max; i++){
            var _obj = $(_section[i]),
                _top = _obj.offset().top,
                _bottom = _top + _obj.height();
            if((_pY>=_top)&&(_pY<_bottom)){
                if(_navIndex == i) {
                    _reflow = false;
                    break;
                }
                break;
            }
        }
        if(_reflow && (_navIndex!=i)){
            _navIndex = i;
            _section.removeClass("focus");
            if(i<_max){
                _obj.addClass("focus");
            }
        }
    }
    
    moveScroll();
    $(window).scroll(moveScroll).resize(function(){
        _vH = window.innerHeight;
        moveScroll();
    });
});


/* ============= :: SOCIAL SHARE :: ============ */

function addQS(d, c) {
    var a = [];
    for (var b in c)
        if (c[b]) a.push(b.toString() + '=' + encodeURIComponent(c[b]));
    return d + '?' + a.join('&')
}
function getMETAContent(attr,data){
    var meta = document.getElementsByTagName("META"),
        max = meta.length;
    for(var i = 0; i<max; i++){
        if(meta[i].getAttribute(attr) == data){
            return meta[i].content;
        }
    }
    return -1;
}

function fbShare() {
    var _img = arguments[0] || null,
        _uri = arguments[1] || document.URL,
        _caption = arguments[2] || document.title;
    
    if(_img){
        FB.ui({
            method: 'feed',
            link: _uri,
            caption: _caption,
            picture: _img
        });
        return false
    }
    var g = {
        u: document.URL,
        t: document.title
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false
}
function fbURLShare(u) {
    var g = {
        u: u
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweetShare() {
    var g = {
        url: document.URL,
        text: document.title + ' - '
    };
    var a = addQS('http://twitter.com/share', g);
    window.open(a, 'tweet', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweetURLShare(u) {
    var g = {
        url: u,
        via: 'Ananda',
        related: '',
        hashtags: 'Aanada',
        text: "โครงการพร้อมอยู่"
    };
    var a = addQS('http://twitter.com/share', g);
    window.open(a, 'tweet', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function gpShare() {
    var g = {
        url: document.URL,
        hl:"th"
    };
    var a = addQS('https://plus.google.com/share', g);
    window.open(a, 'sharer', 'menubar=no,toolbar=no,resizable=yes,status=0,width=600,height=600');
    return false;
}

function lineMSG(){
    window.location = "line://msg/text/"+encodeURIComponent(document.URL);
}

function pinShare(m) {
    var ogimg = getMETAContent("property","og:image");
    ogimg = ogimg.replace("480x250","full");
    
    var g = {
        url: document.URL,
        description:document.title+'\n'+$("meta[property=og\\:description]").attr('content'),
		media:ogimg
    };
 
    if(m!=undefined)g.media = m;
    var a = addQS('https://www.pinterest.com/pin/create/button/', g);
    window.open(a, 'sharer', 'menubar=no,toolbar=no,resizable=yes,status=0,width=750,height=331');
    return false;
}

function mailShare(){
    var g = 'mailto:';
        g += '?subject='+encodeURIComponent(document.title);
        g += '&body='+$("meta[property=og\\:description]").attr('content')+encodeURIComponent('\n')+'ดูหน้านี้ --> '+encodeURIComponent(document.URL);
	win = window.open(g, 'emailWindow');
}


/* ============= :: GENERATE QR Code :: ============ */
$(function(){
    $('body').append('<div id="px-QRPage"><img src="https://chart.googleapis.com/chart?cht=qr&chs=120x120&chl='+location.href+'"></div>');
});


/* ============= ** Finance Function **  ============ */
// All fn is end-of-period
// PV = Present Value, FV = Future Value
// PMT = PAY, n = Number of period, i = Interest
// G [option] = 0 (default) end-of-period, 1 beginning-of-period
// paremeter -> n,i,pv,pmt,fv, [g]
// Formula   0 = PV + PMT*Gi*[1-(1+i)^(-N)]/i + FV*(1+i)^(-N)
// ref : https://en.wikipedia.org/wiki/Continuous-repayment_mortgage

// fn_BA(np, ir, pv, pmt, fv, [gi])

function fn_BA(){
    var np   = (arguments[0] == null) ? null : +arguments[0],
        ir  = (arguments[1] == null) ? null : +arguments[1]*0.01,
        pv  = (arguments[2] == null) ? null : +arguments[2],
        pmt = (arguments[3] == null) ? null : +arguments[3],
        fv  = (arguments[4] == null) ? null : +arguments[4],
        gi  = (arguments[5] != undefined) ? 1+ir : 1;
    
    if(!arguments.length) {
        console.log('fn_BA(np, ir, pv, pmt, fv, [gi])');
        console.log('** formula by %cAKARATE PONGSAWANG','font-family:"futura-light"; color:#591bc7; font-size:12px;','**');
        return 'follow me -> aware.be.late@gmail.com';
    }
    if(np==null){
        console.log("N --> ");
        if(ir==0) return -(pv+fv)/pmt;
        var _s0 = pmt*gi - fv*ir,
            _s1 = pmt*gi + pv*ir,
            _s2 = 1+ir;
        return Math.log(_s0/_s1)/Math.log(_s2);
    }
    if(arguments[1]==null){
        console.log("I --> ");
        if(pmt == 0) return 100*(Math.pow(-fv/pv,1/np)-1);
        if(Math.abs(pv+np*pmt)<1) return 0;
        var _i = 2/np*Math.log(-pmt*np/pv);
        for(var a = 0; a < 400; a++){
            var _s0 = Math.pow(1+_i, -np),
                _s1 = _s0/(1+_i),
                _s2 = pv + pmt*(1-_s0)/_i + fv*_s0,
                _s3 = -pmt*(1-_s0)/_i/_i + pmt*np*_s1/_i - fv*np*_s1;
            _i -= _s2/_s3;
            (Math.abs(_s2/_s3)<1e-14) && (a=400);
        }
        return _i*100;
    }
    if(pv==null){
        console.log("PV --> ");
        if(ir==0) return -(fv+pmt*np);
        var _s0 = pmt*gi/ir,
            _s1 = Math.pow(1+ir,np);
        return (_s0-fv)/_s1 - _s0;
    }
    if(pmt==null){
        console.log("PMT --> ");
        if(ir==0) return -(pv+fv)/np;
        var _s0 = Math.pow(1+ir,np);
        return -ir/gi*(pv+(pv+fv)/(_s0-1));
    }
    if(fv==null){
        console.log("FV --> ");
        if(ir==0) return -pv+pmt*np;
        var _s0 = pmt*gi/ir,
            _s1 = Math.pow(1+ir,np);
        return _s0 - _s1*(pv+_s0);
    }
    
}

function fn_TVM(np, ir, pv, pmt, fv){
    ir *= 0.01;
    var _s0 = Math.pow(1+ir,-np);
    return pv+pmt*(1-_s0)/ir+fv*_s0;
}

function fn_PMT(n,i,pv){
    if(i==0) return -pv/n;
    var _s0 = Math.pow(1+i,n);
    return -i*pv*(1+1/(_s0-1));
}

function fn_Flat2EFF(np,ir){
    // FLAT RATE -> EFF RATE //
    return fn_BA(np,null,100,-(100+ir*np/12)/np,0);
}

function fn_EAR(ir,cp){
    // cp - compounding times per year //
    if((cp == void 0)||(cp == 1)) return ir; 
    return 100*(Math.pow(1+0.01*ir/cp,cp)-1);
}

function fn_FV(n,i,pv,pmt){
    if(i==0) return -pv+pmt*n;
    var _s0 = pmt/i,
        _s1 = Math.pow(1+i,n);
    return _s0 - _s1*(pv+_s0);
}

function fn_N(i,pv,pmt,fv){
    if(i==0) return -(pv+fv)/pmt;
    var _s0 = pmt - fv*i,
        _s1 = pmt + pv*i,
        _s2 = 1+i;
    return Math.log(_s0/_s1)/Math.log(_s2);
}

function fn_PV(n,i,pmt,fv){
    if(i==0) return -(fv+pmt*n);
    var _s0 = pmt/i,
        _s1 = Math.pow(1+i,n);
    return (_s0-fv)/_s1 - _s0;
}

// Finance Encode //
var _0x91fe=["\x4A\x20\x72\x28\x29\x7B\x6B\x20\x62\x3D\x28\x65\x5B\x30\x5D\x3D\x3D\x36\x29\x3F\x36\x3A\x2B\x65\x5B\x30\x5D\x2C\x37\x3D\x28\x65\x5B\x31\x5D\x3D\x3D\x36\x29\x3F\x36\x3A\x2B\x65\x5B\x31\x5D\x2A\x30\x2E\x52\x2C\x39\x3D\x28\x65\x5B\x32\x5D\x3D\x3D\x36\x29\x3F\x36\x3A\x2B\x65\x5B\x32\x5D\x2C\x38\x3D\x28\x65\x5B\x33\x5D\x3D\x3D\x36\x29\x3F\x36\x3A\x2B\x65\x5B\x33\x5D\x2C\x68\x3D\x28\x65\x5B\x34\x5D\x3D\x3D\x36\x29\x3F\x36\x3A\x2B\x65\x5B\x34\x5D\x2C\x6C\x3D\x28\x65\x5B\x35\x5D\x21\x3D\x50\x29\x3F\x31\x2B\x37\x3A\x31\x3B\x66\x28\x21\x65\x2E\x49\x29\x7B\x70\x2E\x6D\x28\x27\x72\x28\x4B\x2C\x20\x37\x2C\x20\x39\x2C\x20\x38\x2C\x20\x68\x2C\x20\x5B\x6C\x5D\x29\x27\x29\x3B\x70\x2E\x6D\x28\x27\x2A\x2A\x20\x4C\x20\x4D\x20\x25\x4E\x20\x4F\x27\x2C\x27\x74\x2D\x77\x3A\x22\x53\x2D\x54\x22\x3B\x20\x78\x3A\x23\x79\x3B\x20\x74\x2D\x7A\x3A\x41\x3B\x27\x2C\x27\x2A\x2A\x27\x29\x3B\x70\x2E\x6D\x28\x27\x42\x20\x43\x20\x2D\x3E\x20\x44\x2E\x45\x2E\x46\x40\x47\x2E\x48\x27\x29\x3B\x67\x20\x36\x7D\x66\x28\x62\x3D\x3D\x36\x29\x7B\x66\x28\x37\x3D\x3D\x30\x29\x67\x2D\x28\x39\x2B\x68\x29\x2F\x38\x3B\x6B\x20\x63\x3D\x38\x2A\x6C\x2D\x68\x2A\x37\x2C\x6A\x3D\x38\x2A\x6C\x2B\x39\x2A\x37\x2C\x6F\x3D\x31\x2B\x37\x3B\x67\x20\x69\x2E\x6D\x28\x63\x2F\x6A\x29\x2F\x69\x2E\x6D\x28\x6F\x29\x7D\x66\x28\x65\x5B\x31\x5D\x3D\x3D\x36\x29\x7B\x66\x28\x38\x3D\x3D\x30\x29\x67\x20\x73\x2A\x28\x69\x2E\x6E\x28\x2D\x68\x2F\x39\x2C\x31\x2F\x62\x29\x2D\x31\x29\x3B\x66\x28\x69\x2E\x75\x28\x39\x2B\x62\x2A\x38\x29\x3C\x31\x29\x67\x20\x30\x3B\x6B\x20\x64\x3D\x32\x2F\x62\x2A\x69\x2E\x6D\x28\x2D\x38\x2A\x62\x2F\x39\x29\x3B\x51\x28\x6B\x20\x61\x3D\x30\x3B\x61\x3C\x76\x3B\x61\x2B\x2B\x29\x7B\x6B\x20\x63\x3D\x69\x2E\x6E\x28\x31\x2B\x64\x2C\x2D\x62\x29\x2C\x6A\x3D\x63\x2F\x28\x31\x2B\x64\x29\x2C\x6F\x3D\x39\x2B\x38\x2A\x28\x31\x2D\x63\x29\x2F\x64\x2B\x68\x2A\x63\x2C\x71\x3D\x2D\x38\x2A\x28\x31\x2D\x63\x29\x2F\x64\x2F\x64\x2B\x38\x2A\x62\x2A\x6A\x2F\x64\x2D\x68\x2A\x62\x2A\x6A\x3B\x64\x2D\x3D\x6F\x2F\x71\x3B\x28\x69\x2E\x75\x28\x6F\x2F\x71\x29\x3C\x55\x2D\x56\x29\x26\x26\x28\x61\x3D\x76\x29\x7D\x67\x20\x64\x2A\x73\x7D\x66\x28\x39\x3D\x3D\x36\x29\x7B\x66\x28\x37\x3D\x3D\x30\x29\x67\x2D\x28\x68\x2B\x38\x2A\x62\x29\x3B\x6B\x20\x63\x3D\x38\x2A\x6C\x2F\x37\x2C\x6A\x3D\x69\x2E\x6E\x28\x31\x2B\x37\x2C\x62\x29\x3B\x67\x28\x63\x2D\x68\x29\x2F\x6A\x2D\x63\x7D\x66\x28\x38\x3D\x3D\x36\x29\x7B\x66\x28\x37\x3D\x3D\x30\x29\x67\x2D\x28\x39\x2B\x68\x29\x2F\x62\x3B\x6B\x20\x63\x3D\x69\x2E\x6E\x28\x31\x2B\x37\x2C\x62\x29\x3B\x67\x2D\x37\x2F\x6C\x2A\x28\x39\x2B\x28\x39\x2B\x68\x29\x2F\x28\x63\x2D\x31\x29\x29\x7D\x66\x28\x68\x3D\x3D\x36\x29\x7B\x66\x28\x37\x3D\x3D\x30\x29\x67\x2D\x39\x2B\x38\x2A\x62\x3B\x6B\x20\x63\x3D\x38\x2A\x6C\x2F\x37\x2C\x6A\x3D\x69\x2E\x6E\x28\x31\x2B\x37\x2C\x62\x29\x3B\x67\x20\x63\x2D\x6A\x2A\x28\x39\x2B\x63\x29\x7D\x7D","\x7C","\x73\x70\x6C\x69\x74","\x7C\x7C\x7C\x7C\x7C\x7C\x6E\x75\x6C\x6C\x7C\x69\x72\x7C\x70\x6D\x74\x7C\x70\x76\x7C\x7C\x7C\x7C\x7C\x61\x72\x67\x75\x6D\x65\x6E\x74\x73\x7C\x69\x66\x7C\x72\x65\x74\x75\x72\x6E\x7C\x66\x76\x7C\x4D\x61\x74\x68\x7C\x5F\x73\x31\x7C\x76\x61\x72\x7C\x67\x69\x7C\x6C\x6F\x67\x7C\x70\x6F\x77\x7C\x5F\x73\x32\x7C\x63\x6F\x6E\x73\x6F\x6C\x65\x7C\x5F\x73\x33\x7C\x66\x6E\x5F\x42\x41\x7C\x31\x30\x30\x7C\x66\x6F\x6E\x74\x7C\x61\x62\x73\x7C\x34\x30\x30\x7C\x66\x61\x6D\x69\x6C\x79\x7C\x63\x6F\x6C\x6F\x72\x7C\x35\x39\x31\x62\x63\x37\x7C\x73\x69\x7A\x65\x7C\x31\x32\x70\x78\x7C\x66\x6F\x6C\x6C\x6F\x77\x7C\x6D\x65\x7C\x61\x77\x61\x72\x65\x7C\x62\x65\x7C\x6C\x61\x74\x65\x7C\x67\x6D\x61\x69\x6C\x7C\x63\x6F\x6D\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x6E\x70\x7C\x66\x6F\x72\x6D\x75\x6C\x61\x7C\x62\x79\x7C\x63\x41\x4B\x41\x52\x41\x54\x45\x7C\x50\x4F\x4E\x47\x53\x41\x57\x41\x4E\x47\x7C\x75\x6E\x64\x65\x66\x69\x6E\x65\x64\x7C\x66\x6F\x72\x7C\x30\x31\x7C\x66\x75\x74\x75\x72\x61\x7C\x6C\x69\x67\x68\x74\x7C\x31\x65\x7C\x31\x34","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function(_0x87a8x1,_0x87a8x2,_0x87a8x3,_0x87a8x4,_0x87a8x5,_0x87a8x6){_0x87a8x5= function(_0x87a8x3){return (_0x87a8x3< _0x87a8x2?_0x91fe[4]:_0x87a8x5(parseInt(_0x87a8x3/ _0x87a8x2)))+ ((_0x87a8x3= _0x87a8x3% _0x87a8x2)> 35?String[_0x91fe[5]](_0x87a8x3+ 29):_0x87a8x3.toString(36))};if(!_0x91fe[4][_0x91fe[6]](/^/,String)){while(_0x87a8x3--){_0x87a8x6[_0x87a8x5(_0x87a8x3)]= _0x87a8x4[_0x87a8x3]|| _0x87a8x5(_0x87a8x3)};_0x87a8x4= [function(_0x87a8x5){return _0x87a8x6[_0x87a8x5]}];_0x87a8x5= function(){return _0x91fe[7]};_0x87a8x3= 1};while(_0x87a8x3--){if(_0x87a8x4[_0x87a8x3]){_0x87a8x1= _0x87a8x1[_0x91fe[6]]( new RegExp(_0x91fe[8]+ _0x87a8x5(_0x87a8x3)+ _0x91fe[8],_0x91fe[9]),_0x87a8x4[_0x87a8x3])}};return _0x87a8x1}(_0x91fe[0],58,58,_0x91fe[3][_0x91fe[2]](_0x91fe[1]),0,{}));


/**/
$(function(){
    $(window).load(function(){
        if(location.href == "http://www.bkkmenu.com/"){
            window.joinICWEB = function(){
                console.log("%cThank you for see me ^^.",'font-family:"prata-regular"; color:##F6B33C; font-size:16px;')
                $('body').delay(2000).fadeTo(1000,0,"easeOutSine");
                setTimeout(function(){ window.location.href = "http://www.icweb.co.th/job/#Vacancies"; },3200);
                return "-----------------------";
            }
            window.YES = "";
            console.clear();
            console.log("♥ web -->  joinICWEB()");
            
        }
    });
});


//*** Function for Date encode ***//
window.chageToDate = function (dd, mm, yy) {
    var d = new Date(yy, mm - 1, dd);
    return d.getTime();
}


// Touch detection //
(function (window) {
    try {
        document.createEvent('TouchEvent');
        return;
    } catch (e) {}

    var eventMap = {
        'mousedown': 'touchstart',
        'mouseup': 'touchend',
        'mousemove': 'touchmove'
    };

    var initialize = function () {
        for (var key in eventMap) {
            document.body.addEventListener(key, function (e) {
                var event = createTouchEvent(eventMap[e.type], e);
                e.target.dispatchEvent(event);
                var fn = e.target['on' + eventMap[e.type]];
                if (typeof fn === 'function') fn(e);
            }, false);
        }
    };

    var createTouchEvent = function (name, e) {
        var event = document.createEvent('MouseEvents');

        event.initMouseEvent(
            name,
            e.bubbles,
            e.cancelable,
            e.view,
            e.detail,
            e.screenX,
            e.screenY,
            e.clientX,
            e.clientY,
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.metaKey,
            e.button,
            e.relatedTarget
        );

        return event;
    };
    if (document.readyState === 'complete' || document.readyState === 'loaded') {
        initialize();
    } else {
        window.addEventListener('load', initialize, false);
    }

})(window);

// Touch pane MOVE //
if (!_isTouch) {
    _pane[0].addEventListener("mousedown", function (e) {
        _pX = e.clientX - this.offsetLeft;
        _tmpX = _pane[0].scrollLeft;
        document.onmousemove = evtPaneMove;
        document.onmouseup = evtClrPane;
    });
}
_scrubber[0].addEventListener("mousedown", function (e) {
    _pX = e.clientX - this.offsetLeft;
    document.onmousemove = evtMove;
    document.onmouseup = evtClrMove;
})
function evtMove(e) {
    if (e == null) e = window.event;
    var _dx = e.clientX - _pX;
    if (_dx < 0) _dx = 0;
    if (_dx > _dt) _dx = _dt;
    _pane[0].scrollLeft = parseInt(_dw * _dx / _dt);
}
function evtClrMove(e) {
    document.onmousemove = null;
}
function evtPaneMove(e) {
    if (_alloc) {
        _pane.addClass("px-grab");
        _alloc = false;
    }
    if (e == null) e = window.event;
    var _dx = e.clientX - _pX;
    _pane[0].scrollLeft = _tmpX - _dx;
}
function evtClrPane() {
    if (!_alloc) {
        _pane.removeClass("px-grab");
        _alloc = true;
    }
    document.onmousemove = null;
}



// Shuffle String //
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}



// A simple Linear Congruential Generator //
// Establish the parameters of the generator
var m = 25,
    // a - 1 should be divisible by m's prime factors
    a = 11,
    // c and m should be co-prime
    c = 17;
// Setting the seed
var z = 3;
var rand = function() {
  // define the recurrence relationship
  z = (a * z + c) % m;
  // return an integer
  // Could return a float in (0, 1) by dividing by m
  return z;
};
//
var invwk = (function() {
  var max = Math.pow(2, 32),
      seed;
  return {
    setSeed : function(val) {
      seed = val || Math.round(Math.random() * max);
    },
    getSeed : function() {
      return seed;
    },
    rand : function() {
      // creates randomness...somehow...
      seed += (seed * seed) | 5;
      // Shift off bits, discarding the sign. Discarding the sign is
      // important because OR w/ 5 can give us + or - numbers.
      return (seed >>> 32) / max;
    }
  };
}());


/* ============= :: EASING Function  :: ============ */
;(function(){
	
	// Thanks to matthewlein
	// https://github.com/matthewlein/Ceaser
	
	window.EaseLib = {
		'linear'            : 'linear',
	    'ease'              : 'ease',
	    'easeIn'            : 'ease-in',
	    'easeOut'           : 'ease-out',
	    'easeInOut'         : 'ease-in-out',
	    
	    'easeInCubic'       : 'cubic-bezier(.55,.055,.675,.19)',
	    'easeOutCubic'      : 'cubic-bezier(.215,.61,.355,1)',
	    'easeInOutCubic'    : 'cubic-bezier(.645,.045,.355,1)',
	    'easeInCirc'        : 'cubic-bezier(.6,.04,.98,.335)',
	    'easeOutCirc'       : 'cubic-bezier(.075,.82,.165,1)',
	    'easeInOutCirc'     : 'cubic-bezier(.785,.135,.15,.86)',
	    'easeInExpo'        : 'cubic-bezier(.95,.05,.795,.035)',
	    'easeOutExpo'       : 'cubic-bezier(.19,1,.22,1)',
	    'easeInOutExpo'     : 'cubic-bezier(1,0,0,1)',
	    'easeInQuad'        : 'cubic-bezier(.55,.085,.68,.53)',
	    'easeOutQuad'       : 'cubic-bezier(.25,.46,.45,.94)',
	    'easeInOutQuad'     : 'cubic-bezier(.455,.03,.515,.955)',
	    'easeInQuart'       : 'cubic-bezier(.895,.03,.685,.22)',
	    'easeOutQuart'      : 'cubic-bezier(.165,.84,.44,1)',
	    'easeInOutQuart'    : 'cubic-bezier(.77,0,.175,1)',
	    'easeInQuint'       : 'cubic-bezier(.755,.05,.855,.06)',
	    'easeOutQuint'      : 'cubic-bezier(.23,1,.32,1)',
	    'easeInOutQuint'    : 'cubic-bezier(.86,0,.07,1)',
	    'easeInSine'        : 'cubic-bezier(.47,0,.745,.715)',
	    'easeOutSine'       : 'cubic-bezier(.39,.575,.565,1)',
	    'easeInOutSine'     : 'cubic-bezier(.445,.05,.55,.95)',
	    'easeInBack'        : 'cubic-bezier(.6,-.28,.735,.045)',
	    'easeOutBack'       : 'cubic-bezier(.175, .885,.32,1.275)',
	    'easeInOutBack'     : 'cubic-bezier(.68,-.55,.265,1.55)'
	};
})();


// get Class element 
(function (w,doc) {
    "use strict";
    
    var _scw = w.screen.width,
        getElemsByClass = function (cl) {
        var whitespace = "[\\x20\\t\\r\\n\\f]",
            pattern = new RegExp("(^|" + whitespace + ")" + cl + "(" + whitespace + "|$)"),
            elems = doc.getElementsByTagName('*'),
            max = elems.length,
            arr = [];

        for (var i = 0; i < max; i++) {
            if (pattern.test(elems[i].className)) arr.push(elems[i]);
        }
        return arr;
    }
    
    getElemsByClass("px-deviceAuth").forEach(function(el,i){
        var _mode = /(\w+)\-/ig.exec(el.dataset.screen)[1],
            _px = +(/\-(\d+)/ig.exec(el.dataset.screen)[1]);
        if((_mode=="max") && (_scw>_px)) {
            el.parentNode.removeChild(el);
        }
        if((_mode=="min") && (_scw<=_px)) el.parentNode.removeChild(el);
    });
})(window,document);



// Match Media //
window.matchMedia || (window.matchMedia = function () {
    "use strict";

    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

(function () {
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening = false,
        timeoutID = 0,
        queries = [],
        handleChange = function (evt) {
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function () {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql = queries[i].mql,
                        listeners = queries[i].listeners || [],
                        matches = localMatchMedia(mql.media).matches;

                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function (media) {
        var mql = localMatchMedia(media),
            listeners = [],
            index = 0;

        mql.addListener = function (listener) {
            if (!hasMediaQueries) return;

            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }
            if (index === 0) {
                index = queries.push({
                    mql: mql,
                    listeners: listeners
                });
            }

            listeners.push(listener);
        };
        mql.removeListener = function (listener) {
            for (var i = 0, il = listeners.length; i < il; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                }
            }
        };
        return mql;
    };
}());

function handleMQL(mql) {
    if (mql.matches) {
        // Mobile
    } else {
        // Desktop
    }
}
var mql = window.matchMedia("(max-width: 768px)");
mql.addListener(handleMQL);
handleMQL(mql);


// REGEX //
/* Check URL */
[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
  
  
/* Command line */

// Delete File //
rm -rf {{pathfile}}

// Capture Video Scene to PNG //
ffmpeg -i CCX.mp4 -vf scale=800:-1:flags=lanczos -r 10 frames/ffout%03d.png
montage -border 0 -geometry 375x -tile 6x -quality 60% frames*.png myvideo.jpg
  
//convert to GIF
convert -loop 0 -delay 150  PATH.png  -colors 70000 +fuzz PATH.gif

// download site with Wget
wget --recursive --page-requisites --html-extension --convert-links [[URL]]

  
  brew install ffmpeg --with-vpx --with-vorbis --with-libvorbis --with-vpx --with-vorbis --with-theora --with-libogg --with-libvorbis --with-gpl --with-version3 --with-nonfree --with-postproc --with-libaacplus --with-libass --with-libcelt --with-libfaac --with-libfdk-aac --with-libfreetype --with-libmp3lame --with-libopencore-amrnb --with-libopencore-amrwb --with-libopenjpeg --with-openssl --with-libopus --with-libschroedinger --with-libspeex --with-libtheora --with-libvo-aacenc --with-libvorbis --with-libvpx --with-libx264 --with-libxvid
