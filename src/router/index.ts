import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/dashboard-manager',
      name: 'Manager - Dashboard',
      component: () => import('../views/ManagerDashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('../components/MyProfile.vue')
        },
        {
          path: 'category',
          component: () => import('../components/manager/CategoryEditor/CategoryEditor.vue')
        },
        {
          path: 'product',
          component: () => import('../components/manager/ProductEditor/ProductEditor.vue')
        },
        {
          path: 'store-product',
          component: () => import('../components/manager/StoreProductEditor/StoreProductEditor.vue')
        },
        {
          path: 'customer-card',
          component: () => import('../components/manager/CustomerCardEditor/CustomerCardEditor.vue')
        },
        {
          path: 'employee',
          component: () => import('../components/manager/EmployeeEditor/EmployeeEditor.vue')
        },
        {
          path: 'check',
          component: () => import('../components/manager/CheckEditor/CkeckEditor.vue')
        }
      ]
    },
    {
      path: '/dashboard-cashier',
      name: 'Cashier - Dashboard',
      component: () => import('../views/CashierDashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('../components/MyProfile.vue')
        },
        {
          path: 'product',
          component: () => import('../components/cashier/ProductEditor/ProductEditor.vue')
        },
        {
          path: 'store-product',
          component: () => import('../components/cashier/StoreProductEditor/StoreProductEditor.vue')
        },
        {
          path: 'customer-card',
          component: () => import('../components/cashier/CustomerCardEditor/CustomerCardEditor.vue')
        },
        {
          path: 'check',
          component: () => import('../components/cashier/CheckEditor/CkeckEditor.vue')
        }
      ]
    }
  ]
})

export default router
