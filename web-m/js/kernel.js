var globalData = [];
var debug = true;
(function() {
    setTimeout(function () {
        var v = '0.0.1';
        var _v = localStorage.getItem('_G_version');
        if (v != _v || debug) {
            localStorage.clear();
            localStorage.setItem('_G_version', v);
        }
        // init javascript,css resource
        var _init_js = '', _init_css = '';
        _init_js += _LOAD('/js/layer/layer.js');
        _init_css += _LOAD('/css/common.css');
        _init_css += _LOAD('/js/layer/need/layer.css');
        $('body').append('<script id="init-js" type="text/javascript">' + _init_js + '</script>');
        $('head').append('<style id="init-css" type="text/css">' + _init_css + '</style>');
        var _url = _GET('url');
        history.pushState({url: '/index'}, "wordpress", location.protocol + '//' + location.host + '/?url=/index');
        _url = _url != null ? _url : '/index';
        openActivity(_url, true);
        window.addEventListener("popstate", function () {
            var _url = _GET('url');
            _url = _url != null ? _url : '/index';
            openActivity(_url, false);
        });
    }, 100);
})()

function _LOAD(_url) {
    var _res = localStorage.getItem(_url);
    if (_res === null) {
        $.ajax({
            type: "GET",
            url: location.protocol + '//' + location.host + _url,
            async: false,
            dataType: "html",
            success: function (res) {
                localStorage.setItem(_url, res);
            }
        });
        _res = localStorage.getItem(_url);
    }
    return _res;
}

function _HANDLE_HTML(_html, _href, push) {
    var $mactivity = $('#main-activity');
    if ($mactivity.length == 0) {
        $('body').prepend('<div id="main-activity"></div>');
        $mactivity = $('#main-activity');
    }
    var cur_url = $mactivity.attr('current-url');
    if (cur_url !== undefined && cur_url !== '') {
        $('.activity').attr('scroll', $(window).scrollTop());
        localStorage.setItem(cur_url, $mactivity.html());
    }
    $html = $(_html);
    var _css = '';
    var $css = $html.find('.css');
    $css.each(function () {
        var src = $(this).val();
        var _res = _LOAD(src);
        if (_res !== null)
            _css += _res;
    });
    if ($('#css').length == 0)
        $('head').append('<style id="css" type="text/css"></div>');
    $('#css').text(_css);
    var _js = '';
    var $js = $html.find('.javascript');
    $js.each(function () {
        var src = $(this).val();
        var _res = _LOAD(src);
        if (_res !== null)
            _js += _res;
    });
    $('#javascript').remove();
    $('body').append('<script id="javascript" type="text/javascript">' + _js + '</script>');
    var _fun = $html.attr('before');
    if (_fun !== undefined && _fun !== '')
        exeFun(_fun, $html);
    $mactivity.attr('current-url', _href);
    $mactivity.html(_html);
    var _p = $('.activity').attr("scroll") == undefined ? 0 : $('.activity').attr("scroll");
    $(window).scrollTop(_p);
    var _fun = $html.attr('complete');
    if (_fun !== undefined && _fun !== '')
        exeFun(_fun, $html);
    $('[role="activity"]').each(function () {
        var _href = $(this).attr('data-href');
        listenerTouch(this, 'openActivity("' + _href + '", true)');
    });
    $('[role="goback"]').each(function () {
        listenerTouch(this, 'goBack()');
    });
    var _c = _href.split("?");
    _href = _c[0];
    if (push) {
        var _url = '?url=' + _href;
        if (_c[1] != undefined)
            _url += '&' + _c[1];
        var _getArgs = getArgs();
        for (var _get in _getArgs) {
            if (_get != 'url')
                _url += '&' + _get + '=' + _getArgs[_get];
        }
        var _title = $('.activity').attr('title');
        _title = _title != undefined && _title != '' ? _title : 'wordpress';
        history.pushState({url: _href}, _title, location.protocol + '//' + location.host + '/' + _url);
    }
}

function _GET(param) {
    var _getArgs = getArgs();
    if (_getArgs[param] !== undefined && _getArgs[param] != '')
        return _getArgs[param];
    return null;
}

function getArgs() {
    var args = {};
    var query = location.search.substring(1);
    // Get query string
    var pairs = query.split("&");
    // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=");
        // Look for “name=value”
        if (pos == -1)
            continue;
        // If not found, skip
        var argname = pairs[i].substring(0, pos);// Extract the name
        var value = pairs[i].substring(pos + 1);// Extract the value
        value = decodeURIComponent(value);// Decode it, if needed
        args[argname] = value;
        // Store as a property
    }
    return args; // Return the object 
}

function openActivity(_href, push) {
    var _i;
    layer.open({type: 2, shadeClose: false, success: function (elem) {
            _i = $(elem).attr('index');
        }});
    var _html = _LOAD((debug ? '/app_dev.php' : '') + _href);
    _HANDLE_HTML(_html, _href, push);
    setTimeout(function () {
        layer.close(_i);
    }, 100);
}

function listenerTouch(obj, callFun) {
    if (obj.listened === undefined) {
        obj.addEventListener('touchstart', touch, false);
        obj.addEventListener('touchmove', touch, false);
        obj.addEventListener('touchend', touch, false);
        obj.listened = true;
    }
    function touch(event) {
        var event = event || window.event;
        switch (event.type) {
            case "touchstart":
                $(obj).addClass('active');
                obj.time1 = (new Date()).valueOf();
                obj.time2 = undefined;
                obj.exe = true;
                break;
            case "touchend":
                $(obj).removeClass('active');
                obj.time2 = obj.time2 === undefined ? (new Date()).valueOf() : obj.time2;
                if (obj.time2 - obj.time1 < 266 && obj.exe) {
                    exeFun(callFun, obj);
                }
                break;
            case "touchmove":
                $(obj).removeClass('active');
                obj.exe = false;
                break;
        }
    }
}

// 执行函数
function exeFun(f, obj) {
    if (typeof f === 'function') {
        f(obj);
    } else if (typeof f === 'string') {
        try {
            eval(f);
        } catch (e) {
            delayExeFun(f, 1000, 8);
        }
    }
}

// 延迟执行{f:function,ms:millisec,t:times}
function delayExeFun(f, ms, t) {
    setTimeout(function () {
        t--;
        try {
            if (typeof f === 'function') {
                f();
            } else if (typeof f === 'string') {
                eval(f);
            }
        } catch (e) {
            if (t > 0)
                delayExeFun(f, ms, t);
        }
    }, ms)
}

// 返回上一页
function goBack() {
    window.history.back();
}

// 保存数据，便于activity之间传递数据
function setGData(arr) {
    var key;
    for (key in arr) {
        globalData[key] = arr[key];
    }
}

// 获取数据
function getGData(key) {
    if (globalData[key] === undefined)
        return null;
    return globalData[key];
}

// 删除数据
function deleteGData(key) {
    if (globalData[key] !== undefined)
        delete globalData[key];
}