<template>
  <div>
    <div class="about_coocies_container"></div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.replace('films/1')
    })
  },
}
</script>
