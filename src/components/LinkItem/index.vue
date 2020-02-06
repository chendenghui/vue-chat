<template lang="html">
  <transition name="showAbout">
    <div class="link-item-wrap">
        <div class="link-inner">
          <template v-for="(item,index) in linkItem">
            <div class="link-item" >
              <div :class="['icon',`${item.iconLink}`]"></div>
              <div class="title">{{item.title}}</div>
              <div class="sec-title">{{item.secTitle}}</div>
            </div>
          </template>
        </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'LinkItem',
  data() {
    return {
      linkItem:[
        {
          title:'订单查询',
          secTitle: '查看全部订单',
          iconLink: 'icon-order'
        },
        {
          title:'退换货查询',
          secTitle: '退还中心',
          iconLink: 'icon-return'
        },
        {
          title:'人工客服',
          secTitle: '贴心的人工客服',
          iconLink: 'icon-customer-service'
        },
        {
          title:'物流查询',
          secTitle: '查询、跟踪不错过',
          iconLink: 'icon-logistics'
        },
      ],
    }
  },
  computed: {
    
  },
  methods: {
    showAbout() {
      this.$store.commit('showAbout', false);
    }
  }

}
</script>

<style lang="scss" scoped>
  a {
    color: #3F51B5;
  }
  .link-item-wrap {
    width: 100%;
    overflow-x: auto;
    
    .link-inner {
      display: inline-block;
      width: 500px;
      height: 110px;
      overflow: hidden;
    }
    .link-item {
      display: inline-block;
      background-color: #fff;
      padding: 6px 2px; 
      margin: 4px;
      width: 90px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      text-align: center;
      .icon {
        width: 30px;
        height: 30px;
        margin-top: 8px;
        display: inline-block;
        background-size: contain;
      }
      .icon-logistics {
        background-image: url(./../../common/icons/icon-logistics.svg)
      }
      .icon-order {
        background-image: url(./../../common/icons/icon-order.svg)
      }
      .icon-return {
        background-image: url(./../../common/icons/icon-return.svg)
      }
      .icon-customer-service {
        background-image: url(./../../common/icons/icon-customer-service.svg)
      }
      .title {
        font-size: 0.8rem;

      }
      .sec-title {
        font-size: 0.3rem;
        color: #999;
      }
    }
  }
</style>
