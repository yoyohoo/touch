window.onload = function () {
    setTimeout(scrollTo, 0, 0, 0);
    var target = '#tch-img',
        img = document.getElementById('tch-img'),
        event = document.getElementById('tch-event'),
        result = document.getElementById('tch-result');

    touch.config = {
        tap: true, //tap类事件开关, 默认为true
        doubleTap: false, //doubleTap事件开关， 默认为true
        hold: false, //hold事件开关, 默认为true
        holdTime: 650, //hold时间长度
        rotate: false,
        swipe: false, //swipe事件开关
        swipeTime: 300, //触发swipe事件的最大时长
        swipeMinDistance: 18, //swipe移动最小距离
        swipeFactor: 5, //加速因子, 值越大变化速率越快
        drag: false, //drag事件开关
        pinch: false, //pinch类事件开关
    }

    touch.on('.tch-ctrl', 'tap', function (e) {
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
    })

    /*
     * rotate
     */
    var angle = 0;
    touch.on(target, 'touchstart', function (ev) {
        ev.startRotate();
        ev.preventDefault();
    });
    touch.on(target, 'rotate', function (ev) {
        if (!touch.config.rotate) return false;
        var totalAngle = angle + (ev.rotation || 0);
        if (ev.fingerStatus === 'end') {
            angle = angle + ev.rotation;
        }
        result.innerHTML = '你旋转了：' + angle + '°';
        this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
        angle = 0;
    });


    /*
     * scale
     */
    touch.on(target, 'touchstart', function (ev) {
        ev.preventDefault();
    });
    var initialScale = 1;
    var currentScale;
    touch.on(target, 'pinchend', function (ev) {
        currentScale = ev.scale - 1;
        currentScale = initialScale + currentScale;
        currentScale = currentScale > 2 ? 2 : currentScale;
        currentScale = currentScale < 1 ? 1 : currentScale;
        this.style.webkitTransform = 'scale(' + currentScale + ')';
        result.innerHTML = "当前缩放比例为:" + currentScale;
    });
    touch.on(target, 'pinchend', function (ev) {
        initialScale = currentScale;
    });


}
