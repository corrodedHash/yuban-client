import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PostEditor from '@/components/PostEditor.vue'
import GroupListActor from '@/components/menu/GroupListActor.vue'
import Panel from '@/components/admin/Panel.vue'
import PostDiff from '@/components/PostDiff.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/r/newthread/:groupid',
        name: 'NewThread',
        component: PostEditor,
        props: route => ({
            parentid: parseInt(route.params.groupid as string),
            parenttype: 'group',
            postid: undefined,
        }),
    },
    {
        path: '/r/newpost/:threadid',
        name: 'NewPost',
        component: PostEditor,
        props: route => ({
            parentid: parseInt(route.params.threadid as string),
            parenttype: 'thread',
            postid: undefined,
        }),
    },
    {
        path: '/r/newcorrection/:postid',
        name: 'NewCorrection',
        component: PostDiff,
        props: route => ({
            originalID: parseInt(route.params.postid as string),
            correctionID: undefined,
        }),
    },
    {
        path: '/r/post/:postid',
        name: 'View',
        component: PostEditor,
        props: route => ({
            parentid: 0,
            parenttype: 'thread',
            postid: parseInt(route.params.postid as string),
        }),
    },
    {
        path: '/r/correction/:postid/:corrid',
        name: 'Correction',
        component: PostDiff,
        props: route => ({
            originalID: parseInt(route.params.postid as string),
            correctionID: parseInt(route.params.corrid as string),
        }),
    },
    {
        path: '/r/menu',
        name: 'Menu',
        component: GroupListActor,
    },
    {
        path: '/',
        component: GroupListActor,
    },
    {
        path: '/r/admin',
        name: 'Admin',
        component: Panel,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
