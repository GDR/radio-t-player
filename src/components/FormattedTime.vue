<template>
  <span>
    {{hh}}:{{mm}}:{{ss}}
  </span>
</template>

<script>

const format = (num) =>  {
  if (num < 10) {
    return '0' + parseInt(num);
  }
  return parseInt(num)
}

export default {
  name: "FormattedTime",
  props: {
    time: Number
  },
  computed: {
    hh() {
      return format(this.time / (60 * 60))
    },
    mm() {
      return format(parseInt(this.time / 60) - this.hh * 60)
    },
    ss() {
      return format(this.time % 60)
    }
  }
}
</script>

