var session = new IFlyTtsSession({
    'url': 'http://webapi.openspeech.cn/',
    'interval': '30000',
    'disconnect_hint': 'disconnect',
    'sub': 'tts'
});
var audio = null;

/**
 * 输入文本，输出语音播放链接
 * @content 待合成文本(不超过4096字节)
 */
function play(content) {
    /***********************************************************以下签名过程需根据实际应用信息填入***************************************************/

    var appid = "54c88b8d";                              //应用APPID，在open.voicecloud.cn上申请即可获得
    var timestamp = new Date().toLocaleTimeString();                      //当前时间戳，例new Date().toLocaleTimeString()
    var expires = 60000;                          //签名失效时间，单位:ms，例60000
    //!!!为避免secretkey泄露，签名函数调用代码建议在服务器上完成
    var signature = faultylabs.MD5(appid + '&' + timestamp + '&' + expires + '&' + "6a97bfd7fa4531f7");
    /************************************************************以上签名过程需根据实际应用信息填入**************************************************/

    var params = {
        "params": "aue = speex-wb;7, ent = intp65,vcn=xiaoyan, spd = 50, vol = 50, tte = utf8, caller.appid=" + appid + ",timestamp=" + timestamp + ",expires=" + expires,
        "signature": signature,
        "gat": "mp3"
    };

    if (window.stats == null) {
        window.stats = new Object;
    }
    window.stats[content] = false;
    setTimeout(function(){
        if(!window.stats[content]) {
            play(content);
        } else{
            delete  window.stats[content]  ;
        }
    }, 5000);
    session.start(params, content, function (err, obj) {

        if (err) {
            alert("语音合成发生错误，错误代码 ：" + err);
        } else {
            window.stats[content] = true;
            if (audio != null) {
                audio.pause();
            }
            audio = new Audio();
//					audio.src = '';
//	                audio.play();
            audio.src = "http://webapi.openspeech.cn/" + obj.audio_url;
            audio.play();
        }
    });
};

//play("今天的天气怎么样，我们一起去爬山吧.");
