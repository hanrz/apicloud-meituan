<template>
    <div class="scroll-wrapper" ref="scrollwrapper">
    </div>
</template>

<script>
export default {
    name: '',
    props: [''],
    data() {
        return {
        };
    },
    components: {},
    computed: {},
    beforeMount() { },
    mounted() {
        var scrollitem = this.$refs.scrollwrapper
        console.log(scrollitem.clientWidth)
        scrollitem.style.height = (scrollitem.clientWidth - 30) * 0.253 + 'px'
        // this._initImgScroll()
    },
    methods: {
        _initImgScroll() {
            var scrollitem = this.$refs.scrollwrapper
            var UIScrollPicture = api.require('UIScrollPicture');
            UIScrollPicture.open({
                rect: {
                    x: scrollitem.offsetLeft + 15,
                    y: scrollitem.offsetTop,
                    w: scrollitem.clientWidth - 30,
                    h: scrollitem.clientHeight
                },
                data: {
                    paths: ['http://p0.meituan.net/720.0.100/wmbanner/856c7bd076361eda68e14c495e1166ae72491.png', 'http://p0.meituan.net/720.0.100/wmbanner/9bea9a21f5af519770b4e40e1fd0b3ba160239.png@!style1'],
                },
                styles: {
                    indicator: {
                        dot: {                         // （可选项）JSON对象；指示器小圆点样式；不传则使用系统默认小圆点样式
                            w: 10,  //（必选项）数字类型；小圆点宽度
                            h: 10, //（必选项）数字类型；小圆点高度
                            r: 5,  //（必选项）数字类型；corner 页面控制器指示标记（矩形）的圆角大小
                            margin: 20  //（必选项）数字类型；小圆点间距
                        },
                        align: 'center',
                        color: '#FFFFFF',
                        activeColor: '#DA70D6'
                    }
                },
                contentMode: 'scaleToFill',
                interval: 3,
                loop: true,
                fixedOn: '',
                fixed: false
            }, function (ret, err) {
                if (ret) {
                    alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err));
                }
            });
        }
    },
    watch: {}
}
</script>
<style>
.scroll-wrapper {
    padding: 0 15px;
    border-radius: 6px;
    overflow: hidden;
}
</style>