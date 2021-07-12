<template>
	<div class="about">
		<h1>{{this.id?"编辑":"新建"}}分类</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="上级分类">
				<el-select v-model="model.parent">
					<el-option v-for="item in parents" :key="item._id"
					:label="item.name" :value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
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
                    model = await this.$http.put(`rest/categories/${this.id}`, this.model)
                }else{
                    model = await this.$http.post("rest/categories", this.model)
                }
                this.$router.push("/categories/list")
                this.$message({
                    type: "success",
                    message: "success ok"
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/categories/${this.id}`)
                this.model = res.data;
            },
            async fetchParents(){
                const res = await this.$http.get('rest/categories')
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
            this.fetchParents()
        }
    }
</script>
