"use strict";
cc._RF.push(module, '6a0c4GXwbRKVq/o6WXxBEX+', 'goldcoin');
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