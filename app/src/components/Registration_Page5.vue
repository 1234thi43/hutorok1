<template>
      <!-- Регистрация -->
      <div id="Registration"> <!-- v-if="!isAuthenticated" Можно добавить-->  <!-- v-else -->
        <form class="RegForm" @submit.prevent="register">
          <h1>Регистрация</h1>

          <div>
            <label for="name">Имя:</label>
            <input type="text" id="name" v-model="registerData.name" required autofocus>
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="registerData.email" required>
          </div>
          <div>
            <label for="password">Пароль:</label>
            <input type="password" id="password" v-model="registerData.password" required>
          </div>
          <b-button class="btn-p" type="submit"> Зарегистрироваться </b-button>
          <p> У вас уже есть аккаунт? <router-link to="/Authorization"> Войти </router-link></p>
        </form>
      </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    name: 'AuthForm',
    data() {
      return {
        registerData: {
          name: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      register() {
        axios.post('http://localhost:3000/api/register', this.registerData)
          .then(response => {
            console.log(response.data);
            alert("Регистрация прошла успешно");
            this.registerData.name = '';
            this.registerData.email = '';
            this.registerData.password = '';
            this.$router.push('/Authorization'); // переход на страницу /Registration 
          })
          .catch(error => {
            console.log(error);
            alert('Проверьте данные и повторите попытку снова');
          });
      },
    }
  };
  </script>

<style>
.RegForm .btn-p {
  color: black;
  background-color: lightgreen;
}
#Registration {
  /* display: flex;
  justify-content: center;
  align-items: center; */

  margin: auto;
  max-width: 500px;
  width: 90%;

  height: 70vh;
}
@media (max-width: 768px) {
  #Registration {
      height: 100vh;
    }
}

#Registration form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
#Registration form p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#Registration form label {
  margin-bottom: 0.5rem;
}

#Registration form input[type="text"], 
#Registration form input[type="email"], 
#Registration form input[type="password"] {
  padding: 0.5rem;
  border: 1px solid rgb(83, 185, 83);
  border-radius: 0.25rem;
  font-size: 1rem;
  margin: 0.5rem;
}

@media (max-width: 767px) {
  #Registration form {
    display: flex;
    flex-direction: column;
  }
  
  #Registration form button {
    margin-top: 1rem;
  }
}
</style>