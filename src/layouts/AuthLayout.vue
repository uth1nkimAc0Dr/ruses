<template>
  <div class="auth-layout">
    <div class="picture-container">
      <img src="@/pictures/Group 4.svg" />
    </div>
    <div class="auth-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  // text-align: center;
}
.picture {
  width: 50%;
  max-width: 1100px;
}
.auth-container {
  text-align: center;
  // width: 50%;
  width: 812px;
  margin: 15px;
}
</style>
