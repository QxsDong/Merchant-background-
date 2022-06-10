<template>
  <div class="application-container">
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
          prop="Application"
          label="Application Name"
          align="center"
          width="140"
        />
        <el-table-column
          prop="transactionTime"
          label="App ID"
          align="center"
          width="160"
        />
        <el-table-column
          prop="address"
          label="Secret"
          align="center"
          width="100"
        />
        <el-table-column
          prop="fiat"
          label="Product"
          align="center"
          width="110"
        />
        <el-table-column
          prop="fee"
          label="Callback Address"
          align="center"
        />
        <el-table-column
          prop="crypto"
          label="IP Address"
          align="center"
        />
        <el-table-column
          label="Creation Time"
          align="center"
          prop="network"
        />
        <el-table-column
          prop="email"
          label="State"
          align="center"
          width="100"
        />
        <el-table-column
          prop="email"
          label="Operate"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Application',
  data() {
    return {
      tableHeight: 45,
      paymentData: [
        {
          Application: '0'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 300
    }, 100)
  },
  methods: {
    handleClick(val) {
      this.$router.push('/Application/collction')
      // console.log(val)
    }
  }
}

</script>
<style lang="scss" scoped>
.application-container{
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
