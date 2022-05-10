<template>
  <div class="order-container">
    <!-- <div class="order-text">name: {{ name }}</div> -->
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
        <p>email : </p>
        <el-input v-model="formInline.keywords" style="border-" placeholder="Please enter email " /></div>
    </div>
    <div class="order-content">
      <el-table
        ref="table"
        :data="paymentData"
        border
        :lazy="true"
      >
        <el-table-column
          prop="OrderID"
          label="Order ID"
          align="center"
          width="190"
        />
        <el-table-column
          prop="Transcationtime"
          label="Transcation time"
          align="center"
          width="190"
        />
        <el-table-column
          prop="Address"
          label="Address"
          align="center"
          width="190"
        />
        <el-table-column
          label="Fiat"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.currencyAmount }} {{ scope.row.currencyCode }}
          </template>
        </el-table-column>
        <el-table-column
          label="Fee"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.realCount }} {{ scope.row.digitalCurrencyCode }}
          </template>
        </el-table-column>
        <el-table-column
          prop="Crypto"
          label="Crypto"
          align="center"
        />
        <el-table-column
          label="Network"
          align="center"
          prop="Network"
        >
          <template slot-scope="scope">
            {{ scope.row.fee }} {{ scope.row.feeUnit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="email"
          align="center"
        >
          <!-- <template slot-scope="scope">
            {{ scope.row.usdtCount }} USDT
          </template> -->
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          width="120"
        >
          <!-- <template slot-scope="scope">
            <el-button type="text" size="small" style="font-weight: bold" @click="deltailPayment(scope.row)">Detail</el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'Order',
  data() {
    return {
      timeList: '',
      formInline: {
        payStatus: 1,
        keywords: '',
        startTime: '',
        endTime: '',
        coinType: '',
        pageNum: 1,
        pageSize: 20
      },
      paymentData: [
        { OrderID: 1, Transcationtime: 123, Address: 123, Fiat: { realCount: 1, currencyCode: 'USDT' }, Fee: { realCount: 1, digitalCurrencyCode: 2 }, Crypto: 2, Network: 3, email: 4 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    timeList: {
      // deep: true,
      handler(val) {
        if (val != null && val.length > 0) {
          this.formInline.startTime = parseTime(this.timeList[0], '{y}-{m}-{d}')
          this.formInline.endTime = parseTime(this.timeList[1], '{y}-{m}-{d}')
        } else {
          this.formInline.startTime = ''
          this.formInline.endTime = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-container{

  .order-top{
    display: flex;
    margin: 30px;
    align-items: center;
    div:nth-of-type(2){
      display: flex;
      align-items: center;
      p{
        font-family: Roboto-Regular, Roboto;
        width: 80px;
        margin: 0 30px 0 20px;
      }
    }
  }
  .order-content{
    width: 90%;
    margin: 20px 0 0 30px;
    .el-table{
  font-size: 10px;
  font-family: Roboto-Regular, Roboto;
  font-weight: 400;
  color: #333333;
  & ::v-deep thead{
    font-size: 12px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #333333;
  }
  & ::v-deep th{
    background: #F4F7FF;
  }
  & ::v-deep th, td{
    border-bottom: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
  }
  & ::v-deep .el-table__row td{

    border-bottom: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
  }
  & ::v-deep tr td{
    border-bottom: 1px solid #CCCCCC;
  }
}
.el-table--group, .el-table--border{
  border: 1px solid #CCCCCC;
}
  }
}
</style>
