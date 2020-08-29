<template>
    <div id="topPage">
        <p>TOP PAGE</p>
        <router-link to="./edit">Go To Edit Page</router-link> 
        <GmapMap 
          :center="center" 
          :zoom="zoom" style="width: 100%; height: 100%;" 
        >      
            <div v-for="(m,id) in markers" :key="id">
                <GmapInfoWindow
                  :options="infoOptions"
                  :position="m.position"
                  :opened="true"
                  @closeclick="infoWinOpen=false"
                >
                  <img :src="m.image">
                  <p>{{ m.title }}</p>
                </gmapInfoWindow>  
                <GmapMarker 
                  :position="m.position"
                  :title="m.title"
                  :key="id"
                  :icon="m.icon"
                  :clickable="true"
                  :draggable="true"
                  @click="toggleInfoWindow(m)">
                </GmapMarker>
            </div>
        </GmapMap>
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend ({
  data() {
    return {
      center: { lat: 35.698304, lng: 139.766325 },

      zoom: 18,

      markers: [
        { position: { lat: 35.698304, lng: 139.766325 }, title: 'marker1', image:'/F57AE3D2-9923-4445-899E-1565C65918FF.jpeg'  },
        { position: { lat: 35.698404, lng: 139.766925 }, title: 'marker2', image:'/81211E9B-8F79-4AAA-95B0-1BEE27215135.jpeg'  },
        { position: { lat:35.6970420, lng: 139.763068 }, title: 'marker3', image:'/DAA14DC6-C1DA-427F-927F-C614E80F89C0.jpeg' } 
      ],

      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

      infoWinOpen: false,
    }
  },
      
  methods: {
    toggleInfoWindow() {
      this.infoWinOpen = true;
    },
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 50px;
  width: 50px;
}

#topPage {
  margin: 50px;
  height: 700px;
}
</style>