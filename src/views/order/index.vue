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
        <p style="color: #666666;font-w">email : </p>
        <el-input v-model="formInline.email" style="border-" placeholder="Please enter email " />
        <el-button slot="append" class="searchButton" @click="searchData">search</el-button></div>
    </div>
    <div class="order-content">
      <el-table
        ref="table"
        :height="tableHeight"
        :data="paymentData"
        border
        :lazy="true"
        :cell-style="{padding: '4px 0 4px 0'}"
      >
        <el-table-column
          prop="orderId"
          label="Order ID"
          align="center"
          width="100"
        />
        <el-table-column
          prop="transactionTime"
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
          prop="fiat"
          label="Fiat"
          align="center"
          width="110"
        />
        <el-table-column
          prop="fee"
          label="Fee"
          align="center"
          width="110"
        />
        <el-table-column
          prop="crypto"
          label="Crypto"
          align="center"
        />
        <el-table-column
          label="Network"
          align="center"
          prop="network"
        />
        <el-table-column
          prop="email"
          label="Email"
          align="center"
          width="190"
        />
      </el-table>
      <div v-if="total>1" class="payment-pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :current-page="formInline.pageNo"
          :page-size="formInline.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { parseTime } from '@/utils/index.js'
// import { searchOrder } from '../../api/user'

// export default {
//   name: 'Order',
//   data() {
//     return {
//       total: 0,
//       timeList: '',
//       tableHeight: 46,
//       formInline: {
//         email: '',
//         payStatus: 1,
//         keywords: '',
//         startTime: '',
//         endTime: '',
//         coinType: '',
//         pageNo: 1,
//         pageSize: 20
//       },
//       paymentData: [
//         { OrderID: 1, Transcationtime: 123, Address: 123, Fiat: { realCount: 1, currencyCode: 'USDT' }, Fee: { realCount: 1, digitalCurrencyCode: 2 }, Crypto: 2, Network: 3, email: 4 }
//       ]
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'name'
//     ])
//   },
//   watch: {
//     timeList: {
//       // deep: true,
//       handler(val) {
//         if (val != null && val.length > 0) {
//           this.formInline.startTime = parseTime(this.timeList[0], '{y}-{m}-{d}')
//           this.formInline.endTime = parseTime(this.timeList[1], '{y}-{m}-{d}')
//         } else {
//           this.formInline.startTime = ''
//           this.formInline.endTime = ''
//         }
//       }
//     },
//     'formInline.email': {
//       deep: true,
//       handler(newVal) {
//         if (!newVal) {
//           this.getOrderData()
//         }
//       }
//     }
//   },
//   mounted() {
//     this.getOrderData()
//     setTimeout(() => {
//       this.tableHeight = window.innerHeight - 320
//     }, 100)
//   },
//   methods: {
//     // get order data
//     getOrderData() {
//       searchOrder(this.formInline).then(res => {
//         if (res && res.data) {
//           // console.log(res)
//           this.paymentData = res.data.records
//           this.total = res.data.total
//         }
//       })
//     },
//     // search order data
//     searchData() {
//       this.formInline.email.trim()
//       this.getOrderData()
//       this.$message({
//         type: 'success',
//         message: 'Search success'
//       })
//     },
//     // page turning
//     handleCurrentChange(val) {
//       this.formInline.pageNo = val
//       this.getOrderData()
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.order-container{
  width: 95%;
  height: 95%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 30px  40px 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
.searchButton{
      font-family: RobotoBold;
      border-radius: 0px 8px 8px 0px;
      color: #FFFFFF;
      background: #40A1FB;
      border: 1px solid #E8EAEE;
    }
  .order-top{
    display: flex;
    // margin: 30px;
    align-items: center;
    ::v-deep .el-date-editor input{
      font-family: RobotoLight;
    }
    div:nth-of-type(2){
      display: flex;
      align-items: center;
      p{
        font-family: RobotoBold;
        font-weight: bold;
        width: 100px;
        margin: 0 20px 0 30px;
      }
      ::v-deep .el-input input{
        font-family: RobotoLight;
        border-right: none;
      }
    }
  }
  .order-content{
    width: 100%;
    margin: 20px 0 0 0px;
    .payment-pagination{
      margin-top: 10px;
      display: flex;
    justify-content: center;
    }
    .el-table{
  font-size: 12px;
  font-family: 'SF Pro';
  font-weight: 400;
  color: #333333;
  border-radius: 5px;
  & ::v-deep thead{
    font-size: 12px;
    font-family: 'SF Pro';
    font-weight: 400;
    color: #333333;
  }
  & ::v-deep th{
    background: #F7F9FC;
  }
  & ::v-deep th, td{
    color: #123077;
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep .el-table__row td{
    color: #5A6070;
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep tr td{
    border: 1px solid #E8EAEE;
  }
}
.el-table--group, .el-table--border{
  border: 1px solid #E8EAEE;
}
  }
  .payment-pagination{
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
}
</style>
