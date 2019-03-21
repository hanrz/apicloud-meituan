<template>
    <div class="search-wrapper">
        <div class="searchbar">
            <i class="iconfont icon-sousuo"></i>
            <form action="">
                <input :disabled="disabled" :readonly="readonly" :placeholder="placeholder" unselectable="on" @focus="focus" @blur="blur" ref="noInput">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        disabled: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '请输入商家或商品名称'
        },
        myfocus:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
        };
    },
    components: {},
    computed: {},
    beforeMount() { },
    mounted() {
    },
    methods: {
        focus() {
            this.$emit('focus')
        },
        blur() {
            this.$emit('blur')
        },
        blurThis() {
            this.$refs.noInput.blur()
        },
        focusThis() {
            this.$refs.noInput.click()
            console.log(this.$refs.noInput.click())
        }
    },
    watch: {}
}
</script>
<style scoped>
.search-wrapper {
    width: 100%;
    background: rgb(254, 254, 254);
}
.searchbar {
    position: relative;
    width: 100%;
}
.searchbar .iconfont {
    position: absolute;
    z-index: 2;
    left: 7px;
    top: 7px;
    color: rgb(135, 133, 130);
}
.searchbar input {
    width: 100%;
    position: relative;
    border: none;
    height: 30px;
    padding-left: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 30px;
    font-size: 14px;
    opacity: 1;
    background: rgb(239, 237, 235);
    -webkit-tap-highlight-color: transparent;
}
</style>