<template>
  <!-- Авторизация -->  
  <div id="Authorization"> 
    <form class="AuthForm" @submit.prevent="login"> 
      <h1>Авторизация</h1> 

      <div> 
        <label for="email">Email:</label> 
        <input type="email" id="email" v-model="loginData.email" required autofocus> 
      </div> 
      <div> 
        <label for="password">Пароль:</label> 
        <input type="password" id="password" v-model="loginData.password" required> 
      </div> 
      <b-button class="btn-p" type="submit"> Войти </b-button> 
      <p> Вы еще не создали аккаунт у нас? <router-link to="/Registration"> Зарегистрироваться </router-link></p> 
    </form> 
  </div> 
</template> 

<script> 
import axios from 'axios';

export default { 
  name: 'AuthForm', 
  data() { 
    return { 
      isAuthenticated: false, 
      isAdmink: false, 
      loginData: { 
        email: '', 
        password: '' 
      }, 
    }; 
  },
  mounted() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      this.isAuthenticated = JSON.parse(isAuthenticated);
    }

    const isAdmink = localStorage.getItem('isAdmink');
    if (isAdmink) {
      this.isAdmink = JSON.parse(isAdmink);
    }
  },
  methods: { 
    login() {  
      if(!this.loginData.email || !this.loginData.password) {  
        console.log('Email и пароль должны быть заполнены');  
        return;  
      }

      if(this.loginData.email == 'danilbystrov288@gmail.com' && this.loginData.password == '12345678') {  
        console.log('Hi admin'); 

        localStorage.setItem('isAuthenticated', true);
        this.isAuthenticated = true;

        localStorage.setItem('isAdmink', true);
        this.isAdmink = true;

        location.reload();
      } else {
        axios.post('http://localhost:3000/api/login', this.loginData)  
        .then(response => {  
          console.log(response.data);
          alert('Авторизация прошла успешно');
          localStorage.setItem('isAuthenticated', true);
          this.isAuthenticated = true; // авторизация 

          location.reload();
          
          this.$router.push({ path: '/Booking' }); // переход на страницу Main 
        })  
        .catch(error => {  
          console.log(error);  
        });  
      }
    }, 
  } 
}; 
</script>
    
<style>
.AuthForm .btn-p {
  color: black;
  background-color: lightgreen;
}
#Authorization {
  margin: auto;
  max-width: 500px;
  width: 90%;
  height: 70vh;
}
@media (max-width: 768px) {
  #Authorization {
      height: 100vh;
    }
  }

#Authorization form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
#Authorization form p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#Authorization form label {
  margin-bottom: 0.5rem;
}

#Authorization form input[type="email"], 
#Authorization form input[type="password"] {
  padding: 0.5rem;
  border: 1px solid rgb(83, 185, 83);
  border-radius: 0.25rem;
  font-size: 1rem;
  margin: 0.5rem;
}

@media (max-width: 767px) {
  #Authorization form {
    display: flex;
    flex-direction: column;
  }
  
  #Authorization form button {
    margin-top: 1rem;
  }
}
    </style>