
<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="paramsData.flag==1?'active':''" @click="changeSellAndBuy(1)">{{ $t('nav.Buy_coins') }}</p>
      <p :class="paramsData.flag==0?'active':''" @click="changeSellAndBuy(0)">{{ $t('nav.Sell_coins') }}</p>
    </div>
    <div class="offRamp-content">
      <!-- 买币 -->
      <div v-if="paramsData.flag==1">
        <div class="order-top">
          <div>
            <el-date-picker
              v-model="timeList"
              type="daterange"
              range-separator="-"
              start-placeholder="Date From"
              end-placeholder="Date To"
            />
          </div>
          <div>
            <!-- <p style="color: #666666;width: 100px;">email : </p> -->
            <el-input v-model="paramsData.email" style="flex:1;margin-right:0" prefix-icon="el-icon-search" :placeholder="$t('nav.Orders_Email')" />
            <el-button slot="append" class="searchButton" type="primary" :disabled="disabledButton" @click="searchDataEmail">{{ $t('nav.Orders_search') }}</el-button></div>
        </div>
        <div class="offRamp-con">
          <el-table
            ref="table"
            :key="1"
            :height="tableHeight"
            :data="sellOrder"
            border
            :lazy="true"
            :cell-style="{padding: '4px 0 4px 0'}"
          >
            <el-table-column
              prop="orderNo"
              label="Order ID"
              align="center"
              width="170"
            />
            <el-table-column
              prop="payTime"
              label="Transcation time"
              align="center"
              width="160"
            />
            <el-table-column
              prop="address"
              label="Address"
              align="center"
              width="260"
            />
            <el-table-column
              prop="fiatAmountAndCurrency"
              label="Fiat"
              align="center"
              width="110"
            />
            <el-table-column
              prop="serviceFee"
              label="Fee"
              align="center"
              width="110"
            />
            <el-table-column
              prop="cryptoVolumeAndCurrency"
              label="Crypto"
              align="center"
              width="100"
            />
            <el-table-column
              label="Network"
              align="center"
              prop="network"
              width="70"
            />
            <el-table-column
              prop="email"
              label="Email"
              align="center"
              width="190"
            />

            <el-table-column
              prop="completeTime"
              label="Complete Time"
              align="center"
              width="150"
            />
            <el-table-column
              prop="orderState"
              label="status"
              align="center"
              width="100"
              fixed="right"
            />
          </el-table>
        </div>
      </div>
      <!-- 卖币 -->
      <div v-if="paramsData.flag==0">
        <div class="order-top">
          <div>
            <el-date-picker
              v-model="timeList"
              type="daterange"
              range-separator="-"
              start-placeholder="Date From"
              end-placeholder="Date To"
            />
          </div>
          <div>
            <el-input v-model="email" style="flex:1;margin-right:0" prefix-icon="el-icon-search" placeholder="Please enter email " />
            <el-button slot="append" class="searchButton" type="primary" :disabled="disabledButton" @click="searchDataEmail">search</el-button></div>
        </div>
        <div class="offRamp-con">
          <el-table
            ref="table"
            :key="2"
            :height="tableHeight"
            border
            :lazy="true"
          >
            <el-table-column
              prop="payWayName"
              label="Order ID"
              align="center"
              width="190"
            />
            <el-table-column
              prop="OrderTime"
              label="Order time"
              align="center"
              width="190"
            />
            <el-table-column
              prop="Fiat"
              label="Fiat"
              align="center"
            />
            <el-table-column
              label="Fee"
              align="center"
            >
              <template slot-scope="scope">
                {{ (scope.row.currencySymbol+scope.row.fixedFee) }} + {{ (scope.row.feeRate*100)+'%' }}
              </template>
            </el-table-column>
            <el-table-column
              label="Amount"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.payMin }} - {{ scope.row.payMax }}
              </template>
            </el-table-column>
            <el-table-column
              prop="Crypto"
              label="Crypto"
              align="center"
            />
            <el-table-column
              prop="CryptoPrice"
              label="Crypto price"
              align="center"
              width="190"
            />
            <el-table-column
              prop="Network"
              label="Network"
              align="center"
              width="190"
            />
            <el-table-column
              prop="toAddress"
              label="toAddress"
              align="center"
              width="190"
            />
            <el-table-column
              prop="fromAddress"
              label="fromAddress"
              align="center"
              width="190"
            />
            <el-table-column
              prop="Account"
              label="Account"
              align="center"
              width="190"
            />
            <el-table-column
              prop="email"
              label="Email"
              align="center"
              width="190"
            />
            <el-table-column
              prop="status"
              label="Status"
              align="center"
              width="190"
            />
            <el-table-column
              prop="complete time"
              label="complete time"
              align="center"
              width="190"
            />
          </el-table>

        </div>
      </div>
      <div v-if="total>1" class="payment-pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :current-page="paramsData.page"
          :page-size="paramsData.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList } from '@/api/user'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'Orders',
  data() {
    return {
      // active: 1,
      timeList: '',
      email: '',
      tableHeight: 46,
      timeOut: null,
      disabledButton: false,
      paramsData: {
        merchantNo: '',
        email: '',
        startTime: '',
        endTime: '',
        page: 1,
        pageSize: 10,
        flag: 1
      },
      sellOrder: [],
      total: '0'

    }
  },
  watch: {
    timeList: {
      // deep: true,
      handler(val) {
        // console.log(parseTime)
        if (val != null && val.length > 0) {
          this.paramsData.startTime = parseTime(this.timeList[0], '{y}-{m}-{d}')
          this.paramsData.endTime = parseTime(this.timeList[1], '{y}-{m}-{d}')
        } else {
          this.paramsData.startTime = ''
          this.paramsData.endTime = ''
        }
      }
    },
    'paramsData.email': {
      deep: true,
      handler(newVal) {
        if (!newVal) {
          this.getSellandBuyOrderList()
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 380
    }, 100)
    this.getSellandBuyOrderList()
  },
  methods: {
    // 搜索用户邮箱
    searchDataEmail() {
      clearTimeout(this.timeOut)
      this.paramsData.email = this.paramsData.email.trim()
      this.disabledButton = true
      this.getSellandBuyOrderList()
      this.timeOut = setTimeout(() => {
        this.disabledButton = false
      }, 1000)
    },
    // 请求商户买卖币的订单列表
    getSellandBuyOrderList() {
      // console.log(this.$store.state.user.name.merchantNo)
      this.paramsData.merchantNo = this.$store.state.user.name.merchantNo
      getOrderList(this.paramsData).then(res => {
        if (res.returnCode === '0000' && res.data) {
          if (this.paramsData.flag === 1) {
            this.sellOrder = res.data.orderList
            this.total = res.data.total
          } else {
            this.total = 0
            return
          }
        }
      })
    },
    // 更改页数
    handleCurrentChange(val) {
      this.paramsData.page = val
      this.getSellandBuyOrderList()
    },
    // 选择sell 或 buy
    changeSellAndBuy(val) {
      this.paramsData.flag = val
      if (val === 1) {
        this.getSellandBuyOrderList()
        return
      } else {
        this.total = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .offRamp-container{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #F4F7FE;
    padding: 0px 30px 0;
    .offRamp-title{
      height: 50px;
      display: flex;
      p{
        width: 230px;
        height: 70px;
        font-size: 14px;
        font-family: RobotoLight;
        font-weight: 800;
        color: #123077;
        line-height: 17px;
        box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
        border-radius: 10px 10px 0 0;
        text-align: center;
        line-height: 40px;
        margin-right: 10px;
        cursor: pointer;
      }
      .active{
        font-family: RobotoBold;
        background: #FFFFFF;
        box-shadow: 0px -15px 20px -5px rgba(177, 202, 239, 0.5);
        position: relative;
        z-index: 2;
      }
    }
      .offRamp-content{
        width: 100%;
        height: 88%;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
        border-radius: 20px;
        position: relative;
        z-index: 1;
        top: 10px;
        padding: 20px 50px 0;
        .offRamp-conTop{
          width: 200%;
          display: flex;
          margin-top: 20px;
          color: #5A6070FF;
          // background: #FBFCFF;
          font-family: RobotoLight;
          div{
            width: 100px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 12px;
            background: #FBFCFF;
            border: 1px solid #E8EAEEFF;
            cursor: pointer;
          }
          div:first-child{
            border-radius: 5px 0 0 5px;
            border-right: none;
          }
          div:last-child{
            border-radius: 0px 5px 5px 0px;
            // border-right: none;
          }
          .active{
            background: #40A1FBFF;
            color: #FFFFFF;
          }
        }
        .offRamp-con{
          width: 100%;
            .el-table{
              font-size: 12px;
              font-family: 'SF Pro';
              font-weight: 400;
              color: #333333;
              border-radius: 5px;
              margin-top: 20px;
              & ::v-deep thead{
                font-size: 12px;
                font-family: 'SF Pro';
                font-weight: 400;
                color: #333333;
              }
              & ::v-deep th{
                height: 45px !important;
                padding: 0 !important;
                background: #F4F7FF;
              }
              & ::v-deep th, td{

                color: #123077;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep .el-table__row td{

                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep.cell{
                line-height: 18px !important;
              }
              & ::v-deep tr td{
                padding: auto;
                line-height: 10px !important;
                border-bottom: 1px solid #E8EAEE;
              }
            }
        }
      }
  }
  .order-top{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    div:first-child{
      width: 30%;
      margin-right: 20px;
     ::v-deep .el-date-editor{
       width: 100%;
       font-family: RobotoLight;
     }
    }
    div:last-child{
      height: 100%;
      display: flex;
      align-items: center;
      ::v-deep .el-input{
        border-radius: 5px 0 0 5px;
      }
      ::v-deep .el-input input{
        border-right: none;
        font-family: RobotoLight;
        border-radius: 5px 0 0 5px;
      }
      ::v-deep .el-button{
        // background: #40A1FBFF;
        color: #FFFFFF;
        font-family: RobotoBold;
        border-radius:  0 5px 5px 0;
      }
    }
  }
  .payment-pagination{
    display: flex;
    justify-content: center;
    position: relative;
    top: 10px;
    z-index: 999;
    ::v-deep .number{
      background: #FFFFFF;
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
    }
    ::v-deep .el-pager li{
      background: #fff;
    }
    ::v-deep .btn-prev{
      background: #FFFFFF;
    }
    ::v-deep .btn-next{
      background: #FFFFFF;
    }
    ::v-deep .el-pagination__total{
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
    }
  }
</style>
