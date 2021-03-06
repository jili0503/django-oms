<template>
  <div class="components-container" style='height:100vh'>
    <el-card>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option v-for="item in types" :key="item.id" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor style="z-index: 1" v-model="ruleForm.content" code_style="monokai"
                        :toolbars="toolbars" @imgAdd="imgAdd" ref="md"></mavon-editor>
          <a class="tips"> Tip：截图可以直接 Ctrl + v 粘贴到内容里面</a>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            ref="upload"
            :action="uploadurl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <el-button slot="trigger" size="mini" type="success" plain :disabled="count>4">
              上传
            </el-button>
            <div slot="tip" class="el-upload__tip">
              <p><a style="color: red">最多只能上传5个文件</a></p>
            </div>
          </el-upload>
          <hr class="heng"/>
          <div v-if='enclosureData.length>0' class="ticketenclosure">
            <ul>
              <li v-for="item in enclosureData" :key="item.id" v-if="item.file" style="list-style:none">
                <i class="fa fa-paperclip"></i>
                <a :href="apiurl + '/upload/' + item.file" :download="item.file">{{item.file.split('/')[1]}}</a>
                <el-tooltip class="item" effect="dark" content="删除附件" placement="right">
                  <el-button type="text" icon="el-icon-delete" @click="deleteEnclosure(item.id)"></el-button>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getDemandManager, getProjectType, putDemandManager } from '@/api/project'
import { postDemandEnclosure, getDemandEnclosure, deleteDemandEnclosure } from '@/api/project'
import { postUpload } from 'api/tool'
import { apiUrl, uploadurl } from '@/config'
import { getConversionTime } from '@/utils'

export default {
  components: {},

  data() {
    return {
      route_path: this.$route.path.split('/'),
      pid: this.$route.params.id,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入正确的内容', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入正确的内容', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入正确的内容', trigger: 'blur' }
        ]
      },
      users: [],
      toolbars: {
        preview: true, // 预览
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        ol: true, // 有序列表
        help: true
      },
      apiurl: apiUrl,
      uploadurl: uploadurl,
      types: [],
      img_file: {},
      count: 0,
      enclosureData: [],
      enclosureForm: {
        project: '',
        create_user: localStorage.getItem('username'),
        file: ''
      }
    }
  },

  created() {
    this.fetchData()
    this.getTypes()
    this.fetchEnclosureData()
  },
  methods: {
    fetchData() {
      const query = null
      getDemandManager(query, this.pid).then(response => {
        this.ruleForm = response.data
        this.enclosureForm.project = this.ruleForm.id
        this.count = response.data.length
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putDemandManager(this.ruleForm.id, this.ruleForm).then(response => {
            if (response.statusText === '"Created"') {
              this.$message({
                type: 'success',
                message: '恭喜你，更新成功'
              })
            }
            this.$router.push('/projects/demands')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getTypes() {
      getProjectType().then(response => {
        this.types = response.data
      })
    },
    imgAdd(pos, file) {
      var md = this.$refs.md
      const formData = new FormData()
      formData.append('username', localStorage.getItem('username'))
      formData.append('file', file)
      formData.append('create_time', getConversionTime(file.lastModified))
      formData.append('type', file.type)
      formData.append('archive', this.route_path[1])
      postUpload(formData).then(response => {
        md.$imglst2Url([[pos, response.data.file]])
      })
    },
    beforeAvatarUpload(file) {
      const formData = new FormData()
      formData.append('username', this.enclosureForm.create_user)
      formData.append('file', file)
      formData.append('create_time', getConversionTime())
      formData.append('type', file.type)
      formData.append('archive', this.route_path[1])
      postUpload(formData).then(response => {
        this.enclosureForm.file = response.data.filepath
        postDemandEnclosure(this.enclosureForm)
        if (response.statusText === 'Created') {
          this.$message({
            type: 'success',
            message: '恭喜你，上传成功'
          })
        }
        this.fetchEnclosureData()
      }).catch(error => {
        this.$message.error('上传失败')
        this.$refs.upload.clearFiles()
        console.log(error)
      })
      return true
    },
    fetchEnclosureData() {
      const parms = {
        project__id: this.pid
      }
      getDemandEnclosure(parms).then(response => {
        this.enclosureData = response.data
        this.count = response.data.length
      })
    },
    deleteEnclosure(id) {
      deleteDemandEnclosure(id)
      this.fetchEnclosureData()
    }
  }
}
</script>

<style lang='scss'>
</style>
