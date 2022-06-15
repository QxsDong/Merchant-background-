<template>
  <div class="selectCity-container">
    <div class="selectCity-title">
      Please select the product you want to activate
      <span>(multiple choices are allowed)</span>
    </div>
    <div v-for="item in selectCity" :key="item.id" class="selectCity-con">
      <div class="title">
        <el-checkbox v-model="menusIds1" :label="item.id">
          <p>{{ item.name }}</p>
        </el-checkbox>
        <span>Try is now</span>

      </div>
      <div :class="menusIds1.includes(2) &&item.name=='Fiat Acquiring'?'content content_select':'content'">
        {{ item.con }}
        <p v-if="item.name=='Fiat Acquiring'">In which countries would you like to start your fiat acquiring business?</p>
        <div v-if="item.name==='Fiat Acquiring'" class="checkbox_city">
          <div v-for="(i,indexkey) in fiatPayIn" :key="i.dictType">

            <el-checkbox v-model="menusIds" :label="i.dictType" @change="handleCheck(1,indexkey)">{{ i.dictName }}</el-checkbox>
            <div v-for="j in i.dictDataList" :key="j.dictValue" class="checkbox_city-con">
              <el-checkbox v-model="menusIds" :label="j.dictValue" @change="handleCheck(2,indexkey)">{{ j.dictLabel }}</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="selectButton?'Submit active':'Submit'" @click="SubmitNext">Submit</div>
  </div>
</template>
<script>
export default {
  name: 'SelectCity',
  props: ['fiatPayIn'],
  data() {
    return {
      ruleForm: {
        type: []
      },
      selectCity: [
        { name: 'Crypto Acquiring',
          id: 1,
          select: false,
          con: 'With Crypto Acquiring Products, your customers can use digital currency to buy on your website Services or products; we can settle USDT or fiat to you.'
        },
        { name: 'Fiat Acquiring',
          id: 2,
          select: false,
          con: 'Provide credit card collection channels, local payment in Indonesia, local payment in Mexico and other payment channels.'
        },
        { name: 'On/Off Ramp',
          id: 3,
          select: false,
          con: 'With this capability, you can help your users purchase various digital currencies with fiat, or your Users can also sell various digital currencies on this platform to obtain legal currency.'
        }
      ],
      menusIds: [],
      menusIds1: [],
      fiatPayInData: []

    }
  },
  computed: {
    selectButton() {
      let select1
      this.menusIds1.forEach(item => {
        if (item === 2) {
          select1 = true
        }
      })
      return select1
    }
  },
  watch: {
    menusIds: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          const obj = {}
          this.fiatPayIn.map(item => {
            if (newVal.includes(item.dictType)) {
              // debugger
              obj[item.dictType] = item.dictDataList.filter(i => { if (newVal.includes(i.dictValue)) { return i.dictValue } }).map(j => {
                return j.dictValue
              })
            }
          })
          this.fiatPayInData = obj
          console.log(this.fiatPayInData)
        }
      }
    }
  },
  methods: {
    SubmitNext() {
      if (this.selectButton) {
        this.$parent.state = 3
        sessionStorage.setItem('State', 3)
      }
    },
    handleCheck(type, a = 0) { // 多选框
      const self = this
      if (type == 2) { // 二级菜单点击
        let index = 0
        self.fiatPayIn[a].dictDataList.map(item => {
          if (self.menusIds.indexOf(item.dictValue) > -1) {
            index += 1
          }
        })
        if (index > 0) {
          if (self.menusIds.indexOf(self.fiatPayIn[a].dictType) < 0) {
            self.menusIds.push(self.fiatPayIn[a].dictType)
          }
        } else {
          if (self.menusIds.indexOf(self.fiatPayIn[a].dictType) > 0) {
            self.menusIds.splice(self.menusIds.indexOf(self.fiatPayIn[a].dictType), 1)
          }
        }
      } else {
        if (self.menusIds.indexOf(self.fiatPayIn[a].dictType) > -1) {
          self.fiatPayIn[a].dictDataList.map(item => {
            if (self.menusIds.findIndex((n) => n == item.dictValue) < 0) {
              self.menusIds.push(item.dictValue)
            }
          })
        } else {
          self.fiatPayIn[a].dictDataList.map(item => {
            if (self.menusIds.findIndex((n) => n == item.dictValue) > -1) {
              self.menusIds.splice(self.menusIds.findIndex((n) => n == item.dictValue), 1)
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.selectCity-container{
  // position: relative;
  .selectCity-title{
    font-size: 14px;
    font-family: RobotoBold;
    font-weight: 800;
    color: #123077;
    line-height: 17px;
    span{
      font-weight: 500;
      color: #123077;
      font-size: 10px;
      font-family: RobotoLight;
      margin-left: 6px;
    }
  }
  .selectCity-con{
    width: 600px;
    margin-top: 20px;
    .title{
      font-size: 12px;
      font-family:  SF  Pro;
      font-weight: 400;
      color: #5A6070;
      line-height: 14px;
      display: flex;
      p{
        width: 100px;
        margin: 0 20px 0 10px;
      }
      span{
        font-weight: 400;
        color: #40A1FB;
        line-height: 20px;
      }
    }
    .content{
      width: 590px;
      height: 56px;
      background: #F8FAFD;
      border-radius: 2px;
      font-size: 10px;
      font-family: SF  Pro;
      font-weight: 400;
      color: #A7A7A7;
      line-height: 14px;
      margin: 10px 0 0 10px ;
      padding: 15px;
      box-sizing: border-box;
      transition: .5s;
      overflow: hidden;
    }
    .content_select{
      height: 230px;
    }
  }
  .Submit{
    width: 200px;
    height: 40px;
    font-size: 14px;
    background: #40A1FB80;
    font-family: RobotoBold;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    bottom: 90px;
    transform: translate(-50%,0px);
    cursor: pointer;
  }
  .active{
    background: #40A1FBFF;
  }
  .checkbox_city{
    display: flex;
    margin-top: 15px;
    div{
      margin-right: 30px;
    }
    ::v-deep .el-checkbox__label{
      font-size: 12px !important;
      font-family:  SF  Pro;
      font-weight: 400;
      color: #5A6070;
      line-height: 14px;
    }
    .checkbox_city-con{
      ::v-deep .el-checkbox__label{
        font-size: 12px !important;
        font-family:  SF  Pro;
        font-weight: 400;
        color: #A7A7A7;
        line-height: 14px;
        margin-top: 10px;
      }

    }

  }
}
</style>
