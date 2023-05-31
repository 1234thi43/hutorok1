<template> 
  <div class="container"> 
    <div class="card"> 
      <h2 class="title">О нас</h2>

      <img src="../images/GlavFoto.jpg" alt="placeholder image" /> 

      <p class="text">Отдых на агроусадьбе "ХуторОк" это:
      Возможность отдохнуть от города и суеты на хуторе недалеко от Бреста (11км) в направлении беловежской пущи.
      <br><br>
      Возможно размещение с детьми до 10 человек.
      <br><br>
      Хорошая просторная беседка вместимостью до 20человек с зоной барбекю, кострищем, шампурами и решеткой (вязанка дров прилогается).
      <br><br>
      Имеется детская площадка с батутом, песочницой, качелью и гамаком.
      <br><br>
      В 400м от усадьбы находиться река Лесная и березовая роща.
      <br><br>
      Для компаний и любителей активного отдыха имеется волейбольная площадка. По желанию возможно организовать сплав по реке, рыбалку, сбор лечебных трав, пешие и вело прогулки.
      <br><br>
      В доме есть: Душевая, туалет, стиральная машина, холодильник, микроволнока, плита, электрочайник, кухонные принадлежности, русская печь, TV, Wi-Fi.
      <br><br>
      Возможно размещение с питомцами (за дополнительную плату).
      <br><br>
      Так же за дополнительную плату существует возможность заказать шеф-повара на мероприятие.</p> 
    </div> 

    <div class="services"> 
      <h2 class="title">Наши услуги</h2> 
      <div class="services-container"> 
        <div v-for="(item, index) in currentServices" :key="index" class="service"> 
          <h3 class="name">{{ item.name }}</h3> 
          <p class="description">{{ item.description }}</p> 
        </div> 
      </div>

    <div class="video"> 
      <h2 class="title">Видео</h2> 
      <div class="video-container"> 
        <iframe v-bind:src="currentVideo" width="100%" height="315" frameborder="0" allowfullscreen></iframe> 
      </div> 
      <div class="buttons"> 
        <b-button class="btn-prev" v-on:click="previousVideo">Назад</b-button>
        <b-button class="btn-next" v-on:click="nextVideo">Вперед</b-button>
      </div> 
    </div> 
    </div> 
    
  </div> 
</template> 
 
<script> 
export default { 
  data() { 
    return { 
      services: [ 
        { 
          name: "Для приготовления пищи на территории есть:", 
          description: "Современная кухня, зона барбекю и русская печь что позволяет приготовить практически любые блюда на ваш вкус." 
        }, 
        { 
          name: "Любителям активного отдыха возможна организация такой деятельности как:", 
          description: "Волейбол, минифутбол, Дартс, фризби, велопрогулки, сборы трав, сплав по реке." 
        }, 
        { 
          name: "Для трапезы на улице:", 
          description: "Имеется терасса и беседка с зоной барбекю." 
        }, 
        { 
          name: "Для досуга у нас есть:", 
          description: "Телевизор, Wi-Fi, Музыкальный центр и 348595 книг на любой вкус." 
        },
        { 
          name: "Для аренды на сутки и более:", 
          description: "Доступно 10 мест для ночлега." 
        }, 
        { 
          name: "Любителям животных:", 
          description: "Так же имеется место где разместить ваших питомцев." 
        }, 
        { 
          name: "В апартаментах присутствует:", 
          description: "Душ, туалет, стиральная машина, утюг." 
        }, 
        { 
          name: "Детям для досуга на улице есть:", 
          description: "Игровая площадка, батут, качель, гамак и песочница с игрушками." 
        } 
      ], 
      currentServices: [], 
      counter: 0, 
      videos: [ 
        { 
          id: "aKzJYLdXsL0", 
          title: "Название первого видео" 
        }, 
        { 
          id: "nhtBIEv4df4", 
          title: "Название второго видео" 
        }, 
      ], 
      currentVideoIndex: 0 
    }; 
  }, 
  methods: { 
    updateServices() { 
      const start = this.counter; 
      this.currentServices = this.services.slice(start, start + 4); 
      if (start + 4 >= this.services.length) { 
        this.counter = 0; 
      } else { 
        this.counter += 4; 
      } 
      setTimeout(this.updateServices, 10000); 
    }, 
    nextVideo() { 
      this.currentVideoIndex++; 
      if (this.currentVideoIndex >= this.videos.length) { 
        this.currentVideoIndex = 0; 
      } 
    }, 
    previousVideo() { 
      this.currentVideoIndex--; 
      if (this.currentVideoIndex < 0) { 
        this.currentVideoIndex = this.videos.length - 1; 
      } 
    } 
  }, 
  computed: { 
    currentVideo() { 
      return "https://www.youtube.com/embed/" + this.videos[this.currentVideoIndex].id + "?rel=0"; 
    } 
  }, 
  mounted() { 
    this.updateServices(); 
  } 
}; 
</script>

<style scoped>
.service {
  width: 25%;
  height: 100%;
  background-color: white;
  position: relative;
}

.service::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(144, 238, 144, 0.5);
  z-index: 0;
  animation: grow 10s ease-out infinite;
}

@keyframes grow {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.services-container h3,
.services-container p {
  position: relative;
  z-index: 1;
}

.btn-prev, .btn-next {
  color: black;
  background-color: lightgreen;
  margin: 1rem;
  align-items: center;
  justify-content: center;
}

.video {
  padding-top: 0.1rem;
  margin-top: 1.5rem;
  border-radius: 0.5rem;
  /* border: 1px solid black; */
  /* background-color: rgb(189, 186, 186); */
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.2), -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.2), 0 0.5rem 1rem rgba(0, 0, 0, 0.3);

}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
 
.card { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  margin: 10px; 
  width: 100%;
  max-width: 400px;
  border: none;
} 

.card p {
  text-align: justify;
  margin-top: 1rem;
}
 
.card img { 
  max-width: 100%;
  width: 100%; 
} 
 
.services { 
  margin: 1rem; 

  text-align: center;

  width: 100%;
  max-width: 650px;
} 

.title { 
  text-align: center; 
  margin: 1rem 0 1rem 0;
  font-weight: bold;
} 
.services-container { 
  display: flex; 
  justify-content: space-between; 
  flex-wrap: wrap; 

  text-align: center;
} 
 
.description {
  text-align: justify;
}

.service { 
  border: 1px solid black; 
  border-radius: 7px;
  padding: 10px; 
  width: calc(50% - 10px); 
  min-height: 160px;
  max-height: 240px;
  height: 100%;
  margin-bottom: 10px; 
} 
 
@media (max-width: 768px) { 
  .service { 
    width: 100%; 
  } 
  .card {
    width: 100%;
  }
} 
</style>