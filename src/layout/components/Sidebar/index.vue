<template>
  <div id="scrollbar-container" :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="el-scrollbar-content">
      <div v-if="isCollapse" class="logo1">
        <img src="@/assets/logos/solo.png" alt="">
      </div>
      <div v-else class="logo">
        <img src="@/assets/logos/solo.png" alt="">
        <img src="@/assets/logos/solo1.png" alt="">
      </div>
      <el-menu
        :default-active="activeMenu"
        background-color="transparent"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>

/* hover style    element */
#scrollbar-container ::v-deep .el-menu-item{
  width: 90%;
  transition: .3s;
  margin: 10px 0px;
  background: #FFFFFF;
}
/* click select style */
#scrollbar-container ::v-deep .is-active{
  /* width: 270px; */

  background-color: #FFFFFF !important;
  box-shadow: 0px 10px 10px #185BDD;
  border-radius: 0 30px 30px 0px;
  margin-left: 0px;
  transition: .2s;
}
#scrollbar-container ::v-deep.el-menu-item:hover{
  outline: 0 !important;
  background: #fff !important;
  opacity: .7;
  color: #409EFF !important;
}

.scrollbar-wrapper{

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 50px 0;
    img:first-child{
      width: 45px;
      height: 45px;
    }
    img:last-child{
      width: 150px;
      height: 30px;
      margin: 5px 0 0 5px;
    }
  }
  .logo1{
    margin: 30px 5px 50px ;
    img{
      width: 45px;
    }
  }
  // .scrollbar-item{
  //  background-color:transparent;
  // }
}
</style>
