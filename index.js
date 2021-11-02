;
(function ($, window, document, undefined) {
    //'use strict';
    var pluginName = 'gfBoilerplate'; //Plugin名稱
    var gfBoilerplate;

    //建構式
    gfBoilerplate = function (element, options) {

        this.target = element; //html container
        this.opt = {};
        var initResult = this._init(options); //初始化
        if (initResult) {
            //初始化成功之後的動作
            this._style();
            this._domEvent();
            this._subscribeEvents();

            this.target.trigger('onInitComplete');
        }
    };

    //預設參數
    gfBoilerplate.defaults = {
        css: {

        },
        onClick: undefined,
        onInitComplete: undefined
    };

    //方法
    gfBoilerplate.prototype = {
        //私有方法
        _init: function (_options) {
            //合併自訂參數與預設參數
            try {
                this.opt = $.extend(true, {}, gfBoilerplate.defaults, _options);
                return true;
            } catch (ex) {
                return false;
            }
        },
        _style: function () {
            var o = this;
            o.target.css(o.opt.css);


        },
        _domEvent: function () {
            var o = this;
        },
        //註冊事件接口
        _subscribeEvents: function () {
            //先解除所有事件接口
            this.target.off('onClick');
            this.target.off('onInitComplete');
            //綁定點擊事件接口
            if (typeof (this.opt.onClick) === 'function') {
                this.target.on('onClick', this.opt.onClick);
            }
            if (typeof (this.opt.onInitComplete) === 'function') {
                this.target.on('onInitComplete', this.opt.onInitComplete);
            }
        }
    };

    //實例化，揭露方法，回傳
    $.fn[pluginName] = function (options, args) {
        var gfInstance;
        this.each(function () {
            gfInstance = new gfBoilerplate($(this), options);
        });

        return this;
    };
})(jQuery, window, document);