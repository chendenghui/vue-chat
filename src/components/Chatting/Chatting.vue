<template lang="html">

  <transition name="slide-left">
    <div class="chatting">
      <!-- 聊天界面头部 -->
      <div class="chatting-header">
        <div class="chatting-menu">
          <i @click="$router.push('/')" class="icon-concle"></i>
        </div>
        
        <div class="chatting-title">
          华为商城客服小艺
        </div>
        <div class="chatting-more">
          <i @click="$router.push('/')" class="icon-more"></i>
        </div>

      </div>

      <!-- 聊天内容区域 -->
      <div @click.stop.prevent="isShowEmoji=false" ref="chattingContent" class="chatting-content">
        <LinkItem></LinkItem>

        <div v-for="item of msgs">
          <div v-if="item.self" class="chatting-item self clearfix">
            <div class="msg-date">
              {{ item.date }}
            </div>
            <div class="msg-from">
              <!-- <span class="loc">[{{item.loc}}]</span> -->
              <span class="msg-author">{{ item.from}}</span>
              <img src="./../../common/icons/portrait.svg" alt="">
            </div>
            <div class="msg-content" v-html="item.content"></div>
          </div>

          <div v-else class="chatting-item other clearfix">
            <!-- <div class="msg-date">
              {{ item.date }}
            </div> -->
            <div class="msg-from">
              <img src="./../../common/icons/server-portrait.svg" alt="">
              <!-- <span class="loc">[{{item.loc}}]</span> -->
              <span class="msg-author">{{ item.from }}</span>
            </div>
            <div class="msg-content" v-html="item.content"></div>
          </div>

        </div>

        <!-- <div class="online">
          microzz上线了
        </div> -->

      </div>

      <!-- 输入区域 -->
      <div class="chatting-input">
        <transition name="slide-bottom">
          <div v-show="isShowEmoji" class="emoji-display">
            <ul>
              <li @click="insertText(item)" v-for="item of emojis">{{item}}</li>
            </ul>
          </div>
        </transition>
        <!-- <div class="emoji">
          <i @click="showEmoji(isShowEmoji=!isShowEmoji);" class="icon-emoji"></i>
        </div> -->
        <textarea @keyup.enter="send" @input="newLine" ref="textarea" v-model.trim="inputContent" placeholder="请输入您要咨询的问题"></textarea>
        <div class="send-wrap" @click="send">
        
          <i :class="active ?'icon-send-active' : 'icon-send'"></i>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import LinkItem from './../LinkItem';
import Qa from './Qa';

export default {
  name: 'chatting',
  data() {
    return {
      msgs: localStorage.msgs_group && JSON.parse(localStorage.msgs_group) || [
        // { date: '2015-11-09 09:57:08', loc: '江西省南昌市', from: 'microzz', avatarUrl: `https://icdn.microzz.com/20170426_vue_chat/icon-avatar${this.random(11)}.svg`, content: 'test', self: false}
      ],
      inputContent: '',
      oContent: {},
      oTextarea: {},
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
      isShowEmoji: false,
      isRedAI: false,
      active: false,
      qa:[],
    }
  },
  components: {
    LinkItem,
  },
  watch: {
    msgs(val) {
      localStorage.msgs_group = JSON.stringify(val);
    },
    inputContent(val) {
      this.active = !!val;
    },
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    avatarUrl() {
      return this.$store.state.avatarUrl;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/')
    } else {
      next();
    }
  },
  created() {
    this.qa = Qa;
  },
  mounted() {
    const link = this.qa.map((item)=>{ return `<a href=\"http://localhost:8080/#/qa?id=${item.number}\" target=\"_blank\">${item.number}、${item.q}</a><br />`}).join('');
    const linkContent= "<div>尊敬的用户，智能客服小艺很高兴为您服务，为配合新型肺炎的防疫工作，在线人工服务时间调整至9点至21点，建议您优先通过智能客服尝试自助解决问题<br />"+link+"</div>";
    this.msgs.push({
      date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
      loc: localStorage.addr,
      from: '客服小姐姐',
      content: linkContent,
      // content: "<div>尊敬的用户，智能客服小艺很高兴为您服务，为配合新型肺炎的防疫工作，在线人工服务时间调整至9点至21点，建议您优先通过智能客服尝试自助解决问题<br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">1、中药汤剂应该怎么保存？可以保存多长时间？</a><br /><a href=\"http://localhost:8080/#/qa?id=2\" target=\"_blank\">2、儿童方有适用年龄和服用注意事项吗？</a><br /><a href=\"http://localhost:8080/#/qa?id=3\" target=\"_blank\">3、省外可以配送吗？是包邮的吗？多久可以送达？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">4、该新冠肺炎预防方6剂可以服用多少天？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">5、新冠肺炎预防方怎么服用效果最佳？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">6、服药期间，饮食需要忌口吗？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">7、如何查询我的订单？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">8、直接给我药液，我怎么知道你到底是用什么药材煎的啊？</a><br /><a href=\"http://localhost:8080/#/qa?id=1\" target=\"_blank\">9、这种塑料材料在高温下不会产生有害物质吗？</a></div>",
      self: false,
      avatarUrl: this.avatarUrl
    });

    setInterval(() => this.isRedAI = !this.isRedAI, 2500);

    this.oContent = document.querySelector('.chatting-content');
    this.oContent.scrollTop = this.oContent.scrollHeight;
    this.oTextarea = document.querySelector('textarea');

    socket.emit('online', this.$store.state.name);

    socket.on('online', (name) => {
      if (!name) {
        return;
      }
      let oOnline = document.createElement('div');
      oOnline.className = 'online';
      oOnline.innerText = name + '上线了';
      this.oContent.appendChild(oOnline);
      this.oContent.scrollTop = this.oContent.scrollHeight;


    });

    // 接收群聊消息
    socket.on('receiveGroupMsg', data => {
      this.msgs.push(data);
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight;
      }, 0);
    });

    this.oContent.scrollTop = this.oContent.scrollHeight;
  },
  methods: {
    send() {
      this.isShowEmoji = false;
      if (this.inputContent === '') {
        return;
      } else {
        socket.emit('sendGroupMsg', {
          date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          loc: localStorage.addr,
          from: `${localStorage.name}||''`,
          content: this.inputContent,
          avatarUrl: this.avatarUrl
        });
        this.msgs.push({
          date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          loc: localStorage.addr,
          from: `${localStorage.name}||'您'`,
          content: this.inputContent,
          self: true,
          avatarUrl: this.avatarUrl
        });
        this.qa.map((item) => {
          if(item.q === this.inputContent) {
            this.msgs.push({
              date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
              loc: localStorage.addr,
              from: '客服小姐姐',
              content: item.a,
              self: false,
              avatarUrl: this.avatarUrl
            });
          }
        });
        
        this.inputContent = '';
        setTimeout(() => this.oContent.scrollTop = this.oContent.scrollHeight, 0);
      };
    },

    showEmoji(flag) {
      this.isShowEmoji = flag;
    },

    insertText(str) {
      str = str + ` `;
      const oTextarea = this.$refs.textarea;

      if (document.selection) {

        let sel = document.selection.createRange();

        sel.text = str;

      } else if (typeof oTextarea.selectionStart === 'number' && typeof oTextarea.selectionEnd ==='number') {

        let startPos = oTextarea.selectionStart;
        let endPos = oTextarea.selectionEnd;
        let cursorPos = startPos;
        let tempVal = oTextarea.value;
        this.inputContent = tempVal.substring(0, startPos) + str + tempVal.substring(startPos, tempVal.length)
        cursorPos += str.length;
        oTextarea.selectionStart = oTextarea.selectionEnd = cursorPos;

      } else {
        oTextarea.value += str;
      }
      this.newLine();
    },

    newLine() {
      setTimeout(() => this.oTextarea.scrollTop = this.oTextarea.scrollHeight, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
  $blue: #2196f3;

  .chatting {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .chatting-header {
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

    .chatting-content {
      flex: 1;
      width: 100%;
      background-color: rgba(0, 0, 0, .1);
      overflow: auto;
      .chatting-item {
        padding: 10px;
        width: 100%;
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 80%;
        }
        .msg-from {
          display: flex;
          align-items: center;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          .msg-author {
            font-size: 0.8rem;
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
          }
        }
        .msg-content {
          margin-top: 5px;
          background-color: white;
          max-width: 250px;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 0.8rem;
          /deep/ a {
            color: #2196f3;
          }
        }
      }

      .chatting-item + .chatting-item {
        margin-top: 10px;
      }
      .self {
        .msg-from {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          img {
            margin-left: 10px;
          }
        }

        .msg-content {
          float: right;
          word-wrap: break-word;
          word-break: break-all;
          margin-right: 10px;
        }


      }

      .other {
        .msg-from {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          img {
            margin-right: 10px;
          }
        }

        .msg-content {
          float: left;
          margin-left: 10px;
          word-wrap: break-word;
          word-break: break-all;
        }

      }

      .online {
        width: 200px;
        // max-width: 100%;
        margin: 3px auto;
        border-radius: 4px;
        text-align: center;
        background-color: #FFFDE7;
      }


    }

    .chatting-input {
      position: relative;
      display: flex;
      height: 40px;
      width: 100%;
      .send-wrap {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i.icon-send {
          width: 25px;
          height: 25px;
          background: url('../../common/icons/icon-send.svg') no-repeat;
          background-size: contain;
        } 
        i.icon-send-active {
          width: 25px;
          height: 25px;
          background: url('../../common/icons/icon-send-active.svg') no-repeat;
          background-size: contain;
        } 
      }
      .emoji-display {
        position: absolute;
        width: 100%;
        height: 210px;
        background-color: white;
        top: -210px;
        left: 0;
          overflow-y: auto;
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            padding: 2px 3px;
            font-size: 2.2rem;
          }
        }
      }
      .emoji {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 100%;
        background-color: rgba(0, 0, 0, .1);
        .icon-emoji {
          width: 40px;
          height: 100%;
          background: url('../../common/icons/icon-emoji.svg') no-repeat;
          background-size: contain;

        }
      }

      textarea {
        flex: 1;
        resize: none;
        border: 1px solid #d2d2d2;
        padding-left: 18px;
        padding-top: 5px;
        padding-right: 3px;
        height: 100%;
        font-size: 0.8rem;
        margin: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        // color: #d2d2d2;
      }
      button {
        width: 60px;
        height: 100%;
        background-color: $blue;
        color: white;
        font-size: 16px;
      }
    }
  }
</style>
