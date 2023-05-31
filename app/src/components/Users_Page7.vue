<template>   
    <div id="content7">   
      <div v-if="!step" class="step">   
        <p style="padding-bottom: 1.5rem;">Добро пожаловать в панель администратора</p>   
        <p>   
          <a v-on:click="step = 1" class="link">Пользователи</a> |   
          <a v-on:click="step = 2" class="link">Сообщения</a> |   
          <a v-on:click="step = 3" class="link">Заявки на бронирование</a> |
          <a v-on:click="step = 4" class="link">Подтвержденные брони</a>  
        </p>   
      </div>   
     
      <div v-if="step === 1" class="stepN">  
        <h4>Зарегестрированные пользователи</h4>   
        <b-button class="BPrev" v-on:click="step = 0" style="margin-top: 2rem;"> назад </b-button> 

        <div class="mb-2">
          <b-form-group label="Поиск пользователя:">
            <b-form-input v-model="searchQuery" type="search" debounce="300" 
            placeholder="Введите имя или email для поиска"></b-form-input>
          </b-form-group>
        </div>
   
        <b-table id="UsersTable" :items="filteredUsers" :fields="Usersfields"> 
            <!-- ...код для отображения остальных столбцов... -->
            <template #cell(delete)="row">
                <b-button @click="deleteUser(row.item.id)" variant="danger">
                    <img src="../images/garb.svg" alt="Удалить" />
                </b-button>
            </template>
        </b-table>   
   
      </div>   
     
      <div v-if="step === 2" class="stepN">   
        <h4>Сообщения пользователей</h4>  

        <b-button class="BPrev" v-on:click="step = 0" style="margin-bottom: 1rem; margin-left: 0rem;"> назад </b-button>  

        <b-table id="MessagesTable" :items="messages" :fields="Messagesfields">
          <template #cell(read)="row">
                <b-button @click="deleteMessage(row.item.id)" variant="danger">
                    <img src="../images/garb.svg" alt="Удалить" />
                </b-button>
            </template>
        </b-table>
 
      </div>   
     
      <div v-if="step === 3" class="stepN">   
        <h4>Заявки на бронирование</h4>

        <b-button class="BPrev" v-on:click="step = 0"> назад </b-button>  
        
        <b-table id="BookingsTable" :items="bookings" :fields="Bookingsfields" style="margin: 0.2rem;"> 
          <template #cell(buttons)="row">
            <b-button @click="confBooking(row.item.id)" variant="danger" style="margin: 0.2rem;">
              <img src="../images/check.svg" alt="Подтвердить" />
            </b-button>
            <b-button @click="deleteBooking(row.item.id)" variant="danger" style="margin: 0.2rem;">
              <img src="../images/garb.svg" alt="Удалить" />
            </b-button>
          </template>
        </b-table>
        
      </div>   

      <div v-if="step === 4" class="stepN">   
        <h4>Подтвержденные заявки на бронирование</h4>

        <b-button class="BPrev" v-on:click="step = 0" style="margin-top: 2rem;"> назад </b-button>  

        <div class="mb-2">
          <b-form-group label="Поиск брони по дате:">
            <b-form-input v-model="searchQueryDate" type="search" debounce="300" 
            placeholder="Введите дату которую хотите проверить"></b-form-input>
          </b-form-group>
        </div>
        
        <b-table id="BookingsTable" :items="filterBookings" :fields="Bookingsfields" style="margin: 0.2rem;"> 
          <template #cell(buttons)="row">
            <b-button @click="deleteConfBooking(row.item.id)" variant="danger" style="margin: 0.2rem;">
              <img src="../images/garb.svg" alt="Удалить" />
            </b-button>
          </template>
        </b-table>
      </div> 

    </div>   
</template>   
     
<script>   
import axios from 'axios';   
import { BTable, BFormGroup, BFormInput } from 'bootstrap-vue';   
   
export default {   
  data() {   
    return {   
      step: 0,   

      users: [], 
      messages: [],
      bookings: [],
      confBookings: [],

      searchQuery: null,
      searchQueryDate: null,

      Usersfields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'password', label: 'Password' },
        { key: 'delete', label: 'Действия' },
        ],  

        Messagesfields: [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'subject', label: 'Subject' },
            { key: 'message', label: 'Message' },
            { key: 'read', label: 'Действия' },
        ],

        Bookingsfields: [
          { key: 'id', label: 'ID' },
          { key: 'dateStart', label: 'Дата начала аренды' },
          { key: 'dateEnd', label: 'Дата окончания аренды' },
          { key: 'days', label: 'Всего дней' },
          { key: 'price', label: 'Стоимость' },
          { key: 'FIO', label: 'ФИО' },
          { key: 'email', label: 'Почта' },
          { key: 'phone', label: 'Телефон' }, 
          { key: 'peopleCount', label: 'Кол. человек' },
          { key: 'fromS', label: 'Откуда узнали?' },
          { key: 'servicesSelected', label: 'Доп. услуги' },
          { key: 'buttons', label: 'Действия' },
        ],
    };   
  },   
   
  components: {   
    BTable,   
    BFormGroup,     
    BFormInput,  
  },   
   
  mounted() {   
    axios.get('http://localhost:3000/api/checkUsers').then((response) => {   
      this.users = response.data;   
    });   
    axios.get('http://localhost:3000/api/checkMessages').then((response) => {   
      this.messages = response.data;   
    }); 
    axios.get('http://localhost:3000/api/checkBookings').then((response) => {   
      this.bookings = response.data;   
    });
    axios.get('http://localhost:3000/api/confBookings').then((response) => {   
      this.confBookings = response.data;   
    });
  },  

  computed: {     
    filteredUsers() {     
      if (!this.searchQuery) return this.users;
      let needle = this.searchQuery;
      return this.users.filter(function (user) {     
        return user.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1 || user.email.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
      });     
    },
    filterBookings() {
      if (!this.searchQueryDate) return this.confBookings;
        let filtered = this.confBookings.filter((confBooking) => {
        let start = new Date(confBooking.dateStart);
        let end = new Date(confBooking.dateEnd);
        let query = new Date(this.searchQueryDate);
        return query >= start && query <= end;
      });
      return filtered;
    },
  }, 
   
  methods: {
    deleteUser(id) {  
        if(confirm("Вы уверены, что хотите удалить пользователя?")) {
            axios.delete(`http://localhost:3000/api/deleteUser/${id}`).then((response) => {  
                console.log(response.data.message);  
                alert('Пользователь успешно удален');
                this.users = this.users.filter((user) => user.id !== id);  
            }).catch((err) => {  
                console.log(err.response.data);  
            });  
        }
    },
    deleteMessage(id) {  
        if(confirm("Вы уверены, что хотите удалить сообщение?")) {
            axios.delete(`http://localhost:3000/api/deleteMessage/${id}`).then((response) => {  
                console.log(response.data.message);  
                this.messages = this.messages.filter((message) => message.id !== id);  
            }).catch((err) => {  
                console.log(err.response.data);  
            });  
        }
    },
    deleteBooking(id) {  
      if(confirm("Вы уверены, что хотите удалить заявку на бронь?")) {
          axios.delete(`http://localhost:3000/api/deleteBooking/${id}`).then((response) => {  
              console.log(response.data.message);  
              this.bookings = this.bookings.filter((booking) => booking.id !== id);  
          }).catch((err) => {  
              console.log(err.response.data);  
          });  
      }
    },
    confBooking(id) {  
      if(confirm("Вы уверены, что подтвердить заявку на бронь?")) {
          axios.delete(`http://localhost:3000/api/confBooking/${id}`).then((response) => {  
              console.log(response.data.message);  
              this.bookings = this.bookings.filter((booking) => booking.id !== id);  
          }).catch((err) => {  
              console.log(err.response.data);  
          });  
      }
    },
    deleteConfBooking(id) {  
      if(confirm("Вы уверены, что хотите удалить забронированные даты?")) {
          axios.delete(`http://localhost:3000/api/deleteConfBooking/${id}`).then((response) => {  
              console.log(response.data.message);  
              this.confBookings = this.confBookings.filter((confBooking) => confBooking.id !== id);  
          }).catch((err) => {  
              console.log(err.response.data);  
          });  
      }
    }
  },
};   
</script>

<style lang="scss">
#checkBtn {
  background-color: lightgreen;
}

#UsersTable td, #UsersTable th, #MessagesTable td, #MessagesTable th, #BookingsTable td, #BookingsTable th {
    border: 2px solid black;
}
#UsersTable, #MessagesTable, #BookingsTable {
  overflow-x: auto;
}

@media (max-width: 768px) {
  #UsersTable th,
  #UsersTable td,
  #UsersTable thead th,
  #MessagesTable th,
  #MessagesTable td,
  #MessagesTable thead th {
    display: block;

    border: 2px solid black;
  }
  #UsersTable tbody,
  #MessagesTable tbody {
    display: block;
    width: 100%;
  }
  #UsersTable tbody tr,
  #MessagesTable tbody tr {
    display: block;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border-bottom: 2px solid black;
  }
  #UsersTable tbody td,
  #MessagesTable tbody td {
    display: block;
    text-align: right;
    font-size: 1rem;
    border-bottom: none;
    position: relative;
    // padding-left: 20%;
    box-sizing: border-box;
  }
  #UsersTable tbody td::before,
  #MessagesTable tbody td::before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 38%;
    padding-right: 1rem;
    white-space: nowrap;
    content: attr(data-title);
    font-weight: bold;
  }
}

@media (max-width: 1300px) {
  #BookingsTable th,
  #BookingsTable td,
  #BookingsTable thead th{
    display: block;

    border: 2px solid black;
  }
  #BookingsTable tbody {
    display: block;
    width: 100%;
  }
  #BookingsTable tbody tr {
    display: block;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border-bottom: 2px solid black;
  }
  #BookingsTable tbody td {
    display: block;
    text-align: right;
    font-size: 1rem;
    border-bottom: none;
    position: relative;
    box-sizing: border-box;
  }
  #BookingsTable tbody td::before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 38%;
    padding-right: 1rem;
    white-space: nowrap;
    content: attr(data-title);
    font-weight: bold;
  }
}

#content7 {
    min-height: 60vh; 
    min-width: 30vh;

    display: flex;
    justify-content: center;
    align-items: center;
}
.step {
    cursor: pointer;
    font-size: 1.5rem;
}
.stepN .BPrev {
    color: black;
    background-color: lightgreen;
    margin: 0.2rem;
    
    float: left;
    bottom: 0; 
    left: 0; 
}
.step a {
    text-decoration: none;
    color: inherit;
}
.step a:hover {
    color: blue;
}
</style>