<template>
  <div class="container">
    <MHeader></MHeader>
    <MTab></MTab>
    <router-view/>
  </div>
</template>
<script>
 import MHeader from '../components/m-header.vue'
 import MTab from '../components/m-tab'
export default {
  components: {
    MHeader,
    MTab
  }
};
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  background:#222;
  flex-direction: column;
}
.main{
  width: 100%;
  height: 100%;;
  font-size: 14px;
  flex: 1;
  overflow: hidden;
}
</style>
