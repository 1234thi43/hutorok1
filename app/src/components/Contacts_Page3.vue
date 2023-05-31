<template> 
  <div class="container3" id="cont3LD"> 

<b-row class="ContactsRow">
    <b-col md="8" lg="100">
      <b-card id="Form">
        <b-form id="ContactForm" @submit.prevent="submitForm">
          <b-form-group label="Ваше имя*" label-for="name-input" :state="nameState">
            <b-form-input id="name-input" v-model="form.name" required />
          </b-form-group>

          <b-form-group label="Ваш email*" label-for="email-input" :state="emailState">
            <b-form-input id="email-input" type="email" v-model="form.email" required />
          </b-form-group>

          <b-form-group label="Тема" label-for="subject-input" :state="subjectState">
            <b-form-input id="subject-input" v-model="form.subject" />
          </b-form-group>

          <b-form-group label="Сообщение*" label-for="message-input" :state="messageState">
            <b-form-textarea id="message-input" v-model="form.message" required />
          </b-form-group>

          <b-button class="buttonSend" type="submit" :disabled="submitting">Отправить</b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>

    <div class="card3" style="border: none;">
      <h5 style="color: rgb(0, 197, 99);"> СВЯЗЬ С НАМИ </h5>
      <h3 style="font-weight: bold;"> Как мы можем вам помочь? </h3>
      <p class="text"> Чтобы узнать больше информации о предоставляемых нами услугах вы можете связаться с нами любым удобным вам образом.</p>

      <div id="ContactInf">
        <div class="ContactInfClass">
          <img src="../images/telephone.svg">
          <h6>Телефон</h6>
          <p>+375 (29) 359-30-07</p>
        </div>
        <div class="ContactInfClass">
          <img src="../images/mail.svg">
          <h6>Почта</h6>
          <p>agrousadbahutorok@gmail.com</p>
        </div>
        <div class="ContactInfClass">
          <img src="../images/geoMark.svg">
          <h6>Геолокация</h6>
          <p>Брестская область, Брестский р-н, д.Несвило, ул.Лесная, дом 2</p>
        </div>

      </div>
    </div>

  </div> 
</template> 
 
<script>
  import axios from 'axios';

export default {
    data() {
      return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitting: false
      };
    },
    computed: {
    nameState() {
      return this.form.name.length > 0 ? true : null
    },
    emailState() {
      return this.isValidEmail(this.form.email) ? true : null
    },
    subjectState() { 
      return true;
    },
    messageState() {
      return this.form.message.length > 0 ? true : null
    }
  },
  methods: {
    submitForm() {
      if (this.form.subject === '') {
        this.form.subject = 'без темы';
      }
      axios.post('http://localhost:3000/api/sendMessage', this.form) 
        .then(response => { 
        console.log(response.data); 
        this.submitting = true; // Отправка сообщения
        alert('Сообщение успешно отправлено')
        // router.push({ path: '/Main' }); // переход на страницу Main
      }) 
      .catch(error => { 
        alert('Возникла какая-то ошибка :с')
        console.log(error); 
      }); 

      setTimeout(() => {
        this.submitting = false

        this.form.name = ''
        this.form.email = ''
        this.form.subject = ''
        this.form.message = ''
      }, 1000)
    },
    isValidEmail(email) {
      // Validate email with regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
}
</script>

<style lang="scss">
#ContactInf {
  max-width: 500px; 
  display: flex; 
  justify-content: space-between; 
  flex-wrap: wrap;
  padding: 1.5rem;
  margin: 2rem;
  border-radius: 8px;
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.2), -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.2), 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}
.ContactInfClass {
  text-align: center;
}
.ContactInfClass h6 {
  font-weight: bold;
}
#Form {
  width: 28rem; 
  margin: 2rem;
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.2), -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.2), 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}
.ContactsRow .buttonSend{
  color: black;
  background-color: lightgreen;
}
#ContactForm{
  min-width: 70%;
}
.form-group {
  margin-bottom: 1rem;

  label {
    color: black;
    margin: 0.5rem;
  }

  input[type='text'],
  input[type='email'],
  textarea {
    border-radius: 0.35rem;
    border: 1px solid rgb(83, 185, 83);
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 100%;

    &:focus {
      color: #555;
      background-color: #fff;
      border-color: lightgreen;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(144, 238, 144, 0.25);
    }
  }

  .form-control.is-invalid {
    border-color: red;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
    &:focus {
      border-color: red;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
    }
  }

  .form-control.is-valid {
    border-color: green;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 0 0.2rem rgba(0,128,0,.25);
    &:focus {
      border-color: green;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 0.2rem rgba(0, 128, 0, 0.25);
    }
  }
}

//---------------------------------------

 .container3 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card3 { 
  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  margin: 2rem;
  width: 100%; /* ширина элемента в % */
  max-width: 500px; /* максимальная ширина изображения */
  /* border: 2px solid black ; */
} 
.card3 p {
  text-align: justify;
}
.services { 
  margin: 1rem; 

  width: 100%;
  max-width: 650px; /* ширина на устройстве 1920x1080 */ 
} 
.service { 
  border: 1px solid black; 
  padding: 10px; 
  width: calc(50% - 10px); 
  margin-bottom: 10px; 
} 

@media (max-width: 768px) { 
  .service { 
    width: 100%; 
  } 
  .card3 {
    width: 100%; /* изменяем ширину элемента на более узких экранах */
  }
}

@media (max-width: 1100px) { 
  #cont3LD{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
  }
}
</style>