<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="buySell==1?'active':''" @click="buySell=1">{{ $t('nav.Buy_coins') }}</p>
      <p :class="buySell==2?'active':''" @click="buySell=2">{{ $t('nav.Sell_coins') }}</p>
    </div>

    <div class="offRamp-content">
      <!-- 买币 -->
      <div v-if="buySell==1">
        <div class="offRamp-conTop">
          <div :class="sellPayout==1?'active':''" @click="sellPayout=1">买币币种</div>
          <div :class="sellPayout==2?'active':''" @click="sellPayout=2">收款方式</div>
        </div>
        <div v-if="sellPayout==1" class="offRamp-con">
          <el-table
            ref="table"
            key="1"
            :height="tableHeight"
            :data="paymentData"
            border
            :lazy="true"
          >
            <el-table-column
              label="Name"
              align="left"
            >
              <template slot-scope="scope">
                <div style="height100%;display:flex; align-items: center;">
                  <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;margin-left:10%">
                  <!-- </el-popover> -->
                  <span style="line-height:10px;margin-left:10px">{{ scope.row.fullName }}</span>
                </div>
                <!-- <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px"> -->
                <!-- <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px"> -->

              </template>
            </el-table-column>
            <el-table-column
              prop="network"
              label="Network"
              align="center"
            />
            <el-table-column
              prop="channel"
              label="Price From"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.channel===1?'binance':scope.row.channel }}
                <template /></template></el-table-column>
            <!-- <el-table-column
              prop="networkFee"
              label="提现手续费"
              align="center"
            /> -->
            <el-table-column
              label="action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.buyEnable"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setBuySell(scope.row)"
                />

                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div v-else class="offRamp-con">
          <el-table
            ref="table"
            key="2"
            :height="tableHeight"
            :data="buyTable"
            border
            :lazy="true"
          >
            <el-table-column
              prop="payWayName"
              label="收款方式"
              align="center"
            />
            <el-table-column
              prop="currency"
              label="收款币种"
              align="center"
            />
            <el-table-column
              prop="currency"
              label="结算币种"
              align="center"
            />
            <!-- <el-table-column
              label="Fee"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.fixedFee + scope.row.feeRate }}
              </template>
            </el-table-column> -->
            <el-table-column
              label="Action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setCollection(scope.row)"
                />
                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 卖币 -->
      <div v-if="buySell==2">
        <div class="offRamp-conTop">
          <div :class="sellPayout==1?'active':''" @click="sellPayout=1">卖币币种</div>
          <div :class="sellPayout==2?'active':''" @click="sellPayout=2">出款方式</div>
        </div>
        <div v-if="sellPayout==1" class="offRamp-con">
          <el-table
            ref="table"
            key="3"
            :height="tableHeight"
            :data="paymentData1"
            border
            :lazy="true"
          >
            <el-table-column

              label="Name"
              align="center"
            >
              <template slot-scope="scope">
                <div style="height100%;display:flex; align-items: center;margin-left:20%">
                  <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;">
                  <!-- </el-popover> -->
                  <span style="line-height:10px;margin-left:10px">{{ scope.row.fullName }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="network"
              label="Network"
              align="center"
            />
            <el-table-column
              prop="channel"
              label="Price From"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.channel===1?'binance':scope.row.channel }}
              </template>
            </el-table-column>
            <!-- <el-table-column

              label="提现手续费"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.networkFee }}
              </template>
            </el-table-column> -->
            <el-table-column
              label="action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.sellEnable"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setBuySell(scope.row)"
                />
                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div v-else class="offRamp-con">
          <el-table
            ref="table"
            key="4"
            :height="tableHeight"
            :data="sellTbale"
            border
            :lazy="true"
          >
            <el-table-column
              prop="alpha3"
              label="国家"
              align="center"
            />
            <el-table-column
              prop="currency"
              label="法币币种"
              align="center"
            />
            <!-- <el-table-column
              label="手续费"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.fixedFee + scope.row.fixedFee }}
              </template>
            </el-table-column> -->
            <el-table-column
              label="action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setSellStatus(scope.row)"
                />
                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="total>1" class="payment-pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>
<script>
import { getCryptoList, setCryptoState, getSellPayout, getBuyList, setCollectionState, setSelltionState } from '@/api/user'
export default {
  name: 'OffRamp',
  data() {
    return {
      buySell: 1,
      sellPayout: 1,
      paymentData: [],
      paymentData1: [],
      tableHeight: 46,
      pageIndex: 1,
      pageSize: 11,
      total: 0,
      sellTbale: [],
      buyTable: []
    }
  },
  watch: {
    buySell(newVal, oldVal) {
      if ((newVal === 1 && this.sellPayout === 1) || newVal === 2 && this.sellPayout === 1) {
        this.pageIndex = 1
        this.sellPayout = 1
        this.MerchantList()
        return
      } else if (newVal === 1 && this.sellPayout === 2) {
        this.pageIndex = 1
        this.getBuyTable()
        return
      } else {
        this.pageIndex = 1
        this.SellPayout()
        return
      }
    },
    sellPayout(newVal) {
      // console.log(newVal)
      if (newVal === 2 && this.buySell === 2) {
        this.pageIndex = 1
        this.SellPayout()
        return
      } else if (newVal === 2 && this.buySell === 1) {
        this.pageIndex = 1
        this.getBuyTable()
        return
      } else {
        this.pageIndex = 1
        this.sellPayout = 1
        this.MerchantList()
        return
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 400
    }, 100)
    this.MerchantList()
  },
  methods: {
    MerchantList() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10,
        'side': this.buySell
      }
      getCryptoList(params).then(res => {
        this.total = 0
        if (res.returnCode === '0000' && res.data) {
          if (this.buySell === 1) {
            this.paymentData = res.data.result
            this.total = res.data.total
            return
          } else {
            this.paymentData1 = res.data.result
            this.total = res.data.total
          }
        }
      })
      // getMerchantAddList(params).then(res => {
      //   console.log(res)
      // })
    },
    // 出款方式列表
    SellPayout() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10
      }
      getSellPayout(params).then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.sellTbale = res.data.result
          this.pageIndex = res.data.pageIndex
          this.total = res.data.total
        }
      })
    },
    // 收款方式列表
    getBuyTable() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10
      }
      getBuyList(params).then(res => {
        // console.log(res)
        if (res.returnCode === '0000' && res.data) {
          this.buyTable = res.data
          this.total = 0
        }
      })
    },

    handleCurrentChange(val) {
      if (this.buySell === 2 && this.sellPayout === 2) {
        this.pageIndex = val
        this.SellPayout()
        return
      } else if (this.buySell === 1 && this.sellPayout === 2) {
        this.pageIndex = val
        this.getBuyTable()
        return
      }
      this.pageIndex = val
      this.MerchantList()
    },
    // 设置买卖币状态修改
    setBuySell(val) {
      // console.log(val)
      let params
      if (this.buySell === 1 && this.sellPayout === 1) {
        params = {
          merchantAppId: this.$route.query.merchantAppId,
          buyEnable: val.buyEnable
        }
      } else {
        params = {
          merchantAppId: this.$route.query.merchantAppId,
          sellEnable: val.sellEnable

        }
      }
      setCryptoState(val.merchantNetworkId, params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.MerchantList()
        }
      })
    },
    // 设置收款方式状态
    setCollection(val) {
      const params = {
        merchantAppId: this.$route.query.merchantAppId,
        status: val.status
      }
      setCollectionState(val.merchantPayWayId, params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.getBuyTable()
        }
      })
    },
    // 设置出款方式状态
    setSellStatus(val) {
      const params = {
        merchantAppId: this.$route.query.merchantAppId,
        status: val.status
      }
      setSelltionState(val.withdrawalMethodId, params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.SellPayout()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .offRamp-container{
    width: 100%;
    height: 98%;
    position: absolute;
    left: 0;
    top: 0;
    background: #F4F7FE;
    padding: 20px 30px 0;

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
        background: #FFFFFF;
        box-shadow: 0px -15px 20px -5px rgba(177, 202, 239, 0.5);
        font-family: RobotoBold;
        position: relative;
        z-index: 2;
      }
    }
      .offRamp-content{
        width: 100%;
        height: 90%;
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
          margin-top: 10px;
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
                background: #F4F7FF;
              }
              & ::v-deep th, td{
                text-align: center;
                color: #123077;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep .el-table__row td{
                height: 45px;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;

              }
              & ::v-deep tr td{
                padding:  10px 0 0 0 ;
                border-bottom: 1px solid #E8EAEE;
              }
            }
        }
      }
  }
  .payment-pagination{
    display: flex;
    justify-content: center;
    position: relative;
    top: 20px;
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
