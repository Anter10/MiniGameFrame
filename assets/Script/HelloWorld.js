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
    onLoad: function () {
        WXSdk.checkIsUserAdvisedToRest();
        WXSdk.onShow();
        WXSdk.onShareAppMessage();
        WXSdk.showShareMenu();
         
    },

    // called every frame
    update: function (dt) {

    },

    openXCX:function(){
        // WXSdk.openMiNiApp("wxd9dac6412c7dab7b");
         WXSdk.shareAppMessage();
    }
});
