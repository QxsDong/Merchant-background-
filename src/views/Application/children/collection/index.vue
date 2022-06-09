<template>
  <div class="collection-container">
    <div class="collection-title">ACH Collection</div>
    <div class="collection-content">
      <div class="collection-con">
        <div class="left">Product Capability</div>
        <el-input
          v-model="input"
          :disabled="true"
        />

      </div>
      <div class="collection-con">
        <div class="left">APP ID</div>
        <el-input
          v-model="input"
          :disabled="true"
        />
      </div>
      <div class="collection-con">
        <div class="left">Secret</div>
        <el-input
          v-model="input"
          :disabled="Edit"
        />
        <span @click="Edit=false">Edit</span>
      </div>
      <div class="collection-con">
        <div class="left">Noticeurl</div>
        <el-input
          v-model="input"
          :disabled="Edit1"
        />
        <span @click="Edit1=false">Edit</span>
      </div>
      <div class="collection-con">
        <div class="left">Public key</div>
        <el-input
          v-model="input"
          :disabled="true"
        />
      </div>
      <div class="collection-con">
        <div class="left">Private key</div>
        <el-input
          v-model="input"
          :disabled="true"
        />
      </div>
    </div>
    <p class="collection_prompt ">当在订单中传入Noticeurl时，以订单上的Noticeurl为准。</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Edit1: true,
      Edit: true,
      input: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-container{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 30px  40px 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  .collection-content{
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .collection-con{
      display: flex;
      align-items: center;
      margin: 20px 50px 0 0;
      position: relative;
      .left{
        width: 105px;
        height: 14px;
        font-size: 12px;
        font-family: SF  Pro;
        font-weight: 400;
        color: #5A6070;
        line-height: 14px;
        margin-right: 30px;
      }
      span{
        font-size: 10px;
        font-family: SF  Pro;
        font-weight: 400;
        color: #40A1FB;
        line-height: 12px;
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
      .el-input{
        width: 220px;
          height: 30px;
      }
      .el-input ::v-deep input{
          width: 220px;
          height: 30px;
          border: none;
          background: #F8FAFD;
          border-radius: 2px;
          font-size: 12px;
          font-family: SF  Pro;
          font-weight: 400;
          color: #A7A7A7;
          line-height: 30px;
          margin-right: 50px;
        }
    }
  }
  .collection_prompt{
    font-size: 12px;
      font-family: SF  Pro;
      font-weight: 400;
      color: #BBC2CF;
      line-height: 14px;
      margin-top: 20px;
  }
}
</style>
