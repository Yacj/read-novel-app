<template>
  <nav-bar :title="`跟 ${queryName} 有关的书籍`" left-text="返回"></nav-bar>
  <div class="search-list">
    <ul>
      <li v-for="item in searchInfoList" :key="item._id" class="flex">
        <van-row>
          <van-col :span="9">
            <van-image class="search-list-cover" fit="cover" :src="baseUrL.img + item.cover"/>
          </van-col>
          <van-col :span="15">
            <div class="search-list-info">
              <div class="list-info-head">
                {{ item.title }}
              </div>
              <div class="list-info-tag">
                {{ item.cat }}
              </div>
              <div class="list-info-author">
                {{ item.author }}
              </div>
              <div class="list-info-shortIntro van-multi-ellipsis--l2">
                {{ item.shortIntro }}
              </div>
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
    <go-top/>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";
import {bookService} from "../../api/book";
import NavBar from "../../components/navBar/navBar.vue";
import {baseUrL} from "../../utils";
import GoTop from "../../components/goTop/goTop.vue";

const queryName = ref('')
const searchInfoList = ref([])
const {
  query: {
    name
  }
} = useRoute()
queryName.value = name

function getSearchList() {
  bookService.fuzzySearch({
    query: queryName.value
  }).then((res) => {
    const {books} = res
    searchInfoList.value = books
  })
}

getSearchList()
</script>

<style scoped lang="scss">
.search-list {
  width: 100%;
  height: 100vh;
  background: #fff;

  ul {
    background: #fff;
    li {
      padding: 15px;

      .search-list-cover {
        width: 100px;
        height: 120px;
      }

      .search-list-info {
        .list-info-head {
          font-size: 18px;
          font-weight: 500;
        }

        .list-info-tag {
          margin: 18px 0 18px 0;
          background: #b1a7a766;
          width: 21%;
          text-align: center;
          padding: 3px 0;
          border-radius: 5px;
          line-height: 15px;
          color: #878787;
        }

        .list-info-author {
          margin-bottom: 18px;
        }

        .list-info-shortIntro {
          color: #666;
        }
      }
    }
  }
}
</style>