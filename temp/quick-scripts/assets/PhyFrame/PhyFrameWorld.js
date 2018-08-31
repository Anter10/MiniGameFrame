(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/PhyFrame/PhyFrameWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f88ea7zOdBH0LTOcs03ZClg', 'PhyFrameWorld', __filename);
// PhyFrame/PhyFrameWorld.js

'use strict';

var self = null;
cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0),
        mouseJoint: true,
        nodeP: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 初始化参数
        self = this;
        this.lineWidth = 5;
        this.strokeColor = cc.color(0, 0, 0);
        this.isClearMode = false;
        this.prepoint = null;

        this.Graphics = this.nodeP.getComponent(cc.Graphics);
        console.log("Graphics  = " + this.Graphics.lineTo);
        this.Graphics.lineWidth = 10;
        this.Graphics.fillColor.fromHEX('#ff0000');

        this.Graphics.lineWidth = 10;
        this.Graphics.fillColor.fromHEX('#ff0000');

        this.Graphics.moveTo(-120, 0);
        this.Graphics.lineTo(0, -100);
        this.Graphics.lineTo(20, 0);
        this.Graphics.lineTo(0, 100);
        this.Graphics.close();

        this.Graphics.stroke();
        this.Graphics.fill();

        // 绑定触摸通知事件通知
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this.node);

        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        physicsManager.gravity = cc.v2(0, -9.8);

        var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // 当前的宽和高
        var width = this.size.width || this.node.width;
        var height = this.size.height || this.node.height;

        var node = new cc.Node();
        this.allloads = [{
            "x": 572.16,
            "y": 952.3199999999999
        }, {
            "x": 574.0799999999999,
            "y": 965.7599999999999
        }, {
            "x": 579.8399999999999,
            "y": 975.3599999999999
        }, {
            "x": 581.76,
            "y": 983.04
        }, {
            "x": 583.68,
            "y": 992.6399999999999
        }, {
            "x": 589.4399999999999,
            "y": 1004.16
        }, {
            "x": 568.3199999999999,
            "y": 973.4399999999999
        }, {
            "x": 558.7199999999999,
            "y": 958.0799999999999
        }, {
            "x": 533.76,
            "y": 929.28
        }, {
            "x": 512.64,
            "y": 911.9999999999999
        }, {
            "x": 495.35999999999996,
            "y": 896.64
        }, {
            "x": 479.99999999999994,
            "y": 883.1999999999999
        }, {
            "x": 464.64,
            "y": 875.52
        }, {
            "x": 453.11999999999995,
            "y": 867.8399999999999
        }, {
            "x": 441.59999999999997,
            "y": 860.16
        }, {
            "x": 433.91999999999996,
            "y": 858.2399999999999
        }, {
            "x": 428.15999999999997,
            "y": 854.4
        }, {
            "x": 420.47999999999996,
            "y": 852.4799999999999
        }, {
            "x": 414.71999999999997,
            "y": 852.4799999999999
        }, {
            "x": 410.88,
            "y": 850.56
        }, {
            "x": 407.03999999999996,
            "y": 846.7199999999999
        }, {
            "x": 353.28,
            "y": 839.04
        }, {
            "x": 368.64,
            "y": 800.64
        }, {
            "x": 380.15999999999997,
            "y": 777.5999999999999
        }, {
            "x": 389.76,
            "y": 754.56
        }, {
            "x": 403.2,
            "y": 731.52
        }, {
            "x": 410.88,
            "y": 712.3199999999999
        }, {
            "x": 474.23999999999995,
            "y": 528
        }, {
            "x": 481.91999999999996,
            "y": 566.4
        }, {
            "x": 481.91999999999996,
            "y": 581.76
        }, {
            "x": 481.91999999999996,
            "y": 612.4799999999999
        }, {
            "x": 481.91999999999996,
            "y": 639.3599999999999
        }, {
            "x": 481.91999999999996,
            "y": 660.4799999999999
        }, {
            "x": 481.91999999999996,
            "y": 673.92
        }, {
            "x": 481.91999999999996,
            "y": 683.52
        }, {
            "x": 481.91999999999996,
            "y": 689.28
        }, {
            "x": 481.91999999999996,
            "y": 691.1999999999999
        }, {
            "x": 481.91999999999996,
            "y": 696.9599999999999
        }, {
            "x": 479.99999999999994,
            "y": 704.64
        }, {
            "x": 479.99999999999994,
            "y": 708.4799999999999
        }, {
            "x": 479.99999999999994,
            "y": 714.2399999999999
        }, {
            "x": 476.15999999999997,
            "y": 716.16
        }, {
            "x": 556.8,
            "y": 965.7599999999999
        }, {
            "x": 568.3199999999999,
            "y": 919.68
        }, {
            "x": 574.0799999999999,
            "y": 896.64
        }, {
            "x": 581.76,
            "y": 865.92
        }, {
            "x": 583.68,
            "y": 839.04
        }, {
            "x": 587.52,
            "y": 814.0799999999999
        }, {
            "x": 587.52,
            "y": 800.64
        }, {
            "x": 587.52,
            "y": 792.9599999999999
        }, {
            "x": 587.52,
            "y": 785.28
        }, {
            "x": 299.52,
            "y": 1092.48
        }, {
            "x": 44.16,
            "y": 1046.3999999999999
        }, {
            "x": 84.47999999999999,
            "y": 1006.0799999999999
        }, {
            "x": 126.71999999999998,
            "y": 954.2399999999999
        }, {
            "x": 153.6,
            "y": 921.5999999999999
        }, {
            "x": 174.72,
            "y": 892.8
        }, {
            "x": 192,
            "y": 867.8399999999999
        }, {
            "x": 203.51999999999998,
            "y": 852.4799999999999
        }, {
            "x": 211.2,
            "y": 842.88
        }, {
            "x": 213.11999999999998,
            "y": 837.1199999999999
        }, {
            "x": 215.04,
            "y": 837.1199999999999
        }];

        //   this.Graphics.fill();
        // 将此节点设置成静态刚体
        var body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        if (this.mouseJoint) {
            // add mouse joint
            var joint = node.addComponent(cc.MouseJoint);
            joint.mouseRegion = this.node;
        }

        this._addBound(node, 0, height / 2, width, 20);
        this._addBound(node, 0, -height / 2, width, 20);
        this._addBound(node, -width / 2, 0, 20, height);
        this._addBound(node, width / 2, 0, 20, height);

        node.parent = this.node;

        console.log("当前物理世界");
    },

    _addBound: function _addBound(node, x, y, width, height) {
        var collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter');

        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },

    onTouchBegan: function onTouchBegan(touch, event) {

        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        self.allloads = [];
        self.Graphics.clear();
        self.Graphics.lineWidth = 10;
        self.Graphics.fillColor.fromHEX('#ff0000');

        self.Graphics.moveTo(touchLoc.x - 360, touchLoc.y - 640);
        self.allloads[self.allloads.length] = touchLoc;
        return true;
    },
    onTouchMoved: function onTouchMoved(touch, event) {

        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        console.log("pos = " + JSON.stringify(touchLoc));
        self.allloads[self.allloads.length] = touchLoc;

        //  for (var t = 1; t < self.allloads.length; t++) {
        //      var pos = this.node.convertToNodeSpaceAR(self.allloads[t].x, self.allloads[t].y);
        self.Graphics.lineTo(touchLoc.x - 360, touchLoc.y - 640);
        //  }

        //  self.Graphics.close();
        self.Graphics.stroke();
    },

    onTouchEnded: function onTouchEnded(touch, event) {
        console.log("jieshu " + JSON.stringify(self.allloads));
        self.Graphics.close();
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
        //# sourceMappingURL=PhyFrameWorld.js.map
        