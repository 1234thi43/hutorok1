<template>
  <div class="gallery">
    <div class="gallery-row" v-for="(imageGroup, index) in imageGroups" :key="index">
      <div class="gallery-item" v-for="(imageUrl, index) in imageGroup" :key="index" @click="openModal(index, imageUrl)">
        <img :src="imageUrl" alt="" />
      </div>
    </div>

    <div v-if="modalActive" class="modal">
      <div class="modal-content" style="background-color: white;">
        <span class="close-btn" @click="closeModal"> X </span>
        <img :src="modalImageUrl" alt="" />
        
        <div class="modal-arrows">
          <b-button class="arrow arrow-left" @click="prevModalImage" style="color: black;"> Назад </b-button>
          <b-button class="arrow arrow-right" @click="nextModalImage" style="color: black;"> Далее </b-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imageGroups: [],
      modalActive: false,
      modalImageUrl: "",
      modalImageIndex: 0,
    };
  },
  created() {
    this.loadImages();
  },
  methods: {
    loadImages() {
      const imagesFolder = require.context(
        "../images/gallery",
        false,
        /.*\.(jpg|png|gif|jpeg)$/i
      );
      const imageUrls = imagesFolder.keys().map((key) => imagesFolder(key));
      const rows = [];
      let currentRow = [];
      for (let i = 0; i < imageUrls.length; i++) {
        currentRow.push(imageUrls[i]);
        if (
          (i % 2 === 0 && currentRow.length === 3) || (i % 2 === 1 && currentRow.length === 4)
        ) {
          rows.push(currentRow);
          currentRow = [];
        }
      }
      if (currentRow.length) {
        rows.push(currentRow);
      }
      this.imageGroups = rows;
    },
    openModal(index, imageUrl) {
      this.modalActive = true;
      this.modalImageUrl = imageUrl;
      this.modalImageIndex = index;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.modalActive = false;
      document.body.style.overflow = "auto";
    },
    nextModalImage() {
      if (this.modalImageIndex < this.imageGroups.flat().length - 1) {
        this.modalImageIndex++;
        this.modalImageUrl = this.imageGroups.flat()[this.modalImageIndex];
      } else {
        this.modalImageIndex = 0;
        this.modalImageUrl = this.imageGroups.flat()[0];
      }
    },
    prevModalImage() {
      if (this.modalImageIndex > 0) {
        this.modalImageIndex--;
        this.modalImageUrl = this.imageGroups.flat()[this.modalImageIndex];
      } else {
        this.modalImageIndex = this.imageGroups.flat().length - 1;
        this.modalImageUrl = this.imageGroups.flat()[this.modalImageIndex];
      }
    },
  },
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
  gap: 0px;
}

.gallery-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
}

.gallery-item {
  margin-bottom: 5px;
  margin-right: 5px;
  flex: 1 0 calc(25% - 10px);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.gallery-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s ease-in-out;
}

.gallery-item:hover {
  transform: scale(1.07);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  max-height: 800px;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 36px;
  font-weight: bold;
  color: rgb(255, 0, 0);
  cursor: pointer;
}

.modal-arrows {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 0.5rem;
}

.arrow {
  background-color: lightgreen;
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;
}

@media (max-width: 768px) {
  .modal-arrows {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 1920px) {
  .modal-content img {
    width: 70%;
    height: 70%;
  }
}

@media screen and (max-width: 768px) {
  .modal-content {
    width: 90%;
    height: 90%;
  }
  
  .modal-content img {
    width: 80%;
    height: 80%;
  }
} 
</style>