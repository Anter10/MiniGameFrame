"use strict";
cc._RF.push(module, '96f72YAPnRFFL9h/UR+OK25', 'physics-settings');
// PhyFrame/physics-settings.js

"use strict";

var physicsManager = cc.director.getPhysicsManager();
physicsManager.enabled = true;

physicsManager.debugDrawFlags =
// 0;
cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;

cc._RF.pop();