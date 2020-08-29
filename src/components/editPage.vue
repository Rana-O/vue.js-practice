<template>
    <div id="editPage">
        <header>
            <p>EDIT PAGE</p>
            <router-link to="/">Go To Top Page</router-link>
            <div>
                <p v-if="v">あ</p>
                <p v-else>い</p>
            </div>
        
        </header>
        <div class="edit-container">
            <div class="card">
                <div clss="card-heder">Make a Pin</div>
                
                <div class="card-body">
                    <div class="pram-group row">
                        <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                        <div class="col-md-6">
                            <input id="photo" type="file" class="param-control-file" name="photo" value="">
                        </div>
                    </div>
                    <!--もしphotoがあればlocationを出す -->
                    <div class="pram-group row">
                        <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>
                        <div class="col-md-6">
                            <input id="location" type="" class="param-control-file" name="location" value="">
                        </div>
                    </div>
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
            value: false
        }
    },

    computed: {
        v() {
            return !this.value
        }
    }
})
</script>


<style>
#editPage {
    margin: 50px;
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