<template>
  <div class="basic-container">
    <div class="basic-totle">Business Info</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="type" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Please select Register">
          <el-option label="Individual Applicati" value="1" />
          <el-option label="Merchant Application" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Company Name" prop="name" style="width:100%">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="URL" prop="name" style="width:100%">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="license Number" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="ID Photo" prop="name">
        <template>
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
          >
            <img style="width:20px;height:20px" src="@/assets/Individual/上传@2x.png" alt="">
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </template>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" />
          <el-checkbox label="地推活动" name="type" />
          <el-checkbox label="线下主题活动" name="type" />
          <el-checkbox label="单纯品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="width:100%;">
        <div class="basic-totle" style="margin-left:-120px !important">Business Info</div>
      </el-form-item>
      <el-form-item label="Full Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Telephone" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Emai Address" prop="name" style="width:100%">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Basic',
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
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
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-container{
  width: 100%;
  .basic-totle{
    font-size: 14px;
    font-family: RobotoBold;
    font-weight: 800;
    color: #123077;
    line-height: 17px;
    margin-bottom: 10px;
  }
  .demo-ruleForm{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      height: 30px;
      margin:0 50px 10px 0;
      ::v-deep .el-upload{
        width: 220px;
        height: 124px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
     ::v-deep input{
        width: 220px;
        height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }
    .el-form-item:nth-of-type(3){
      ::v-deep input{
        width: 610px;
        height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }
    .el-form-item:nth-of-type(6){
      height: 125px;
    }
    .el-form-item:nth-of-type(4){
      ::v-deep input{
        width: 610px;
        height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }
    .el-form-item:nth-of-type(11){
      ::v-deep input{
        width: 610px;
        height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }
    ::v-deep .el-form-item__label{
      font-size: 12px;
      font-family: SF  Pro;
      font-weight: 400;
      color: #5A6070;
      line-height: 14px;
      text-align: left;
      line-height: 30px;
    }
  }
}
</style>
