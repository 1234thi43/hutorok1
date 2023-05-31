<template> 
  <div> 
    <b-form @submit.prevent="submitForm" id="content4">
    <div v-if="!form.step" class="px-3 py-4"> 
      <h4>Привет! Это вкладка для бронирования. Чтобы начать выбери нужную дату:</h4> 

      <div class="mt-4">
        <b-form-group label="Дата начала аренды">
          <b-form-datepicker type="date" class="inpB" v-model="form.dateStart" @input="calculateDaysAndPrice"></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Дата окончания аренды">
          <b-form-datepicker type="date" class="inpB" v-model="form.dateEnd" @input="calculateDaysAndPrice"></b-form-datepicker>
        </b-form-group>
      </div>

      <h5>Бронирование на {{ form.days }} дней</h5>
      <h5>Стоимость: {{ form.price }} руб.</h5>

      <div class="mt-4 Dbtn"> 
        <!-- <b-button class="btn" v-on:click="CheckDates1()">Проверить дату</b-button>  -->

          <b-button class="btn" v-on:click="CheckDates1()">Далее</b-button> 
      </div> 
    </div> 
 
    <div v-if="form.step === 1" class="px-3 py-4">     

      <h4>Введите свои данные:</h4>  
      <div class="mt-4"> 
        <b-form-group label="ФИО">
          <b-form-input v-model="form.FIO" placeholder="ФИО"></b-form-input>
        </b-form-group>
        <b-form-group label="Почта">
          <b-form-input type="email" v-model="form.email" placeholder="template@gmail.com"></b-form-input>
        </b-form-group>
        <b-form-group label="Телефон">
          <b-form-input v-model="form.phone" placeholder="+375**1234567"></b-form-input>
        </b-form-group>
        <b-form-group label="Количество человек">
          <b-form-input type="number" v-model="form.peopleCount"  style="border-color: rgb(83, 185, 83);"></b-form-input>
        </b-form-group>
        <b-form-group label="Откуда вы узнали о нас?">
          <b-form-input v-model="form.fromS"></b-form-input>
        </b-form-group>
        <b-form-group label="Все введенные данные верны" class="d-flex align-items-center"> 
          <b-form-checkbox v-model="form.allDataCorrect" class="d-flex align-items-center" 
          style="padding-bottom: 4px;"></b-form-checkbox> 
        </b-form-group> 
        <b-form-group label="Я согласен с условиями аренды" class="d-flex align-items-center" style="padding-left: 18px;"> 
          <b-form-checkbox v-model="form.agreed" class="d-flex align-items-center" 
          style="padding-bottom: 4px; padding-left: 14px;"></b-form-checkbox> 
        </b-form-group> 
      </div>  

      <div class="mt-4 Dbtn">  
          <b-button class="btn" v-on:click="form.step = 0">Назад</b-button>  
          <b-button class="btn" v-on:click="CheckDates2()">Далее</b-button>  
      </div>  
    </div> 
 
    <div v-if="form.step === 2" class="px-3 py-4">  
      <h4>Тут можно выбрать дополнительные услуги к аренде:</h4>     
    
      <div class="mt-4">    
        <h5>Выберите сервисы:</h5>    
        <b-form-group v-for="(service, index) in services" :key="index">    
          <b-form-checkbox v-model="form.services[index].checked" @change="updatePrice(index)">    
            <h6> {{ service.name }} - {{ service.price }} руб. </h6>   
          </b-form-checkbox>    
        </b-form-group>    
      </div>    

      <!-- <div v-for="(service, index) in form.servicesSelected" :key="index">{{ service }}</div> -->

      <h5>Стоимость: {{ form.price }} руб.</h5>

      <div class="mt-4 Dbtn"> 
          <b-button class="btn" v-on:click="form.step = 1">Назад</b-button> 
          <b-button class="btn" v-on:click="form.step = 3">Далее</b-button> 
      </div> 
    </div>   
 
    <div v-if="form.step === 3" class="px-3 py-4"> 
      <h4>Конечные данные:</h4> 
      <div class="mt-4 Dbtn"> 
        <h5>Бронирование с: {{ form.dateStart }} по: {{ form.dateEnd }}</h5>
        <h5>Итоговое количество дней: {{ form.days }}</h5>
        <h5 v-if="form.servicesSelected && form.servicesSelected.length > 0">Дополнительные услуги: {{ form.servicesSelected.map(service => service.name).join(", ") }}.</h5>
        <h5>Общая стоимость: {{ form.price }} руб.</h5>

          <b-button class="btn" v-on:click="form.step = 2">Назад</b-button> 
          <b-button class="btn" type="submit" :disabled="submitting">Отправить</b-button> 
      </div> 
    </div> 
    </b-form>
  </div> 
</template>

<script>
import axios from 'axios'; 

  export default {
    name: 'MyForm',
    data() {
      return {
        form: {
          step: 0,
          dateStart: '',
          dateEnd: '',
          days: 0,
          price: 0,

          FIO: '',
          email: '',
          phone: '',
          peopleCount: '',
          fromS: '',

          allDataCorrect: false,
          agreed: false,

          services: [
            { name: 'Уборка', price: 20, checked: false },
            { name: 'Трансфер', price: 40, checked: false },
            { name: 'Завтрак', price: 10, checked: false }
          ],
          servicesSelected: []
        },
        services: [],

        submitting: false
      }
    },
    mounted() {
      this.services = this.form.services;
    },
    methods: {
      addServicesSelected() { 
        this.form.servicesSelected = []; 
        this.form.services.forEach(service => { 
          if (service.checked) { 
            this.form.servicesSelected.push({ 
              name: service.name, 
              price: service.price 
            }); 
          } 
        }); 
      },
      resetForm() { // функция сброса формы
        this.form.dateStart = null;
        this.form.dateEnd = null;
        this.form.days = 0;
        this.form.price = 0;
      },
      CheckDates1() { 
        if (!this.form.dateStart || !this.form.dateEnd) { // проверка на заполнение обеих дат
          alert('Даты не выбраны');
          return; // если даты не выбраны, то переход на следующий шаг не производится
        }
        if (this.form.dateStart > this.form.dateEnd) {
          alert('Начальная дата больше конечной');
          this.resetForm();
          return;
        }
        if (this.form.dateStart === this.form.dateEnd) {
          alert('Начальная дата не может быть равна конечной');
          this.resetForm();
          return;
        }

          this.next();
      },
      CheckDates2() { 
        if (!this.form.FIO) {
          alert('Пожалуйста, заполните поле ФИО');
        return;
        }
        if (!this.form.email) {
          alert('Пожалуйста, заполните поле E-mail');
          return;
        }
        if (!this.form.phone) {
          alert('Пожалуйста, заполните поле Телефон');
          return;
        }
        if (!this.form.peopleCount) {
          alert('Пожалуйста, заполните поле Количество человек');
          return;
        }
        if (this.form.peopleCount <= 0) {
          alert('Введите корректное количество человек');
          return;
        }
        if (!this.form.allDataCorrect) {
          alert('Пожалуйста, подтвердите корректность введенных данных');
          return;
        }
        if (!this.form.agreed) {
          alert('Пожалуйста, поставьте отметку в чекбоксе "Согласен с условиями"');
          return;
        }
        if (this.form.peopleCount <= 0) {
          alert('Пожалуйста, заполните поле с количеством человек корректно');
          return;
        }
        if (this.form.phone[0] !== '+') { 
          this.form.phone = `+${this.form.phone}`; 
        } 
        if (!/^\+\d+$/.test(this.form.phone)) { 
          alert('Пожалуйста, заполните поле с номером телефона корректно'); 
          return; 
        } 

          this.next();
      },
      next() {
        this.calculateDaysAndPrice(); 
        this.form.step++;
      },
      calculateDaysAndPrice() {
        const start = new Date(this.form.dateStart); 
        const end = new Date(this.form.dateEnd); 
        const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24); 
        this.form.days = days; 
        this.form.price = days * 90; 
        for (let i = 0; i < this.form.services.length; i++) { 
          if (this.form.services[i].checked) { 
            this.form.price += this.form.services[i].price; 
          } 
        } 
      },
      updatePrice(serviceIndex) { 
        if (this.form.services[serviceIndex].checked) { 
          this.form.price += this.form.services[serviceIndex].price;
          this.addServicesSelected();
        } else { 
          this.form.price -= this.form.services[serviceIndex].price;
          this.addServicesSelected();
        } 
      },
      submitForm() {
        if (this.form.fromS === '') {
          this.form.fromS = 'Не указано';
        }

        axios.post('http://localhost:3000/api/sendBooking', this.form) 
        .then(response => { 
        console.log(response.data); 
        this.submitting = true; // Отправка сообщения
        alert(`Заявка на бронь успешно отправлена
        Имя: ${this.form.FIO}
        Почта: ${this.form.email}
        Телефон: ${this.form.phone}
        Дата с ${this.form.dateStart} по ${this.form.dateEnd}
        Стоимость: ${this.form.price}
        `)

        location.reload();
        // router.push({ path: '/Main' }); // переход на страницу Main
      }) 
      .catch(error => { 
        alert('Возникла какая-то ошибка :с')
        console.log(error); 
      }); 

      }
    }
  }
</script>

<style> 
#content4 {
  min-height: 60vh; 
 
  padding: 0 1rem 1rem 1rem; 

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mt-4 .inpB {
  border-color: rgb(83, 185, 83);
}
.Dbtn .btn { 
  background-color: lightgreen; 
  color: black; 
  margin: 1rem;
}
</style>