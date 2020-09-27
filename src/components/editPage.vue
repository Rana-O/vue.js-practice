<template>
    <div id="editPage">
        <header>
            <p>EDIT PAGE HEADER</p>
            <router-link to="/">Go To Top Page</router-link>
        </header>
        <div class="page-container">
            <div class="container">
                <form>
                    <div class="element-container">
                        <div class="setPhoto">
                            <div class="icon">
                                <label id="photo">
                                    <input type="file" v-on:change="onFileChanged">
                                    <div v-if="closeIcon">
                                    <fontAwesomeIcon class="imagesIcon" icon="images" />
                                    <p class="element-name">写真を選択</p>
                                    </div>
                                </label>
                            </div>
                            <canvas id="canvas" height="0"></canvas>
                        </div>
                        
                    </div>
                    <!-- もしphotoがあれば地図を出す -->
                    <div v-if="hasPhoto">
                        <div class="element-container">
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
                            <p class="element-name">位置情報を設定</p><br>
                        </div>
                        <div class="element-container">
                            <div class="caption">
                                <textarea class="" v-model="caption"></textarea>
                            </div>
                            <p class="element-name">キャプションを追加</p>
                        </div>
                        <div class="element-container"> 
                            <button class="btn" @click="onSubmit($event)">送信</button>
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
            center: { lat: 35.657553, lng: 139.697377 },
            zoom: 10,
            markerPosition: {
                lat: 35.657553,
                lng: 139.697377
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
            let canvasWidth = 350;
            let canvasHeight = 262.5;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            let ctx = canvas.getContext('2d');

            let reader = new FileReader();
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


            // blobを格納したdataとアクセストークンをaxios.postの第二引数にセット
            const accessToken = "hoge";
            console.log ('CHECK!!!');
             client.post('/api/photo', data, {
                 headers: { 
                     'Content-Type': 'multipart/form-data',
                     'Authorization': `Bearer ${accessToken}`

                }
             })
             .then((response) => {
                 console.log('success')
                 console.log(response)

             })
             .catch((error) => {
                 new Error(error)
                 console.log ('CHECK in catch!!!');
                 console.log (error);
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
        },

        closeIcon() {
            if (this.photo) {
                return false
            } else {
                return true
            }
        }
    }
})
</script>
<style scoped>

#editPageMap {
    margin: auto;
  height: 270px;
  width: 350px;
  text-align: center;
}

.container {
    flex-direction: column;
    text-align: center;
}

.element-container {
    margin: 30px 0;
}

label input {
     display: none;
}

.imagesIcon {
    width: 200px;
    height: 150px;
    margin: 7px;
    background-color: #e9ecef;
    color: #495057;
    padding: 10px;
    border-radius: 5px;
    cursor:pointer;
}

textarea {
    width: 350px;
    height: 70px;
}

.btn {
    padding: 10px 25px;
    margin: 10px;
    background-color: #e9ecef;
    color: #495057;
    border-radius: 5px;
    cursor:pointer;
}

</style>