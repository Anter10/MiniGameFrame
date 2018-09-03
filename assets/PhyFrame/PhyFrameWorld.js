var self = null;
cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0),
        mouseJoint: true,
        nodeP: {
            type: cc.Node,
            default: null,
        },
        drawPhyNode:{
             type: cc.Node,
                 default: null,
        }
    },

    // use this for initialization
    onLoad: function () {
        // 初始化参数
        self = this;
        this.lineWidth = 5;
        this.strokeColor = cc.color(0, 0, 0);
        this.isClearMode = false;
        this.prepoint = null;
        self.drawPhyNode.getComponent(cc.RigidBody).gravityScale = 0;
        this.Graphics = this.drawPhyNode.getComponent(cc.Graphics);
        console.log("Graphics  = " + this.Graphics.lineTo)
        this.Graphics.lineWidth = 10;
        this.Graphics.fillColor.fromHEX('#ff0000');
        this.chain = this.drawPhyNode.getComponent(cc.PhysicsChainCollider);
        console.log("当前的所有店 = " + JSON.stringify(this.chain.points));
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
            onTouchEnded: this.onTouchEnded,
        }, this.node);

        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        physicsManager.gravity = cc.v2(0, 0);
        this.hysic = physicsManager;
        
        var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // 当前的宽和高
        let width = this.size.width || this.node.width;
        let height = this.size.height || this.node.height;

        let node = new cc.Node();
         

        //   this.Graphics.fill();
        // 将此节点设置成静态刚体
        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;
        this.chain.points = [];
        if (this.mouseJoint) {
            // add mouse joint
            let joint = node.addComponent(cc.MouseJoint);
            joint.mouseRegion = this.node;
        }

        this._addBound(node, 0, height / 2, width, 20);
        this._addBound(node, 0, -height / 2, width, 20);
        this._addBound(node, -width / 2, 0, 20, height);
        this._addBound(node, width / 2, 0, 20, height);

        node.parent = this.node;

        console.log("当前物理世界");
    },

    _addBound: function (node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
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
    onCollisionEnter: function (other, self) {
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

    onTouchBegan: function (touch, event) {


        // 获取触摸点数据
        var touchLoc = touch.getLocation();
         self.hysic.gravity = cc.v2(0, 0);
        self.chain.points = [];
        self.allloads = [];
        self.Graphics.clear()
        self.Graphics.lineWidth = 10;
        self.Graphics.fillColor.fromHEX('#ff0000');
        var tx = (touchLoc.x - 360);
        var ty = (touchLoc.y - 640);
        self.Graphics.moveTo(tx, ty);
         self.drawPhyNode.position = cc.p(tx, ty);
        self.allloads[self.allloads.length] = cc.p(tx,ty);
       
        self.drawPhyNode.getComponent(cc.RigidBody).gravityScale = 0;
        return true;
    },
    onTouchMoved: function (touch, event) {
self.hysic.gravity = cc.v2(0, 0);
        // 获取触摸点数据
        var touchLoc = touch.getLocation();
          var tx = (touchLoc.x - 360);
          var ty = (touchLoc.y - 640);
        self.allloads[self.allloads.length] = cc.p(tx, ty);
        self.Graphics.lineTo(tx, ty);
        self.Graphics.stroke();
    },

    onTouchEnded: function (touch, event) {
        console.log("jieshu " + JSON.stringify(self.allloads))
        self.Graphics.close();
        self.chain.points = self.allloads;
        self.chain.apply();
        self.hysic.gravity = cc.v2(0, -320);
        self.drawPhyNode.getComponent(cc.RigidBody).gravityScale = 5;
    },
   
    cleardraw:function(){
         self.Graphics.clear()
    }
});