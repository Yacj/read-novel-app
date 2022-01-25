<template>
  <nav-bar title="搜索" left-text="返回"></nav-bar>
  <div class="search">
    <van-search placeholder="请输入搜索内容" shape="round" @update:model-value="searchInput" v-model="searchVal"></van-search>
    <div class="search-warp flex flex-direction" v-if="searchVal === ''">
      <div class="search-hot">
        <div class="search-warp-title flex-between-center">
          <div class="title">热门推荐</div>
          <div class="refresh" @click="refreshData">
            换一批
            <van-icon name="replay" color="#6b6b6b" :class="isRotate ? 'refreshTransForm':'refreshTransFormReturn'"/>
          </div>
        </div>
        <van-row :gutter="30">
          <van-col :span="12" v-for="(item,index) in searchHotList" :key="item.times"
                   class="hot-content"
                   @click="toSearchList(item.word)"
          >
            <div class="content-number" :class="`content-number-${index+1}`">
              {{ index + 1 }}
            </div>
            <div class="content-val">
              {{ item.word }}
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="search-history">
        <div class="search-warp-title flex-between-center">
          <div class="title">搜索历史</div>
          <div class="refresh" @click="deleteHistory">
            删除历史
            <van-icon name="delete-o" color="#6b6b6b"/>
          </div>
        </div>
        <div class="history">
          <template v-if="historyList.length > 0">
            <div class="history-content" v-for="(item,index) in historyList" :key="index+1"
                @click="toSearchList(item)">
              {{ item }}
            </div>
          </template>
          <van-empty description="暂无搜索历史" v-else></van-empty>
        </div>
      </div>
    </div>
    <div class="search-auto" v-else>
      <van-cell :value="item" size="large" v-for="(item,index) in searchAutoList" :key="index+1" icon="orders-o"
                @click="toSearchList(item)"
      >
        <template #icon>
          <book-one theme="outline" fill="#383634" strokeLinejoin="miter" strokeLinecap="square" class="auto-icon"/>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../../components/navBar/navBar.vue";
import {onMounted, ref} from "vue";
import {bookService} from "../../api/book";
import {local} from "../../utils/local";
import {BookOne} from '@icon-park/vue-next'
import {useRouter} from "vue-router";
import {Dialog} from 'vant';

const isRotate = ref(false)
const searchHotList = ref([])
const hotListSlice = ref([0, 10])
const searchVal = ref('')
const searchAutoList = ref([])
const historyList = ref([])
const route = useRouter()

onMounted(() => {
  const getHistory = local.getItem("searchHistory")
  if (getHistory) {
    historyList.value = getHistory
  }
})
const refreshData = () => {
  searchHotList.value = []
  isRotate.value = !isRotate.value
  hotListSlice.value = [hotListSlice.value[0] + 5, hotListSlice.value[1] + 5]
  searchHotWords()
}

const deleteHistory = () => {
  Dialog.confirm({
    title: '提示',
    message: '确实要删除历史记录么?'
  }).then(() => {
    local.removeItem('searchHistory')
    historyList.value = []
  })
}

const searchInput = (val) => {
  getAuto(val)
}

const toSearchList = (val) => {
  const list = historyList.value
  if (!list.includes(val)) {
    list.unshift(val)
    local.setItem("searchHistory", list)
  } else {
    let i = list.indexOf(val)
    list.splice(i, 1)
    list.unshift(val)
    local.setItem("searchHistory", list)
  }
  route.push('/search/list?name=' + val)
}

function searchHotWords() {
  bookService.searchHotWords().then(res => {
    const {searchHotWords} = res
    searchHotList.value = searchHotWords.slice(hotListSlice.value[0], hotListSlice.value[1])
  })
}

function getAuto(query) {
  const params = {
    query
  }
  bookService.autoComplete(params).then(res => {
    const {keywords} = res
    searchAutoList.value = keywords
  })
}

searchHotWords()
</script>

<style scoped lang="scss">
.refreshTransFormReturn {
  transition: 0.2s;
  transform-origin: center;
  transform: rotate(0deg);
}

.refreshTransForm {
  transition: 0.2s;
  transform-origin: center;
  transform: rotate(-360deg);
}

.auto-icon {
  position: relative;
  margin-right: 5px;
  top: 3px;
  font-size: 17px;
}

.search {
  width: 100%;
  height: 100vh;
  background: #fff;

  .search-warp {
    padding: 15px;
    margin-bottom: 15px;

    .search-warp-title {
      margin-bottom: 14px;

      .title, .refresh {
        color: #6b6b6b;
      }

      .title {
        font-weight: 400;
        font-size: 22px;
      }

      .refresh {
        font-size: 13px;

        i {
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }

  .search-hot {
    margin-bottom: 30px;

    .hot-content {
      display: flex !important;
      font-size: 15px;
      margin: 10px 0 15px 0;

      .content-number {
        margin-right: 10px;
      }

      .content-number-1, .content-number-2, .content-number-3 {
        color: #dbb71ff2
      }
    }
  }
}

.history {
  .history-content {
    float: left;
    padding: 0 10px;
    margin: 0 10px 10px 0;
    height: 30px;
    background: #efeff4;
    line-height: 30px;
    font-size: 12px;
    //color: #9b9ba3;
    //border-radius: 15px;
    color: #000;
    border-radius: 5px;
  }
}
</style>