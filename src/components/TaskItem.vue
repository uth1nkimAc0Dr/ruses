<template>
  <div class="task-item">
    <div class="checkbox-container">
      <input
        type="checkbox"
        v-model="localTask.isDone"
        @click="() => ChangeCompletedHandler(localTask.isDone)"
      />
    </div>

    <div class="title-container">
      <input :disabled="isEditing" v-model="localTask.title" />
    </div>

    <div class="buttons-container">
      <div class="edit-buttons-container">
        <div v-if="isEditing">
          <button @click="switchEditing">edit</button>
        </div>

        <div v-if="!isEditing" class="save-cancel-panel">
          <div class="save-button-container">
            <button @click="saveTaskhandler">Сохранить</button>
          </div>

          <div class="cancel-button-container">
            <button @click="resetTaskHandler">Отменить</button>
          </div>
        </div>
      </div>

      <div class="remove-button-container">
        <button type="button" @click="() => removeTaskHandler(localTask.id)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, reactive } from 'vue';
import { changeTask, removeTask } from '@/api/todos';
import type { Todo, TodoRequest } from '@/types/types';
// import { useAuthStore } from '@/stores/authStore';
import { outOfExpired } from '@/api/auth';
// const store = useAuthStore();

const isEditing = ref<boolean>(true);
const emit = defineEmits(['remove', 'change', 'changeCompleted']);
const props = defineProps<{ task: Todo }>();

const localTask = reactive<Todo>({ ...props.task });

//удаление задачи через "delete"
const removeTaskHandler = async (id: number) => {
  try {
    await outOfExpired();
    await removeTask(id);
  } catch (error) {
    console.error('Error removing task', error);
  }
  emit('remove');
};

// при "отменить" мы возвращаем оригинальный title
const resetTaskHandler = async () => {
  await outOfExpired();
  switchEditing();
  localTask.title = props.task.title;
};

// при "сохранить" мы пушим новый title
const saveTaskhandler = async () => {
  await outOfExpired();
  switchEditing(), changeTaskHandler(localTask.title);
};

const switchEditing = () => {
  isEditing.value = !isEditing.value;
};

//изменяю для задачи только title
const changeTaskHandler = async (title: string) => {
  const newTodo: TodoRequest = { title: title };
  //меняю только title, поэтому только title засовываю и передаю
  if (props.task.title != title) {
    try {
      await outOfExpired();
      await changeTask(localTask.id, newTodo);
    } catch (error) {
      console.error('Error changing task', error);
    }
    emit('change');
  }
};

// изменяю для задачи завершенность
const ChangeCompletedHandler = async (isDone: boolean) => {
  const newTodo: TodoRequest = { isDone: !isDone };
  //в данном случае для вызова changeTask мне похуй на title, так как я работаю с isDone,
  //поэтому в аргументах его не передаю
  try {
    await outOfExpired();
    await changeTask(localTask.id, newTodo);
  } catch (error) {
    console.error('error changing complete', error);
  }
  emit('changeCompleted');
  // эмиты ставить ниже catch?
};
</script>

<style scoped lang="scss">
.task-item {
  // задать одинаковые ширины дочеркам
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2px 2px;
  padding: 5px;
  border: solid 1px black;
  min-height: 20px;

  .checkbox-container {
    margin-left: 4px;
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    // width: 50px;
    // margin-right: 40px;
  }

  // .task-title {
  //   margin: 0 auto;
  // }

  // .righted-task-edit {
  //   margin-right: 5px;
  // }
  // .righted-task-remove {
  //   margin-right: 5px;
  // }
}
</style>
