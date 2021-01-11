/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        // =============================================================================
        // FORMS
        // =============================================================================
        // =============================================================================
        // FORM ELEMENTS
        // =============================================================================
        {
          path: '/forms/form-elements/select',
          name: 'form-element-select',
          component: () => import('./views/forms/form-elements/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Select', active: true }
            ],
            pageTitle: 'Select',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/switch',
          name: 'form-element-switch',
          component: () => import('./views/forms/form-elements/switch/Switch.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Switch', active: true }
            ],
            pageTitle: 'Switch',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/checkbox',
          name: 'form-element-checkbox',
          component: () => import('./views/forms/form-elements/checkbox/Checkbox.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Checkbox', active: true }
            ],
            pageTitle: 'Checkbox',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/radio',
          name: 'form-element-radio',
          component: () => import('./views/forms/form-elements/radio/Radio.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Radio', active: true }
            ],
            pageTitle: 'Radio',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/input',
          name: 'form-element-input',
          component: () => import('./views/forms/form-elements/input/Input.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Input', active: true }
            ],
            pageTitle: 'Input',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/number-input',
          name: 'form-element-number-input',
          component: () => import('./views/forms/form-elements/number-input/NumberInput.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Number Input', active: true }
            ],
            pageTitle: 'Number Input',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-elements/textarea',
          name: 'form-element-textarea',
          component: () => import('./views/forms/form-elements/textarea/Textarea.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Textarea', active: true }
            ],
            pageTitle: 'Textarea',
            rule: 'editor'
          }
        },
        // -------------------------------------------------------------------------------------------------------------------------------------------
        {
          path: '/forms/form-layouts',
          name: 'forms-form-layouts',
          component: () => import('@/views/forms/FormLayouts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Forms' },
              { title: 'Form Layouts', active: true }
            ],
            pageTitle: 'Form Layouts',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-wizard',
          name: 'extra-component-form-wizard',
          component: () => import('@/views/forms/form-wizard/FormWizard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Wizard', active: true }
            ],
            pageTitle: 'Form Wizard',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-validation',
          name: 'extra-component-form-validation',
          component: () => import('@/views/forms/form-validation/FormValidation.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Validation', active: true }
            ],
            pageTitle: 'Form Validation',
            rule: 'editor'
          }
        },
        {
          path: '/forms/form-input-group',
          name: 'extra-component-form-input-group',
          component: () => import('@/views/forms/form-input-group/FormInputGroup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Input Group', active: true }
            ],
            pageTitle: 'Form Input Group',
            rule: 'editor'
          }
        },

        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            rule: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true }
            ],
            pageTitle: 'Search',
            rule: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            rule: 'editor'
          }
        },

        // =============================================================================
        // CHARTS & MAPS
        // =============================================================================
        {
          path: '/charts-and-maps/charts/apex-charts',
          name: 'extra-component-charts-apex-charts',
          component: () => import('@/views/charts-and-maps/charts/apex-charts/ApexCharts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'Apex Charts', active: true }
            ],
            pageTitle: 'Apex Charts',
            rule: 'editor'
          }
        },
        {
          path: '/charts-and-maps/charts/chartjs',
          name: 'extra-component-charts-chartjs',
          component: () => import('@/views/charts-and-maps/charts/chartjs/Chartjs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'chartjs', active: true }
            ],
            pageTitle: 'chartjs',
            rule: 'editor'
          }
        },
        {
          path: '/charts-and-maps/charts/echarts',
          name: 'extra-component-charts-echarts',
          component: () => import('@/views/charts-and-maps/charts/echarts/Echarts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'echarts', active: true }
            ],
            pageTitle: 'echarts',
            rule: 'editor'
          }
        },
        {
          path: '/charts-and-maps/maps/google-map',
          name: 'extra-component-maps-google-map',
          component: () => import('@/views/charts-and-maps/maps/google-map/GoogleMap.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'Google Map', active: true }
            ],
            pageTitle: 'Google Map',
            rule: 'editor'
          }
        },


        // =============================================================================
        // EXTENSIONS
        // =============================================================================
        {
          path: '/extensions/select',
          name: 'extra-component-select',
          component: () => import('@/views/components/extra-components/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Select', active: true }
            ],
            pageTitle: 'Select',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/quill-editor',
          name: 'extra-component-quill-editor',
          component: () => import('@/views/components/extra-components/quill-editor/QuillEditor.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Quill Editor', active: true }
            ],
            pageTitle: 'Quill Editor',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/drag-and-drop',
          name: 'extra-component-drag-and-drop',
          component: () => import('@/views/components/extra-components/drag-and-drop/DragAndDrop.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Drag & Drop', active: true }
            ],
            pageTitle: 'Drag & Drop',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/datepicker',
          name: 'extra-component-datepicker',
          component: () => import('@/views/components/extra-components/datepicker/Datepicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datepicker', active: true }
            ],
            pageTitle: 'Datepicker',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/datetime-picker',
          name: 'extra-component-datetime-picker',
          component: () => import('@/views/components/extra-components/datetime-picker/DatetimePicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datetime Picker', active: true }
            ],
            pageTitle: 'Datetime Picker',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/access-control',
          name: 'extra-component-access-control',
          component: () => import('@/views/components/extra-components/access-control/AccessControl.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Access Control', active: true }
            ],
            pageTitle: 'Access Control',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/i18n',
          name: 'extra-component-i18n',
          component: () => import('@/views/components/extra-components/I18n.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'I18n', active: true }
            ],
            pageTitle: 'I18n',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/carousel',
          name: 'extra-component-carousel',
          component: () => import('@/views/components/extra-components/carousel/Carousel.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Carousel', active: true }
            ],
            pageTitle: 'Carousel',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/clipboard',
          name: 'extra-component-clipboard',
          component: () => import('@/views/components/extra-components/clipboard/Clipboard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Clipboard', active: true }
            ],
            pageTitle: 'Clipboard',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/context-menu',
          name: 'extra-component-context-menu',
          component: () => import('@/views/components/extra-components/context-menu/ContextMenu.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Context Menu', active: true }
            ],
            pageTitle: 'Context Menu',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/star-ratings',
          name: 'extra-component-star-ratings',
          component: () => import('@/views/components/extra-components/star-ratings/StarRatings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Star Ratings', active: true }
            ],
            pageTitle: 'Star Ratings',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/autocomplete',
          name: 'extra-component-autocomplete',
          component: () => import('@/views/components/extra-components/autocomplete/Autocomplete.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Autocomplete', active: true }
            ],
            pageTitle: 'Autocomplete',
            rule: 'editor'
          }
        },
        {
          path: '/extensions/tree',
          name: 'extra-component-tree',
          component: () => import('@/views/components/extra-components/tree/Tree.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Tree', active: true }
            ],
            pageTitle: 'Tree',
            rule: 'editor'
          }
        },
        {
          path: '/import-export/import',
          name: 'import-excel',
          component: () => import('@/views/components/extra-components/import-export/Import.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Import', active: true }
            ],
            pageTitle: 'Import Excel',
            rule: 'editor'
          }
        },
        {
          path: '/import-export/export',
          name: 'export-excel',
          component: () => import('@/views/components/extra-components/import-export/Export.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export', active: true }
            ],
            pageTitle: 'Export Excel',
            rule: 'editor'
          }
        },
        {
          path: '/import-export/export-selected',
          name: 'export-excel-selected',
          component: () => import('@/views/components/extra-components/import-export/ExportSelected.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export Selected', active: true }
            ],
            pageTitle: 'Export Excel',
            rule: 'editor'
          }
        },

        // =============================================================================
        // Application Routes
        // =============================================================================
        {
          path: '/apps/todo',
          redirect: '/apps/todo/all',
          name: 'todo'
        },
        {
          path: '/apps/todo/:filter',
          component: () => import('./views/apps/todo/Todo.vue'),
          meta: {
            rule: 'editor',
            parent: 'todo',
            no_scroll: true
          }
        },
        {
          path: '/apps/chat',
          name: 'chat',
          component: () => import('./views/apps/chat/Chat.vue'),
          meta: {
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/apps/email',
          redirect: '/apps/email/inbox',
          name: 'email'
        },
        {
          path: '/apps/email/:filter',
          component: () => import('./views/apps/email/Email.vue'),
          meta: {
            rule: 'editor',
            parent: 'email',
            no_scroll: true
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    },

    // =============================================================================
    // ADD BY GUPY
    // =============================================================================
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/login/Login.vue'),
      meta: {
        requiresAuth: true,
        rule: 'guest'
      }
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/service/service-list',
          name: 'service-list',
          component: () => import('./views/new-pages/service/service-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/transaction/transaction-add',
          name: 'transaction-add',
          component: () => import('./views/new-pages/transaction/transaction-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/transaction-list',
          name: 'transaction-list',
          component: () => import('./views/new-pages/transaction/transaction-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/transaction-view/:id',
          name: 'transaction-view',
          component: () => import('./views/new-pages/transaction/transaction-list/transaction-view.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/transaction-edit/:id',
          name: 'transaction-edit',
          component: () => import('./views/new-pages/transaction/transaction-list/transaction-edit.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/approval/1',
          name: 'transaction-approval1',
          component: () => import('./views/new-pages/transaction/transaction-approval1.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/approval/1/:id',
          name: 'transaction-approve',
          component: () => import('./views/new-pages/transaction/approval1/approve.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/approval/2',
          name: 'transaction-approval2',
          component: () => import('./views/new-pages/transaction/transaction-approval2.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/approval/2/:id',
          name: 'transaction-approve2',
          component: () => import('./views/new-pages/transaction/approval2/approve.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/cancel-list',
          name: 'transaction-cancel',
          component: () => import('./views/new-pages/transaction/transaction-cancel.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/cancel-view/:id',
          name: 'cancel-view',
          component: () => import('./views/new-pages/transaction/cancel/cancel.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {// settlement
          path: '/transaction/settlement',
          name: 'transaction-settlement-list',
          component: () => import('./views/new-pages/transaction/transaction-settlement.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/settlement/:id',
          name: 'transaction-settlement-create',
          component: () => import('./views/new-pages/transaction/settlement/settlement.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }, // end of settlement
        {// documents upload
          path: '/transaction/document',
          name: 'transaction-documents',
          component: () => import('./views/new-pages/transaction/transaction-document.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/transaction/document-upload/:id',
          name: 'transaction-documents-upload',
          component: () => import('./views/new-pages/transaction/document/upload.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        } // end of documents upload
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/invoice/reguler-add',
          name: 'invoice-add-reguler',
          component: () => import('./views/new-pages/invoice/invoice-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/nonreguler-add',
          name: 'invoice-add-nonreguler',
          component: () => import('./views/new-pages/invoice/invoicenon-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/invoice/:id',
          name: 'invoice-invoice',
          component: () => import('./views/new-pages/invoice/invoice.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/invoice-list',
          name: 'invoice-list',
          component: () => import('./views/new-pages/invoice/invoice-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/invoice-cancel',
          name: 'invoice-cancel',
          component: () => import('./views/new-pages/invoice/invoice-cancel.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/invoice-settlement',
          name: 'invoice-settlement',
          component: () => import('./views/new-pages/invoice/invoice-settlement.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },

        {
          path: '/invoice/invoice-settle/:id',
          name: 'invoice-settle',
          component: () => import('./views/new-pages/invoice/invoice-settle.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/invoice/invoice-completed',
          name: 'invoice-completed',
          component: () => import('./views/new-pages/invoice/invoice-completed.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/user-management/user-list',
          name: 'user-list',
          component: () => import('./views/new-pages/user-management/user-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/user-management/user-view/:id',
          name: 'user-view',
          component: () => import('./views/new-pages/user-management/user-add/user-view.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/user-management/user-edit/:id',
          name: 'user-edit',
          component: () => import('./views/new-pages/user-management/user-add/user-edit.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/user-management/user-add',
          name: 'user-add',
          component: () => import('./views/new-pages/user-management/user-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/customer/customer-list',
          name: 'customer-list',
          component: () => import('./views/new-pages/customer/customer-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/customer/customer-add',
          name: 'customer-add',
          component: () => import('./views/new-pages/customer/customer-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/customer/customer-view/:id',
          name: 'customer-view',
          component: () => import('./views/new-pages/customer/customer-add/customer-view.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/customer/customer-edit/:id',
          name: 'customer-edit',
          component: () => import('./views/new-pages/customer/customer-add/customer-edit.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/vendor/vendor-list',
          name: 'vendor-list',
          component: () => import('./views/new-pages/vendor/vendor-list.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/vendor/vendor-add',
          name: 'vendor-add',
          component: () => import('./views/new-pages/vendor/vendor-add.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/vendor/vendor-view/:id',
          name: 'vendor-view',
          component: () => import('./views/new-pages/vendor/vendor-detail/vendor-view.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        },
        {
          path: '/vendor/vendor-edit/:id',
          name: 'vendor-edit',
          component: () => import('./views/new-pages/vendor/vendor-detail/vendor-edit.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/settings/approval-setting',
          name: 'approval-setting',
          component: () => import('./views/new-pages/setting/approval-setting.vue'),
          meta: {
            requiresAdmin: true,
            rule: 'admin'
          }
        }
      ]
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    if (store.getters.isLogedIn) {
      next()
    } else {
      localStorage.removeItem('accessToken')
      next({ name: 'login' })
    }
  } else if (to.meta.requiresAuth) {
    if (store.getters.isLogedIn) {
      console.log('loged in already')
      next({
        name: 'dashboard-analytics'
      })
    } else {
      next({})
    }
  } else {
    next()
  }
})

export default router
