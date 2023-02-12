export default {
    data() {
        return {
            clickTimes: 0
        }
    },
    methods: {
        clickTimesIncrement() {
            this.clickTimes++;
        }
    },
    template: (
        `<button id="counter" @click="clickTimesIncrement">
            Click Times: {{clickTimes}}
        </button>`
    )
} 
