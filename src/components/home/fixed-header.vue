<template>
    <div id="coolink_detail_container">
        <div id="header_detail_container">
            <div class="logo_detail">
                <img src="@/assets/img/link_img.png" alt="logo">
                <p @mouseover="addClass_active" @mouseout="removeClass_active"><i class="icon icon_position"></i><span>杭州</span>
                    <MapFile class="mapFile_container"/>
                </p>
            </div>
            <div class="nav_detail">
                <ul>
                    <router-link to="/" tag="li">首页</router-link>
                    <router-link to="/CoolinkDetail" tag="li">仓库租赁</router-link>
                    <router-link to="/CommonDetail" tag="li">货主找车</router-link>
                    <router-link to="/" tag="li">司机找货</router-link>
                    <router-link to="/" tag="li">房产地货源</router-link>
                    <router-link to="/" tag="li">合作伙伴</router-link>
                    <router-link to="/" tag="li">1号冷链 <span class="icon icon_zheng"></span> 冷链Sass平台</router-link>
                </ul>
            </div>
            <div class="nav_login">
                <ul>
                    <li class="login_active">登录</li>
                    <li>注册</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import MapFile from '../common/mapFile.vue'
export default {
    name: 'CoolinkDetailHeader',
    components:{
        MapFile
    },
    mounted(){
        $('.nav_login ul li').click(function(){
            $(this).addClass('login_active').siblings().removeClass('login_active');
        })
        $(window).scroll(function(){
            if($(document).scrollTop() >= 100){
                $('#coolink_detail_container').addClass('fixedHeader');
            }else{
                $('#coolink_detail_container').removeClass('fixedHeader');
            }
        })
    },
    methods:{
        addClass_active(){
            $('.mapFile_container').addClass('mapFile_container_active');
        },
        removeClass_active(){
            $('.mapFile_container').removeClass('mapFile_container_active');
        }
    }
}
</script>
<style lang="less" scoped>
#coolink_detail_container{
    width:100%;
    height:74px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 8px 0px rgba(0,0,0,0.14);
    &.fixedHeader{
        position:fixed;
        top:0;
        left:0;
        z-index: 999;
    }
    #header_detail_container{
        width:1150px;
        height:74px;
        padding:15px 0;
        margin:0 auto;
        .logo_detail{
            float:left;
            width:185px;
            height:44px;
            // margin-top:4px;
            img{
                width:113px;
                height:44px;
                float:left;
                cursor: pointer;
            }
            p{
                float:left;
                width:60px;
                height:28px;
                background:rgba(148,161,156,1);
                border-radius:14px;
                margin-left:12px;
                margin-top: 9px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                position: relative;
                i{
                    float:left;
                    margin:8px 0 0 10px;
                }
                span{
                    float:left;
                    font-size:12px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    margin-left:5px;
                }
                .mapFile_container{
                    display:none;
                    &.mapFile_container_active{
                        position:absolute;
                        top:28px;
                        left:0px;
                        z-index: 666;
                        display:block;
                        transition: all .5s ease-in-out;
                    }
                }
            }
        }
        .nav_detail{
            float:left;
            margin:0 22px 0 51px;
            ul li{
                float:left;
                padding:14px 12px;
                cursor: pointer;
                font-size:16px;
                line-height: 16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
        .nav_login{
            float:right;
            width:130px;
            height:40px;
            margin-top:2px;
            ul li{
                float:left;
                width:60px;
                height:40px;
                border:1px solid rgba(178, 178, 178, 1);
                text-align: center;
                line-height: 40px;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                cursor: pointer;
                &:last-child{
                    margin-left:10px;
                }
                &.login_active{
                    background:rgba(0,174,102,1);
                    color:#fff;
                }
            }
        }
    }
}
</style>

