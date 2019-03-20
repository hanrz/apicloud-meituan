<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>


export default {
    name: 'App',
    created() {
    },
    mounted() {
        if (this.global.isApp) {
            this.apptabar()
            this._initFramgroup()
        }
    },
    methods: {
        _initHomeWin() {
            api.openWin({
                name: 'home',
                url: '#/',
                useWKWebView: true,
                scrollToTop: false,
                bounce: true,
                softInputMode: 'pan',
                slidBackEnabled: false,
                rect: {
                    x: 0,
                    y: 0
                }
            });
        },
        _initFramgroup() {
            api.openFrameGroup({
                name: 'main',
                rect: {
                    x: 0,
                    y: -this.HEAD_PADDING_TOP,
                    w: 'auto',
                    h: 'auto',
                    marginBottom: api.safeArea.bottom + 60
                },
                background: 'rgb(250, 250, 250)',
                index: 0,
                preload: 3,
                scrollEnabled: false,
                frames: [{
                    name: 'home',
                    url: '#/home',
                    useWKWebView: true
                }, {
                    name: 'order',
                    url: '#/order',
                    useWKWebView: true
                }, {
                    name: 'money',
                    url: '#/money',
                    useWKWebView: true
                }, {
                    name: 'my',
                    url: '#/my',
                    bgColor: '#FFD656',
                    useWKWebView: true
                }]
            }, function (ret, err) {
                var index = ret.index;
                console.log(JSON.stringify(ret));
            });
        },
        apptabar() {
            var NVTabBar = api.require('NVTabBar');
            NVTabBar.open({
                styles: {
                    bg: '#fff',
                    h: 60,
                    dividingLine: {
                        width: 1,
                        color: '#efefef'
                    },
                    badge: {
                        bgColor: '#ff0',
                        numColor: '#fff',
                        size: 6.0,
                        centerX: 40,
                        centerY: 6
                    }
                },
                items: [
                    {
                        w: api.winWidth / 4.0,
                        bg: {
                            marginB: -2,
                            image: '#fff'
                        },
                        iconRect: {
                            w: 25.0,
                            h: 25.0
                        },
                        icon: {
                            normal: 'widget://static/image/home-g.png',
                            highlight: 'widget://static/image/home.png',
                            selected: 'widget://static/image/home.png'
                        },
                        title: {
                            text: '首页',
                            size: 11.0,
                            normal: '#666666',
                            selected: '#000',
                            marginB: 6.0
                        }
                    }, {
                        w: api.winWidth / 4.0,
                        bg: {
                            marginB: -2,
                            image: '#fff'
                        },
                        iconRect: {
                            w: 25.0,
                            h: 25.0
                        },
                        icon: {
                            normal: 'widget://static/image/list-g.png',
                            highlight: 'widget://static/image/list.png',
                            selected: 'widget://static/image/list.png'
                        },
                        title: {
                            text: '订单',
                            size: 11.0,
                            normal: '#666666',
                            selected: '#000',
                            marginB: 6.0
                        }
                    },
                    {
                        w: api.winWidth / 4.0,
                        bg: {
                            marginB: -2,
                            image: '#fff'
                        },
                        iconRect: {
                            w: 25.0,
                            h: 25.0
                        },
                        icon: {
                            normal: 'widget://static/image/money-g.png',
                            highlight: 'widget://static/image/money.png',
                            selected: 'widget://static/image/money.png'
                        },
                        title: {
                            text: '钱包',
                            size: 11.0,
                            normal: '#666666',
                            selected: '#000',
                            marginB: 6.0
                        },
                    },
                    {
                        w: api.winWidth / 4.0,
                        bg: {
                            marginB: -2,
                            image: '#fff'
                        },
                        iconRect: {
                            w: 25.0,
                            h: 25.0
                        },
                        icon: {
                            normal: 'widget://static/image/my-g.png',
                            highlight: 'widget://static/image/my.png',
                            selected: 'widget://static/image/my.png'
                        },
                        title: {
                            text: '我的',
                            size: 11.0,
                            normal: '#666666',
                            selected: '#000',
                            marginB: 6.0
                        },
                    }],
                selectedIndex: 0
            }, (ret, err) => {
                NVTabBar.bringToFront()
                var frames = api.frames();
                var strFrames = JSON.stringify(frames)
                //alert(strFrames)
                api.setFrameGroupIndex({
                    name: 'main',
                    index: ret.index,
                    scroll: true
                });
                //var winName = api.winName;
                if (ret.eventType == "click" && ret.index == 0) {
                    //alert(strFrames+'+'+api.winName)
                    //this.title = "首页"
                    //this.$router.push({ name: 'home' })
                }
                if (ret.eventType == "click" && ret.index == 1) {
                    //alert(strFrames+'+'+api.winName)
                    //this.title = "订单"
                    //this.$router.push({ name: 'order' })
                }
                if (ret.eventType == "click" && ret.index == 2) {
                    //alert(strFrames+'+'+api.winName)
                    //this.title = "钱包"
                    //this.$router.push({ name: 'money' })
                }
                if (ret.eventType == "click" && ret.index == 3) {
                    //alert(strFrames+'+'+api.winName)
                }
            })
        }
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    background: rgba(250, 250, 250, 1);
}
</style>
