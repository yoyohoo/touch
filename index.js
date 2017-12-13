window.onload = function () {
    var target = '#tch-img';
    touch.config = {
        tap: false, //tap类事件开关, 默认为true
        doubleTap: true, //doubleTap事件开关， 默认为true
        hold: true, //hold事件开关, 默认为true
        holdTime: 650, //hold时间长度
        swipe: true, //swipe事件开关
        swipeTime: 300, //触发swipe事件的最大时长
        swipeMinDistance: 18, //swipe移动最小距离
        swipeFactor: 5, //加速因子, 值越大变化速率越快
        drag: true, //drag事件开关
        pinch: true, //pinch类事件开关
    }

    touch.on(target, 'tap', function (e) {
        console.info(e)
    })

    touch.on(target, 'doubleTap', function (e) {
        console.info(e)
    })

}

function rotate() {

}