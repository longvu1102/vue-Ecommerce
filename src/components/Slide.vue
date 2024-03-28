<template>
    <div class="slide container-fluid mt-3">
      <div class=" div1 text-center">
        <h6 class="text-center">Move, Shop, Customise & Celebrate With Us.</h6>
        <p>No matter what you feel like doing today, It’s better as a Member.</p>
      </div>
      <!-- Your Slide content here -->
      
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true" style="height: 700px;" >
      <div class="carousel-inner">
        <div class=" button container-fluid text-start" >
          <img src="@/assets/images/nike-just-do-it-4.jpg" alt="" style="width: 100%;height: 500px;">
         
        </div>
      </div>
    </div>
   
    </div>
  </template>
  
  <script>
  export default {
    name: 'SlideComponent',
    // Slide component logic
  }
  </script>
<style scoped>
.slide {

}

#carouselExampleIndicators {
  height: 700px;
}

.carousel-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding: 0 20px;
}

.button img {
  width: 100%;
  height: 700px;
  object-fit: cover;
}

.button h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 70px;
  color: #fff;
  position: relative;
  top: -300px;
  left: 40px;
}

.button button {
  position: relative;
  top: -300px;
  left: 40px;
  background-color: #fff;
  color: #000;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button button:hover {
  background-color: #000;
  color: #fff;
}
@media only screen and (max-width: 739px){
 button{
  display: none;
 }
  .silde{
    display: none;
  }
  #carouselExampleIndicators{
    display: none;
  }
}
@media only screen and (min-width: 740px) and (max-width: 1023px){
  button{
    display: none;
   }
    .silde{
      display: none;
    }
    #carouselExampleIndicators{
      display: none;
    }
}
</style>

  