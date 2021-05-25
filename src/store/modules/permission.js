// 首先，从index.js中引入已经定义过的2个router数组
import { asyncRoutes1, asyncRoutes2, constantRoutes } from '@/router'

// 全局变量state，routes和addRoutes数组
const state = {
  routes: [],
  addRoutes: []
}

// mutations 是唯一可以更改state的函数，使用SET_ROUTES定义更改方法，SET_ROUTES(state, routes)的入参routes赋值给addRoutes数组，将constantRoutes静态路由数组增加routes；

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

// vue中store状态管理，通过actions调用 mutations 中封装的方法来实现对于state更改，
// 这里是vue-element-admin中动态路由的主要判断逻辑发生地方，首先判定用户角色是否包含admin（可能多角色），是则将所有asyncRoutes 加入到constantRoutes，若用户角色没有包含admin，则调用filterAsyncRoutes函数，递归地判定asyncRoutes.roles属性是否有该角色，即是否有权限，将有权限的router赋值accessedRoutes 后加入到constantRoutes；

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // console.log(roles.includes('admin'))
      // console.log((asyncRoutes1 || []))
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes1 || []
      } else {
        accessedRoutes = asyncRoutes2 || []
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
