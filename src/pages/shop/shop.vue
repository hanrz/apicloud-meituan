<template>
    <div class="shop" ref="shop">
        <div class="header" ref="header" :class="{active:isfocus}">
            <div class="back" @click="backPage()">
                <i class="iconfont icon-right-arrow" @click="backPage()"></i>
            </div>
            <div class="search" :class="{active:isfocus}">
                <Search :disabled="disabled" :readonly="readonly" @focus="focusThis" ref="comSearch"></Search>
                <span class="searchbtn" ref="searchBtn" :class="{active:isfocus}" @click="blurThis">取消</span>
            </div>
        </div>
        <div class="main-wrapper" ref="main">
            <div class="cate-wrapper" :class="catefixed">
                <div class="cates">
                    <div class="cate-list" ref="cateIcon">
                        <div class="cate-item" v-for="(item,index) in cates" :key="index">
                            <img :src="item.icon" class="icon" ref="icon">
                        </div>
                    </div>
                    <div class="cate-list">
                        <div class="cate-item" v-for="(item,index) in cates" :key="index">
                            <h5 class="title">{{item.name}}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shoplist-wrapper">
                <Shoplist :shopList="shopList" :sortshow="sortshow" @sortclick="scrollToSort" ref="shoplist"></Shoplist>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/base/search/search'
import liaoli from '@/pages/shop/liaoli.png'
import chuancai from '@/pages/shop/chuancai.png'
import difang from '@/pages/shop/difang.png'
import dongnanya from '@/pages/shop/dongnanya.png'
import fensi from '@/pages/shop/fensi.png'
import ganguo from '@/pages/shop/ganguo.png'
import huoguo from '@/pages/shop/huoguo.png'
import jiamo from '@/pages/shop/jiamo.png'
import jiaozi from '@/pages/shop/jiaozi.png'
import malatang from '@/pages/shop/malatang.png'
import qingshi from '@/pages/shop/qingshi.png'
import quanbu from '@/pages/shop/quanbu.png'
import riliao from '@/pages/shop/riliao.png'
import shaokao from '@/pages/shop/shaokao.png'
import tese from '@/pages/shop/tese.png'
import yabo from '@/pages/shop/yabo.png'
import zhaji from '@/pages/shop/zhaji.png'

import { scrollAnimation, prefixStyle } from '@/common/js/dom'
import Shoplist from '@/base/shoplist/shoplist'

const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

export default {
    name: '',
    data() {
        return {
            disabled: false,
            readonly: false,
            isfocus: false,
            cates: [
                {
                    icon: quanbu,
                    name: '全部'
                },
                {
                    icon: qingshi,
                    name: '轻食沙拉'
                },
                {
                    icon: jiaozi,
                    name: '饺子馄饨'
                },
                {
                    icon: malatang,
                    name: '麻辣烫冒菜'
                },
                {
                    icon: tese,
                    name: '特色小吃'
                },
                {
                    icon: chuancai,
                    name: '川湘菜'
                },
                {
                    icon: fensi,
                    name: '暖胃粉丝汤'
                },
                {
                    icon: zhaji,
                    name: '炸鸡炸串'
                },
                {
                    icon: jiamo,
                    name: '夹馍饼类'
                },
                {
                    icon: yabo,
                    name: '鸭脖卤味'
                },
                {
                    icon: difang,
                    name: '地方菜系'
                },
                {
                    icon: riliao,
                    name: '日料寿司'
                },
                {
                    icon: liaoli,
                    name: '韩式料理'
                },
                {
                    icon: ganguo,
                    name: '香锅干锅'
                },
                {
                    icon: huoguo,
                    name: '火锅串串'
                },
                {
                    icon: shaokao,
                    name: '龙虾烧烤'
                },
                {
                    icon: dongnanya,
                    name: '东南亚菜'
                }
            ],
            shopList: [],
            sortshow: false,
            scrollY: 0,
            catefixed: ''
        }
    },

    created() {
        this.setScrollListener()
        this.$http.get(this.localApi + 'api/shoplist').then(response => {
            response = response.body
            if (response.errno === 0) {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].showlimit = false
                }
                this.shopList = response.data
            }
        })
        this.setSwiperListener()
    },

    mounted() {
        this._initSize()
    },

    components: {
        Search,
        Shoplist
    },

    computed: {},

    methods: {
        scrollToSort(e) {
            let el = e[0]
            let event = e[1]
            if(event.clientY > 390){
                scrollAnimation(0, el.offsetTop - (this.global.isApp ? api.safeArea.top : 0) + 50)
            }
        },
        focusThis() {
            this.isfocus = true
            api.setFrameAttr({
                scrollEnabled: false
            })
        },
        blurThis() {
            this.isfocus = false
            api.setFrameAttr({
                scrollEnabled: true
            })
            this.$refs.comSearch.blurThis()
        },
        setSwiperListener() {
            var that = this
            api.addEventListener(
                {
                    name: 'swiperight'
                },
                function(ret, err) {
                    that.backPage()
                }
            )
        },
        setScrollListener() {
            window.addEventListener(
                'scroll',
                () => {
                    this.scrollY = window.scrollY
                },
                true
            )
        },
        backPage() {
            this.$router.goBack()
            var NVTabBar = api.require('NVTabBar')
            NVTabBar.show({
                animation: false
            })
        },
        _initSize() {
            this.$refs.header.style.paddingTop = 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 10 + 'px'
            this.$refs.shop.style.paddingTop = 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 'px'
            this.$refs.shop.style.paddingBottom = api.safeArea.bottom + 90 + 'px'
            this.$refs.main.style.top = 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 50 + 'px'
        },
        getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr]
            } else {
                return document.defaultView.getComputedStyle(obj, null)[attr]
            }
        }
    },

    watch: {
        scrollY(newY) {
            this.sortshow = newY > this.$refs.shoplist.$el.offsetTop
            if (newY > 0 && newY < 55) {
                var percent = 1 - newY / 55
                //console.log([this.$refs.cateIcon])
                this.$refs.cateIcon.style.opacity = percent
            }
            if (newY == 0) {
                this.$refs.cateIcon.style.opacity = 1
            }
        }
    }
}
</script>
<style lang='stylus' scoped>
.search-wrapper
    border-radius: 5px
.shop
    position: relative
    height: 100%
    .header
        display: flex
        align-items: center
        justify-content: space-between
        padding: 10px 15px
        font-size: 0
        position: fixed
        top: 0
        left: 0
        width: 100%
        z-index: 100
        background: linear-gradient(to right, rgb(254, 142, 42) 0%, rgb(254, 101, 25) 100%)
        &.active
            background: #fff
            box-shadow: 0 0px 5px 1px rgb(236, 236, 236)
            .back
                flex: 0 0 0
                visibility: hidden
                .icon-right-arrow
                    display: none
        .back
            flex: 0 0 40px
            text-align: left
            transition: all 0.3s
            .icon-right-arrow
                color: #fff
                display: inline-block
                font-size: 24px
                transform: rotate(180deg)
        .search
            flex: 1
            display: inline-block
            overflow: hidden
            transition: all 0.3s
            position: relative
            .searchbtn
                font-size: 14px
                color: #999
                position: absolute
                top: 5px
                right: -28px
                opacity: 0
                transition: all 0.2s
                &.active
                    right: 0px
                    opacity: 1
            &.active
                padding-right: 45px
    .main-wrapper
        position: absolute
        left: 0
        width: 100%
        background: #fff
        .cate-wrapper
            width: 100%
            overflow-y: hidden
            .cates
                width: 100%
                font-size: 0
                overflow-x: scroll
                overflow-y: hidden
                padding: 15px 15px 20px 15px
                padding-bottom: 20px
                margin-bottom: -10px
                -webkit-overflow-scrolling: touch
                .cate-list
                    display: inline-block
                    white-space: nowrap
                    font-size: 0
                    .cate-item
                        display: inline-block
                        margin-left: 15px
                        width: 65px
                        .icon
                            width: 45px
                            height: 45px
                            background: linear-gradient(to bottom, rgb(246, 248, 252) 0%, rgb(251, 252, 254) 100%)
                            border-radius: 50%
                        .title
                            font-size: 13px
                            text-align: center
                            margin-top: 1px
                            color: rgb(110, 114, 120)
                    .cate-item:first-child
                        margin-left: 0
                        .icon
                            width: 55px
                            height: 55px
                            background: #fff
            .cates::-webkit-scrollbar
                display: none
        .cate-wrapper::-webkit-scrollbar
            display: none
        .cate-wrapper.fixed
            position: fixed
            top: 300px
            left: 0
            background: rgb(250, 250, 250)
            z-index: 1
    .shoplist-wrapper
        padding: 0 15px
</style>