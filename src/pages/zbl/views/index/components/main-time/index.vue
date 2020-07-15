<template>
    <div>
        <p class="nowTime">{{nowTime}}</p>
        <p class="timeblew">
            <span>{{nowDate}}</span>
            <span>{{nowWeek}}</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nowTime: '',
            nowDate: '',
            nowWeek: ''
        }

    },
    mounted() {
        setInterval(() => {
            this.setNowTimes();
        }, 1000);
    },
    methods: {
        setNowTimes() {
            let myDate = new Date()
            // console.log(myDate)
            let wk = myDate.getDay()
            let yy = String(myDate.getFullYear())
            let mm = myDate.getMonth() + 1
            let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
            let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
            let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
            let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
            let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            let week = weeks[wk]
            this.nowDate = yy + '-' + mm + '-' + dd
            this.nowTime = hou + ':' + min
            this.nowWeek = week
        },
    }
}
</script>

<style>
.nowTime {
    font-size: 60px;
    color: #19acc8;
    font-weight: 700;
    padding: 0 0 28px 57px;
}
.timeblew {
    font-size: 24px;
    color: #248ecc;
    padding: 0 0 0 56px;
}
</style>