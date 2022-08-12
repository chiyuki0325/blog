function qexo_friend_api(id, url) {
    qexo_url = url;
    var loadStyle = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">友链申请加载中...</p></div>';
    document.getElementById(id).className = "friend-api";
    document.getElementById(id).innerHTML = loadStyle;
    document.getElementById(id).innerHTML = '<center><p>请正确填写友链，然后点击申请等待核实，请先添加本站友链</p><div class="friend-api"><style>input.qexo-friend-input {flex: 1 1 0%;display: block;width: 100%;height: calc(1.5em + 1.25rem + 2px);padding: 0.625rem 0.75rem;font-weight: 400;color: #8898aa;box-shadow: 0 3px 2px rgb(233 236 239 / 5%);transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);overflow: visible;margin: 0;font-family: inherit;font-size: inherit;line-height: inherit;position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(0, 0, 0, 0.05);border-radius: 0.375rem;black;}button.qexo-friend-button {cursor: pointer;position: relative;text-transform: none;transition: all 0.15s ease;letter-spacing: 0.025em;font-size: 0.875rem;will-change: transform;color: #fff;background-color: #5e72e4;border-color: #5e72e4;box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);vertical-align: middle;cursor: pointer;user-select: none;border: 1px solid transparent;padding: 0.625rem 1.25rem;font-size: 0.875rem;line-height: 1.5;border-radius: 0.25rem;transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;}</style><input type="text" id="qexo_friend_name" class="qexo-friend-input" placeholder="网站名"><br><input type="text" id="qexo_friend_brief introduction" class="qexo-friend-input" placeholder="网站简介"><br><input type="text" id="qexo_friend_website" class="qexo-friend-input"  placeholder="网址"><br><input type="text" id="qexo_friend_logo" class="qexo-friend-input" placeholder="头像"><br><button type="button" class="qexo-friend-button" onclick="javascript:friend_api()">申请</button></div></center><br>';
}
function friend_api() {
    var name = document.getElementById('qexo_friend_name').value;
    var introduction = document.getElementById('qexo_friend_brief introduction').value;
    var website = document.getElementById('qexo_friend_website').value;
    var logo= document.getElementById('qexo_friend_logo').value;
    var uri = qexo_url + '/pub/ask_friend/';
    console.log('name='+encodeURIComponent(name)+'&url='+encodeURIComponent(website)+'&image='+encodeURIComponent(logo)+'&description='+encodeURIComponent(introduction));    
    var ajax;
    try {
        // Firefox, Opera 8.0+, Safari
        ajax = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("糟糕,你的浏览器不能上传文件!");
                return false;
            }
        }
    }
    ajax.open("post", uri);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send('name='+encodeURIComponent(name)+'&url='+encodeURIComponent(website)+'&image='+encodeURIComponent(logo)+'&description='+encodeURIComponent(introduction));
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var res = JSON.parse(ajax.response);
                if (res["status"]) {
                    alert("提交成功，请等待博主确认！我们不再提醒你结果，谢谢！");
                } else {
                    alert("友链申请失败 提示："+res["msg"]);
                }
            } else {
                alert("网络异常！");
            }
        }
    }
}
