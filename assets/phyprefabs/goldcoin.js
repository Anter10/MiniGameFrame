 
cc.Class({
    extends: cc.Component,

    properties: {
       label:{
           default: null,
           type: cc.Label,
       }
    },

    setLabel: function (str) {
        this.label.string = str;
    },
    
    onLoad () {
   },

    start () {

    },

   update (dt) {
       this.setLabel("x = " + parseInt(this.node.x) + " y =" + parseInt(this.node.y));
        
   },
});
