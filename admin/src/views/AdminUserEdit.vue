<template>
  <div class="about">
    <h1>{{this.id?"编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
	  <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="stylus">

</style>
<script>
    export default {
        props:{
            id:{}
        },
        data: function () {
            return {
                model: {},
                parents: []
            }
        },
        methods: {
            async save(){
                let model;
                if(this.id){
                    model = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
                }else{
                    model = await this.$http.post("rest/admin_users", this.model)
                }
                this.$router.push("/admin_users/list")
                this.$message({
                    type: "success",
                    message: "success ok"
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/admin_users/${this.id}`)
                this.model = res.data;
            },
            async fetchParents(){
                const res = await this.$http.get('rest/admin_users')
                this.parents = res.data
            }
        },
        watch:{
            '$route.params.id': function (id) {
                this.model = {};
            }

        },
        created(){
            this.id && this.fetch()
        }
    }
</script>
