<template>
    <div id="editPage">
        <header>
            <p>EDIT PAGE</p>
            <router-link to="/">Go To Top Page</router-link>
        </header>
        <div class="edit-container">
            <div class="card">
                <div clss="card-heder">Make a Pin</div>
                
                <div class="card-body">
                    <div class="pram-group row">
                        <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                        <div class="col-md-6">
                            <input id="photo" type="file" class="param-control-file" name="photo" value="" v-on:change="onFileChanged">
                        </div>
                    </div>
                    <!--もしphotoがあればlocationを出す -->
                    <div v-if="hasPhoto">
                        <div class="pram-group row">
                            <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>
                            <div id="editPageMap">
                                <GmapMap 
                                    :center="center" 
                                    :zoom="zoom" style="width: 100%; height: 100%;" 
                                    @click="getLocation($event)"
                                    >      
                                        
                                        <GmapMarker
                                            :position="markerPosition"
                                            :title="undefined"
                                            :icon="undefined"
                                            :clickable="true"
                                            :draggable="true"
                                            @click="makeAPin($event)">
                                            </GmapMarker>
                                        
                                    </GmapMap>
                            </div>
                        </div>
                    </div>
                    <p v-else>※写真を選択してください。</p>
                    <div class="pram-group row">
                        <label for="caption" class="col-md-4 col-form-label text-md-right">Caption</label>
                        <div class="col-md-6">
                            <textarea id="caption" type="text" class="param-control-file" name="caption" value=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
export default Vue.extend ({
    data(){
        return {
            photo: undefined,
            center: { lat: 35.698304, lng: 139.766325 },
            zoom: 10,
            markerPosition: {
                lat: undefined,
                lng: undefined
            }
        }
    },


    methods: {
        onFileChanged(event) {
            // ファイルが設定されたので、設定されたファイルを持っておく
            this.photo = event.target.value
        },

        getLocation(event) {
            if(event) {
                const newLat = event.latLng.lat()
                const newLng = event.latLng.lng()
                this.markerPosition = { lat: newLat, lng: newLng }
                console.log('Location:')
                console.log(this.markerPosition)
            }
        },

        makeAPin(event) {
            // もしクリックされたらlatLngをポジションに代入する
            if(event) {
                console.log ('hoge')
            }
        }
    },

    computed: {
        hasPhoto() {
            if (this.photo) {
                return true
            } else {
                return false
            }
        }
    }
})
</script>


<style>
#editPage {
    margin: 50px;
}

#editPageMap {
    height: 400px;
    width: 500px;
}

.card > hr {
  margin-right: 0;
  margin-left: 0;
}

.card > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}

.card > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}

.card > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: calc(0.25rem - 1px);
  border-bottom-left-radius: calc(0.25rem - 1px);
}

.card > .card-header + .list-group,
.card > .list-group + .card-footer {
  border-top: 0;
}

</style>