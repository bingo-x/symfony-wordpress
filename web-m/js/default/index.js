function init(){
    $('#left-menu').each(function(){
        listenerTouch(this, leftMenu);
    });
    $('#right-menu').each(function(){
        listenerTouch(this, rightMenu);
    });
    $('.loadbtn').each(function(){
        listenerTouch(this, test);
    });
    $('.content-mode').each(function(){
        listenerTouch(this, test);
    });
}

function test(){
    
}

function leftMenu() {
    var txt = '';
    txt += '<div class="left-menu">';
    txt += '<div class="avatar"><img src="http://wx.qlogo.cn/mmopen/PiajxSqBRaEJrHDTjDuqmTTOVMr2S7EPaAMT0uZJca9jStVA3iaAI5Sh99RM1OIBcZUwIJnNNEuSynpib5mtBGKng/132" /></div>';
    txt += '<div class="f15 nickname">bibom</div>';
    txt += '<div class="f12 level">广西朗智科技网络有限公司[超级管理员]</div>';
    txt += '</div>';
    layer.open({
        type: 1,
        content: txt,
        anim: 0,
        style: 'position:fixed; top:0; left:0; width:78%; height:100%; border:none;'
    });
}

function rightMenu() {
    var txt = '';
    txt += '<div class="right-menu">';
    txt += '<div class="s-m">帮助</div>';
    txt += '<div class="s-m">关于</div>';
    txt += '</div>';
    layer.open({
        type: 1,
        content: txt,
        anim: 0,
        style: 'position:fixed; top:15px; right:15px; width:150px; border:none;border-radius:2px'
    });
}