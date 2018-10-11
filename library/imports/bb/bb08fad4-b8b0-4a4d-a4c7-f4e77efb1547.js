"use strict";
cc._RF.push(module, 'bb08frUuLBKTaTH9Od++xVH', 'WebSocket');
// MGFrame/WebSocket.js

'use strict';

/**
 * 微信小程序下TCP长连接使用websocket实现
 */

var WebSocket = {
    TAG: "TCP client",
    CONNECT_STATUS_OK: 1,
    CONNECT_STATUS_OPENING: 2,
    CONNECT_STATUS_CLOSING: 3,
    CONNECT_STATUS_FAIL: 0,
    connectStatus: 0,
    isTimerInited: false,
    tickCount: 0,
    filterCmds: ['heart_beat'],

    /**
     * 该方法包含了心跳和tcp状态检查两项功能,结合connect中的逻辑,是一个无限重试的机制
     */
    timerSchedule: function timerSchedule() {
        WebSocket.tickCount = (WebSocket.tickCount + 1) % 3;
        if (WebSocket.tickCount == 2 && WebSocket.connectStatus == WebSocket.CONNECT_STATUS_OK) {
            //每3秒发送心跳
            //hall.MsgFactory.sendHeartBeat();
            //监听者进行具体的协议实现
            WXSdk.NotificationCenter.trigger(WXSdk.EventType.SEND_HEART_BEAT);
        }

        // 每1秒检查一下长连接，如果不通，则重连。
        WebSocket.reconnet();
    },

    startCheckTimer: function startCheckTimer() {
        WebSocket.isTimerInited = true;
        WXSdk.Timer.setTimer(cc.director, this.timerSchedule, 1);
    },

    stopCheckTimer: function stopCheckTimer() {
        WebSocket.isTimerInited = false;
        WXSdk.Timer.cancelTimer(cc.director, this.timerSchedule);
    },

    //以下为websocket连接相关方法
    connect: function connect(url) {
        WXSdk.BiLog.clickStat(WXSdk.clickStatEventType.clickStatEventTypeTCPStart, [url]);
        if (WebSocket.connectStatus == WebSocket.CONNECT_STATUS_OPENING || WebSocket.connectStatus == WebSocket.CONNECT_STATUS_OK) {
            return;
        }

        WebSocket.connectStatus = WebSocket.CONNECT_STATUS_OPENING;
        if (WXSdk.IsWechatPlatform()) {
            this.doWechatConnect(url);
        }
    },

    doWechatConnect: function doWechatConnect(url) {
        try {
            if (!WXSdk.IsWechatPlatform()) {
                return;
            }
            wx.connectSocket({
                url: url
            });

            wx.onSocketOpen(function (res) {
                WXSdk.LOGD(WebSocket.TAG, 'TCP webSocket opened...');
                WebSocket.connectStatus = WebSocket.CONNECT_STATUS_OK;

                WXSdk.NotificationCenter.trigger(WXSdk.EventType.TCP_OPENED);
                WXSdk.BiLog.clickStat(WXSdk.clickStatEventType.clickStatEventTypeTCPSuccess, [url]);
                if (!WebSocket.isTimerInited) {
                    //启动TCP的定时检查机制,成功连接1次后将永久进行检查
                    WebSocket.startCheckTimer();
                }
            });

            wx.onSocketError(function (res) {
                WXSdk.LOGD(WebSocket.TAG, 'TCP webSocket error...');
                WXSdk.BiLog.clickStat(WXSdk.clickStatEventType.clickStatEventTypeTCPFailed, [url]);

                WebSocket.connectStatus = WebSocket.CONNECT_STATUS_FAIL;
                WXSdk.NotificationCenter.trigger(WXSdk.EventType.TCP_ERROR);
            });

            wx.onSocketClose(function (res) {
                WXSdk.LOGD(WebSocket.TAG, 'WebSocket 已关闭！');
                WebSocket.connectStatus = WebSocket.CONNECT_STATUS_FAIL;
                WXSdk.NotificationCenter.trigger(WXSdk.EventType.TCP_CLOSE);
            });

            wx.onSocketMessage(function (res) {
                if (!WXSdk.StateInfo.isOnForeground) {
                    //在后台不处理消息
                    return;
                }
                // 处理长连接的消息
                var content = WebSocket.decodeMessage(res["data"]);
                if (content == null || content == '0000') {
                    return;
                }

                var msgStr = "[Receive TCP Msg]: " + unescape(content.replace(/\\u/gi, '%u'));
                var strJson = content.substr(0, content.length - 0);
                if (strJson != null && strJson.length > 0) {
                    var _json = JSON.parse(strJson);
                    if (WebSocket.filterCmds.indexOf(_json.cmd) == -1) {
                        WXSdk.LOGD(WebSocket.TAG, msgStr);
                    }

                    WXSdk.NotificationCenter.trigger(WXSdk.EventType.TCP_RECEIVE, _json);
                }
            });
        } catch (err) {
            WXSdk.LOGE("error:", "WebSocket.doWechatConnect——" + JSON.stringify(err));
        }
    },

    decodeMessage: function decodeMessage(data) {
        if (typeof ArrayBuffer != 'undefined' && data instanceof ArrayBuffer) {
            var databytes = new Uint8Array(data);
            var content = '';
            for (var i = 0, len = databytes.length; i < len; i++) {
                var tmpc = String.fromCharCode(databytes[i]);
                content += tmpc;
            }
            return content;
        }
        var data = WXSdk.EncodeDecode.base64Decode(data);
        var mask = data.slice(0, 4);
        data = data.slice(4);
        for (var i = 0, len = data.length; i < len; i++) {
            var charcode = data[i];
            charcode ^= mask[i % 4];
            data[i] = charcode;
        }
        var result = WXSdk.EncodeDecode.utf8Decode(data);
        return result;
    },

    reconnet: function reconnet() {
        if (!WXSdk.StateInfo.isOnForeground) {
            //在后台不重连(IOS会出问题)
            return;
        }
        if (WebSocket.connectStatus == WebSocket.CONNECT_STATUS_FAIL) {
            WXSdk.NotificationCenter.trigger(WXSdk.EventType.TCP_RECONNECT);
            WebSocket.connect(WXSdk.SystemInfo.webSocketUrl);
        }
    },

    sendMsg: function sendMsg(data) {
        try {
            if (WebSocket.connectStatus != WebSocket.CONNECT_STATUS_OK) {
                return;
            }

            var msgStr = JSON.stringify(data);
            if (WebSocket.filterCmds.indexOf(data.cmd) == -1) {
                WXSdk.LOGD(WebSocket.TAG, 'TCP sendMsg:' + msgStr);
            }

            if (WXSdk.IsWechatPlatform()) {
                wx.sendSocketMessage({
                    data: msgStr,
                    success: function success(params) {
                        WXSdk.LOGD(WebSocket.TAG, 'TCP sendMsg success:' + JSON.stringify(params));
                    },

                    fail: function fail(params) {
                        var errMsg = params[0];
                        if (errMsg && errMsg['errMsg'] === 'sendSocketMessage:fail taskID not exist') {
                            wx.closeSocket();
                            WebSocket.connectStatus = WebSocket.CONNECT_STATUS_FAIL;
                        }
                        WXSdk.LOGD(WebSocket.TAG, 'TCP sendMsg fail:' + JSON.stringify(arguments));
                    },

                    complete: function complete(params) {}
                });
            }
        } catch (err) {
            WXSdk.LOGE("error:", "WebSocket.sendMsg——" + JSON.stringify(err));
        }
    },

    close: function close() {
        try {
            WebSocket.connectStatus = WebSocket.CONNECT_STATUS_CLOSING;
            if (WXSdk.IsWechatPlatform()) {
                wx.closeSocket();
            }
            WebSocket.stopCheckTimer();
            WXSdk.LOGD(WebSocket.TAG, 'TCP close..............');
        } catch (err) {
            WXSdk.LOGE("error:", "WebSocket.close——" + JSON.stringify(err));
        }
    }
};

cc._RF.pop();