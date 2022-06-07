const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: "cil-Speedometer" 
  },
  {
    _tag :'CSidebarNavTitle',
    _children : ['Main']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Categories',
    to: '/admin/category',
    icon: "cil-tags" 
  },
  {
    _tag:'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Item',
    to: '/admin/item',
    icon: "cil-tags" 
  },
  {
    _tag:'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Bank',
    to: '/admin/bank',
    icon: "cib-cc-mastercard" 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer',
    to: '/admin/customer',
    icon: "cil-user" 
  },
  {
    _tag :'CSidebarNavTitle',
    _children : ['Booking']
  },
  {
    _tag:'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Booking',
    to: '/admin/booking',
    icon: "cil-task" 
  },
  {
    _tag :'CSidebarNavTitle',
    _children : ['Setting']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/admin/user',
    icon: "cil-user" 
  },
 
 
]

export default _nav
