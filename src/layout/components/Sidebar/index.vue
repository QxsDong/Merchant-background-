<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div v-if="isCollapse" class="logo1">
        <img src="@/assets/logos/solo.png" alt="">
      </div>
      <div v-else class="logo">
        <img src="@/assets/logos/solo.png" alt="">
        <img src="@/assets/logos/solo1.png" alt="">
      </div>
      <el-menu
        class="scrollbar-item"
        :default-active="activeMenu"
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
      width: 130px;
      height: 30px;
    }
  }
  .logo1{
    margin: 30px 5px 50px ;
    img{
      width: 45px;
    }
  }
  .scrollbar-item{
   background-color:transparent;
  }
 .el-menu-item-group .el-menu-item.demo:hover{
    background: #000 !important;
    color: #fff !important;
    }
}
</style>
