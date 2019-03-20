<template>
    <div class="home" ref="home">
        <div ref="SearchWrapper" class="search" v-show="searchShow" :class="{active:isfocus}">
            <Search :disabled="disabled" :readonly="readonly" @focus="focusThis" ref="comSearch"></Search>
            <span class="searchbtn" ref="searchBtn" :class="{active:isfocus}" @click="blurThis">取消</span>
        </div>
        <transition name="fade">
            <div class="bg-wrapper" v-show="isfocus">
                <div  style="height:100%;width:100%;overflow:scroll;-webkit-overflow-scrolling : touch;">
                </div>
            </div>
        </transition>
        <div class="header" ref="header"></div>
        <Location v-show="isShowLocation"></Location>
        <div class="location-wrapper" ref="location">
            <div class="location" @click="toggleLocation()">
                <i class="iconfont icon-location"></i>
                <div class="loc-text">城市桂冠</div>
                <i class="iconfont icon-right-arrow"></i>
            </div>
            <div class="tidings-warpper">
                <i class="iconfont  icon-xiaoxi"></i>
            </div>
            <div class="weather-wrapper" v-show="weather">
                <span class="temp">{{weather ? weather.wendu : '...'}}°</span>
                <span class="type">{{weather ? weather.forecast[0].type : '...'}}</span>
                <i :class="weatherType"></i>
            </div>
        </div>
        <transition name="fade">
            <div class="serch-seat" :class="{active:isfocus}" @click="seatOpenSearch()">
                <Search :disabled="disabled" :readonly="readonly" @focus="focusThis" ref="seatSearch"></Search>
                <span class="searchbtn" ref="searchBtn" :class="{active:isfocus}" @click.stop="blurThis">取消</span>
            </div>
        </transition>
        <div class="hotkey-wrapper">
            <ul class="hotkey">
                <li>烤肉拌饭</li>
                <li>米线</li>
                <li>正新鸡排</li>
                <li>炸鸡</li>
                <li>饺子</li>
                <li>奶茶</li>
                <li>炒饼</li>
            </ul>
        </div>
        <div v-if="recommends.length" class="slider-wrapper">
            <slider ref="slider">
                <div v-for="(item, index) in recommends" :key="index">
                    <a :href="item.linkUrl">
                        <img @load="loadImage" :src="item.picUrl">
                    </a>
                </div>
            </slider>
        </div>
        <div class="cate-wrapper">
            <div class="cate-item" v-for="(cate, index) in catedata.slice(0, 10)" :key="index">
                <img :src="cate.icon" class="cate-icon">
                <span class="cate-name" v-text="cate.name"></span>
            </div>
        </div>
        <div class="preference-wrapper" v-show="shopList.length">
            <Title :name="titleName[0].name"></Title>
            <div class="preference">
                <div class="item" v-for="(shop, index) in shopList.slice(0, 6)" :key="index">
                    <img class="shop-bg" :src="shop.picUrl">
                    <div class="shop-text">
                        <div class="shop-name">{{shop.shopName}}</div>
                        <div class="shop-desc">{{shop.minPriceTip+' '+shop.monthSalesTip}}</div>
                        <img class="shop-icon" :src="shop.picUrl">
                    </div>
                </div>
            </div>
        </div>
        <div class="shoplist-wrapper" v-show="shopList.length">
            <Title :name="titleName[1].name" :des="titleName[1].des"></Title>
            <Shoplist :shopList="shopList" @sortclick="scrollToSort" ref="shoplist"></Shoplist>
        </div>
        <div class="loading-container" v-show="!shopList.length">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import Loading from '@/base/loading/loading'
import Location from '@/base/location/location'
import Search from '@/base/search/search'
import ImageScroll from '@/base/image-scroll/image-scroll'
import Slider from '@/base/slider/slider'
import Title from '@/base/title/title'
import { scrollAnimation, prefixStyle } from '@/common/js/dom'
import Shoplist from '@/base/shoplist/shoplist'
import { getWeather } from '@/common/js/api.js'
import { mapGetters, mapMutations } from 'vuex'
import { setTimeout } from 'timers';

const transform = prefixStyle('transform')
const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

export default {
    name: '',
    props: [],
    data() {
        return {
            scrollMinHeight: 0,
            scrollY: 0,
            searchShow: false,
            checkLoaded: false,
            titleName: [
                {
                    name: '晚餐优选',
                    des: '急速取餐 同享优惠',
                    func: '更多'
                },
                {
                    name: '附近商家',
                    des: '急速取餐 同享优惠',
                    func: '更多'
                }],
            recommends: [
                {
                    id: '0',
                    linkUrl: '#',
                    picUrl: 'http://p0.meituan.net/720.0.100/wmbanner/c01854827d759f396d1228772939785c91270.jpg'
                }, {
                    id: '1',
                    linkUrl: '#',
                    picUrl: 'http://p0.meituan.net/720.0.100/wmbanner/9bea9a21f5af519770b4e40e1fd0b3ba160239.png'
                }, {
                    id: '2',
                    linkUrl: '#',
                    picUrl: 'http://p1.meituan.net/720.0.100/bizad/bizad_zzcpm_create5617081550835940358685.jpg'
                },
                {
                    id: '3',
                    linkUrl: '#',
                    picUrl: 'http://p0.meituan.net/720.0.100/wmbanner/616f42eaa2b4977d2c8e522f44350bc137447.png'
                }
            ],
            catedata: [],
            shopList: [],
            city: '青岛',
            weather: null,
            weatherType: '',
            disabled: false,
            readonly: false,
            isfocus: false
        };
    },
    components: {
        Location, Search, ImageScroll, Slider, Title, Loading, Shoplist
    },
    computed: {
        ...mapGetters([
            'isShowLocation', 'homeScrollTop'
        ])
    },
    created() {
        this._getWeather(this.city)
        this.probeType = 3
        this.listenScroll = true
        this.$http.get('api/catedata').then((response) => {
            response = response.body;
            if (response.errno === 0) {
                this.catedata = response.data.kingkongList;
            }
        })
        this.$http.get('api/shoplist').then((response) => {
            response = response.body;
            if (response.errno === 0) {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].showlimit = false
                }
                this.shopList = response.data;
            }
        })
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY
        }, true)
    },
    activated() {
        window.scrollTo(0, this.homeScrollTop)
    },
    deactivated() {
        this.setHomeScrollTop(window.scrollY)
    },
    beforeMount() { },
    mounted() {
        this.$refs.header.style.height = api.safeArea.top + this.HEAD_PADDING_TOP + 'px'
        this.$refs.SearchWrapper.style.top = this.global.isApp ? api.safeArea.top + this.HEAD_PADDING_TOP + 'px' : 0
        this.$refs.home.style.paddingTop = api.safeArea.top + this.HEAD_PADDING_TOP + 'px'
        this.$refs.home.style.paddingBottom = api.safeArea.bottom + 'px'
    },
    methods: {
        ...mapMutations({
            setShowLocation: 'SET_SHOW_LOCATION',
            setHomeScrollTop: 'SET_HOME_SCROLLTOP'
        }),
        seatOpenSearch(el) {
            this.isfocus = true
            api.setWinAttr({
                scrollEnabled: false

            });
        },
        focusThis() {
            this.isfocus = true
            api.setWinAttr({
                scrollEnabled: false
            });
        },
        blurThis() {
            this.isfocus = false
            api.setWinAttr({
                scrollEnabled: true
            });
            this.$refs.comSearch.blurThis()
            this.$refs.seatSearch.blurThis()
        },
        toggleLocation() {
            this.setShowLocation(true)
            var NVTabBar = api.require('NVTabBar');
            NVTabBar.hide({
                animation: false
            });
        },
        loadImage() {
            if (!this.checkLoaded) {
                this.checkLoaded = true
            }
        },
        scrollToSort(el) {
            scrollAnimation(scrollTop, el.offsetTop - (this.global.isApp ? api.safeArea.top : 0) - this.$refs.header.clientHeight)
        },
        _getWeather(city) {
            getWeather(city).then((res) => {
                if (res.status === 1000) {
                    this.weather = res.data
                    let type = res.data.forecast[0].type
                    console.log(type)
                    if (type.indexOf('晴') !== -1) {
                        this.weatherType = 'sunny'
                    } else if (type.indexOf('雪') !== -1) {
                        this.weatherType = 'snow'
                    } else if (type.indexOf('多云') !== -1) {
                        this.weatherType = 'cloudy'
                    } else if (type.indexOf('雨') !== -1) {
                        this.weatherType = 'rain'
                    } else if (type.indexOf('雷') !== -1) {
                        this.weatherType = 'thunder'
                    } else {
                        this.weatherType = 'sunny'
                    }
                }
            })
        }
    },
    watch: {
        scrollY(newY) {
            this.searchShow = newY > 38
        },
        isShowLocation(newVal) {
            if (newVal) {
                api.setWinAttr({
                    scrollEnabled: false
                });
            } else {
                api.setWinAttr({
                    scrollEnabled: true
                });
            }
        }
    }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    top: 0px;
    opacity: 0;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgb(250, 250, 250);
    z-index: 999;
}
.home {
    position: absolute;
    width: 100%;
    overflow-x: hidden;
    left: 0;
    top: 0px;
}
.overflow-y {
    overflow: hidden;
}
.home-content {
    height: 100%;
    overflow: hidden;
}
.location-wrapper {
    width: 100%;
    height: 38px;
    background: rgb(250, 250, 250);
    display: flex;
    align-items: center;
    box-sizing: content-box;
}
.location {
    flex: 1;
    text-align: left;
    padding-left: 15px;
}
.loc-text {
    display: inline-block;
    font-weight: 500;
}
.iconfont {
    display: inline-block;
    font-weight: 700;
}
.tidings-warpper {
    flex: 0 0 40px;
}
.tidings-warpper .iconfont {
    font-size: 20px;
}
.weather-wrapper {
    flex: 0 0 70px;
    padding-right: 15px;
    position: relative;
    height: 25px;
}
.weather-wrapper i {
    display: block;
    width: 23px;
    height: 23px;
    position: absolute;
    right: 15px;
    top: 0px;
    background-size: 100% 100%;
}
.weather-wrapper i.sunny {
    background-image: url("icon_weather_sunny@2x.png");
}
.weather-wrapper i.snow {
    background-image: url("icon_weather_snow@2x.png");
}
.weather-wrapper i.cloudy {
    background-image: url("icon_weather_cloudy@2x.png");
}
.weather-wrapper i.rain {
    background-image: url("icon_weather_rain@2x.png");
}
.weather-wrapper i.thunder {
    background-image: url("icon_weather_thundershower@2x.png");
}
.weather-wrapper .temp {
    position: absolute;
    top: 0;
    right: 40px;
    font-size: 10px;
    font-weight: 500;
}
.weather-wrapper .type {
    position: absolute;
    bottom: 0;
    font-size: 10px;
    font-weight: 700;
    text-align: right;
    right: 40px;
    white-space: nowrap;
}
.search {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    background: rgb(250, 250, 250);
    padding: 10px 15px 10px 15px;
    flex: 1;
    transition: all 0.5s;
    box-shadow: 0 0px 5px 1px rgb(236, 236, 236);
}

.search.active {
    padding-right: 58px;
}
.search .searchbtn {
    font-size: 14px;
    color: #999;
    position: absolute;
    top: 15px;
    right: -28px;
    transition: all 0.5s;
}
.search .searchbtn.active {
    right: 15px;
}
.serch-seat {
    width: 100%;
    padding: 10px 15px 10px 15px;
    position: relative;
    top: 0;
    left: 0;
    transition: all 0.3s;
}
.serch-seat.active {
    padding-right: 58px;
    top: -38px;
    left: 0;
    z-index: 150;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0 0px 5px 1px rgb(236, 236, 236);
}

.serch-seat .searchbtn {
    font-size: 14px;
    color: #999;
    position: absolute;
    top: 15px;
    right: -28px;
    transition: all 0.5s;
}
.serch-seat .searchbtn.active {
    top: 15px;
    right: 15px;
}
.hotkey-wrapper {
    width: 100%;
    padding: 0 15px;
    overflow: hidden;
}
.hotkey {
    display: flex;
    align-items: center;
    overflow: hidden;
}
.hotkey li {
    font-size: 12px;
    padding: 13px;
    padding-top: 0;
    position: relative;
    white-space: nowrap;
}
.hotkey li::after {
    content: "";
    position: absolute;
    height: 8px;
    border-left: 1px solid rgb(217, 217, 217);
    top: 50%;
    left: 0px;
    transform: translate(0, -50%);
}
.hotkey li:first-child {
    padding-left: 0;
}
.hotkey li:first-child::after {
    display: none;
}
.hotkey li:last-child {
    padding-right: 0;
}
.slider-wrapper {
    position: relative;
    width: 100%;
    padding: 0 15px;
    overflow: hidden;
}
.cate-wrapper {
    display: flex;
    width: 100%;
    max-height: 170px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
}
.cate-item {
    display: flex;
    flex-direction: column;
    width: 20%;
    justify-content: center;
    align-items: center;
}
.cate-item .cate-icon {
    width: 44px;
    height: 44px;
    margin-bottom: 5px;
    margin-top: 15px;
}
.cate-item .cate-name {
    font-size: 12px;
}
.preference-wrapper {
    padding: 0 15px;
    background: rgb(250, 250, 250);
}
.preference {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    overflow: hidden;
    padding-top: 10px;
}
.preference .item {
    width: 48%;
    position: relative;
    font-size: 0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 8px;
}

.preference .item .shop-bg {
    width: 100%;
    height: 95px;
}
.preference .item .shop-text {
    position: relative;
    background: #fefefe;
    padding: 5px 0px 5px 5px;
}
.preference .item .shop-text .shop-name {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}
.preference .item .shop-text .shop-desc {
    font-size: 10px;
    text-align: left;
}
.preference .item .shop-text .shop-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -25px;
    right: 10px;
}
.loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
.shoplist-wrapper {
    padding: 0 15px;
    background: rgb(250, 250, 250);
}
.bg-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 21;
    background: rgba(255, 255, 255, 1);
}
</style>