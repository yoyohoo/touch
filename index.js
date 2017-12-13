window.onload = function () {
    var target = '#tch-img',
        btns = document.querySelectorAll('.tch-ctrl li'),
        info = document.getElementById('tch-result');
    touch.config = {
        tap: true, //tap类事件开关, 默认为true
        doubleTap: false, //doubleTap事件开关， 默认为true
        hold: false, //hold事件开关, 默认为true
        holdTime: 650, //hold时间长度
        swipe: false, //swipe事件开关
        swipeTime: 300, //触发swipe事件的最大时长
        swipeMinDistance: 18, //swipe移动最小距离
        swipeFactor: 5, //加速因子, 值越大变化速率越快
        drag: false, //drag事件开关
        pinch: false, //pinch类事件开关
    }

    document.querySelector('.tch-ctrl').addEventListener('click', function (e) {
        if (e.target.tagName !== 'A') return;
        document.querySelector('.active').className = '';
        e.target.className = 'active';
        var evt = e.target.innerText;
        touch.config[evt] = true;
        info.innerText = '开启' + evt + '事件：';
        touch.on(target, evt, function (e) {
            info.innerText += evt
        })
    })
}
