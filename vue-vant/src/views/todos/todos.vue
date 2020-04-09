<template>
  <div>
    <h2>{{title}}</h2>
    <van-row>
      <van-col span="20">
        <van-cell-group>
          <van-field v-model="inputVal" placeholder="请输入" />
        </van-cell-group>
      </van-col>
      <van-col span="4">
        <van-button plain hairline type="primary" size="normal" @click="add">添加</van-button>
      </van-col>
    </van-row>
    <van-tabs v-model="activeTab" @click="selectTab" animated>
      <van-tab title="待完成">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-swipe-cell :right-width="65" :left-width="65" v-for="(item, index) in list" :key="index">
            <span slot="left" @click="complete(item)">完成</span>
            <van-cell-group>
              <van-cell :title="item.Title" />
            </van-cell-group>
            <span slot="right" @click="del(item)">删除</span>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab title="已完成">
        <van-swipe-cell :right-width="65" v-for="(item, index) in list" :key="index">
          <van-cell-group>
            <van-cell :title="item.Title" />
          </van-cell-group>
          <span slot="right" @click="del(item)">删除</span>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
    <van-row>
      
    </van-row>
  </div>
</template>

<script>
import Api  from './../../utils/api.js';
import { Cell, CellGroup,SwipeCell,Dialog, Tab, Tabs } from 'vant';
export default {
  name: 'todos',
  data() {
    return {
      title: 'Todos',
      inputVal: '',
      list: [],
      loading: false,
      activeTab: 0,
      finished: false,
    }
  },
  mounted() {
    console.log(22)
    // this.getlist()
  },
  methods: {
    // tab选项
    selectTab(val) {
      this.getlist();
    },
    // 查询
    getlist() {
      let params = {done: this.activeTab}
      Api.GetTodoList(params).then((res)=> {
        if(res.data.Code === 1) {
          this.list = res.data.Data;
          this.finished = true;
          this.loading = false;
        }
      })
    },
    // 添加
    add() {
      let params = {title: this.inputVal};
      Api.AddTodos(params).then(res => {
        if(res.data.Code === 1) {
          this.getlist();
          this.inputVal = '';
          this.$notify ({message: res.data.Message, duration: 1000, background: '#1989fa'})
        }else {
          this.$notify({message: res.data.Message, duration: 1000, background: '#f44'})
        }
      })
    },
    // 删除
    del(val) {
      console.log(val)
      let params = { id: val.ID};
      Api.DelTodos(params).then((res) => {
        if(res.data.Code === 1) {
          this.getlist();
          this.$notify ({message: res.data.Message, duration: 1000, background: '#1989fa'})
        }else {
          this.$notify({message: res.data.Message, duration: 1000, background: '#f44'})
        }
      })
    },
    // 修改
    complete(val) {
      let params = {id: val.ID};
      Api.MdyTodos(params).then(res => {
        if(res.data.Code === 1) {
          this.getlist();
          this.$notify ({message: res.data.Message, duration: 1000, background: '#1989fa'})
        }else {
          this.$notify ({message: res.data.Message, duration: 1000, background: '#f44'})
        }
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {this.getlist()});
    },
  },
  components: {  
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SwipeCell.name]: SwipeCell,
    [Dialog.name]: Dialog,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
}
</script>
<style lang="scss" scoped>

</style>
