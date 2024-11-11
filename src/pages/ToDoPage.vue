<template>
  <div class="content">
    <AddTask @addTask="updateTasks" />

    <nav>
      <button
        type="button"
        @click="() => changeFilterHandler(TaskFilter.ALL)"
        :class="{ active: currentFilter === 'all' }"
      >
        All({{ allTasksCount }})
      </button>

      <button
        type="button"
        @click="() => changeFilterHandler(TaskFilter.IN_WORK)"
        :class="{ active: currentFilter === 'inWork' }"
      >
        In progress({{ inWorkTasksCount }})
      </button>

      <button
        type="button"
        @click="() => changeFilterHandler(TaskFilter.COMPLETED)"
        :class="{ active: currentFilter === 'completed' }"
      >
        Completed Tasks({{ completedTasksCount }})
      </button>
    </nav>

    <div class="todo-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove="updateTasks"
        @change="updateTasks"
        @changeCompleted="updateTasks"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AddTask from '@/components/AddTask.vue';
import TaskItem from '@/components/TaskItem.vue';
import type { Todo } from '@/types/types';
import { TaskFilter } from '@/types/types';
import { outOfExpired } from '@/api/auth';
// import { useAuthStore } from '@/stores/authStore';
// const store = useAuthStore();

const currentFilter = ref<TaskFilter>(TaskFilter.ALL);

const allTasksCount = ref<number>();
const inWorkTasksCount = ref<number>();
const completedTasksCount = ref<number>();

const changeFilterHandler = async (newFilter: TaskFilter) => {
  await outOfExpired();
  currentFilter.value = newFilter;
  try {
    await updateTasks();
  } catch (error) {
    alert(`failed to change filter:, ${error}`);
  }
};

const updateTasks = async () => {
  try {
    const response = await getTasks(currentFilter.value);
    tasks.value = response.data;

    allTasksCount.value = response.info?.all;
    inWorkTasksCount.value = response.info?.inWork;
    completedTasksCount.value = response.info?.completed;
  } catch (error) {
    console.log('failed to fetch tasks:', error);
  }
};

const tasks = ref<Todo[]>([]);
import { getTasks } from '@/api/todos';

onMounted(async () => {
  try {
    await updateTasks();
  } catch (error) {
    console.log('ошибка загрузки данных', error);
    // нужно ли так кэтчить ошибку?
  }
});
</script>

<style scoped lang="scss">
.content {
  text-align: center;
}
nav {
  display: flex;
  justify-content: center;

  .active {
    color: red;
    // text-decoration: dashed blue;
  }
  button {
    margin: 0px 5px;
  }
}

.todo-list {
  display: flex;
  flex-direction: column;
  margin: 5px 50px;
}
</style>
