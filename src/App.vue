<template>
    <div id="app">
        <a-button type="danger" @click="showInfo()" icon="download">点击提示</a-button>
        <ul v-for="item in arr" :key="item.id">
            <li>{{item.applyUserName}}</li>
        </ul>
        <router-view/>
    </div>
</template>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

<script>
    import {
        get,
    } from './service/fetch.js';

    export default {
        data: function () {
            return {
                arr: [],
            }
        },
        methods: {
            showInfo: function () {
                get({
                    pageIndex: 1,
                    pageSize: 10,
                }).then((res) => {
                    const data = res.data.toObject();
                    this.arr = data.list;
                })
            }
        }
    }
</script>
