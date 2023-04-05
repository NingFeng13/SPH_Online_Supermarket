<template>
    <div class="pagination">
        <!-- 起始部分 -->
        <button v-show="pageOne" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <span v-show="startShow">
            <button @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">1</button>
            <button>···</button>
        </span>


        <!-- 中间部分 -->
        <button @click="$emit('getPageNo', page)" v-for="(page, index) in startNumAndEndNum" :key="index"
            :class="{ active: pageNo == page }">
            {{ page }}</button>
        <!-- 末尾部分 -->


        <span v-show="endShow">
            <button>···</button>
            <button @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo == totalPage }"> {{ totalPage
            }}</button>
        </span>
        <button v-show="pageLast" @click="$emit('getPageNo', pageNo + 1)">下一页</button>


        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        startNumAndEndNum() {
            let start = 0, end = 0;
            if (this.continues > this.totalPage) {
                start = 1;
                end = this.totalPage;
            } else {
                start = this.pageNo - parseInt(this.continues / 2);
                end = this.pageNo + parseInt(this.continues / 2);
                if (start < 1) { start = 1, end = this.continues }
                if (end > this.totalPage) { start = this.totalPage - this.continues + 1, end = this.totalPage }
            }
            let array = []
            for (let i = start; i <= end; i++) {
                array.push(i)
            }
            return array;
        },
        startShow() {
            return this.startNumAndEndNum[0] > 1
        },
        endShow() {
            return this.startNumAndEndNum[this.startNumAndEndNum.length - 1] < this.totalPage
        },
        pageOne() {
            return this.pageNo > 1
        },
        pageLast() {
            return this.pageNo < this.totalPage;
        },
    }
}
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>