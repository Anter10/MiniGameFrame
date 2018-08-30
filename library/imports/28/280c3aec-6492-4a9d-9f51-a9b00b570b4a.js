"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {

        WXSdk.checkIsUserAdvisedToRest();
        WXSdk.onShow();
        WXSdk.onShareAppMessage();
        WXSdk.showShareMenu();
    },

    // called every frame
    update: function update(dt) {},

    openXCX: function openXCX() {
        // WXSdk.openMiNiApp("wxd9dac6412c7dab7b");
        WXSdk.shareAppMessage();
    }
});

cc._RF.pop();