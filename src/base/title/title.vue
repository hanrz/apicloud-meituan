<template>
    <div class="index-title">
        <div class="title">
            <div class="title-name" v-text="name"></div>
            <div class="title-des" v-text="des" v-if="des"></div>
        </div>
        <div class="title-func" v-if="func">
            {{func}}
            <i class="iconfont icon-right-arrow"></i>
        </div>

    </div>
</template>

<script>
export default {
    name: '',
    props: {
        name: {
            type: String,
            default: ''
        },
        des: {
            type: String,
            default: ''
        },
        func: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    components: {},
    computed: {},
    beforeMount() { },
    mounted() { },
    methods: {},
    watch: {}
}
</script>
<style scoped>
.index-title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
    padding-bottom:5px;
}
.title {
    flex: 1;
    text-align: left;
}
.title .title-name {
    font-size: 19px;
    font-weight: 700;
    display: inline-block;
    vertical-align: middle;
}
.title .title-des {
    font-size: 11px;
    display: inline-block;
    vertical-align: middle;
}
.title-func {
    flex: 1;
    font-size: 12px;
    vertical-align: middle;
    position: relative;
    text-align: right;
}
.icon-right-arrow {
    font-size: 12px;
    margin-left: -2px;
    font-weight: 300;
}
</style>