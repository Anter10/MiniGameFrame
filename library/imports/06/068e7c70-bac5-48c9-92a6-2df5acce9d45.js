"use strict";
cc._RF.push(module, '068e7xwusVIyZKmLfWszp1F', 'Collider');
// PhyFrame/Collider.js

"use strict";

cc.Class({
    extends: cc.Component,

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {},

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {},

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function onPreSolve(contact, selfCollider, otherCollider) {},

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function onPostSolve(contact, selfCollider, otherCollider) {}
});

cc._RF.pop();