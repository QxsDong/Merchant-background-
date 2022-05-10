<template>
  <div class="payment-container">
    <div class="payment-content">
      <el-table
        ref="table"
        :data="paymentData"
        border
        :lazy="true"
      >
        <el-table-column
          prop="OrderID"
          label="Payment method"
          align="center"
          width="190"
        />
        <el-table-column
          prop="Transcationtime"
          label="fiat"
          align="center"
          width="190"
        />
        <el-table-column
          prop="Address"
          label="Country"
          align="center"
          width="190"
        />
        <el-table-column
          label="Fee"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.currencyAmount }} {{ scope.row.currencyCode }}
          </template>
        </el-table-column>
        <el-table-column
          prop="Crypto"
          label="Amount"
          align="center"
        />

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-container{
  padding: 30px;
  .payment-content{
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

