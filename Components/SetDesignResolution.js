
function $applySettings () {
    if (CC_EDITOR) {
        return;
    }
    var policy;
    if (this.fitHeight && this.fitWidth) {
        policy = cc.ResolutionPolicy.SHOW_ALL;
    }
    else if (!this.fitHeight && !this.fitWidth) {
        policy = cc.ResolutionPolicy.NO_BORDER;
    }
    else if (this.fitWidth) {
        policy = cc.ResolutionPolicy.FIXED_WIDTH;
    }
    else {      // fitHeight
        policy = cc.ResolutionPolicy.FIXED_HEIGHT;
    }
    cc.view.setDesignResolutionSize(this.designResolution.width, this.designResolution.height, policy);
}

cc.Class({
    extends: cc.Component,

    properties: {
        designResolution: {
            default: cc.size(960, 640),
            notify: $applySettings,
        },
        fitHeight: {
            default: true,
            notify: $applySettings,
        },
        fitWidth: {
            default: false,
            notify: $applySettings,
        }
    },

    onLoad: function () {
        cc.director.once(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
        this.applySettings();
    },

    alignWithScreen: function () {
        var designSize;
        var canvasSize = cc.visibleRect;
        var clipTopRight = !this.fitHeight && !this.fitWidth;
        var offsetX = 0;
        var offsetY = 0;
        if (clipTopRight) {
            designSize = cc.view.getDesignResolutionSize();
            offsetX = (designSize.width - canvasSize.width) * 0.5;
            offsetY = (designSize.height - canvasSize.height) * 0.5;
        }
        this.node.setPosition(canvasSize.width * 0.5 + offsetX, canvasSize.height * 0.5 + offsetY);
    },

    applySettings: $applySettings
});
