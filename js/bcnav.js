/**
 * Created by bigezhang on 12/29/15.
 */

$(document).keydown(function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    $('.key.c' + key).addClass("keydown");
    if (key == 20) {
        $("#caps b").css("background", "#E9E91A");
    }
});

$(document).keyup(function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    $('.key.c' + key).removeClass("keydown");
    if (key == 20) {
        $("#caps b").css("background", "#999");
    }
});

var urlcache = {};

for (var i = 8; i <= 221; i++) {
    var code = String.fromCharCode(i);
    var v = localStorage.getItem('_' + code);
    if (v != null && v != '' && typeof(v) != 'undefined') {
        urlcache[code] = v;
        $("#LI_" + code).children("a").prepend('<img id="' + code + '"class="fav" src=" '+ getico(v) + ' "onerror="imgError(this)">');
    }
};

$(document).keyup(function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var code = String.fromCharCode(e.keyCode);
    $('.key.c' + key).removeClass("keydown");
    if (urlcache[code] == '' || typeof(urlcache[code]) == 'undefined') {
        $("#message").css("visibility", "visible");
        setTimeout('$("#message").css("visibility","hidden")', 2000);
    } else {
        window.open(urlcache[code]);
    }
});

$("#keyboard ul li").mouseenter(function () {
    if ($(this).attr('id')) {
      var t = $(this).attr('id').replace('LI_', '');
      $("#tempdata").val(t);
    }
    $(this).children("a").append('<div class="oper"><span class="delete"><a onclick="return del()" class="del" title="鍒犻櫎"><img src="images/delete_128.png"></a></span><span class="editd"><a onclick="return update()" class="edit" title="缂栬緫"><img src="images/edit_128.png"></a></span></div>');
}).mouseleave(function () {
    $("#tempdata").val('');
    $(".oper").remove();
});

$("#keyboard li").click(function () {
    if ($(this).attr('id')) {
      var code = $(this).attr('id').replace('LI_', '');
      if (urlcache[code] != '' && typeof(urlcache[code]) != 'undefined') {
          window.open(urlcache[code]);
      }
    }    
});

function del() {
    var code = $("#tempdata").val();
    urlcache[code] = '';
    $("#" + code).remove();
    localStorage.removeItem('_' + code);
    return false;
}

function update() {
    var code = $("#tempdata").val();
    var u = window.prompt("璇疯緭鍏ラ敭浣嶃€�" + code + "銆戝搴旂殑缃戠珯鍦板潃", "");
    if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1) {
        u = 'http://' + u;
    };
    if (!IsURL(u)) {
        alert('缃戠珯鍦板潃杈撳叆閿欒銆傝鏍稿銆�');
        return false;
    };
    urlcache[code] = u;
    $("#" + code).remove();
    $("#LI_" + code).children("a").prepend('<img id="' + code + '"class="fav" src=" '+ getico(u) + ' "onerror="imgError(this)">');
    localStorage.setItem('_' + code, u);
    return true;
}

function imgError(image) {
    var siteurl = localStorage.getItem('_' + image.id);
    image.onerror = "";
    image.src = "http://g.soz.im/"+ siteurl + "/cdn.ico";
    return true;
}

function getico(url) {
    var s = url.indexOf("//");
    var temp = url.substring(s + 2);
    var s1 = temp.indexOf("/");
    if (s1 == -1) {
        s1 = temp.length;
    };
    return url.substring(0, s1 + s + 2) + '/favicon.ico';

}

function setCookie(name, value, path, domain, secure) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + escape(value) + ((expdate) ? "; expires=" + expdate.toGMTString() : "") + "; path=/";
};

function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000));
    setCookie(name, "", expdate);
};

function getCookie(name) {
    var bikky = document.cookie;
    name += "=";
    var i = 0;
    while (i < bikky.length) {
        var offset = i + name.length;
        if (bikky.substring(i, offset) == name) {
            var endstr = bikky.indexOf(";", offset);
            if (endstr == -1) endstr = bikky.length;
            return decodeURIComponent(bikky.substring(offset, endstr));
        };
        i = bikky.indexOf(" ", i) + 1;
        if (i == 0) break;
    };
    return
};

function IsURL(str_url) {

    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
        "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" +
        "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

    var re = new RegExp(strRegex);
    return !!re.test(str_url);
};


