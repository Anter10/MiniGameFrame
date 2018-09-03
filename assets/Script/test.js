// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      goldprefab:{
          default: null,
          type: cc.Prefab,
      }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let width =  this.node.width;
        let height =  this.node.height;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 0;//1 | 2 | 3 | 4 | 5;
        var node = new cc.Node();
        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;
         
        // add mouse joint
        let joint = node.addComponent(cc.MouseJoint);
        joint.mouseRegion = this.node;
      
        this._addBound(node, 0, -height / 4, width / 2, 20);
        this._addBound(node, -width / 4, 0, 20, height / 2);
        this._addBound(node, width / 4, 0, 20, height / 2);
         
        node.parent = this.node;

        for(var row = 0 ; row < 1; row ++){
            for (var column = 1; column < 6; column++) {
                var com = cc.instantiate(this.goldprefab);
                com.parent = this.node;
                com.x = (row * 110 - 360) / 32;
                com.y = (column * 110 - 640) / 32;
                
            }
        }

    },

    _addBound: function (node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
     
        collider.size.width = width;
        collider.size.height = height;
       
    },

    start() {

    },

    update (dt) {
        var collider = cc.director.getPhysicsManager().testPoint(cc.v2(-142,-251));
        if (collider){
            console.log("ggg");
        }
    },
});