import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/chat/:chat_id',
    name: 'chatRoom',
    component: () => import('@/views/ChatRoomView.vue'),
    meta: {auth: true}
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView'),
    meta: {auth: false}
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView'),
    meta: {auth: false}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !localStorage.getItem("token")){
    next("/login")
  }
  else if((to.name == "login" || to.name == "signup") && localStorage.getItem("token")){
    next(from)
  }else{
    next()
  }
})

export default router
