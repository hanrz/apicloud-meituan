<template>
    <div class="my" ref="my">
        <div class="header" ref="header">
            <div class="header-wrapper">
                <div class="image-wrapper">
                    <img :src="userInfo.face" class="avatar">
                    <div class="content">
                        <span class="name">{{userInfo.userName}}</span>
                        <span class="info">
                            个人信息
                            <i class="iconfont icon-right-arrow"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="icon-wrapper" ref="iconbtn">
                <h1 class="name" ref="titlename">{{userInfo.userName}}</h1>
                <span class="iconfont icon-shezhi"></span>
                <span class="iconfont icon-xiaoxi1"></span>
            </div>
        </div>
        <div class="main-wrapper">
            <div class="cate-wrapper">
                <div class="cate-item" v-for="(cate, index) in cates" :key="index">
                    <img :src="cate.icon" class="cate-icon">
                    <span class="cate-name" v-text="cate.name"></span>
                </div>
            </div>
            <div class="second-wrapper">
                <div class="title">
                    <h1>我的资产</h1>
                </div>
                <div class="cate-wrapper">
                    <div class="cate-item" v-for="(cate, index) in zichan" :key="index">
                        <img :src="cate.icon" class="cate-icon">
                        <span class="cate-name" v-text="cate.name"></span>
                    </div>
                </div>
            </div>
            <div class="second-wrapper">
                <div class="title">
                    <h1>我的服务</h1>
                </div>
                <div class="cate-wrapper">
                    <div class="cate-item" v-for="(cate, index) in fuwu" :key="index">
                        <img :src="cate.icon" class="cate-icon">
                        <span class="cate-name" v-text="cate.name"></span>
                    </div>
                </div>
            </div>
            <div class="second-wrapper">
                <div class="title">
                    <h1>更多推荐</h1>
                </div>
                <div class="cate-wrapper">
                    <div class="cate-item" v-for="(cate, index) in tuijian" :key="index">
                        <img :src="cate.icon" class="cate-icon">
                        <span class="cate-name" v-text="cate.name"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shoucang from '@/pages/my/shoucang.jpg'
import zuji from '@/pages/my/zuji.jpg'
import pingjia from '@/pages/my/pingjia.jpg'
import daxie from '@/pages/my/daxie.jpg'
import dizhi from '@/pages/my/dizhi.jpg'
import hongbao from '@/pages/my/hongbao.jpg'
import daijin from '@/pages/my/daijin.jpg'
import qianbao from '@/pages/my/qianbao.jpg'
import bangzhu from '@/pages/my/bangzhu.jpg'
import kefu from '@/pages/my/kefu.jpg'
import yaoqing from '@/pages/my/yaoqing.jpg'
import shangjia from '@/pages/my/shangjia.png'
import qishou from '@/pages/my/qishou.png'
import hezuo from '@/pages/my/hezuo.png'
import gongyi from '@/pages/my/gongyi.png'

export default {
    name: '',
    props: [''],
    data() {
        return {
            userInfo: {},
            scrollY: 0,
            catedata: [],
            cates: [
                {
                    icon: shoucang,
                    name: '我的收藏'
                },
                {
                    icon: zuji,
                    name: '我的足迹'
                },
                {
                    icon: pingjia,
                    name: '我的评价'
                },
                {
                    icon: daxie,
                    name: '答谢记录'
                },
                {
                    icon: dizhi,
                    name: '我的地址'
                }
            ],
            zichan: [
                {
                    icon: hongbao,
                    name: '红包'
                },
                {
                    icon: daijin,
                    name: '代金券'
                },
                {
                    icon: qianbao,
                    name: '我的钱包'
                }
            ],
            fuwu: [
                {
                    icon: bangzhu,
                    name: '帮助与反馈'
                },
                {
                    icon: kefu,
                    name: '客服中心'
                }
            ],
            tuijian: [
                {
                    icon: yaoqing,
                    name: '邀请有奖'
                },
                {
                    icon: shangjia,
                    name: '商家入驻'
                },
                {
                    icon: qishou,
                    name: '骑手招募'
                },
                {
                    icon: hezuo,
                    name: '我要合作'
                },
                {
                    icon: gongyi,
                    name: '美团公益'
                }
            ]
        }
    },
    components: {},
    computed: {
       
    },
    created() {
        this.$http.get(this.localApi + 'api/catedata').then(response => {
            response = response.body
            if (response.errno === 0) {
                this.userInfo = response.data.userInfo
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
    beforeMount() {
        //this._initSize()
    },
    mounted() {
        console.log([document.querySelector('.header')])
        this._initSize()
        
    },
    activated() {
       
    },
    deactivated() {
       
    },
    methods: {
        _initSize() {
            this.$refs.iconbtn.style.top = 226 + api.safeArea.top + 'px'
            this.$refs.iconbtn.style.height = 45 + api.safeArea.top + 'px'
            this.$refs.my.style.paddingBottom = api.safeArea.bottom + 90 + 'px'
            let headerBgHeight = document.querySelector('.header').clientWidth
            let frameIndent = 226 + api.safeArea.top
            let resizeNum = headerBgHeight - frameIndent - 140
            console.log(resizeNum)
            resizeNum > 0 ? (this.$refs.my.style.marginTop = -resizeNum + 'px') : (this.$refs.my.style.paddingTop = -resizeNum + 'px')
        }
    },
    watch: {
        scrollY(newY) {
            let percent = newY / api.safeArea.top
            this.$refs.iconbtn.style.backgroundColor = `rgba(250, 250, 250, ${percent})`
            this.$refs.titlename.style.opacity = percent
        }
    }
}
</script>
<style lang="stylus" scoped>
.my
    background-color:rgb(250,250,250)
.header
    background-image: url('bg_mine_account_image@2x.png')
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    transform-origin: top
    background-size: cover
    .header-wrapper
        position: absolute
        left: 0
        bottom: 20px
        display: flex
        width: 100%
        padding: 0 14px
        justify-content: space-between
        .image-wrapper
            flex: 1
            font-size: 0
            text-align: left
            .avatar
                display: inline-block
                width: 55px
                height: 55px
                border-radius: 50%
            .content
                display: inline-block
                height: 55px
                vertical-align: top
                margin-left: 10px
                padding-top: 10px
                .name
                    display: block
                    font-size: 14px
                    text-align: left
                .info
                    display: block
                    font-size: 13px
                    text-align: left
    .icon-wrapper
        width: 100%
        position: fixed
        background-color: rgba(250, 250, 250, 0)
        text-align: center
        right: 0px
        .name
            position: absolute
            bottom: 10px
            width: 100%
            font-size: 16px
            color: #333
            opacity: 0
        .icon-shezhi
            font-size: 20px
            margin-right: 10px
            position: absolute
            bottom: 10px
            right: 40px
        .icon-xiaoxi1
            font-size: 20px
            position: absolute
            bottom: 10px
            right: 14px
.main-wrapper
    min-height: 700px
    background: rgb(250, 250, 250)
    .cate-wrapper
        display: flex
        width: 100%
        max-height: 170px
        flex-wrap: wrap
        align-items: center
        padding: 5px 15px 15px 15px
        background: rgb(255, 255, 255)
        .cate-item
            display: flex
            flex-direction: column
            width: 25%
            justify-content: center
            align-items: center
            .cate-icon
                width: 25px
                height: 25px
                margin-bottom: 5px
                margin-top: 15px
            .cate-name
                font-size: 12px
    .second-wrapper
        margin-top: 15px
        .title
            height: 50px
            background: rgb(255, 255, 255)
            position: relative
            overflow: hidden
            h1
                font-size: 15px
                line-height: 50px
                text-align: left
                padding-left: 15px
                color: rgb(96, 96, 96)
            &::after
                content: ''
                display: block
                position: absolute
                left: 15px
                bottom: 0
                border-top: 1px solid rgb(226, 226, 226)
                width: 100%
                transform: scaleY(0.5)
                transform-origin: 0 0
</style>