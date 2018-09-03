(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/phyprefabs/goldcoin.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a0c4GXwbRKVq/o6WXxBEX+', 'goldcoin', __filename);
// phyprefabs/goldcoin.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    setLabel: function setLabel(str) {
        this.label.string = str;
    },

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {
        this.setLabel("x = " + parseInt(this.node.x) + " y =" + parseInt(this.node.y));
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=goldcoin.js.map
        