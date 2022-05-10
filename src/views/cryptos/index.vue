<template>
  <div class="cryptos-container">
    <div class="cryptos-top">
      <p>Cryptos</p>
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    </div>

    <div class="cryptos-content">
      <el-table
        ref="table"
        :data="paymentData"
        border
        :lazy="true"
      >
        <el-table-column
          prop="crypto"
          label="crypto"
          align="center"
        />
        <el-table-column
          prop="network"
          label="network"
          align="center"
        />
        <el-table-column
          prop="Pricefrom"
          label="Price  from"
          align="center"
        />

        <el-table-column
          label="enable"
          align="center"
        >
          <template slot-scope="scope" @click="deltailPayment(scope.row)">
            <el-switch
              v-model="scope.row.aa"
            />
            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      value1: false,
      filterText: '',
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
        { crypto: 1, network: 123, Pricefrom: 123, Fiat: { realCount: 1, currencyCode: 'USDT' }, aa: true, Fee: { realCount: 1, digitalCurrencyCode: 2 }, Crypto: 2, Network: 3, email: 4 }
      ]

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input{
      display: block;
      width: 300px;
    }
.cryptos-container{
  padding: 30px 30px 0 30px;
  .cryptos-top{
    display: flex;
    // align-items: center;
    >p{
      font-size: 14px;
      font-weight: bold;
      margin: 10px 30px 0 0;
      color: #666;
    }

  }
  .cryptos-content{
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

