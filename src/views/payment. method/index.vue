<template>
  <div class="payment-container">
    <div class="payment-content">
      <el-table
        ref="table"
        :height="tableHeight"
        :data="paymentData"
        border
        :lazy="true"
      >
        <el-table-column
          prop="payWayName"
          label="Payment method"
          align="center"
          width="190"
        />
        <el-table-column
          prop="currency"
          label="fiat"
          align="center"
          width="190"
        />
        <el-table-column
          prop="country"
          label="Country"
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

      </el-table>
    </div>
  </div>
</template>

<script>
// import { getpayWatList } from '../../api/user'
// export default {
//   data() {
//     return {
//       tableHeight: 46,
//       formInline: {
//         payStatus: 1,
//         keywords: '',
//         startTime: '',
//         endTime: '',
//         coinType: '',
//         pageNum: 1,
//         pageSize: 20
//       },
//       paymentData: []
//     }
//   },
//   mounted() {
//     setTimeout(() => {
//       this.tableHeight = window.innerHeight - 250
//     }, 100)
//     this.getPaymentData()
//   },
//   methods: {
//     getPaymentData() {
//       getpayWatList().then(res => {
//         console.log(res)
//         if (res && res.data) {
//           this.paymentData = res.data
//         }
//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.payment-container{
  width: 95%;
  height: 94%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 30px  40px 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  // padding: 30px;
  .payment-content{
    .el-table{
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  border-radius: 5px;
  & ::v-deep thead{
    font-size: 12px;
    font-weight: 400;

  }
  & ::v-deep th{
    background: #F4F7FF;
  }
  & ::v-deep th, td{
     color: #123077;
    font-family: 'SF Pro';
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep .el-table__row td{
    font-family: 'SF Pro';
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep tr td{
    border-bottom: 1px solid #E8EAEE;
  }
}
.el-table--group, .el-table--border{
  border: 1px solid #E8EAEE;
}
  }
}
</style>

