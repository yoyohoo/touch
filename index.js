window.onload = function () {
    setTimeout(scrollTo, 0, 0, 0);

    var mTouch = {
        isInitialed: false,
        init: function () {
            var evt = localStorage.opType;
            if (!evt) return false;
            if (!this.isInitialed) {
                touch.on(target, 'touchstart', function (e) {
                    if (localStorage.opType === 'rotate')
                        e.startRotate();
                    e.preventDefault();
                });
                this.isInitialed = true;
            }
            // touch.off(target, 'touchstart')
            this[evt].call();
        },
        tap: function () {
            /*
             * tap
             */
            touch.on(target, 'tap', function (e) {
                if (!touch.config.tap) return false;
                result.innerHTML = '你敲击了图片一下';
            });
        },
        doubletap: function () {
            /*
             * doubletap
             */
            touch.on(target, 'doubletap', function (e) {
                if (!touch.config.doubletap) return false;
                result.innerHTML = '你连续敲击了图片两下';
            });
        },
        hold: function () {
            /*
             * hold
             */
            touch.on(target, 'hold', function (e) {
                if (!touch.config.hold) return false;
                result.innerHTML = '你按住了图片';
            });
            touch.on(target, 'touchend', function (e) {
                if (!touch.config.hold) return false;
                result.innerHTML = '你放开了图片';
            });
        },
        rotate: function () {
            /*
             * rotate
             */
            var angle = 0;
            touch.on(target, 'rotate', function (e) {
                if (!touch.config.rotate) return false;
                if (localStorage.opType !== 'rotate') return false;

                var totalAngle = angle + (e.rotation || 0);
                if (e.fingerStatus === 'end') {
                    angle = angle + e.rotation;
                }
                result.innerHTML = '你旋转了：' + angle + '°';
                this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
                angle = 0;
            });
        },
        scale: function () {
            /*
             * scale
             */
            document.getElementById('tch-img').style.webkitTransition = 'all ease .1s';
            var initialScale = 1;
            var currentScale = 1;
            touch.on(target, 'pinch', function (e) {
                if (!touch.config.scale) return false;
                currentScale = e.scale - 1;
                currentScale = initialScale + currentScale;
                currentScale = currentScale > 2 ? 2 : currentScale;
                currentScale = currentScale < 1 ? 1 : currentScale;
                this.style.webkitTransform = 'scale(' + currentScale + ')';
                result.innerHTML = "当前缩放比例为:" + currentScale + ".";
            });
            touch.on(target, 'pinchend', function (e) {
                if (!touch.config.scale) return false;
                initialScale = currentScale;
            });
        },
        drag: function () {
            /*
             * drag
             */
            var dx, dy;
            touch.on(target, 'drag', function (e) {
                if (!touch.config.drag) return false;
                if (localStorage.opType !== 'drag') return false;

                dx = dx || 0;
                dy = dy || 0;
                var offx = dx + e.x + "px";
                var offy = dy + e.y + "px";
                this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
                result.innerHTML = '开始拖拉...';
            });
            touch.on(target, 'dragend', function (e) {
                if (!touch.config.drag) return false;
                if (localStorage.opType !== 'drag') return false;

                dx += e.x;
                dy += e.y;
                result.innerHTML = '拖拉位移：' + '(' + dx + ',' + dy + ')';
            });
        },
        swipe: function () {
            /*
             * swipe
             */
            document.getElementById('tch-img').style.webkitTransition = 'all ease .5s';
            touch.on(target, 'swiperight', function (e) {
                if (!touch.config.swipe) return;
                if (localStorage.opType !== 'swipe') return false;

                this.style.webkitTransform = "translate3d(" + this.offsetLeft + "px,0,0)";
                result.innerHTML = "向右滑动：" + this.offsetLeft;
            });
            touch.on(target, 'swipeleft', function (e) {
                if (!touch.config.swipe) return false;
                if (localStorage.opType !== 'swipe') return false;

                this.style.webkitTransform = "translate3d(-" + this.offsetLeft + "px,0,0)";
                result.innerHTML = "向左滑动：" + this.offsetLeft;
            });
        }
    }

    var target = '#tch-img',
        img = document.getElementById('tch-img'),
        event = document.getElementById('tch-event'),
        result = document.getElementById('tch-result');

    var config = {
        tap: true, //tap类事件开关, 默认为true
        doubletap: false, //doubletap事件开关， 默认为true
        hold: false, //hold事件开关, 默认为true
        holdTime: 650, //hold时间长度
        rotate: false,
        scale: false,
        swipe: false, //swipe事件开关
        swipeTime: 300, //触发swipe事件的最大时长
        swipeMinDistance: 18, //swipe移动最小距离
        swipeFactor: 5, //加速因子, 值越大变化速率越快
        drag: false, //drag事件开关
        pinch: false, //pinch类事件开关
    }
    reset();

    touch.on('#tch-reload a', 'tap', reload)

    touch.on('.tch-ctrl', 'tap', function (e) {
        reset();
        if (e.target.tagName !== 'A') return;
        var actEle = document.querySelector('.active');
        actEle && (actEle.className = '');
        e.target.className = 'active';
        var evt = e.target.innerText;
        touch.config[evt] = true;
        event.innerText = '开启' + evt + '事件：';
        result.innerHTML = '';
        // angle += Math.floor(Math.random() * 90)
        // touch.trigger(img, evt)
        localStorage.opType = evt;
        mTouch.init()
    })

    /*
     * reset
     */
    function reset() {
        touch.config = config;
    }

    /*
     * reload
     */
    function reload() {
        location.reload();
    }

}
