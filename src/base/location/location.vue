<template>
    <transition name="slide">
        <div class="location-page" ref="location">
            <div class="header">
                <div class="back">
                    <i class="iconfont icon-right-arrow" @click="back()"></i>
                </div>
                <h1 class="title">选择收货地址</h1>
                <div class="newaddress" @click="location()">
                    新增地址
                </div>
            </div>
            <div class="location-search">
                <div class="location">
                    <i class="iconfont icon-location"></i>
                    <div class="loc-text">青岛</div>
                    <i class="iconfont icon-right-arrow"></i>
                </div>
                <div class="input-wrapper" ref="inputWrapper" :class="{active:isfocus}">
                    <Search :disabled="disabled" :readonly="readonly" :placeholder="placeholder" @focus="focusThis" @blur="blurThis" ref="comSearch"></Search>
                    <span class="searchbtn" ref="searchBtn" :class="{active:isfocus}">搜索</span>
                </div>
            </div>
            <transition name="fade">
                <div class="bg-wrapper" v-show="isfocus" @touchstart="blurThis" @touchmove="blurThis"></div>
            </transition>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import Search from '@/base/search/search'

export default {
    name: '',
    props: {
    },
    data() {
        return {
            disabled: false,
            placeholder: '请输入您的收货地址',
            readonly: false,
            isfocus: false
        };
    },
    components: {
        Search
    },
    computed: {},
    beforeMount() { },
    mounted() {
        this.$refs.location.style.paddingTop = api.safeArea.top +this.HEAD_PADDING_TOP+ 'px'
        this.$refs.location.style.paddingBottom = api.safeArea.bottom + 'px'
    },
    methods: {
        ...mapMutations({
            setShowLocation: 'SET_SHOW_LOCATION'
        }),
        location() {
            var bmLocation = api.require('bmLocation');
            bmLocation.singleLocation({
                reGeocode: false,
                netWorkState: false
            }, function (ret) {
                var sta = ret.status;
                if (sta) {
                    var lat = ret.location.latitude;
                    var lon = ret.location.longitude;
                    var t = ret.timestamp;
                    var str = '经度：' + lon + '<br>';
                    str += '纬度：' + lat + '<br>';
                    str += '更新时间：' + t + '<br>';
                    console.log(JSON.stringify(ret))
                } else {
                    api.alert({ msg: '发生错误111' });
                }
            });
        },
        back() {
            this.setShowLocation(false)
            var NVTabBar = api.require('NVTabBar');
            NVTabBar.show({
                animation: false
            });
        },
        focusThis() {
            this.isfocus = true
        },
        blurThis() {
            this.isfocus = false
            this.$refs.comSearch.blurThis()
        }
    },
    watch: {
    }
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.4s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active in <2.1.8 */ {
    transform: translate3d(100%, 0, 0);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
.location-page {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: rgb(250, 250, 250);
}
.location-page .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 0;
}
.location-page .header .back {
    flex: 0 0 80px;
    text-align: left;
}
.back .icon-right-arrow {
    display: inline-block;
    font-size: 24px;
    transform: rotate(180deg);
}
.location-page .header .title {
    flex: 1;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #333;
}
.location-page .header .newaddress {
    display: inline-block;
    flex: 0 0 80px;
    text-align: right;
    font-size: 14px;
}
.location-page .location-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    position: relative;
}
.location-page .location-search::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: block;
    height: 1px;
    background: #e4e4e4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.location-page .location-search .location {
    flex: 0 0 80px;
    text-align: left;
    padding-left: 15px;
}
.location-page .location-search .location .loc-text {
    display: inline-block;
    font-weight: normal;
    font-size: 14px;
}
.location-page .location-search .location .iconfont {
    display: inline-block;
    font-weight: normal;
    font-size: 14px;
}
.location-page .location-search .input-wrapper {
    flex: 1;
    padding-right: 15px;
    transition: all 0.3s;
    position: relative;
}
.location-page .location-search .input-wrapper.active {
    padding-right: 58px;
}
.location-page .location-search .input-wrapper .searchbtn {
    font-size: 14px;
    color: #999;
    position: absolute;
    right: -28px;
    top: 5px;
    transition: all 0.3s;
}
.location-page .location-search .input-wrapper .searchbtn.active {
    right: 15px;
}
.bg-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
}
</style>