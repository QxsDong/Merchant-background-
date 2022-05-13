<template>
  <div class="cryptos-container">
    <div class="cryptos-top">
      <p>Cryptos :</p>
      <el-input v-model="formInline.crypto" placeholder="Filter keyword" style="margin-bottom:30px;" />
      <el-button slot="append" class="searchButton" @click="searchData">search</el-button>
    </div>

    <div class="cryptos-content">
      <el-table
        ref="table"
        :height="tableHeight"
        :data="paymentData"
        border
        :lazy="true"
      >

        <el-table-column

          label="crypto"
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
          label="network"
          align="center"
        />
        <el-table-column
          prop="priceFrom"
          label="Price  from"
          align="center"
        />

        <el-table-column
          label="enable"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @click.native="setState(scope.row)"
            />
            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="payment-pagination">
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
import { getMerchant, setMerchantState } from '../../api/user'
export default {

  data() {
    return {
      total: 0,
      value1: false,
      filterText: '',
      tableHeight: 46,
      formInline: {
        crypto: '',
        pageNo: 1,
        pageSize: 20
      },
      paymentData: [],
      state: 0

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
    'formInline.crypto': {
      handler(newVal) {
        if (!newVal) {
          this.getCryptos()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getCryptos()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 280
    }, 100)
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // get cryptos merchant data
    getCryptos() {
      getMerchant(this.formInline).then(res => {
        if (res && res.data) {
          res.data.records.forEach(item => {
            if (item.state === 1) {
              item.state = true
            } else {
              item.state = false
            }
          })
          this.paymentData = res.data.records
          this.total = res.data.total
        }
      })
    },
    // set state
    setState(stateData) {
      setMerchantState({ id: stateData.id, state: stateData.state ? 1 : 0 }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      })
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val
      this.getOrderData()
    },
    // search
    searchData() {
      if (!this.formInline.crypto) {
        this.$message({
          type: 'error',
          message: 'The input box cannot be empty'
        })
        return false
      }
      this.getCryptos()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input{
      display: block;
      width: 200px;
      border-right: none;
    }
.cryptos-container{
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

  .cryptos-top{
    display: flex;
    // align-items: center;
    >p{
      font-size: 14px;
      font-weight: bold;
      margin: 10px 20px 0 0;
      color: #666;
    }
.searchButton{
  height: 40px;
      // font-family: 'Gilroy';
      border-radius: 0px 8px 8px 0px;
      color: #FFFFFF;
      background: #40A1FB;
      border: 1px solid #E8EAEE;
    }
  }
  .cryptos-content{
    .payment-pagination{
      display: flex;
      align-content: center;
      justify-content: center;
      margin-top: 20px;
    }
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

