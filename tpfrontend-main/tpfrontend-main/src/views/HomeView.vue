<template>
  <div class="home">
    <header class="home-header">
      <h1>Bienvenido a la Página del Fabricante</h1>
    </header>
    <section class="home-content">
      <div class="home-info">
        <h2>Sobre Nosotros</h2>
        <p>Somos una empresa dedicada a la producción de alta calidad, ofreciendo los mejores productos para nuestros clientes. Nuestro compromiso es garantizar la satisfacción y la excelencia en cada uno de nuestros productos.</p>
      </div>
      <div class="home-gallery">
        <h2>Nuestros Productos</h2>
        <div class="gallery">
          <div class="gallery-item" v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" />
            <p>{{ image.alt }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: 'public/images/cel.jpg', alt: 'Producto 1' },
        { src: 'public/images/gafasvirtual.jpg', alt: 'Producto 2' },
        { src: 'public/images/tablet.jpg', alt: 'Producto 3' },        
      ]
    };
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.home-header {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-bottom: 20px;
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-info {
  max-width: 800px;
  margin-bottom: 40px;
}

.home-gallery {
  max-width: 1200px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-item {
  margin: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
}

.gallery-item img {
  max-width: 100%;
  height: auto;
}

.gallery-item p {
  margin-top: 10px;
  font-size: 1em;
  color: #333;
}
</style>
