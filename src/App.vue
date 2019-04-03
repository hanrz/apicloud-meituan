<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="Router"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            transitionName: '', // 默认动态路由变化为slide-right
            Router: ''
        }
    },
    created() {},
    mounted() {
        //alert(this.HEAD_PADDING_TOP)
        console.log(api.safeArea.top)
        if (this.global.isApp) {
            this.apptabar()
            //this._initFramgroup()
            this._initHomeFrame()
        }
    },
    watch: {
        $route(to, from) {
            let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
            if (from.meta.order || to.meta.order) {
                this.transitionName = from.meta.order < to.meta.order ? 'fade' : 'fade'
            } else {
                if (isBack) {
                    //this.Router = 'Router'
                    this.transitionName = 'slide-right'
                } else {
                    //this.Router = 'Router'
                    this.transitionName = 'slide-left'
                }
            }

            this.$router.isBack = false
        }
    },
    methods: {
        _initHomeFrame() {
            api.openFrame({
                name: 'home',
                url: '#/',
                useWKWebView: true,
                scrollToTop: false,
                bounce: true,
                softInputMode: 'pan',
                slidBackEnabled: false,
                rect: {
                    x: 0,
                    y: -226 - api.safeArea.top,
                    w: 'auto',
                    h: 'auto',
                    marginBottom: api.safeArea.bottom
                },
                bgColor: 'rgb(250, 250, 250)'
            })
        },
        apptabar() {
            var NVTabBar = api.require('NVTabBar')
            NVTabBar.open(
                {
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
                            }
                        }
                    ],
                    selectedIndex: 0
                },
                (ret, err) => {
                    NVTabBar.bringToFront()
                    var frames = api.frames()
                    var strFrames = JSON.stringify(frames)
                    //alert(strFrames)
                    //api.setFrameGroupIndex({
                    // name: "main",
                    //index: ret.index,
                    //scroll: true
                    // })
                    //var winName = api.winName;
                    if (ret.eventType == 'click' && ret.index == 0) {
                        //alert(strFrames+'+'+api.winName)
                        api.setFrameAttr({
                            name: 'home',
                            bgColor: 'rgb(250, 250, 250)'
                        })
                        this.title = '首页'
                        this.$router.push({ name: 'home' })
                    }
                    if (ret.eventType == 'click' && ret.index == 1) {
                        //alert(strFrames+'+'+api.winName)
                        api.setFrameAttr({
                            name: 'home',
                            bgColor: 'rgb(255, 255, 255)'
                        })
                        this.title = '订单'
                        this.$router.push({ name: 'order' })
                    }
                    if (ret.eventType == 'click' && ret.index == 2) {
                        //alert(strFrames+'+'+api.winName)
                        api.setFrameAttr({
                            name: 'home',
                            bgColor: 'rgb(250, 250, 250)'
                        })
                        this.title = '钱包'
                        this.$router.push({ name: 'money' })
                    }
                    if (ret.eventType == 'click' && ret.index == 3) {
                        //alert(strFrames+'+'+api.winName)
                        api.setFrameAttr({
                            name: 'home',
                            bgColor: 'rgb(255, 255, 255)'
                        })
                        this.title = '我的'
                        this.$router.push({ name: 'my' })
                    }
                }
            )
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
}
.Router {
    transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-active{
    opacity: 0;
    transition: all 0.3s ease;
}
.slide-left-enter,
.slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition: all 0.3s ease;
}

.slide-left-leave-active,
.slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
    transition: all 0.3s ease;
}
</style>
