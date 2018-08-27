
var MNGConst = {};

MNGConst.restTime = 2 * 60 * 60;

var crypto = require('crypto');

WXSdk.MNGConst = MNGConst;
 
MNGConst.appinfo = {
    appid:"wx1271gaycadc121",
    wxAppId: "wx1271gaycadc121",
    gameid:"100001",
    loginUrl:"",
    admsgUrl:"",
    shareUrl:"",
    version:"100",
    
};


MNGConst.delItem = function (key) {
    cc.sys.localStorage.removeItem(key);
    if (!tywx.isInWXChat)
        return;
    wx.removeUserCloudStorage({
        keyList: [key],
        success: (msg) => {
            console.log('removeObjectCloud  ' + key + ' succeeds', msg);
        },
        fail: (msg) => {
            console.log('removeObjectCloud  ' + key + ' fails', msg);
        },
    });
};

/**
 * * 保存数据到本地
 *
 * @static
 * @param {String} key 标识
 * @param {any} value
 * @param {boolean} only_local 是否只保存在本地,false的情况，上传到腾讯云
 * @returns
 */
MNGConst.saveItem = function (key, value, only_local) {
    value = value + '';
    cc.sys.localStorage.setItem(key, value);
    if (!tywx.isInWXChat)
        return;
    if (!only_local) {
        //FIXED: 做版本检测，版本低的会有黑屏
        if (wx.setUserCloudStorage) {
            wx.setUserCloudStorage({
                KVDataList: [{
                    key: key,
                    value: value
                }],
                success: (msg) => {
                    console.log('saveObjectToCloud  ' + key + ' succeeds', msg);
                },
                fail: (msg) => {
                    console.log('saveObjectToCloud  ' + key + ' fails', msg);
                },
            });
        }
    }
};

/**
 * * 加载保存在本地的数据
 *
 * @static
 * @param {String} key 标识
 * @param {any} default_value 默认值
 * @returns
 */
MNGConst.loadItem = function (key, default_value) {
    var v = cc.sys.localStorage.getItem(key);
    // console.log(key, 'v'+v);
    if (!v) {
        cc.sys.localStorage.setItem(key, default_value);
        return default_value;
    }
    return v;
};
/**
 * @description 分享到不同群限制
 * @author lu ning
 * @date 2018-08-22
 * @static
 * @param {String} tag 分享tag
 * @param {Object} result 分享返回值
 * @param {Function} success_cb 成功回调
 * @param {Function} fail_cb 失败回调
 * @returns
 */
MNGConst.share2GroupByTicket = function (tag, result, success_cb, fail_cb) {
    if (!result.shareTickets || !result.shareTickets[0]) return false;
    let call_succ = () => {
        if (success_cb) success_cb();
    };
    let call_fail = () => {
        if (fail_cb) fail_cb();
    };
    let ff = MNGConst;

    wx.getShareInfo({
        shareTicket: result.shareTickets[0],
        success: (res) => {
            console.log('isCanShare2GroupByTicket==>', res);
            try {
                let iv = res.iv;
                let encryptedData = res.encryptedData;
                let resultStr = ff.decrypt(tywx.UserInfo.wxgame_session_key, iv, encryptedData);
                console.log('resultStr==>', resultStr);
                if (resultStr && resultStr !== 0) {
                    let resultObj = JSON.parse(resultStr);
                    let id = `${tag}_${resultObj.openGId}`;
                    let t0 = parseInt(ff.loadItem(id, 0));
                    let tc = new Date().getTime();
                    console.log('isCanShare2GroupByTicket==>openGId', id, typeof id);
                    if (tc - t0 >= 24 * 60 * 60 * 1000) {
                        ff.saveItem(id, tc, true);
                        call_succ();
                    } else {
                        call_fail();
                    }
                } else {
                    call_fail();
                }

            } catch (e) {
                console.log("share::", e);
                call_fail();
            }
        },
        fail: () => {
            call_fail();
        }
    });
};

/**
 * @description 获取随机分享数据
 * @author lu ning
 * @date 2018-08-23
 * @static
 * @param {String} share_tag
 */
MNGConst.getRandomShareConfigByShareTag = function (share_tag) {
    let config = null;
    let tmp_arr = [];
    if (tywx.PropagateInterface.ShareConfig.hasOwnProperty(share_tag)) {
        tmp_arr = tywx.PropagateInterface.ShareConfig[share_tag];
        let rand_idx = parseInt(Math.random() * tmp_arr.length);
        config = tmp_arr[rand_idx];
    }
    return config;
};

MNGConst.decrypt = function (key, iv, crypted) {
    var decoded = 0;
    try {
        crypted = new Buffer(crypted, 'base64');
        iv = new Buffer(iv, 'base64');
        key = new Buffer(key, 'base64');

        var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        decipher.setAutoPadding(true);

        decoded = decipher.update(crypted, 'binary', 'utf8');
        decoded += decipher.final('utf8');
    } catch (err) {
        console.log("decrypt", " catch error: " + err);
    }
    return decoded;
};

/**
 * @description 
 * @author lu ning
 * @date 2018-08-24
 * @static
 * @param {String} msg
 * @param {number} [duration=1000]
 */
MNGConst.showWXToast = function (msg, duration = 1000) {
    if (wx.showToast) {
        wx.showToast({
            title: msg,
            icon: '',
            duration: duration
        });
    } else {
        cc.error('showWXToast error can not find function wx.showToast');
    }
};
/**
 * @description 显示模态窗
 * @author lu ning
 * @date 2018-08-24
 * @static
 * @param {String} content 显示内容
 * @param {String} [title='提示'] title
 * @param {boolean} [show_cancle=false]  是否显示取消
 * @param {Function} [sure_cb=null] 确定按钮回调
 * @param {Function} [cancle_cb=null] 取消按钮回调
 */
MNGConst.showWXModal = function (content, title = '提示', show_cancel = false, sure_cb = null, cancle_cb = null) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: show_cancel,
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定');
                sure_cb && sure_cb();
            } else if (res.cancel) {
                console.log('用户点击取消');
                cancle_cb && cancle_cb();
            }
        }
    });
};

module.exports = MNGConst;