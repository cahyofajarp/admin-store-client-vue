<template>
<section class="section-carousel">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" v-for="(slider,index) in sliders" :key="index" :class="{ active : index == 0 }" :data-slide-to="index"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item"  v-for="(slider,index) in sliders" :key="index" :class="{ active : index == 0 }">
                <img class="d-block w-100 h-90" :src="slider.image" :alt="slider.title">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</section>

</template>

<script>

import { useStore } from 'vuex';
import { onMounted,computed } from 'vue';

export default {
    setup(){
        
        const store = useStore();

        const getSlider  = onMounted(() => {
            store.dispatch('slider/getSliders');  
        });

        const sliders = computed(() => {
            return store.state.slider.sliders;
        });

        return {
            getSlider,
            sliders
        }

    }
}
</script>

<style lang="css" scoped>

.carousel-item img {
    max-height: 500px;
    object-fit: cover;
}
</style>