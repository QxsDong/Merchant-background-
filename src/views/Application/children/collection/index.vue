<template>
  <div class="collection-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" hide-required-asterisk class="demo-ruleForm">
      <div class="collection-title">ACH Collection <span style="font-size: 10px;font-family: SF  Pro;color: #40A1FB;margin-left:40px">API 文档</span></div>
      <div class="collection-content">

        <el-form-item label="Product Capability" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="APP ID" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="Secret" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="Edit" />
          <span @click="Edit=!Edit">Edit</span>
        </el-form-item>
        <el-form-item label="Noticeurl" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="Edit1" />
          <span @click="Edit1=!Edit1">Edit</span>
        </el-form-item>
        <el-form-item label="Public key" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="Private key" prop="name" class="collection-con">
          <el-input v-model="ruleForm.name" :disabled="true" />
        </el-form-item>
      </div>

      <p class="collection_prompt "><img style="margin-right: 10px" src="@/assets/logos/GroupIcon.png" alt="">当在订单中传入Noticeurl时，以订单上的Noticeurl为准。</p>
      <div class="collection-title" style="margin:38px 0 0 0px">IP Settings</div>
      <el-form-item prop="resource" hide-required-asterisk="false" class="coll-radio">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio :label="0">Can accept API calls from any IP</el-radio>
          <el-radio :label="1">Can only accept API calls from a specific IP</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="desc">
        <div style="height:70px;overflow:hidden">
          <el-input v-model="ruleForm.desc" :disabled="ruleForm.resource==0?true:false" type="textarea" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">save</el-button>
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Edit1: true,
      Edit: true,
      input: '',
      ruleForm: {
        name: '',

        delivery: false,
        resource: 0,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-container{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  // box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 40px  50px 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  .collection-title{
    font-size: 14px;
    font-family: RobotoBold;
    font-weight: 800;
    color: #123077;
    line-height: 17px;
  }
  .collection-content{
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .collection-con{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 50px 0 0;
      position: relative;
      ::v-deep .el-form-item__label{
        display: inline-block;
        width: 125px;
        height: 14px;
        font-size: 12px;
        text-align: left;
        font-family: SF  Pro !important;
        font-weight: 400 !important;
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
        top: 13px;
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
      display: flex;
      align-items: center;
  }
   .coll-radio ::v-deep.el-radio-group{
    display: flex !important;
    flex-direction: column !important;
    font-size: 12px;
    font-family:SF  Pro;
    font-weight: 400;
    color: #5A6070;
    line-height: 14px;
    .el-radio{
      margin-top: 20px;
    }
  }
  ::v-deep .el-textarea__inner{
    width: 350px;
    height: 90px;
    background: #F4F7FEFF;
    border: none;
  }
}
</style>
