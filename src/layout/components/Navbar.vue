<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <breadcrumb class="breadcrumb-container" />
    <div class="navbar-right">
      <p class="right-menuTime" />
      <img src="../../assets/logos/news.png" alt="">
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  mounted() {
    document.querySelector('.right-menuTime').innerHTML = new Date().toLocaleDateString()
    this.Id = setInterval(() => {
      var time = new Date() // 程序计时的月从0开始取值后+1
      var m = time.getMonth() + 1
      var t = time.getFullYear() + '-' + m + '-' +
      time.getDate() + ' ' + this.MoreThan(time.getHours()) + ':' +
      this.MoreThan(time.getMinutes()) + ':' + this.MoreThan(time.getSeconds())
      document.querySelector('.right-menuTime').innerHTML = t
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.Id)
  },
  methods: {
    MoreThan(n) {
      if (n > 9) {
        return n
      } else {
        return '0' + n
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
.avatar-wrapper-content{

  display: flex;
  p{
    margin: 0;
  padding: 0;
  margin-right: 10px;
  }

}
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 35px;
    ::v-deep .no-redirect{
      font-family: RobotoBold;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      text-transform: capitalize;
      color: #123077;
    }
  }
.navbar-right{
  float: right;
  margin-right: 40px;
  // line-height: 50px;
  display: flex;
  align-items: center;
  p{
    margin-right: 20px;
    font-size: 14px;
    font-family: RobotoLight;
    color: #5A6070;
  }
}
}
</style>
