<template>
  <div class="ability-container">
    <div class="ability-content">
      <div class="ability-title">
        <p>Crypto收单</p>
        <span v-if="state==1" class="Activated">Activated</span>
        <div v-else-if="state==2" class="Applying">Applying...</div>
        <!-- <div v-else class="Unopened">Unopened</div> -->
        <div v-else class="Activated">Not developed...</div>
      </div>
      <div class="ability-con">
        With Crypto Acquiring Products, your customers can use digital currency to buy on your website Services or products; we can settle USDT or fiat to you.
      </div>
      <div v-if="state==1" class="ability-tottom">
        <el-button type="primary" class="allocation" @click="goContent">查看配置</el-button>
        <el-button class="TryButton">Try it now</el-button>
      </div>
      <div v-if="state==2" class="ability-tottom1">
        <!-- <el-button type="primary" class="allocation">查看配置</el-button> -->
        <!-- <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button> -->
        <el-button class="TryButton">Try it now</el-button>
        <p v-if="state==2">You can contact email: xxx to check the approval progress</p>
      </div>
      <div v-if="state==3" class="ability-tottom">
        <el-button type="primary" class="allocation" disabled>暂不开放</el-button>
        <el-button class="TryButton" disabled>Try it now</el-button>
      </div>
    </div>
    <div class="ability-content">
      <div class="ability-title">
        <p>法币收单</p>
        <span v-if="state1==1" class="Activated">Activated</span>
        <div v-else-if="state1==2" class="Applying">Applying...</div>
        <!-- <div v-else class="Unopened">Unopened</div> -->
        <div v-else class="Activated">Not developed...</div>
      </div>
      <div class="ability-con">
        Provide credit card collection channels, local payment in Indonesia, local payment in Mexico and other payment channels.
      </div>
      <div v-if="state1==1" class="ability-tottom">
        <el-button type="primary" class="allocation">查看配置</el-button>
        <el-button class="TryButton">Try it now</el-button>
      </div>
      <div v-if="state1==2" class="ability-tottom1">
        <!-- <el-button type="primary" class="allocation">查看配置</el-button> -->
        <!-- <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button> -->
        <el-button class="TryButton">Try it now</el-button>
        <p v-if="state1==2">You can contact email: xxx to check the approval progress</p>
      </div>
      <div v-if="state1==3" class="ability-tottom">
        <el-button type="primary" class="allocation" disabled>暂不开放</el-button>
        <el-button class="TryButton" disabled>Try it now</el-button>
      </div>
    </div>
    <div class="ability-content">
      <div class="ability-title">
        <p>On/Off ramp</p>
        <span v-if="state2==1" class="Activated">Activated</span>
        <div v-else-if="state2==2" class="Applying">Applying...</div>
        <div v-else class="Unopened">Unopened</div>
      </div>
      <div class="ability-con">
        With this capability, you can help your users purchase various digital currencies with fiat, or your
        Users can also sell various digital currencies on this platform to obtain legal currency.
      </div>
      <div v-if="state2==1" class="ability-tottom">
        <el-button type="primary" class="allocation" @click="$router.push('/ability/index/ramp')">查看配置</el-button>
        <el-button class="TryButton">Try it now</el-button>
      </div>
      <div v-if="state2==2" class="ability-tottom1">
        <!-- <el-button type="primary" class="allocation">查看配置</el-button> -->
        <!-- <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button> -->
        <el-button class="TryButton">Try it now</el-button>
        <p v-if="state2==2">You can contact email: xxx to check the approval progress</p>
      </div>
      <div v-if="state2==3" class="ability-tottom">
        <el-button type="primary" class="allocation">申请</el-button>
        <el-button class="TryButton">Try it now</el-button>
      </div>
    </div>
    <!-- <div v-show="isShow" class="content"> -->
    <router-view />
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'Ability',
  data() {
    return {
      state: 3,
      state1: 3,
      state2: 1,
      isShow: false
    }
  },
  methods: {
    goContent() {
      this.isShow = true
      this.$router.push('/ability/index/crypto')
    }
  }
}
</script>
<style lang="scss" scoped>
  .ability-container{
    width: 100%;
    height: 100%;
    padding: 20px 20px 0;
    display: flex;
    flex-wrap: wrap;
    .ability-content{
      width: 280px;
      height: 360px;
      background: #F8FAFDFF;
      box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
      border-radius: 10px;
      padding: 30px 32px 0;
      box-sizing: border-box;
      position: relative;
      margin:0 20px 20px;
      .ability-title{
        height: 30px;
        display: flex;
        align-items: center;
        p{
          font-size: 14px;
          font-family: RobotoBold;
          font-weight: 800;
          color: #123077;
          line-height: 17px;
          margin-right: 10px;
        }
        .Activated{
          // width: 56px;
          // height: 16px;
          // display: block;
          padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: rgba(187, 194, 207, 0.4);
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;

        }
        .Applying{
           padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: #9AA8C3FF;
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .Unopened{
          padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: #40A1FBFF;
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;
        }
      }
      .ability-con{
        height: 170px;
        font-size: 14px;
        font-family: RobotoLight;
        font-weight: 300;
        color: #5A6070;
        line-height: 20px;
        padding: 20px 0 0 0;
        word-break: keep-all;
        // word-wrap: break-word; // 只对英文起作用，以单词作为换行依据。
        // white-space: pre-wrap; //只对中文起作用，强制换行。
        text-align:justify;  //css英文语句的两端对齐：
        text-justify:inter-ideograph;
        // letter-spacing: .5px;
      }
      .ability-tottom{
        width: 100%;
        height: 130px;
        padding:20px 30px 0 ;
        background: #FFFFFF;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .allocation{
          width: 130px;
          height: 40px;
          // background: #40A1FB;
          border-radius: 6px;
          font-family: RobotoBold;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 14px;
          font-size: 12px;
        }
        .TryButton{
          width: 80px;
           border-radius: 6px;
          padding-left: 10px;
          font-family:RobotoBold;
          font-weight: 800;
          color: #5A6070;
          line-height: 14px;
        }
      }
      .ability-tottom1{
        width: 100%;
        height: 130px;
        padding:20px 30px 0 ;
        background: #FFFFFF;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        .TryButton{
          width: 100%;
          font-size: 12px;
          font-family:RobotoBold;
          font-weight: 800;
          color: #5A6070;
          line-height: 14px;
          border-radius: 6px;
        }
        p{
          font-size: 10px;
          font-family: 'SF Pro';
          font-weight: 400;
          color: #40A1FB;
          line-height: 12px;
        }
      }
    }
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #FFFFFF;
    }
  }
</style>
