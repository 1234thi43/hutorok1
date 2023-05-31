import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '../components/Main_Page1.vue'
import GalleryPage from '../components/Gallery_Page2.vue'
import ContactsPage from '../components/Contacts_Page3.vue'
import BookingPage from '../components/Booking_Page4.vue'
import RegistrationPage from '../components/Registration_Page5.vue'
import AuthorizationPage from '../components/Authorization_Page6.vue'
import UsersPage from '../components/Users_Page7.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Main',
    component: MainPage
  },
  {
    path: '/Gallery',
    component: GalleryPage
  },
  {
    path: '/Contacts',
    component: ContactsPage
  },
  {
    path: '/Booking',
    component: BookingPage
  },
  {
    path: '/Registration',
    component: RegistrationPage
  },
  {
    path: '/Authorization',
    component: AuthorizationPage
  },
  {
    path: '/Users',
    component: UsersPage
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // routes

  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
})

router.replace('/Main');

export default router
