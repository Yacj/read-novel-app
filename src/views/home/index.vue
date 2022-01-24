<template>
  <div class="home-search">
    <van-sticky>
      <van-search placeholder="请输入书籍名或者作者名" shape="round">
      </van-search>
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
      <van-tabs :animated="true" :swipeable="false" >
        <van-tab v-for="item in ranking.tab" :key="item._id" :title="item.shortTitle">
          121
          <van-row>
            <van-col :span="12" v-for="item in ranking.list" :key="item._id">
              <van-image :src="url.img+item.cover"></van-image>
              {{ item.title }}
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </template>
  </list-card>
  <go-top/>
</template>

<script setup>
import {rankingService} from "../../api/ranking";
import {User, Bookshelf} from '@icon-park/vue-next'
import GoTop from "../../components/goTop/goTop.vue";
import ListCard from "./components/homeCard/homeCard.vue";
import {ref, watch, toRaw} from "vue";
import {baseUrL} from "../../utils";

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

async function getHomeData(name = 'male') {
  const tabData = await rankingService.gender().then()
  const {
    ranking: {
      books
    }
  } = await rankingService.ranking(tabData[name][0]._id).then()
  ranking.value.tab = tabData[name].slice(0, 4)
  ranking.value.list = books.slice(0, 9)
}

const tabSwitch = (name) => {
  getHomeData(name)
}

getHomeData()
</script>

<style scoped lang="scss">
::v-deep {
  .van-tabs__line {
    background: var(--theme) !important;
    width: 11%;
    font-weight: 700;
  }

  .van-tab--active {
    font-size: 16px;
    font-weight: 700;
    color: var(--theme) !important;
  }

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

</style>