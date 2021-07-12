import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'


import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import PaperEdit from '../views/PaperEdit.vue'
import PaperList from '../views/PaperList.vue'





Vue.use(VueRouter)

const routes = [
  	{path: "/login", name: "login", component: Login, meta:{isPublic:true}},
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [
			{ path: "/categories/edit/:id", component: CategoryEdit, props: true},
			{ path: "/categories/create", component: CategoryEdit},
			{ path: "/categories/list", component: CategoryList},
			
			
			{ path: "/papers/edit/:id", component: PaperEdit, props: true},
			{ path: "/papers/create", component: PaperEdit},
			{ path: "/papers/list", component: PaperList},

			
			
			
			{ path: "/admin_users/edit/:id", component: AdminUserEdit, props: true},
        	{ path: "/admin_users/create", component: AdminUserEdit},
        	{ path: "/admin_users/list", component: AdminUserList},
			
			
			
		]
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
