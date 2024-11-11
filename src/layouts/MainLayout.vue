<template>
  <a-layout>
    <SideBar />
    <a-layout>
      <a-layout-header class="layout-header">
        <!-- <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        /> -->

        <h1>Header</h1>
      </a-layout-header>
      <a-layout-content> <router-view></router-view> </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import SideBar from '@/components/SideBar.vue';
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>

<!-- <template>
  <div class="main-layout">
    <SideBar />
    <div class="right">
      <div>
        <div>
          <h1>Header</h1>
          <div class="separator"></div>
        </div>

        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import { onMounted } from 'vue';
// const loadToDo = () => {
//   currentPage.value = ToDoPage;
//   alert('Заэмиттили Таски в Сайдбаре');
// };
// const loadProfile = () => {
//   currentPage.value = UserSetting;
//   // alert('Заэмиттили Сеттингс(Профиль) в Сайдбаре');
// };
// const currentPage = ref<any>(UserSetting);
onMounted(() => {});
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  flex-direction: row;

  .right {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .separator {
    width: 100%;
    border-bottom: solid 2px black;
  }
}
</style> -->
