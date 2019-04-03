<template>
    <div class="orderlist">
        <div class="header" ref="header">
            <h1>订单</h1>
        </div>
        <div class="main-wrapper" ref="main">
            <div class="recentlybuy-wrapper">
                <Title :name="titleName[0].name" :func="titleName[0].func +  orderlist.length +'个商家'"></Title>
                <div class="recentlybuy">
                    <ul class="recentlybuy-list">
                        <li class="list-item" v-for="(item, index) in orderlist" :key="index">
                            <img :src="item.img" class="image">
                            <h1 class="name">{{item.shopName}}</h1>
                            <span class="num">买过2次</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="myorder-wrapper">
                <Title :name="titleName[1].name" class="padding15"></Title>
                <div class="navmyorder" :class="tabActiveClass">
                    <div class="tab all" @click="chooseThis('all')">全部订单</div>
                    <div class="tab wait" @click="chooseThis('wait')">待评价</div>
                    <div class="tab refund" @click="chooseThis('refund')">退款</div>
                </div>
                <div class="orderlist-wrapper" :class="tabActiveClass" ref="orderlist">
                    <div class="tab-wrapper">
                        <transition name="fade">
                            <ul class="order-list" v-show="tabActiveClass==='all'">
                                <li class="order-item" v-for="(item, index) in orderlist" :key="index">
                                    <div class="logo">
                                        <div class="logo-img">
                                            <img v-lazy="item.img">
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-top">
                                            <div class="content-top-left">
                                                <div class="shop-name">
                                                    {{item.shopName}}
                                                    <i class="iconfont icon-right-arrow"></i>
                                                </div>
                                                <div class="shop-sale">
                                                    <span class="discount">满20减10</span>
                                                    <span class="discount">满35减15</span>
                                                    <span class="discount">满40减22</span>
                                                    <i class="iconfont icon-dian"></i>
                                                </div>
                                            </div>
                                            <div class="order-status">{{item.orderStatusStr}}</div>
                                        </div>
                                        <div class="food">
                                            <div class="food-text">
                                                {{item.productList[0].productName}}
                                                &nbsp;&nbsp;
                                                等14件商品
                                            </div>
                                            <div class="food-price">￥{{item.totalPrice}}</div>
                                        </div>
                                        <div class="button-list">
                                            <div class="button">相似商家</div>
                                            <div class="button" v-for="(button, idx) in item.buttonList" :key="idx" :class="{highlight:button.isHighlight===1}">{{button.title}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                    <div class="tab-wrapper">
                        <transition name="fade">
                            <ul class="order-list" v-show="tabActiveClass==='wait'">
                                <li class="order-item" v-for="(item, index) in waitRatinglist" :key="index">
                                    <div class="logo">
                                        <div class="logo-img">
                                            <img v-lazy="item.img">
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-top">
                                            <div class="content-top-left">
                                                <div class="shop-name">
                                                    {{item.shopName}}
                                                    <i class="iconfont icon-right-arrow"></i>
                                                </div>
                                                <div class="shop-sale">
                                                    <span class="discount">满20减10</span>
                                                    <span class="discount">满35减15</span>
                                                    <span class="discount">满40减22</span>
                                                    <i class="iconfont icon-dian"></i>
                                                </div>
                                            </div>
                                            <div class="order-status">{{item.orderStatusStr}}</div>
                                        </div>
                                        <div class="food">
                                            <div class="food-text">
                                                {{item.productList[0].productName}}
                                                &nbsp;&nbsp;
                                                等14件商品
                                            </div>
                                            <div class="food-price">￥{{item.totalPrice}}</div>
                                        </div>
                                        <div class="button-list">
                                            <div class="button">相似商家</div>
                                            <div class="button" v-for="(button, idx) in item.buttonList" :key="idx" :class="{highlight:button.isHighlight===1}">{{button.title}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                    <div class="tab-wrapper" v-show="tabActiveClass==='refun'">3</div>
                </div>
            </div>
            <div class="navmyorder fixed" :class="tabActiveClass" v-show="tabFixed" ref="navmyorder">
                <div class="tab all" @click="chooseThis('all')">全部订单</div>
                <div class="tab wait" @click="chooseThis('wait')">待评价</div>
                <div class="tab refund" @click="chooseThis('refund')">退款</div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/base/title/title'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: '',
    props: [],
    data() {
        return {
            scrollY: 0,
            orderlist: [],
            waitRatinglist: [],
            titleName: [
                {
                    name: '最近常买',
                    des: '',
                    func: '查看'
                },
                {
                    name: '我的订单',
                    des: '',
                    func: ''
                }
            ],
            tabFixed: false,
            tabActiveClass: 'all'
        }
    },
    created() {
        this.$http.get(this.localApi + 'api/orderlist').then(response => {
            response = response.body
            if (response.errno === 0) {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].showlimit = false
                }
                this.orderlist = response.data
                this.waitRatinglist = this.filterList(response.data)
            }
        })
        window.addEventListener(
            'scroll',
            () => {
                this.scrollY = window.scrollY
            },
            true
        )
    },
    components: {
        Title
    },
    computed: {
        ...mapGetters(['orderScrollTop'])
    },
    activated() {
        window.scrollTo(0, this.orderScrollTop)
    },
    deactivated() {
        this.setOrderScrollTop(window.scrollY)
    },
    beforeMount() {},
    mounted() {
        this._initSize()
    },
    methods: {
        ...mapMutations({
            setOrderScrollTop: 'SET_ORDER_SCROLLTOP'
        }),
        chooseThis(str) {
            this.tabActiveClass = str
        },
        filterList(list) {
            let arr = []
            list.forEach((item, index) => {
                item.buttonList.forEach((btn, idx) => {
                    if (btn.type === 2010) {
                        arr.push(list[index])
                    }
                })
            })
            return arr
        },
        _initSize() {
            this.$refs.header.style.paddingTop = 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 'px'
            this.$refs.main.style.paddingTop = this.$refs.header.clientHeight - 25 + 'px'
            this.$refs.main.style.paddingBottom = api.safeArea.bottom + 90 + 'px'
            this.$refs.navmyorder.style.top = 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 45 + 'px'
        }
    },
    watch: {
        scrollY(newY) {
            this.tabFixed = newY > 213
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
    opacity: 0;
}
.orderlist {
    overflow-x: hidden;
    overflow-y: auto;
}
.header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgb(255, 255, 255);
}
.header h1 {
    font-size: 15px;
    font-weight: 600;
    height: 45px;
    line-height: 45px;
}
.main-wrapper {
    padding-top: 20px;
}
.recentlybuy-wrapper {
    padding: 0 15px;
    background: rgb(255, 255, 255);
    overflow-y: hidden;
}
.recentlybuy {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px 5px 0px 5px;
    padding-bottom: 20px;
    margin-bottom: -10px;
    -webkit-overflow-scrolling: touch;
}
.recentlybuy::-webkit-scrollbar {
    display: none;
}
.recentlybuy-list {
    font-size: 0;
    white-space: nowrap;
    display: inline-block;
}
.recentlybuy-list::-webkit-scrollbar {
    display: none;
}
.recentlybuy-list .list-item {
    height: 102px;
    width: 105px;
    margin-right: 10px;
    display: inline-block;
    padding: 0 15px;
    box-shadow: 0 0px 8px 1px rgb(236, 236, 236);
}
.recentlybuy-list .list-item:last-child {
    margin-right: 0;
}
.list-item .image {
    width: 35px;
    height: 35px;
    margin-top: 10px;
}
.list-item .name {
    font-size: 12px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
}
.list-item .num {
    display: inline-block;
    font-size: 10px;
    color: #f3a42e;
    position: relative;
    padding: 2px 4px;
    margin-top: 5px;
}
.list-item .num::after {
    content: '';
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0;
    top: 0;
    border-radius: 1px;
    border: 1px solid #f3a42e;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform: scale(0.5);
    transform-origin: 0 0;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .list-item .num::after {
        content: '';
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-radius: 1px;
        border: 1px solid #f3a42e;
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}
.myorder-wrapper {
    background: rgb(255, 255, 255);
}
.padding15 {
    padding-left: 15px;
    padding-right: 15px;
}
.navmyorder {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    position: relative;
    background: rgb(255, 255, 255);
}
.navmyorder.fixed {
    position: fixed;
    z-index: 100;
    top: 89px;
}
.navmyorder .all,
.navmyorder .refund {
    flex: 0 0 28%;
}
.navmyorder .wait {
    flex: 0 0 44%;
}
.navmyorder .tab {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
}
.navmyorder::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #e4e4e4;
    left: 0;
    bottom: 0;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}
.navmyorder::after {
    content: '';
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    position: absolute;
    width: 20px;
    height: 0;
    left: -50%;
    bottom: 0;
    border-radius: 1px;
    border: 1px solid rgba(224, 205, 143, 1);
    transform: translate3d(-50%, 0, 0);
    transition: all 0.3s;
}
.navmyorder.all::after {
    left: 14%;
}
.navmyorder.refund::after {
    left: 86%;
}
.navmyorder.wait::after {
    left: 50%;
}
.orderlist-wrapper {
    -webkit-overflow-scrolling: touch;
    display: flex;
    transition: all 0.3s;
}
.orderlist-wrapper.all {
    transform: translate3d(0, 0, 0);
}
.orderlist-wrapper.wait {
    transform: translate3d(-100%, 0, 0);
}
.orderlist-wrapper.refund {
    transform: translate3d(-200%, 0, 0);
}
.tab-wrapper {
    flex: 0 0 100%;
}
.order-list {
    width: 100%;
    padding: 0 10px;
}
.order-list .order-item {
    width: 100%;
    margin: 15px 0px 0px 0;
    background: #fff;
    box-shadow: 0 0px 8px 1px rgb(236, 236, 236);
    font-size: 0;
    flex-direction: row;
    display: flex;
    position: relative;
    border-radius: 4px;
    padding: 15px;
}
.order-list .order-item:last-child {
    margin-bottom: 15px;
}
.order-list .order-item .logo {
    width: 35px;
    height: 35px;
    position: relative;
    margin-right: 8px;
    flex-shrink: 0;
    border-radius: 4px;
}
.order-list .order-item .logo::after {
    content: '';
    position: absolute;
    border: 1px solid #dad1d4;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    box-sizing: border-box;
    border-radius: 8px;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.order-list .order-item .logo-img {
    display: block;
    width: 100%;
}
.order-list .order-item .logo-img img {
    width: 35px;
    height: 35px;
    border-radius: 4px;
}
.order-list .order-item .content {
    flex: 1 0;
    width: 0;
    overflow: hidden;
}
.order-list .order-item .content .content-top {
    font-size: 0;
    display: flex;
    position: relative;
    padding-bottom: 15px;
}
.order-list .order-item .content .content-top::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: rgb(233, 233, 233);
    left: 0;
    bottom: 0;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}
.order-list .order-item .content .content-top .content-top-left {
    flex: 1;
    width: 0;
    overflow: hidden;
}
.order-list .order-item .content .content-top .shop-name {
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.order-list .order-item .content .content-top .shop-sale {
    text-align: left;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
}
.order-list .order-item .content .content-top .shop-sale .icon-dian {
    font-size: 14px;
}
.order-list .order-item .content .content-top .shop-sale .discount {
    display: inline-block;
    text-align: center;
    font-size: 9px;
    font-weight: 400;
    padding: 0px 4px;
    margin-top: 5px;
    color: #ff021c;
    margin-right: 5px;
    position: relative;
}
.order-list .order-item .content .content-top .shop-sale .discount::after {
    content: '';
    position: absolute;
    border: 1px solid #dad1d4;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border-radius: 1px;
    box-sizing: border-box;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.order-list .order-item .content .content-top .shop-sale .icon-dian {
    font-size: 18px;
    line-height: 16px;
    position: absolute;
    top: 5px;
}
.order-list .order-item .content .content-top .order-status {
    flex: 0 0 100px;
    font-size: 14px;
    text-align: right;
    line-height: 35px;
}
.order-list .order-item .content .food {
    display: flex;
    line-height: 50px;
    justify-content: space-between;
}
.order-list .order-item .content .food .food-text {
    flex: 1;
    width: 0;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: rgb(101, 101, 101);
}
.order-list .order-item .content .food .food-price {
    flex: 0 0 90px;
    font-size: 14px;
    text-align: right;
    font-weight: 600;
}
.order-list .order-item .content .food .food-text .icon-dian {
    font-size: 14px;
}
.order-list .order-item .content .food .food-text .foot-num {
    font-size: 14px;
}
.order-list .order-item .content .button-list {
    display: flex;
    text-align: center;
    justify-content: flex-end;
    align-items: flex-end;
}
.order-list .order-item .content .button-list .button {
    flex: 0 0 80px;
    font-size: 14px;
    position: relative;
    margin-left: 10px;
    height: 32px;
    line-height: 32px;
}
.order-list .order-item .content .button-list .button.highlight {
    background: rgb(235, 206, 108);
    border-radius: 2px;
}
.order-list .order-item .content .button-list .button.highlight:after {
    display: none;
}
.order-list .order-item .content .button-list .button::after {
    content: '';
    position: absolute;
    border: 1px solid #dad1d4;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    box-sizing: border-box;
    border-radius: 4px;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
</style>