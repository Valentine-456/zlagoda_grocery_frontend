import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Cashier - Login',
      component: () => import('../views/CashierLogin.vue')
    },
    {
      path: '/login-manager',
      name: 'Manager - Login',
      component: () => import('../views/ManagerLogin.vue')
    },
    {
      path: '/dashboard-manager',
      name: 'Manager - Dashboard',
      component: () => import('../views/ManagerDashboard.vue')
    },
    {
      path: '/dashboard-cashier',
      name: 'Cashier - Dashboard',
      component: () => import('../views/CashierDashboard.vue')
    },
  ]
})

export default router
