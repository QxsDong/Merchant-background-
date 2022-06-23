<template>
  <div class="selectCity-container">
    <div class="selectCity-title">
      Please select the product you want to activate
      <span>(multiple choices are allowed)</span>
    </div>
    <div v-for="item in productType" :key="item.id" class="selectCity-con">
      <div class="title">
        <el-checkbox v-model="menusIds1" :label="item.dictValue">
          <p>{{ item.dictLabel }}</p>
        </el-checkbox>
        <span>Try is now</span>

      </div>
      <div :class="menusIds1.includes('80003') && item.dictLabel==='法币收单'?'content content_select':'content'">
        {{ item.con }}
        <p>In which countries would you like to start your fiat acquiring business?</p>
        <div v-if="item.dictValue==='80003'" class="checkbox_city">
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
import { createMerchant } from '@/api/user'
export default {
  name: 'SelectCity',
  props: ['fiatPayIn', 'productType'],
  data() {
    return {
      ruleForm: {
        type: []
      },

      menusIds: [],
      menusIds1: [],
      fiatPayInData: ''

    }
  },
  computed: {
    selectButton() {
      let select1
      if (this.menusIds1.length > 0 && this.menusIds1.includes('80003') && this.menusIds.length > 0) {
        select1 = true
      } else if (this.menusIds1.length > 0 && !this.menusIds1.includes('80003')) {
        select1 = true
      } else {
        select1 = false
      }
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
        }
      }
    },
    menusIds1: {
      deep: true,
      handler(newVal) {
        if (newVal.length > 0) {
          console.log(newVal)
        }
      }
    }

  },
  methods: {
    SubmitNext() {
      if (this.selectButton) {
        const params = this.$store.state.user.ruleForm
        params.applyProductCode = this.menusIds1.join(',')
        params.applyProductParam = JSON.stringify(this.fiatPayInData)
        params.merchantBizType = JSON.stringify(this.$store.state.user.ruleForm.merchantBizType)
        console.log(params)
        createMerchant(params).then(res => {
          if (res.returnCode === '0000' && res.success) {
            this.$message({
              type: 'success',
              message: 'Submission successful'
            })
            this.$parent.state = 3
            sessionStorage.setItem('State', 3)
          }
        })
      }
    },
    handleCheck(type, a = 0) { // 多选框
      const self = this
      if (type === 2) { // 二级菜单点击
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
          if (self.menusIds.indexOf(self.fiatPayIn[a].dictType) > 0 || self.menusIds.indexOf(self.fiatPayIn[a].dictType) == 0) {
            self.menusIds.splice(self.menusIds.indexOf(self.fiatPayIn[a].dictType), 1)
          }
        }
      } else {
        if (self.menusIds.indexOf(self.fiatPayIn[a].dictType) > -1) {
          self.fiatPayIn[a].dictDataList.map(item => {
            if (self.menusIds.findIndex((n) => n === item.dictValue) < 0) {
              self.menusIds.push(item.dictValue)
            }
          })
        } else {
          self.fiatPayIn[a].dictDataList.map(item => {
            if (self.menusIds.findIndex((n) => n === item.dictValue) > -1) {
              self.menusIds.splice(self.menusIds.findIndex((n) => n === item.dictValue), 1)
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
