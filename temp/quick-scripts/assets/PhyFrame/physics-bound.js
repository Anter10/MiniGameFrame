(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/PhyFrame/physics-bound.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fcc70O9be1CAKXKj79ko7yC', 'physics-bound', __filename);
// PhyFrame/physics-bound.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0),
        mouseJoint: true
    },

    // use this for initialization
    onLoad: function onLoad() {
        var width = this.size.width || this.node.width;
        var height = this.size.height || this.node.height;

        var node = new cc.Node();

        var body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        if (this.mouseJoint) {
            // add mouse joint
            var joint = node.addComponent(cc.MouseJoint);
            joint.mouseRegion = this.node;
        }

        // 上
        this._addBound(node, 0, height / 2, width / 2, 10);
        // 下
        this._addBound(node, 0, -height / 2, width, 10);
        // 左
        this._addBound(node, -width / 2, 0, 10, height);
        // 右
        this._addBound(node, width / 2, 0, 10, height);

        this._addBound(node, width / 2, 450, 10, height);

        node.parent = this.node;
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        // let physicsManager = cc.director.getPhysicsManager();
        // physicsManager.enabled = true;

        // physicsManager.debugDrawFlags = 
        //     // 0;
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        //     ;
        // physicsManager.enabledAccumulator = true;
        this.gravity = physicsManager.gravity;
        physicsManager.gravity = cc.v2(0, -5);
        physicsManager.debugDrawFlags =
        // 0;
        // cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;

        console.log("width " + width + " height " + height + " gravity x = " + this.gravity.x + " y " + this.gravity.y);
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    _addBound: function _addBound(node, x, y, width, height) {
        var collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
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
        //# sourceMappingURL=physics-bound.js.map
        