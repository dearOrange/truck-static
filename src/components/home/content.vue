<template>
    <div id="another">
    <div id="section_third">
        <div id="new_goods">
            <div class="newLibRecom goods_informantion">
                <div class="newLibHeader">
                    <h2>货源信息</h2>
                    <router-link to="/" tag="span">更多信息</router-link>
                </div>
                <div class="hotGoodsShow goods_info">
                    <div class="hotCss">
                        <dl>
                            <dd>
                                <img src="@/assets/img/house.png" alt="图片">
                                <p>寻求普通货车</p>
                                <span>有电子16吨，求9.6米以上的普通货车</span>
                                <p class="lines_goods"></p>
                            </dd>
                            <dt>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>广东省深圳市 江苏省南京市</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>价格10000元</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>装车时间2018-12-27</span>
                                </p>
                            </dt>
                        </dl>
                        <div class="hotCssMark"><p>马上抢单</p></div>
                    </div>
                    <div class="hotCss">
                        <dl>
                            <dd>
                                <img src="@/assets/img/house.png" alt="图片">
                                <p>寻求普通货车</p>
                                <span>有电子16吨，求9.6米以上的普通货车</span>
                                <p class="lines_goods"></p>
                            </dd>
                            <dt>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>广东省深圳市 江苏省南京市</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>价格10000元</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>装车时间2018-12-27</span>
                                </p>
                            </dt>
                        </dl>
                        <div class="hotCssMark"><p>马上抢单</p></div>
                    </div>
                    <div class="hotCss">
                        <dl>
                            <dd>
                                <img src="@/assets/img/house.png" alt="图片">
                                <p>寻求普通货车</p>
                                <span>有电子16吨，求9.6米以上的普通货车</span>
                                <p class="lines_goods"></p>
                            </dd>
                            <dt>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>广东省深圳市 江苏省南京市</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>价格10000元</span>
                                </p>
                                <p>
                                    <i class="icon icon_biao"></i>
                                    <span>装车时间2018-12-27</span>
                                </p>
                            </dt>
                        </dl>
                        <div class="hotCssMark"><p>马上抢单</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import '@/assets/css/index.css'
export default {
  name: 'Another',
  methods: {},
  mounted() {
    var mySwiper1 = new Swiper('#swiper1', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
    // 轮播图片
    function changeTo(num) {
      $('.banner_fr_outer')
        .find('div.active_fr_container')
        .removeClass('banner_img_list')
        .hide()
        .eq(num)
        .fadeIn()
        .addClass('banner_img_list')
      $('.banner_fl_outer')
        .find('div.active_fl_container')
        .removeClass('banner_info_list')
        .eq(num)
        .addClass('banner_info_list')
    }
    var curIndex = 0
    setInterval(function() {
      if (curIndex < $('.banner_fr_outer .active_fr_container').length - 1) {
        curIndex++
      } else {
        curIndex = 0
      }
      //调用变换处理函数
      changeTo(curIndex)
    }, 5000)
  }
}
</script>
<style scoped>
.swiper-container {
  width: 100%;
}
.swiper-button-next,
.swiper-button-prev {
  margin-top: -60px !important;
}
</style>
<style lang="less" scoped>
.newGoodsShow {
  .freezingku {
    float: left;
    width: 250px;
    height: 240px;
    background: url(/assets/img/a5.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin-right: 50px;
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      background-size: 120% 120%;
    }
    .nowing {
      width: 98px;
      height: 34px;
      background: rgba(0, 174, 102, 1);
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 34px;
      position: absolute;
      top: 14px;
      left: 0;
    }
    .find_freezing {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      margin-top: 100px;
    }
    .start_times {
      text-align: center;
      margin-top: 22px;
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
    }
  }
}
</style>

