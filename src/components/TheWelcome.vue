<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
    </ul>
    <input v-model="newUser.name" placeholder="Name" />
    <input v-model="newUser.email" placeholder="Email" />
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';  // Axios 직접 사용

export default {
  setup() {
    const users = ref([]);
    const newUser = ref({
      name: '',
      email: ''
    });

    // 사용자 목록 가져오기
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/aaa');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // 사용자 추가
    const addUser = async () => {
      try {
        await axios.post('http://localhost:8080/api/users', newUser.value);
        fetchUsers();  // 사용자 추가 후 목록 갱신
        newUser.value = { name: '', email: '' };  // 입력 필드 초기화
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    // 컴포넌트가 마운트될 때 사용자 목록 가져오기
    onMounted(() => {
      fetchUsers();
    });

    return { users, newUser, addUser };
  }
};
</script>

<style scoped>
/* 스타일 정의 */
</style>
