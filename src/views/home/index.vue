<template>
  <div class="home-search">
    <van-sticky>
      <van-search placeholder="请输入书籍名或者作者名" shape="round" disabled @click="toSearch"/>
      <van-row align="center" class="home-search-icon">
        <van-col :span="12">
          <van-tabs @click="tabSwitch">
            <van-tab v-for="item in homeTabs" :key="item.id" :title="item.title" :name="item.tag"></van-tab>
          </van-tabs>
        </van-col>
        <van-col :span="12" class="home-search-icon-right">
          <user theme="outline" fill="#383634" strokeLinejoin="miter" strokeLinecap="square"
          />
          <bookshelf theme="outline" fill="#383634" strokeLinejoin="miter" strokeLinecap="square"
          />
        </van-col>
      </van-row>
    </van-sticky>
  </div>
  <list-card title="排行榜" class="home-list">
    <template #list>
      <van-tabs>
        <van-tab v-for="item in ranking.tab" :key="item._id" :title="item.shortTitle">
          <van-row>
            <van-col :span="12" v-for="item in ranking.list" :key="item._id">
              <div class="list-book flex">
                <van-image :src="url.img+item.cover" class="book-img" fit="cover"/>
                <div class="book-info">
                  <div class="book-info-title van-multi-ellipsis--l2">
                    {{ item.title }}
                  </div>
                  <div class="book-info-author ">
                    {{ item.author }}
                  </div>
                  <div class="book-info-shortIntro">
                    {{ item.latelyFollower }}个人追书
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </template>
  </list-card>
  <go-top/>
</template>

<script setup>
import GoTop from "../../components/goTop/goTop.vue";
import ListCard from "./components/homeCard/homeCard.vue";
import {rankingService} from "../../api/ranking";
import {User, Bookshelf} from '@icon-park/vue-next'
import {ref} from "vue";
import {baseUrL} from "../../utils";
import {useRouter} from 'vue-router'

const homeTabs = [
  {
    title: '男生',
    id: 1,
    tag: 'male'
  },
  {
    title: '女生',
    id: 2,
    tag: 'female'
  },
  {
    title: '漫画',
    id: 3,
    tag: 'picture'
  }
]
const ranking = ref({
  tab: [],
  list: []
})
const url = baseUrL
const route = useRouter()

async function getHomeData(name = 'male') {
  const tabData = await rankingService.gender().then()
  const {
    ranking: {
      books
    }
  } = await rankingService.ranking(tabData[name][0]._id).then()
  ranking.value.tab = tabData[name].slice(0, 4)
  ranking.value.list = books.slice(0, 10)
}

const tabSwitch = (name) => {
  getHomeData(name)
}
const toSearch = () => {
  route.push('/search')
}
getHomeData()
</script>

<style scoped lang="scss">
::v-deep(.van-tabs__line) {
  background: var(--theme) !important;
  width: 11%;
  font-weight: 700;
}

::v-deep(van-tab--active) {
  font-size: 16px;
  font-weight: 700;
  color: var(--theme) !important;
}

.home-search {
  .home-search-icon {
    background: #fff;

    .home-search-icon-right {
      text-align: right;

      span {
        margin-right: 10px;
        font-size: 20px;
      }
    }
  }
}

.home-list {
  ::v-deep(.van-tabs__nav) {
    width: 324px;
    height: 29px;
    border-radius: 29px;
    background: rgba(240, 242, 245, .5);
    padding-bottom: 0;

    .van-tab--active {
      color: #fff !important;
      font-size: 15px;
      border-radius: 29px;
      background: linear-gradient(
              45deg, #82d7ff, #0bafff);
    }

    .van-tabs__line {
      display: none !important;
    }
  }
}

.list-book {
  margin-bottom: 16px;

  .book-img {
    width: 47px;
    height: 63px;
  }

  .book-info {
    padding-left: 8px;
    width: 71%;

    .book-info-title {
      font-size: 17px;
    }

    .book-info-author, .book-info-shortIntro {
      margin-top: 4px;
      color: #b2b2b2;
      line-height: 1.2;
      white-space: nowrap;
      font-size: 12px;
    }

    .book-info-shortIntro {
      color: #000;
      margin-top: 5px;
    }
  }
}
</style>