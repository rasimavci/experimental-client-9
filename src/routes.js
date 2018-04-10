import about from './vue/pages/about.vue'
import Contact from './vue/pages/contact'
import Home from './vue/pages/history'
import Login from './vue/pages/login'
import History1 from './vue/pages/history'
import Dialpad from './vue/pages/dialpad'
import Message from './vue/pages/message'
import Sessions from './vue/pages/sessions'
import Favorites from './vue/pages/favorites'
import Collaboration from './vue/pages/collaboration'
import Presences from './vue/pages/presences'
import Call from './vue/pages/call'
import Settings from './vue/pages/settings'

export default [
  {
    path: '/about/',
    name: 'About',
    component: about
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/history',
    name: 'History',
    component: History1
  },
  {
    path: '/dialpad',
    name: 'Dialpad',
    component: Dialpad
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/sessions/',
    name: 'Sessions',
    component: Sessions
  },
  {
    path: '/collaboration',
    name: 'Collaboration',
    component: Collaboration
  },
  {
    path: '/presences',
    name: 'Presences',
    component: Presences
  },
  {
    path: '/call',
    name: 'Call',
    component: Call
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]
