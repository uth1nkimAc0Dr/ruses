<template>
  <a-layout-sider>
    <!-- отсюда удалил v-model -->
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span>Venture</span>
      </a-menu-item>

      <a-menu-item key="2">
        <video-camera-outlined />
        <span>Dashboard</span>
      </a-menu-item>

      <a-menu-item key="3">
        <upload-outlined />
        <span>Notifications</span>
      </a-menu-item>

      <a-menu-item key="4">
        <upload-outlined />
        <span>Notes</span>
      </a-menu-item>

      <a-menu-item key="5">
        <upload-outlined />
        <span> <router-link to="/todos">Tasks</router-link></span>
      </a-menu-item>

      <a-menu-item key="6">
        <upload-outlined />
        <span>Emails</span>
      </a-menu-item>

      <a-menu-item key="7">
        <upload-outlined />
        <span>Calendars</span>
      </a-menu-item>

      <span><strong>DATABASE</strong></span>

      <a-menu-item key="8">
        <upload-outlined />
        <span>Analytics</span>
      </a-menu-item>

      <a-menu-item key="9">
        <upload-outlined />
        <span>Contacts</span>
      </a-menu-item>

      <a-menu-item key="10">
        <upload-outlined />
        <span>Companies</span>
      </a-menu-item>

      <a-menu-item key="11">
        <upload-outlined />
        <span>Integrations</span>
      </a-menu-item>

      <a-menu-item key="12">
        <upload-outlined />
        <span><router-link to="setting">Setting</router-link></span>
      </a-menu-item>

      <a-menu-item key="13">
        <upload-outlined />
        <span>Teaming M</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';

import { ref } from 'vue';
const selectedKeys = ref<string[]>(['1']);
// const collapsed = ref<boolean>(true);
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
</style>

<!-- <template>
  <div class="sidebar">
    <div class="content1">
      <div class="logo">Venture</div>

      <div class="container1">
        <div class="menu1">
          <div class="dashbord-container">poka sho: Dashboard</div>
          <div class="notifications-container">Notifications</div>
          <div class="notes-container">Notes</div>
          <div class="tasks-container">
            <router-link to="/todos">Router Tasks</router-link>
          </div>
          <div class="emails-container">Emails</div>
          <div class="calendars-container">Calendars</div>
        </div>

        <div class="separator"></div>

        <div class="menu2">
          <div class="database-title">Database</div>
          <div class="database-content">
            <div class="analytics-container">Analytics</div>
            <div class="contacts-container">Contacts</div>
            <div class="companies-container">Companies</div>
          </div>
        </div>

        <div class="separator"></div>
      </div>

      <div class="container2">
        <div class="container2__menu">
          <div class="container2__menu__integrations">Integrations</div>
          <div class="container2__menu__setting">
            <router-link to="/setting">Router Setting</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="bottom-block__content">
        <div class="profile">
          <div>M</div>
        </div>
        <div>Marketing! Team's</div>
      </div>
      <div class="bottom-block__caretDouble">^</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// const loadTasks = () => {
//   alert("Говорим MainLayout'у: мы кликнули, маунти давай");
//   emit('loadTasksEmit');
// };

// const emit = defineEmits(['loadTasksEmit', 'loadSettingEmit']);
</script>

<style lang="scss">
.sidebar {
  width: 248px;
  height: 1024px;
  // max-width не работает?
  background-color: rgba(249, 249, 249, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .content1 {
    width: 100%;
    // height: 634px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    .logo {
      height: 72px;
      border-bottom: solid
        var(--Color-Tokens-Border-Primary, rgba(228, 228, 228, 1)) 1px;
      padding: 20px 28px 20px 28px;
      //   gap + display?
    }

    .container1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      .menu1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 16px;
        gap: 4px;
        .dashbord-container,
        .notifications-container,
        .notes-container,
        .tasks-container,
        .emails-container,
        .calendars-container {
          display: flex;
          justify-content: space-between;
          padding: 8px;
        }
      }
      .menu2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 16px;
        gap: 5px;
        .database_title {
          padding: 4px 8px 4px 8px;
          display: flex;
          gap: 12px;
        }
        .database-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          .analytics-container {
            padding: 8px;
          }
          .contacts-container {
            padding: 8px;
          }
          .companies-container {
            padding: 8px;
          }
        }
      }
      .separator {
        width: 100%;
        border-bottom: solid 1px black;
      }
    }

    .container2 {
      padding: 0 16px;
      &__menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
      }
    }
  }
  .bottom-block {
    margin-top: auto;
    //не смог замагнитить к
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid
      var(--Color-Tokens-Border-Primary, rgba(228, 228, 228, 1));
    padding: 20px 16px 20px 16px;
  }
}

.router-link {
  all: unset;
}
</style> -->
