export default {
    data() {
        return {
            timer: 0
        }
    },
    mounted() {
        setInterval(
            () => {this.timer++},
            1000
        )
    },
    template: (
        `<div id="timer">
            {{timer}}
        </div>`
    )
} 
