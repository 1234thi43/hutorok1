<template>
  <div id="app">
    
  <b-navbar id="info-container" toggleable="md" type="light" variant="light"> 
  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> 

  <b-navbar-nav class="left" id="Logo">
    <img src="./images/Logo.png">
  </b-navbar-nav>

  <b-collapse id="nav-collapse" is-nav> 
    <b-navbar-nav id="navbar-nav" class="mx-auto" style="text-align: left;">
      <b-nav-item> <router-link to="/Main">Главная</router-link> </b-nav-item> 
      <b-nav-item> <router-link to="/Gallery">Галерея</router-link> </b-nav-item> 
      <b-nav-item> <router-link to="/Contacts">Контакты</router-link> </b-nav-item> 
      <b-nav-item> 
        <router-link :to="isAuthenticated === 'true' ? '/Booking' : '/Registration'" 
        @click.prevent="checkAuth">Бронирование</router-link>
       </b-nav-item>  

       <b-nav-item v-if="isAdmink">  
        <router-link to="/Users">Admin panel</router-link>  
      </b-nav-item>

      <b-nav-item> 
        <router-link to="/Registration">{{ authText }}</router-link> 
      </b-nav-item> 
    </b-navbar-nav> 

  </b-collapse> 
</b-navbar>

<div class="content">  
  <router-view></router-view>
</div>

<footer class="footer" style="border-top: 1px solid black;"> <!-- class="footer fixed-bottom" // Можно добавить если надо прикрепить футер к нижней части экрана-->
  <div class="container">
    <div class="row">
      <div class="col-md-6 text-start">
        <h4 class="text-muted"> <b> ЗВОНИТЕ ПРЯМО СЕЙЧАС </b></h4>
        <p class="text-muted"> Номер директора: +375 (33) 359-30-07 </p>
      </div>

      <div class="col-md-6" style="">

        <ul class="list-inline">

          <li class="list-inline-item"><a href="https://www.instagram.com/vital.bystrov/?igshid=ZmRlMzRkMDU%3D">
            <img src="./images/Instagram.jpg" style="width: 100%; max-width: 35px; height: auto;"/>
          </a></li>

          <li class="list-inline-item"><a href="https://www.pinterest.com/agrousadbahutorok/">
            <img src="./images/Pinterest.jpg" style="width: 100%; max-width: 35px; height: auto;"/>
          </a></li>

          <li class="list-inline-item"><a href="https://web.telegram.org/k/#@DoomInc">
            <img src="./images/Telegram.jpg" style="width: 100%; max-width: 35px; height: auto;"/>
          </a></li>

          <li class="list-inline-item"><a href="https://vk.com/id612310553">
            <img src="./images/Vk.jpg" style="width: 100%; max-width: 35px; height: auto;"/>
          </a></li>
        </ul>
      </div>
    </div>
    <p class="text-muted text-center">© 2023 Агроусадьба ХуторОК. Все права защищены. @Toroid ODO</p>
  </div>
</footer>

  </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------------------------------->

<script>    
export default {    
  data() {    
    return {    
      isAuthenticated: null, 
      isAdmink: null, 
    };    
  },    
  created() { 
    window.addEventListener('scroll', this.handleScroll);    
    this.isAuthenticated = localStorage.getItem('isAuthenticated');  
    this.isAdmink = localStorage.getItem('isAdmink') === 'true';
    if (this.isAuthenticated === null) { 
      this.$router.push('/Registration');  
    } else if (this.isAuthenticated === 'false') { 
      this.$router.push('/Registration'); 
    } 
  },   
  destroyed() {    
    window.removeEventListener('scroll', this.handleScroll);    
  },    
  computed: {
    authText() {
      return this.isAuthenticated ? '' : 'Авторизация на сайте';
    }
  },
  methods: {
    handleScroll: function() {    
      const top = window.pageYOffset || document.documentElement.scrollTop; // Скролл страницы    
      const navbar = document.querySelector('.navbar'); // Высота меню    
      const navbarHeight = navbar.offsetHeight;    

      if (top > navbarHeight) { // При скролле добавляем класс fixed-top, чтобы прикрепить меню    
        navbar.classList.add('fixed-top');    
      } else {    
        navbar.classList.remove('fixed-top');    
      }    
    },  
    checkAuth() {  
      if (!this.isAuthenticated) {  
        this.$router.push('/Registration');  
      }  
    }  
  }    
};    
</script>

<!--------------------------------------------------------------------------------------------------------------------------------------------->

<style scoped lang="scss">
nav[data-v-7ba5bd90] {
    padding: 0px !important;
}
#Logo {
  width: 110px; 
  height: 110px; 
  margin-left: 5rem;
  margin-right: 2rem;
  padding: 0px;
}
@media (max-width: 768px) {
  #Logo {
    margin-left: auto;
  }
}
// Стили футера -----------------------------------------------------------------------------------------------------------------
.content {  
  min-height: calc(85vh - 100px); /* Здесь 100px - это высота footer */  
}
.footer {
  position: fixed;
  bottom: 0;
  height: auto;
  width: 100%;
  background-color: #f5f5f5;
  text-align: center;
  padding: 10px 0;
  flex-direction: column;
}
@media screen and (min-height: 100vh) {
  .footer {
    position: static;
  }
}
ul.list-inline {
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
}
ul.list-inline li {
  margin-right: 15px;
}
ul.list-inline li:last-child {
  margin-right: 0;
}

@media screen and (max-height: 100vh) {
  .footer {
    position: static;
  }
}
@media (max-width: 767.98px) {
  ul.list-inline {
    display: flex;
    justify-content: flex-start;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .list-inline {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-inline-item {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .list-inline-item:last-child {
    margin-right: 0;
  }
  .list-inline-item img {
    max-width: 100%;
    height: auto;
  }
}

// Стили роут инфы -----------------------------------------------------------------------------------------------------------------
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -15px;
  width: calc(33.333333% - 30px);
  padding: 0px !important;
}
@media (max-width: 575.98px) {
  .info-container {
    width: 100%;
    margin: 0 0 30px;
  }
}

// Стили меню -----------------------------------------------------------------------------------------------------------------
.navbar {
  background-color: #ffffff;
  margin-top: 0;
  justify-content: flex-start;
}
.navbar.fixed-top {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .5);
}
#navbar-nav { 
  display: flex; 
  flex-wrap: wrap;
}

// Стили кнопки меню (на маленьких устр.) -------------------------------------------------------------------------------------
@media (max-width: 991.98px) {
  .navbar-toggler {
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
}

// Стили текста -----------------------------------------------------------------------------------------------------------------
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-left: 20px;
    text-decoration: none !important;
    border-bottom: none !important;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>