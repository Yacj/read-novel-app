<template>
  <home-card title="排行榜" class="home-list">
    <template #list>
      <van-tabs animated swipeable v-model:active="active">
        <van-tab v-for="item in rankings.tab" :key="item._id" :title="item.shortTitle">
          <van-row>
            <van-col :span="12" v-for="item in rankings.list" :key="item._id" class="flex-center">
              <div class="list-book flex">
                <van-image :src="url.img+item.cover" class="book-img"></van-image>
                <div class="book-info">
                  <div class="book-info-title van-multi-ellipsis--l2">
                    {{ item.title }}
                  </div>
                  <div class="book-info-author ">
                    {{ item.author }}
                  </div>
                  <div class="book-info-shortIntro van-ellipsis">
                    {{ item.shortIntro }}
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </template>
  </home-card>
</template>

<script setup>
import HomeCard from "./components/homeCard/homeCard.vue";
import {rankingService} from "../../api/ranking";
import {ref, watch} from "vue";
import {baseUrL} from "../../utils";

const active = ref(0)
const rankings = ref({
  tab: [],
  list: []
})
const url = baseUrL
watch(active, (val) => {
  console.log(val)
})

async function getHomeData(name = 'male') {
  const tabData = await rankingService.gender().then()
  const {
    ranking: {
      books
    }
  } = await rankingService.ranking(tabData[name][0]._id).then()
  rankings.value.tab = tabData[name].slice(0, 4)
  rankings.value.list = books.slice(0, 10)
}

getHomeData()
</script>

<style lang="scss" scoped>
.list-book {
  margin-bottom: 16px;

  .book-img {
    width: 47px;
    height: 63px;
  }

  .book-info {
    padding-left: 8px;
    width: 71%;

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