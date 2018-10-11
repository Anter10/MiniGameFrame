/**
 * 微信小游戏的微信API设置
 */
 
window.WXSdk = {};
 

/**
 * 日志相关方法,若不符合项目组标准,可自行进行扩展
 */
WXSdk.LOGD = function (tag, msg) {
    tag = tag || "tywx";
    var logStr = tag + ' : ' + msg;
    // tywx.LOGE(logStr);
};

WXSdk.LOGE = function (tag, msg) {
    tag = tag || "tywx";
    var logStr = tag + ' : ' + msg;
    // console.error(logStr);
};

WXSdk.IsWechatPlatform = function () {
    try {
        wx && wx.showShareMenu();
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * 得到当前用户完游戏的时间  判断用户是否需要休息了
 */
WXSdk.checkIsUserAdvisedToRest = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.checkIsUserAdvisedToRest({
            todayPlayedTime: WXSdk.MNGConst.restTime,
            success: function (res) {
                console.log("当前用户玩游戏的时间 = " + res.result);
                WXSdk.login();
            },
            fail: function (err) {

            },
        });
    }
};

/**
 * 用户微信登陆
 * 登陆成功获得用户的微信信息
 */
WXSdk.login = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.login({
            success: function (res) {
                console.log("当前用户登陆得到的code = " + res.code);
                // 向服务器请求登陆

            },
            fail: function (res) {

            },
            complete: function (res) {

            }
        });
    }
};


/** 
 * 打开微信小程序
 */

WXSdk.openMiNiApp = function (openAppid) {
    if (WXSdk.IsWechatPlatform()) {
        wx.navigateToMiniProgram({
            //要打开的小程序 appId
            appId: openAppid,
            // 打开的页面路径，如果为空则打开首页
            path: "index",
            // 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
            extraData: WXSdk.MNGConst.appinfo,
            success: function (object) {
                //    develop 开发版
                //    trial 体验版
                //    release 正式版
                console.log("当前打开的微信的版本= " + object.envVersion);
            },
            error: function (res) {

            },
            complete: function (res) {

            },
        });
    }
};


WXSdk.onHide = function () {
    wx.onHide(function (data) {
        console.log("微信切换后台");
    });
};

WXSdk.onShow = function () {
    wx.onShow(function (data) {
        console.log("微信显示前台");
    });
};


/**
 * 
 * 监听音频因为受到系统占用而被中断开始， 以下场景会触发此事件： 闹钟、 电话、 FaceTime 通话、 微信语音聊天、 微信视频聊天。 此事件触发后， 小程序内所有音频会暂停。
 */
WXSdk.onAudioInterruptionBegin = function () {
    wx.onAudioInterruptionBegin(function (data) {
        console.log("小程序声音被打断回调");
    });
};

/**
 * 监听音频中断结束， 在收到 onAudioInterruptionBegin 事件之后， 小程序内所有音频会暂停， 收到此事件之后才可再次播放成功
 * 
 */
WXSdk.onAudioInterruptionEnd = function () {
    wx.onAudioInterruptionEnd(function (data) {
        console.log("小程序声音被打断回调");
    });
};

/**
 * 监听全局错误事件
 */
WXSdk.onError = function () {
    wx.onError(function (data) {
        // data.message string 错误
        // data.stack string 错误调用堆栈
        console.log("小程序声音被打断回调");
    });
};



/**
 *  
 * 获取当前的地理位置、 速度。 当用户离开小程序后， 此接口无法调用； 当用户点击“ 显示在聊天顶部” 时， 此接口可继续调用。
 * // type: wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
 */
WXSdk.getLocation = function () {
    wx.getLocation({
        type: "gcj02",
        altitude: "false",
        success: function (res) {
            // latitude number 纬度， 范围为 - 90~90， 负数表示南纬
            // longitude number 经度， 范围为 - 180~180， 负数表示西经
            // speed number 速度， 单位 m / s
            // accuracy number 位置的精确度
            // altitude number 高度， 单位 m
            // verticalAccuracy number 垂直精度， 单位 m（ Android 无法获取， 返回 0）
            // horizontalAccuracy number 水平精度， 单位 m
            console.log("小程序的位置信息" + JSON.stringify(res));
        },
        fail: function (res) {

        },
        complete: function (res) {

        }

    });
};



/**
 * wx.setClipboardData(Object object)
 * 
 */

WXSdk.getBattleLevel = function () {
    wx.getBatteryInfo({
        success: function (data) {
            // level string 设备电量， 范围 1 - 100
            // isCharging boolean	是否正在充电中
        },
    });
}

/**
 * 
 * 
 */
WXSdk.getBattleLevel = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.getBatteryInfo({
            success: function (data) {
                // level string 设备电量， 范围 1 - 100
                // isCharging boolean	是否正在充电中
            },
        });
    }

};

/**
 * 设置系统剪贴板的内容
 * 
 */
WXSdk.getBattleLevel = function (data) {
    if (WXSdk.IsWechatPlatform()) {
        wx.setClipboardData({
            data: data,
            success: function (err) {

            }
        });
    }
};

/**
 * 获取系统剪贴板的内容
 * 
 */
WXSdk.getBattleLevel = function (data) {
    if (WXSdk.IsWechatPlatform()) {
        wx.getClipboardData({
            success: function (res) {
                console.log("粘贴板的数据 = " + res.data);
            },
            fail: function (res) {

            },
            complete: function (res) {

            },

        });
    }
};


/**
 * 
 * @param {*} onlyFromCamera 
 * @param {*} success 
 * @param {*} error 
 */
WXSdk.scanCode = function (onlyFromCamera = true, success, error) {
    wx.scanCode({
        onlyFromCamera: onlyFromCamera,
        success: (res) => {
            // result 所扫码的内容
            // scanType 所扫码的类型
            // charSet 所扫码的字符集
            // path 当所扫的码为当前小程序的合法二维码时， 会返回此字段， 内容为二维码携带的 path
            // rawData 原始数据， base64编码
            console.log("扫码成功的数据 = " + res)
            success && success(res);
        },
        fail: (res) => {
            console.log(res);
            error && error(res);
        }
    });
};

/**
 * 
 * @param {Required} phoneNumber 
 * @param {options} success 
 * @param {options} error 
 */
WXSdk.callPhone = function (phoneNumber, success, error) {
    wx.makePhoneCall({
        phoneNumber: phoneNumber, //仅为示例，并非真实的电话号码,
        success: (res) => {
            success && success(res);
        },
        error: (res) => {
            error && error(res);
        }
    });
};


/**
 * 这样设置后分享群才能得到sharetticket
 */
WXSdk.showShareMenu = function () {
    console.log("Helloc");
    if (WXSdk.IsWechatPlatform()) {
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
 
            }
        });
        wx.updateShareMenu({
            withShareTicket: true
        });
    }

}


WXSdk.onShow = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.onShow((res) => {
            console.log("进入小游戏的数据 = " + JSON.stringify(res));
        });
    }
};


/** 
 * 主动拉起转发， 进入选择通讯录界面。
 */
WXSdk.shareAppMessage = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.shareAppMessage({
            title: "title",
            imageUrl: "https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png",
            query: "sharepoint=" + "sharepoint123456" + "&shareschemeId=手动分享" + 15010215839,
            success: (res) => {
                console.log("主动分享成功回调 11 = " + JSON.stringify(res));
                 if (res.shareTickets) {
                     WXSdk.dealShareCallBackData(res);
                 } else {
                     console.log("分享给了好友");
                 }
                 
            },
            fail: (res) => {
                console.log("主动分享失败回调" + JSON.stringify(res));
            }
        });
    }
};


/** 
 * 主动拉起转发， 进入选择通讯录界面。
 */
WXSdk.onShareAppMessage = function () {
    if (WXSdk.IsWechatPlatform()) {
        wx.onShareAppMessage((res) => {
            return {
                title: "筒子二八",
                imageUrl: "",
                query: "sharepoint=" + "sharepoint123456" + "&shareschemeId=菜单分享" + 15010215839,
                success: (res) => {
                    console.log("菜单分享成功回调 22 = " + JSON.stringify(res));
                    if (res.shareTickets) {
                        WXSdk.dealShareCallBackData(res);
                    }else{
                        console.log("分享给了好友");
                    }
                },
                fail: (res) => {
                    console.log("菜单分享失败回调" + JSON.stringify(res));
                }
            }
        });
    }
};

WXSdk.dealShareCallBackData = function (result) {
    let constmng = WXSdk.MNGConst;
    wx.getShareInfo({
        shareTicket: result.shareTickets[0],
        success: (res) => {
            console.log('分享成功的数据  = ', res);
            try {
                let iv = res.iv;
                let encryptedData = res.encryptedData;
                // let resultStr = constmng.decrypt(tywx.UserInfo.wxgame_session_key, iv, encryptedData);
                // console.log('resultStr==>', resultStr);
            } catch (e) {

            }
        },
        fail:(res)=>{
            console.log('分享失败的数据 = ', JSON.stringify(res));
        }

    });
};

//全局的事件监听模块，可用于对象之间的消息传递，所以没有提供构造函数
 
WXSdk.NotificationCenter = {
    events: {},
    listen: function (eName, handler, scope) {
        this.events[eName] = this.events[eName] || [];
        this.events[eName].push({
            scope: scope || this,
            handler: handler
        });
    },

    ignore: function (eName, handler, scope) {
        scope = scope || this;
        var fns = this.events[eName];

        if (!fns)
            return;

        this.events[eName] = fns.filter(function (fn) {
            return fn.scope != scope || fn.handler != handler
        });
    },

    ignoreScope: function (scope) {
        for (var msg in this.events) {
            var obs = this.events[msg];
            if (obs) {
                this.events[msg] = obs.filter(function (fn) {
                    if (fn.scope != scope) {
                        return true;
                    } else {
                        tywx.LOGD('tywx.NotificationCenter', 'ty.NotificationCenter : remove listener by Scope: ' + msg);
                        return false;
                    }
                })
            }
        }
    },

    trigger: function (eventName, params) {
        tywx.LOGD("EventTrigger", eventName);
        var fns = this.events[eventName];
        if (!fns) {
            return;
        }

        var fn;

        for (var i = 0; i < fns.length; i++) {

            fn = fns[i];
            // fn.handler.apply(fns.scope, params||[]);
            // 用call直接把各个参数回调出去
            fn.handler.call(fn.scope, params)
        }
    }
};