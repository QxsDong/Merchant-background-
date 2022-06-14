<template>
  <div class="basic-container">
    <div class="basic-totle">Business Info</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="type" prop="type">
        <el-select v-model="ruleForm.type" placeholder="Please select Register">
          <el-option label="Individual Applicati" value="2" />
          <el-option label="Merchant Application" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-show="ruleForm.type==1" label="Company Name" prop="fullName" style="width:100%">
        <el-input v-model="ruleForm.fullName" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="ruleForm.site" />
      </el-form-item>
      <el-form-item label="license Number" prop="licenseNo">
        <el-input v-model="ruleForm.licenseNo" />
      </el-form-item>
      <el-form-item label="ID Photo" prop="dialogImageUrl">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>
      <el-form-item label="Business Type" prop="merchantBizType">
        <el-checkbox-group v-model="ruleForm.merchantBizType">
          <el-checkbox v-for="item in bizType" :key="item.dictValue" :label="item.dictLabel" :name="item.dictValue" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="width:100%;">
        <div class="basic-totle" style="margin-left:-120px !important">Business Info</div>
      </el-form-item>
      <el-form-item label="Full Name" prop="contactName">
        <el-input v-model="ruleForm.contactName" />
      </el-form-item>
      <el-form-item label="Telephone" prop="contactPhone">
        <el-input v-model="ruleForm.contactPhone" />
      </el-form-item>
      <el-form-item label="Emai Address" prop="contactEmail" style="width:100%">
        <el-input v-model="ruleForm.contactEmail" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">next</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>

export default {
  name: 'Basic',
  props: ['bizType'],
  data() {
    return {
      ruleForm: {
        type: '',
        site: '',
        name: '',
        fullName: '',
        licenseNo: '',
        licenseUrl: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        merchantBizType: [],
        applyProductCode: [],
        resource: '',
        desc: '',
        applyProductParam: {},
        dialogImageUrl: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        name: [
          { required: true, message: 'Please enter a name', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: 'Please enter a name', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Please select a merchant or individual', trigger: 'change' }
        ],
        licenseNo: [
          { required: true, message: 'The certificate number cannot be empty', trigger: 'blur' }
        ],
        merchantBizType: [
          { type: 'array', required: true, message: 'Please select at least one', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: 'Please enter Full Name', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: 'Please enter phone', trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: 'Please enter Email', trigger: 'blur' }
        ],
        dialogImageUrl: [
          { required: true, message: '请选择图片', trigger: 'blur' }
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
          this.$parent.state = 2
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.ruleForm.dialogImageUrl = URL.createObjectURL(file.raw)
      // var files = this.addForm.image
      // files.push(this.addForm.image)
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
      margin:0 50px 15px 0;
      ::v-deep .el-upload{
        width: 220px;
        height: 124px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
        position: relative;

      }
      ::v-deep .el-upload-list__item-thumbnail{
            width: 220px;
            height: 124px;
          }
      ::v-deep .el-upload-list__item{
          width: 220px;
          height: 124px;
          border: none;
          background: #F8FAFD;
          position: absolute;
          z-index: 999;

        }
     ::v-deep input{
        width: 220px;
        height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
        font-size: 12px;
        font-family: SF  Pro;
        color: #A7A7A7;
      }
      ::v-deep .el-form-item__error{
        top: 90%;
        font-size: 10px;
        font-family: RobotoLight;
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
      ::v-deep .el-form-item__error{
        top: 100%;
      }
    }
    .el-form-item:last-child{
      width: 400px;
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translate(-50%,0);
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

    .el-form-item:nth-of-type(7){
      height: 100%;
      margin: 0;
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
.el-checkbox ::v-deep .el-checkbox__label{
  font-size: 12px;
  font-family: SF  Pro;
  font-weight: 400;
  color: #A7A7A7;
  line-height: 14px;
}

</style>
