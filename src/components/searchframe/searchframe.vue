<template>
    <div>

        searchframe!!!!!!
    </div>
</template>

<script>
import Search from '@/base/search/search'

export default {
    name: '',
    props: [],
    data() {
        return {
            disabled: false,
            readonly: false,
            isfocus: false
        };
    },
    components: {
        Search
    },
    computed: {},
    beforeMount() { },
    mounted() { },
    methods: {

        focusThis() {
            this.isfocus = true
        },
        blurThis() {
            this.isfocus = false
            api.closeFrame({
                name: 'search'
            })
            this.$refs.comSearch.blurThis()
            //this.$refs.seatSearch.blurThis()
        },
    },
    watch: {}
}
</script>
<style>
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
</style>