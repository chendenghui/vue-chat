<template lang="html">

  <transition name="slide-left">
    <div class="content">
      <!-- 聊天界面头部 -->
      <div class="content-header">
        <div class="chatting-menu">
          <i @click="$router.push('/')" class="icon-concle"></i>
        </div>
        
        <div class="chatting-title">
          {{title}}
        </div>
        <div class="chatting-more">
          <i @click="$router.push('/')" class="icon-more"></i>
        </div>

      </div>
      <div class="content-wrap">
        <div><div class="a-title">{{title}}</div></div>
        <div class="a-content">答：</div>
        <div class="content-text">{{this.a}}</div>
        <div class="content-img" v-if="Number(this.id) === 7">
            <img src="../../common/images/a1.png" alt="">
            <img src="../../common/images/a2.png" alt="">
            <img src="../../common/images/a3.png" alt="">
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import Qa from './Qa';
import { getUrlParam } from './../../utils';

export default {
  name: 'Qa',
  data() {
    return {
      title:'',
      a:"",
      qa:[],
      id:1
    }
  },
  components: { },
  watch: {
  
  },
  computed: {
  
  },

  created() {
    this.id = getUrlParam('id');
    this.qa = Qa;
    this.qa.forEach(item =>{
      if(item.number === Number(this.id)){
        this.title = item.q;
        this.a = item.a;
      }
    })
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  $blue: #2196f3;
  @mixin ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      width: 100%;
      background-color: #fff;
      color: #262626;
      padding-left: 10px;
      padding-right: 15px;

      .chatting-more {
        .icon-more {
          width: 20px;
          height: 20px;
          background: url('../../common/icons/icon-more.svg') no-repeat;
          background-size: contain;
        }
      }

      .chatting-title {
        max-width: 260px;
        @include ellipsis;
        i.icon-group {
          vertical-align: top;
          width: 20px;
          height: 20px;
          background: url('../../common/icons/icon-group.svg') no-repeat;
          background-size: contain;
          margin-right: 3px;
        }
      }

      .chatting-menu {
        i.icon-concle {
          width: 20px;
          height: 20px;
          background: url('../../common/icons/icon-concle.svg') no-repeat;
          background-size: contain;
        }
      }
    }

    .content-wrap {
      flex: 1;
      width: 100%;
      background-color: rgba(0, 0, 0, .1);
      overflow: auto;
      padding: 20px 10px;
      .a-title {
        color: #2196f3;
      }
      .a-content {
        margin-top: 10px;
      }
    }
  }
</style>
