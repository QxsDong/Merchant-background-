<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="buySell==1?'active':''" @click="buySell=1">买币</p>
      <p :class="buySell==2?'active':''" @click="buySell=2">卖币</p>
    </div>
    <!-- 买币 -->
    <div v-if="buySell==1" class="offRamp-content">
      <div class="offRamp-conTop">
        <div :class="active1==1?'active':''" @click="active1=1">买币币种</div>
        <div :class="active1==2?'active':''" @click="active1=2">收款方式</div>
      </div>
      <div v-if="active1==1" class="offRamp-con">
        <el-table
          ref="table"
          key="1"
          :height="tableHeight"
          :data="paymentData"
          border
          :lazy="true"
        >
          <el-table-column
            label="Crypro"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px">
                <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;">
              </el-popover>
              <span style="position: absolute;top:15px">{{ scope.row.crypto }}</span>
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
          />
          <el-table-column
            prop="networkFee"
            label="提现手续费"
            align="center"
          />
          <el-table-column
            label="action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.buyEnable"
                @change="setBuySell(scope.row.buyEnable==true?1:0)"
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
          :data="paymentData.result"
          border
          :lazy="true"
        >
          <el-table-column

            label="收款方式"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px">
                <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;">
              </el-popover>
              <span style="position: absolute;top:15px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sellEnable"
            label="收款币种"
            align="center"
          />
          <el-table-column
            prop="network"
            label="结算币种"
            align="center"
          />
          <el-table-column
            prop="price"
            label="Fee"
            align="center"
          />
          <el-table-column
            label="Action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.buyEnable"
              />
            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <div v-if="total>1" class="payment-pagination">
          <el-pagination
            background
            layout="prev, pager, next, total"
            :current-page="formInline.pageNo"
            :page-size="formInline.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </div>
    </div>
    <!-- 卖币 -->
    <div v-if="buySell==2" class="offRamp-content">
      <div class="offRamp-conTop">
        <div :class="active1==1?'active':''" @click="active1=1">卖币币种</div>
        <div :class="active1==2?'active':''" @click="active1=2">出款方式</div>
      </div>
      <div v-if="active1==1" class="offRamp-con">
        <el-table
          ref="table"
          key="3"
          :height="tableHeight"
          :data="paymentData1"
          border
          :lazy="true"
        >
          <el-table-column

            label="Crypro"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px">
                <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;">
              </el-popover>
              <span style="position: absolute;top:15px">{{ scope.row.crypto }}</span>
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
          />
          <el-table-column
            prop="networkFee"
            label="提现手续费"
            align="center"
          />
          <el-table-column
            label="action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.buyEnable"
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
          border
          :lazy="true"
        >
          <el-table-column
            prop="sellEnable"
            label="国家"
            align="center"
          />
          <el-table-column
            prop="network"
            label="法币币种"
            align="center"
          />
          <el-table-column
            prop="price"
            label="手续费"
            align="center"
          />
          <el-table-column
            prop="sellEnable"
            label="action"
            align="center"
          />

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
</template>
<script>
import { getCryptoList, setCryptoState } from '@/api/user'
export default {
  name: 'OffRamp',
  data() {
    return {
      buySell: 1,
      active1: 1,
      paymentData: [],
      paymentData1: [],
      tableHeight: 46,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {
    buySell(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.pageIndex = 1
        this.MerchantList()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 390
    }, 100)
    this.MerchantList()
  },
  methods: {
    MerchantList() {
      console.log(this.pageIndex)
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10,
        'side': this.buySell
      }
      getCryptoList(params).then(res => {
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

    handleCurrentChange(val) {
      this.pageIndex = val
      this.MerchantList()
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
                background: #F4F7FF;
              }
              & ::v-deep th, td{

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
    top: -35px;
    z-index: 999;
    ::v-deep .number{
      background: #FFFFFF;
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
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
