<template>
    <div id="editPage">
        <header>
            <p>EDIT PAGE</p>
            <router-link to="/">Go To Top Page</router-link>
        </header>
        <div class="edit-container">
            <div class="card">
                <div clss="card-heder">Make a Pin</div>
                    <form>
                        <div class="card-body">
                            <div class="pram-group row">
                                <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                                        <div class="col-md-6">
                                            <input id="photo" type="file" class="param-control-file" name="photo" value="" v-on:change="onFileChanged">
                                            <canvas id="canvas" height="0"></canvas>
                                        </div>
                            </div>
                            <!-- もしphotoがあればlocationを出す -->
                            <div v-if="hasPhoto">
                                <div class="pram-group row">
                                    <label class="col-md-4 col-form-label text-md-right">Location</label>
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
                                    <textarea class="param-control-file" v-model="caption"></textarea>
                                    <input type="test">
                                    <input type="password">
                                </div>
                            </div>
                            <div class="col-md-6 offset-md-4">   
                                        <button class="btn btn-primary" @click="onSubmit($event)">送信</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { client } from '@/main';
export default Vue.extend ({
    data(){
        return {
            photo: undefined,
            center: { lat: 35.698304, lng: 139.766325 },
            zoom: 10,
            markerPosition: {
                lat: 0,
                lng: 0
            },
            caption: ''
        }
    },

    methods: {

        onFileChanged(event) {
            // ファイルが設定されたので、設定されたファイルを持っておく
            this.photo = event.target.value

            //キャンバスに写真を表示する
            let fileData = event.target.files[0]
            let canvas = document.getElementById('canvas');
            let canvasWidth = 200;
            let canvasHeight = 150;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            let ctx = canvas.getContext('2d');

            let reader = new FileReader();
            // let that = this;
            reader.onload = function() {
                let uploadImgSrc = reader.result;
                // canvas上に画像を重ねて表示
                let img = new Image();
                img.src = uploadImgSrc;
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
                }
            }
             reader.readAsDataURL(fileData);

            
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
        },

        onSubmit(event) {
            // 以下はPOSTボタンを押したら
             // blobデータを作成する
             const type ='image/png';
             let canvas = document.getElementById('canvas');
             document.querySelector('canvas');
             const dataUrl = canvas.toDataURL(type);
             const bin = atob(dataUrl.split(',')[1]);
             const buffer = new Uint8Array(bin.length);
             for (let i=0; i<bin.length; i++) {
                 buffer[i] = bin.charCodeAt(i);
             }
             const blob = new Blob([buffer.buffer],{type: type});

             // blobデータwpFormDataインタフェースに追加
             const data = new FormData();
             data.append('photo', blob, 'image.png'); //photoというkeyで保存
             data.append('lat', this.markerPosition.lat); //latLngというkeyで保存
             data.append('lng', this.markerPosition.lng); //latLngというkeyで保存
             data.append('caption', this.caption); //captionというkeyで保存


            // blobを格納したdataをaxios.postの第二引数にセット
             client.post('/api/photo', data, {
                 headers: { 
                     'content-type': 'multipart/form-data',
                }
             })
             .then((response) => {
                 console.log('success')
                 console.log(response)

             })
             .catch((error) => {
                 new Error(error)
             });
             event.preventDefault();
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


<style scoped>
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