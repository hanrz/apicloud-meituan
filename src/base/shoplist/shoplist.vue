<template>
    <div class="shoplist">
        <div class="sort-wrapper">
            <div class="sort-l">
                <div class="sort-cate">
                    <span class="sort-title" @click.stop="SortClick($el,$event)">{{nosortList[selectSort]}}</span>
                    <i class="iconfont icon-bottom-arrow" :class="{showsort:showSort}"></i>
                </div>
                <div class="sort-list" ref="sortList">
                    <ul>
                        <li v-for="(sort, index) in nosortList" :key="index" ref="sortitem" :class="{active:selectSort === index}" @click="selectThisSort(index)">{{sort}}</li>
                    </ul>
                </div>
                <div class="sort-sp">销量</div>
                <div class="sort-sp">距离</div>
            </div>
            <div class="sort-r">
                <span class="sort-sp">筛选</span>
                <i class="iconfont icon-bottom-arrow"></i>
            </div>
        </div>
        <div class="fixed" v-show="sortshow" ref="fixed">
            <div class="sort-wrapper">
                <div class="sort-l">
                    <div class="sort-cate">
                        <span class="sort-title" @click.stop="SortClick($el,$event)">{{nosortList[selectSort]}}</span>
                        <i class="iconfont icon-bottom-arrow" :class="{showsort:showSort}"></i>
                    </div>
                    <div class="sort-list" ref="sortList">
                        <ul>
                            <li v-for="(sort, index) in nosortList" :key="index" ref="sortitem" :class="{active:selectSort === index}" @click="selectThisSort(index)">{{sort}}</li>
                        </ul>
                    </div>
                    <div class="sort-sp">销量</div>
                    <div class="sort-sp">距离</div>
                </div>
                <div class="sort-r">
                    <span class="sort-sp">筛选</span>
                    <i class="iconfont icon-bottom-arrow"></i>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="filter-item">会员红包</div>
                <div class="filter-item">减配送费</div>
                <div class="filter-item">赠准时宝</div>
                <div class="filter-item">满减优惠</div>
            </div>
        </div>
        <transition name="fade">
            <div class="bg-wrapper" v-show="showSort" @touchstart="SortClick()"></div>
        </transition>
        <div class="filter-wrapper">
            <div class="filter-item">会员红包</div>
            <div class="filter-item">减配送费</div>
            <div class="filter-item">赠准时宝</div>
            <div class="filter-item">满减优惠</div>
        </div>
        <div class="list-wrapper">
            <ul class="shop-ul">
                <li class="shop-item" v-for="(shop, index) in shopList" :key="index">
                    <div class="logo">
                        <div class="logo-img">
                            <img v-lazy="shop.picUrl">
                        </div>
                    </div>
                    <div class="content">
                        <div class="shop-name">{{shop.shopName}}</div>
                        <div class="shop-desc">
                            <div>
                                <div class="shop-star" style="height: 10px;">
                                    <i class="star" style="transform: scale(0.833333);"></i>
                                </div>
                                <span class="shop-remark">{{_filterRemark(shop.wmPoiScore)}}</span>
                                <span class="shop-text">{{shop.monthSalesTip}}</span>
                            </div>
                            <div class="shop-distence">
                                <span class="shop-text">{{shop.deliveryTimeTip}}</span>
                                <span class="shop-text">{{shop.distance}}</span>
                            </div>
                        </div>
                        <div class="shop-distribution">
                            <span class="shop-text">{{shop.minPriceTip}}</span>
                            <span class="shop-text">{{shop.shippingFeeTip}}</span>
                            <span class="shop-text">{{shop.averagePriceTip}}</span>
                        </div>
                        <div class="shop-sale" :class="{view:shop.showlimit}" @click.stop="_toggleCounts(index)">
                            <i class="iconfont icon-bottom-arrow"></i>
                            <div v-for="(dis, dindex) in shop.discounts2" :key="dindex">
                                <span class="discount" v-for="(count, cindex) in dis.info.split(';')" :key="cindex">{{count}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shopList: {
            type: Array,
            default: []
        },
        nosortList: {
            type: Array,
            default: () => {
                return ['综合排序', '速度最快', '评分最高', '起送价最低', '配送费最低', '人均高到低', '人均低到高']
            }
        },
        sortshow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showSort: false,
            selectSort: 0
        }
    },
    components: {},
    computed: {},
    beforeMount() {},
    mounted() {
        this._initSize()
    },
    methods: {
        SortClick(el,event) {
            if (el) {
                this.$emit('sortclick', [el,event])
            }
            this.showSort = !this.showSort
            //let itemHeight = this.$refs.sortitem[0].clientHeight
            //this.$refs.sortList.style.maxHeight = this.showSort ? itemHeight * this.nosortList.length + 'px' : 0
        },
        selectThisSort(index) {
            this.selectSort = index
            this.showSort = false
        },
        _initSize() {
            this.$refs.fixed.style.top = this.global.isApp ? 2 * api.safeArea.top + this.HEAD_PADDING_TOP + 50 + 'px' : '50px'
        },
        _filterRemark(num) {
            let arr = num.toString().split('')
            return arr.join('.')
        },
        _toArray(str) {
            return str.split(';')
        },
        _toggleCounts(index) {
            this.shopList[index].showlimit = !this.shopList[index].showlimit
        }
    },
    watch: {
        showSort() {
            let itemHeight = this.$refs.sortitem[0].clientHeight
            this.$refs.sortList.style.maxHeight = this.showSort ? itemHeight * this.nosortList.length + 'px' : 0
        }
    }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
.shoplist {
    width: 100%;
}
.fixed {
    position: fixed;
    left: 0;
    width: 100%;
    background: rgb(250, 250, 250);
    padding: 0 15px;
    z-index: 19;
    transition: 0.2s all;
}
.sort-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0;
    position: relative;
    margin: 0 -15px;
    padding: 0 15px;
    padding-top: 10px;
}
.sort-l {
    flex: 1;
    text-align: left;
}
.bg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
}
.sort-list {
    position: absolute;
    left: 0;
    width: 100%;
    background: rgb(250, 250, 250);
    z-index: 20;
    max-height: 0px;
    overflow: hidden;
    transition: 0.3s all ease;
}
.sort-list ul li {
    font-size: 13px;
    background: rgb(250, 250, 250);
    padding: 15px 0 10px 20px;
}
.sort-list ul li.active {
    color: #f3a42e;
    font-weight: 700;
}
.sort-l .sort-cate {
    display: inline-block;
    margin-right: 10px;
}
.sort-l .sort-cate .sort-title {
    font-size: 14px;
    font-weight: 700;
}
.sort-l .sort-cate .iconfont {
    font-weight: 700;
    font-size: 13px;
    display: inline-block;
}
.sort-l .sort-cate .iconfont.showsort {
    transform: rotate(180deg);
}
.sort-l .sort-sp {
    margin-right: 10px;
}
.sort-sp {
    font-size: 13px;
    display: inline-block;
}
.sort-r {
    flex: 0 0 50px;
    text-align: right;
}
.sort-r .iconfont {
    font-size: 13px;
    font-weight: normal;
}
.filter-wrapper {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
.filter-item {
    width: 23%;
    background: #f0f0f0;
    font-size: 12px;
    padding: 5px 0;
}
.list-wrapper {
    overflow: hidden;
}
.shop-ul {
    overflow: hidden;
}
.shop-item {
    flex-direction: row;
    display: flex;
    text-decoration: none;
    box-sizing: border-box;
    margin-bottom: 25px;
    margin-top: 10px;
    position: relative;
}
.shop-item .logo {
    width: 76px;
    height: 57px;
    position: relative;
    box-sizing: border-box;
    margin-right: 8px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
}
.shop-item .logo::after {
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
.shop-item .logo .logo-img {
    display: block;
    width: 100%;
}
.shop-item .logo .logo-img img {
    width: 100%;
    height: 100%;
}
.shop-item .content {
    flex: 1 0;
    min-width: 0;
    font-size: 0;
}
.shop-item .content .shop-name {
    font-size: 16px;
    color: #333;
    text-align: left;
    line-height: 1.4;
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
}
.shop-item .content .shop-desc {
    display: flex;
    margin-top: 4px;
}
.shop-item .content .shop-desc .shop-star {
    display: inline-block;
    height: 10px;
}
.shop-item .content .shop-desc .shop-star .star {
    background: url('./star.png');
    width: 12px;
    height: 12px;
    float: left;
    background-position: 40% 5.66%;
    background-size: 126% 379%;
}
.shop-item .content .shop-desc .shop-remark {
    color: #f3a42e;
    font-size: 11px;
    line-height: 1.4;
}
.shop-text {
    font-size: 11px;
    color: #333;
    line-height: 1.4;
    margin-left: 5px;
}
.shop-distence {
    flex: 1 0;
    text-align: right;
}
.shop-distribution {
    text-align: left;
    margin-top: 4px;
}
.shop-distribution .shop-text {
    margin-left: 0;
    margin-right: 5px;
}
.shop-sale {
    text-align: left;
    max-height: 25px;
    overflow: hidden;
    position: relative;
    transition: 0.2s all ease;
}
.shop-sale.view {
    max-height: 100px;
    overflow: visible;
    transition: 0.8s all ease;
}
.shop-sale.view .iconfont {
    transform: rotate(180deg);
}
.shop-sale div {
    display: inline-block;
}
.shop-sale .discount {
    display: inline-block;
    text-align: center;
    font-size: 9px;
    font-weight: 400;
    padding: 2px 4px;
    margin-top: 4px;
    color: #ff021c;
    margin-right: 5px;
    position: relative;
}
.shop-sale .discount::after {
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
.shop-sale .iconfont {
    font-size: 12px;
    font-weight: normal;
    position: absolute;
    transform-origin: center;
    top: 6px;
    right: 0;
    color: #bdbdbd;
}
</style>