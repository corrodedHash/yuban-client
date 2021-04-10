import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const asyncPanel = () => import('@/components/admin/Panel.vue')
const asyncPostEditor = () => import('@/components/PostEditor.vue')
const asyncGroupListActor = () => import('@/components/menu/GroupListActor.vue')
const asyncPostDiff = () => import('@/components/PostDiff.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/r/newthread/:groupid',
        name: 'NewThread',
        component: asyncPostEditor,
        props: route => ({
            parentid: parseInt(route.params.groupid as string),
            parenttype: 'group',
            postid: undefined,
        }),
    },
    {
        path: '/r/newpost/:threadid',
        name: 'NewPost',
        component: asyncPostEditor,
        props: route => ({
            parentid: parseInt(route.params.threadid as string),
            parenttype: 'thread',
            postid: undefined,
        }),
    },
    {
        path: '/r/newcorrection/:postid',
        name: 'NewCorrection',
        component: asyncPostDiff,
        props: route => ({
            originalID: parseInt(route.params.postid as string),
            correctionID: undefined,
        }),
    },
    {
        path: '/r/post/:postid',
        name: 'View',
        component: asyncPostEditor,
        props: route => ({
            parentid: 0,
            parenttype: 'thread',
            postid: parseInt(route.params.postid as string),
        }),
    },
    {
        path: '/r/correction/:postid/:corrid',
        name: 'Correction',
        component: asyncPostDiff,
        props: route => ({
            originalID: parseInt(route.params.postid as string),
            correctionID: parseInt(route.params.corrid as string),
        }),
    },
    {
        path: '/r/menu',
        name: 'Menu',
        component: asyncGroupListActor,
    },
    {
        path: '/',
        component: asyncGroupListActor,
    },
    {
        path: '/r/admin',
        name: 'Admin',
        component: asyncPanel,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
