<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- category的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖的属性值的展示的面包屑 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{ prop.split(':')[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>


          </ul>
        </div>

        <!--selector 搜索框 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details价格结构-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeDirect('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-jiang': isAsc, 'icon-jiang-right': isDesc }"></span></a>
                </li>

                <li :class="{ active: isTwo }" @click="changeDirect('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-jiang': isAsc, 'icon-jiang-right': isDesc }"></span> </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html">
                      <!-- 跳转用的图片 -->
                      <router-link :to='`/detail/${good.id}`'>
                        <img v-lazy="good.defaultImg" />
                      </router-link>

                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="this.searchParams.pageNo" :pageSize="this.searchParams.pageSize" :total="total"
            :continues="5" @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data: function () {
    return {
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:asc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 10,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount: function () {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  mounted: function () {
    this.getData()
  },

  computed: {
    ...mapGetters(
      ['goodsList'],
    ),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    isOne() {
      return this.searchParams.order.includes('1')
    },
    isTwo() {
      return this.searchParams.order.includes('2')
    },
    isAsc() {
      return this.searchParams.order.includes('asc')
    },
    isDesc() {
      return this.searchParams.order.includes('desc')
    }
  },

  methods: {
    getData() {
      this.$store.dispatch('SearchInfo', this.searchParams)
    },
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },

    removeKeyword() {
      this.searchParams.keyword = '';
      this.getData();
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },

    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //删除attr售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },


    //自定义事件的回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },


    attrInfo(attr, value) {
      let prop = `${attr.attrId}:${value}:${attr.attrName}`
      if (!this.searchParams.props.includes(prop)) {
        this.searchParams.props.push(prop);
      }
      this.getData();
    },
    changeDirect(flag) {
      //如果点击的是同样的排序方法，只改变排序序列
      if (flag == this.searchParams.order.split(':')[0]) {
        if (this.searchParams.order.split(':')[1] == 'asc') {
          this.searchParams.order = `${this.searchParams.order.split(':')[0]}:desc`
          this.getData();
        } else {
          this.searchParams.order = `${this.searchParams.order.split(':')[0]}:asc`
          this.getData();
        }
      } else {  // 如果点击的是不同的排序方法，只改变方法
        this.searchParams.order = `${flag}:${this.searchParams.order.split(':')[1]}`
      }
    },
    getPageNo(pageNo) {
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    },
  },
  watch: {
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    }
  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>