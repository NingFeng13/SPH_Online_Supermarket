<template lang="">
    <div>
        <!-- 三级联动组件已经是全局组件，不需要再引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommand/>
        <Rank/>
        <Like/>
        <Floor v-for="(item,index) in floorList"  :key="item.id"  :list='item'/>
        <Brand/>
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommand from '@/pages/Home/Recommand'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex';
export default {
    components: {
        ListContainer,
        Recommand,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted: function () {
        this.$store.dispatch('FloorList')
        this.$store.dispatch('reqUserInfo')

    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>
<style lang="">
    
</style>