webpackJsonp([40],{"3Apr":function(e,t,r){t=e.exports=r("FZ+f")(!1),t.push([e.i,".addticket{margin:50px;width:80%}",""])},U4x1:function(e,t,r){var l=r("3Apr");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);r("rjj0")("ac390a78",l,!0)},gDzi:function(e,t,r){"use strict";function l(e){r("U4x1")}Object.defineProperty(t,"__esModule",{value:!0});var o=r("Dd8w"),s=r.n(o),a=r("EMlb"),n=r("nSkA"),i=r("vMJZ"),u=r("QmSG"),c=r("NYxO"),m=r("0xDb"),p={components:{},data:function(){return{route_path:this.$route.path.split("/"),pid:this.$route.params.id,ruleForm:{},rules:{title:[{required:!0,message:"请输入正确的内容",trigger:"blur"}],content:[{required:!0,message:"请输入正确的内容",trigger:"blur"}],type:[{required:!0,message:"请输入正确的内容",trigger:"blur"}]},users:[],toolbars:{preview:!0,bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,ol:!0,fullscreen:!0,help:!0},uploadurl:u.uploadurl,types:[],img_file:{}}},computed:s()({},Object(c.b)(["username"])),created:function(){this.fetchData(),this.getProjectUsers(),this.getTicketType()},methods:{fetchData:function(){var e=this;Object(a.e)(null,this.pid).then(function(t){e.ruleForm=t.data})},postForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.ruleForm.pid=Object(m.a)(),Object(a.p)(t.ruleForm).then(function(e){'"Created"'===e.statusText&&t.$message({type:"success",message:"恭喜你，新建成功"});var r={action_user:t.ruleForm.action_user,title:"【"+t.ruleForm.type+"】"+t.ruleForm.title,message:"提交人: "+t.ruleForm.create_user+"\n指派人: "+t.ruleForm.action_user+"\n任务地址: http://"+window.location.host+"/#/projects/editproject/"+t.ruleForm.id};Object(n.h)(r),t.$router.push("/projects/projects")})})},resetForm:function(e){this.$refs[e].resetFields()},getProjectUsers:function(){var e=this,t={groups__name:"ITDept"};Object(i.f)(t).then(function(t){e.users=t.data})},getTicketType:function(){var e=this;Object(a.g)().then(function(t){e.types=t.data})},imgAdd:function(e,t){var r=this.$refs.md,l=new FormData;l.append("username",this.enclosureForm.create_user),l.append("file",t),l.append("create_time",Object(m.a)(t.lastModified)),l.append("type",t.type),l.append("archive",this.route_path[1]),Object(n.i)(l).then(function(t){r.$imglst2Url([[e,t.data.file]])})}}},d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"components-container",staticStyle:{height:"100vh"}},[r("el-card",[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"名称",prop:"title"}},[r("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"指派人",prop:"action_user"}},[r("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择指派人"},model:{value:e.ruleForm.action_user,callback:function(t){e.$set(e.ruleForm,"action_user",t)},expression:"ruleForm.action_user"}},e._l(e.users,function(e){return r("el-option",{key:e.id,attrs:{value:e.username}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"抄送人",prop:"follow_user"}},[r("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择跟踪人"},model:{value:e.ruleForm.follow_user,callback:function(t){e.$set(e.ruleForm,"follow_user",t)},expression:"ruleForm.follow_user"}},e._l(e.users,function(e){return r("el-option",{key:e.id,attrs:{value:e.username}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"需求人",prop:"from_user"}},[r("el-input",{attrs:{placeholder:"请输入需求人"},model:{value:e.ruleForm.from_user,callback:function(t){e.$set(e.ruleForm,"from_user",t)},expression:"ruleForm.from_user"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"类型",prop:"type"}},[r("el-select",{attrs:{placeholder:"请选择类型"},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},e._l(e.types,function(e){return r("el-option",{key:e.id,attrs:{value:e.name}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"内容",prop:"content"}},[r("mavon-editor",{ref:"md",staticStyle:{"z-index":"1"},attrs:{code_style:"monokai",toolbars:e.toolbars},on:{imgAdd:e.imgAdd},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}}),e._v(" "),r("a",{staticClass:"tips"},[e._v(" Tip：截图可以直接 Ctrl + v 粘贴到内容里面")])],1),e._v(" "),r("el-form-item",{attrs:{label:"等级",prop:"level"}},[r("el-rate",{attrs:{colors:["#99A9BF","#F7BA2A","#ff1425"],"show-text":"",texts:["E","D","C","B","A"]},model:{value:e.ruleForm.level,callback:function(t){e.$set(e.ruleForm,"level",t)},expression:"ruleForm.level"}}),e._v(" "),r("a",{staticClass:"tips"},[e._v("Tip：星数代表问题紧急程度，星数越多，代表越紧急")])],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.postForm("ruleForm")}}},[e._v("提交")]),e._v(" "),r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("清空")])],1)],1)],1)],1)},f=[],h={render:d,staticRenderFns:f},v=h,F=r("VU/8"),_=l,b=F(p,v,!1,_,null,null);t.default=b.exports}});