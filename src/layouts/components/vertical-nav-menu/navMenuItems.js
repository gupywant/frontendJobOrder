/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: '/dashboard/analytics',
    name: 'Dashboard',
    icon: 'HomeIcon',
    i18n: 'Dashboard'
  },
  {
    header: 'Operation',
    icon: 'TruckIcon',
    items: [
      {
        url: null,
        name: 'Job Order',
        icon: 'HexagonIcon',
        i18n: 'Job Order',
        submenu: [
          {
            url: '/transaction/transaction-add',
            name: 'Create',
            slug: 'Create',
            icon: 'MenuIcon'
          },
          {
            url: '/transaction/transaction-list',
            name: 'List',
            slug: 'List',
            icon: 'MenuIcon'
          },
          {
            url: '/transaction/cancel-list',
            name: 'Cancelation',
            slug: 'Cancelation',
            icon: 'MenuIcon'
          }
        ]
      },
      {
        url: '/transaction/approval/1',
        name: 'Approval',
        icon: 'CheckSquareIcon',
        i18n: 'Approval'
      },
      {
        url: '/transaction/approval/2',
        name: 'Approval',
        icon: 'CheckSquareIcon',
        i18n: 'Approval'
      },
      {
        url: '/transaction/document',
        name: 'Documents Upload',
        icon: 'UploadCloudIcon',
        i18n: 'Documents Upload'
      },
      {
        url: '/transaction/settlement',
        name: 'Settlement',
        icon: 'SlidersIcon',
        i18n: 'Settlement'
      }
    ]
  },
  {
    header: 'Finance',
    icon: 'InfoIcon',
    items: [
      {
        url: null,
        name: 'Billing',
        icon: 'InfoIcon',
        i18n: 'Billing',
        submenu: [
          {
            url: '/invoice/invoice-list',
            name: 'Invoice List',
            slug: 'Invoice List',
            icon: 'MenuIcon'
          },
          {
            url: '/invoice/invoice-settlement',
            name: 'Invoice Settlement',
            slug: 'Invoice Settlement',
            icon: 'MenuIcon'
          },
          {
            url: '/invoice/invoice-cancel',
            name: 'Invoice Cancelation',
            slug: 'Invoice Cancelation',
            icon: 'MenuIcon'
          },
          {
            url: null,
            name: 'Create',
            icon: 'MenuIcon',
            submenu: [
              {
                url: '/invoice/reguler-add',
                name: 'Regular',
                slug: 'Regular',
                icon: 'MenuIcon'
              },
              {
                url: '/invoice/nonreguler-add',
                name: 'Non Regular',
                slug: 'Non Regular',
                icon: 'MenuIcon'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    header: 'User Management',
    icon: 'UserIcon',
    items: [
      {
        url: '/user-management/user-add',
        name: 'Create User',
        icon: 'UserPlusIcon',
        i18n: 'Create User'
      },
      {
        url: '/user-management/user-list',
        name: 'User List',
        icon: 'ListIcon',
        i18n: 'User List'
      }
    ]
  },
  {
    header: 'Configuration',
    icon: 'SettingsIcon',
    items: [
      {
        url: '/settings/approval-setting',
        name: 'Operation',
        icon: 'SettingsIcon',
        i18n: 'Operation'
      }
    ]
  },
  {
    header: 'Master Data',
    icon: 'UsersIcon',
    items: [
      {
        url: null,
        name: 'Customer',
        icon: 'UsersIcon',
        i18n: 'Customer',
        submenu: [
          {
            url: '/customer/customer-add',
            name: 'Create Customer',
            slug: 'Create Customer',
            icon: 'MenuIcon'
          },
          {
            url: '/customer/customer-list',
            name: 'Customer List',
            icon: 'MenuIcon',
            slug: 'Customer List'
          }
        ]
      },
      {
        url: null,
        name: 'Vendor',
        icon: 'UsersIcon',
        i18n: 'Vendor',
        submenu: [
          {
            url: '/vendor/vendor-add',
            name: 'Create Vendor',
            slug: 'Create Vendor',
            icon: 'MenuIcon'
          },
          {
            url: '/vendor/vendor-list',
            name: 'Vendor List',
            icon: 'MenuIcon',
            slug: 'Vendor List'
          }
        ]
      },
      {
        url: '/service/service-list',
        name: 'Service',
        icon: 'FramerIcon',
        i18n: 'Service'
      }
    ]
  }
]

