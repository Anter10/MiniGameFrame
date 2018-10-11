
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
    if (!WXSdk.isInWXChat)
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
    if (!WXSdk.isInWXChat)
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


/**
 * @description 显示游戏圈
 * @author lu ning
 * @date 2018-09-05
 * @static
 */
MNGConst.showGameClub = function() {
    if (!GameClubBtn && wx.createGameClubButton) {
        GameClubBtn = wx.createGameClubButton({
            icon: 'green',
            style: {
                left: 10,
                top: 30,
                width: 40,
                height: 40
            }
        });
    }
    GameClubBtn.show();
}
/**
 * @description 隐藏游戏圈
 * @author lu ning
 * @date 2018-09-05
 * @static
 */
MNGConst.hideGameClub = function() {
    if (GameClubBtn) {
        GameClubBtn.hide();
    }
}

/**
 * @description 创建并显示微信Banner广告, IsHideBanner=false到时候创建成功也不会显示
 * @author lu ning
 * @date 2018-09-06
 * @static
 * @returns
 */
MNGConst.createAndcreateAndShowWXBanner = function() {
    if (!window.wx) return; //! 防止浏览器中报错
    if (!wx.createBannerAd) return; //! 玩家基础库不支持
    MNGConst.destroyWXBanner();
    let sys_info = wx.getSystemInfoSync();
    let s_w = sys_info.screenWidth;
    let s_h = sys_info.screenHeight; // 220
    // ! 强制适配,主要是ipx有问题
    let is_ipx = tywx.ado.Utils.isIpx();
    // ! 强制适配 pad(宽屏设备)
    let is_pad = tywx.ado.Utils.isPad();
    WXBannerAD = wx.createBannerAd({
        adUnitId: tywx.ado.Constants.WXAdConfig.bannerId,
        style: {
            left: 0,
            top: 0,
            width: is_ipx ? s_w * 0.88 : (is_pad ? s_w * 0.6 : s_w * 0.95)
        }
    });

    try {
        WXBannerAD.onResize(function (res) {
            console.log('showBannerAd', '当前banner,width:' + res.width + "; height:" + res.height);
            if (WXBannerAD) {
                let top = s_h - res.height - 5; //is_ipx ? s_h - res.height + 50 : s_h - res.height - 5;
                WXBannerAD.style.left = (s_w - res.width) / 2;
                WXBannerAD.style.top = top;
                //res.width             = is_ipx ? s_w * 0.8 : s_w * 0.9;
                //res.height            = s_h * 0.13;
            }
        });
    } catch (e) {
        console.log(e);
    }
    // * 隐藏状态不显示banner
    if (WXBannerAD && !IsHideBanner) WXBannerAD.show();
}
/**
 * @description 隐藏Banner广告,隐藏后，若需要显示，必须调用showWXBanner()
 * @author lu ning
 * @date 2018-09-06
 * @static
 */
MNGConst.hideWXBanner = function() {
    if (WXBannerAD) {
        WXBannerAD.hide();
    }
    IsHideBanner = true;
}
/**
 * @description 显示Banner广告
 * @author lu ning
 * @date 2018-09-06
 * @static
 */
MNGConst.showWXBanner = function() {
    if (WXBannerAD) {
        WXBannerAD.show();
    }
    IsHideBanner = false;
}
/**
 * @description 销毁Banner
 * @author lu ning
 * @date 2018-09-06
 * @static
 */
MNGConst.destroyWXBanner= function() {
    if (WXBannerAD) {
        WXBannerAD.hide();
        WXBannerAD.destroy();
        WXBannerAD = null;
    }
}
/**
 * @description 显示视频广告
 * @author lu ning
 * @date 2018-09-06
 * @static
 * @param {Object} params
 * @param {Function} params.success
 * @param {Function} params.fail
 * @param {Function} params.error_callback
 */
MNGConst.showWXVideo = function(params) {
    if (!window.wx) return; //! 防止浏览器中报错
    if (!wx.createRewardedVideoAd) return; //! 玩家基础库不支持
    if (!WXVedioAD) {
        WXVedioAD = wx.createRewardedVideoAd({
            adUnitId: MNGConst.vedioId
        });
        WXVedioAD.onClose(res => {
            let toast_str = '';
            if (res && res.isEnded || res === undefined) {
                toast_str = '视频观看成功';
                WXVedioCallback.success && WXVedioCallback.success();
            } else {
                toast_str = '视频观看失败';
                WXVedioCallback.fail && WXVedioCallback.fail();
            }
            // tywx.ado.Utils.showWXModal(`${toast_str}`);
            MNGConst.showWXBanner();
        });
    }
    // * 成功和失败回调是变化的
    WXVedioCallback.success = params.success;
    WXVedioCallback.fail = params.fail;
    WXVedioCallback.err_cb = params.error_callback || null;


    WXVedioAD.load().then(() => WXVedioAD.show()).catch(e => {
        console.log(e);
        let lucky_rate = MNGConst.LuckyUserRate || 50;
        if (Math.random() * 100 <= lucky_rate) {
            WXVedioCallback.err_cb && WXVedioCallback.err_cb();
        } else {
            MNGConst.showWXModal("获取视频失败");
        }
    });
    MNGConst.hideWXBanner();
}

module.exports = MNGConst;
