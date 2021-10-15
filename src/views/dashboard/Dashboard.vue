<template>
<!-- Modal -->
    <transition name="fade">
        <div v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="d-block">Edit Profile Anda</h6>
                            <button type="button" @click="showModal = false" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>*Amankan akun anda sekarang!</p>
                            <form action="">
                                <div class="form-group">
                                    <label for="">Nama</label>
                                    <input type="text" class="form-control" v-model="dataProfile.name">
                                </div> 
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="email" class="form-control" v-model="dataProfile.email">
                                </div>
                                <div class="form-group">
                                    <label for="">No Hp</label>
                                    <input type="number" class="form-control">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                            <button type="submit" class="btn btn-primary" @click="updateProfile">{{ state.loading ? 'Loading...' : 'Save changes' }}</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
 <!-- Breadcrumb Begin -->
    <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <router-link :to="{name : 'home'}"><i class="fa fa-home"></i> Home</router-link>
                        <span>Dashboard</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->
    <section class="section-dashboard" v-if="!state.showLoaderData">
        <div class="container-fluid mt-5 mb-5">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                         <div class="card-body">
                            <div class="list-group list-group-flush">
                                <a class="list-group-item list-group-item-action active">
                                    Dashboard
                                </a>
                                <router-link :to="{ name : 'cart'}"  class="list-group-item list-group-item-action ">
                                    <i class="mdi mdi-cart"></i> My Cart
                                </router-link>
                                <router-link :to="{ name : 'order' }" class="list-group-item list-group-item-action "><i class="mdi mdi-clipboard"></i> My Order</router-link>
                                <router-link :to="{ name : 'wishlist' }" class="list-group-item list-group-item-action"><i class="mdi mdi-heart"></i> Favorite</router-link>
                                <a href="" @click.prevent="logout" class="list-group-item list-group-item-action"> Logout</a>
                                <!-- <a href="#" class="list-group-item list-group-item-action"><span class="mdi mdi-account-card-details"></span> All Transaction</a> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="mb-2"><b>Profil Saya</b></h5>
                            <p>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun 
                                <a href="" @click.prevent="openModal">Ubah data <i class="mdi mdi-pencil"></i></a>
                            </p>
                            <hr>
                            <div class="row" style="font-size:14px">
                                <div class="col-md-8" style="border-right:1px dotted #e9e9e9">
                                    <table class="table">
                                        <tr>
                                            <th>Email</th>
                                            <td></td>
                                            <td>{{ dataProfile.email }}</td>
                                        </tr>
                                        <tr>
                                            <th>Nama</th>
                                            <td></td>
                                            <td>{{ dataProfile.name }}</td>
                                        </tr>
                                        <tr>
                                            <th>No Hp</th>
                                            <td></td>
                                            <td>0837435237</td>
                                        </tr>
                                        <tr>
                                            <th>Bergabung</th>
                                            <td></td>
                                            <td>21-05-2021</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-img-right text-center">
                                        <div class="img-profile  text-center" style="width:100%;margin:0 auto">
                                            <!-- <img src="/img/default_toped-23.jpg" alt="" style="border-radius:100%;"> -->
                                            
                                            <img :src="state.image != null ? state.image : '/img/default_toped-23.jpg'" alt="" style="border-radius:100%;
                                                    width: 125px;
                                                    object-fit: cover;
                                                    height: 125px;">
                                        </div>
                                            <!-- <img :src="state.image" alt=""> -->
                                            <div class="text-title-img mt-3">
                                                <p class="text-muted" style="font-size:10px">Besar file: maksimum 2MB. Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                                            </div>
                                            <input type="file" id="file" class="inputfile" @change="uploadImage">
                                            <label for="file" class="style-button">Choose a file</label>
				
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

     <section class="section-dashboard" v-else>
        <div class="container-fluid mt-5 mb-5">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                         <div class="card-body">
                            <div class="list-group list-group-flush">
                                <div class="custom-text-loader mb-2" style="padding-top:20px"></div>
                                <div class="custom-text-loader mb-2" style="padding-top:20px"></div>
                                <div class="custom-text-loader mb-2" style="padding-top:20px"></div>
                                <div class="custom-text-loader mb-2" style="padding-top:20px"></div>
                                <!-- <a href="#" class="list-group-item list-group-item-action"><span class="mdi mdi-account-card-details"></span> All Transaction</a> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="mb-2 custom-text-loader" style="width:20%"></h5>
                            <p class="custom-text-loader " style="width:60%">
                            </p>
                            <hr>
                            <div class="row" style="font-size:14px">
                                <div class="col-md-8" style="border-right:1px dotted #e9e9e9">
                                   
                                    <div class="custom-text-loader mb-3" style="padding-top:13px;width:90%"></div>
                                    <div class="custom-text-loader mb-3" style="padding-top:13px;width:70%"></div>
                                    <div class="custom-text-loader mb-3" style="padding-top:13px;width:60%"></div>
                                    <div class="custom-text-loader mb-3" style="padding-top:13px;width:85%"></div>

                                </div>
                                <div class="col-md-4">
                                    <div class="content-img-right text-center">
                                        <div class="img-profile  text-center" style="width:100%;margin:0 auto">
                                            <!-- <img src="/img/default_toped-23.jpg" alt="" style="border-radius:100%;"> -->
                                          <div class="custom-text-loader justify-content-center" style=" border-radius:100%;width: 125px;
                                                    object-fit: cover;
                                                    height: 125px;
                                                    margin: 0 auto;">
                                        
                                          </div>
                                        </div>
                                            <!-- <img :src="state.image" alt=""> -->
                                            <div class="text-title-img mt-3 mb-2">
                                                <p class="custom-text-loader" style="margin: 0 auto;"></p>
                                            </div>
                                            <div class="custom-text-loader" style="width:50%;margin: 0 auto;"></div>
				
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted,computed,reactive,ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Api from '@/api/Api';
// import $ from 'jQuery';

export default {
    setup(){

        const store = useStore();

        const router = useRouter();

        const state = reactive({
            image    : null,
            preview  : null,

            loading  : false,
            showLoaderData : true
        });

        const dataProfile = reactive({
            name  : '',
            email : '',
            phone : '',
        });

        const showModal = ref(false);

        const imageFile = ref('');

        function logout(){
            store.dispatch('auth/logout')

            .then(() => {
                router.push({ name : 'login' });
                location.reload();
            })
        }
       
        const checkEmail = computed(() => store.state.auth.checkEmail);

        const checkEmailVerified = onMounted(async() => {
            console.log(checkEmail.value);
            await store.dispatch('auth/checkEmailVerified')
            .then(() => {
                console.log('success')
            })
            .catch((error) => {
                console.log(error);
                if(!checkEmail.value){
                    router.push({name : 'verification-email'});
                }   
            })

            
        })
        const openModal = () => {
            Api.get('/customer/info')
            .then((response) => {
                showModal.value = true;

                dataProfile.name = response.data.user.name;
                dataProfile.email = response.data.user.email;

            })
            .catch((error) => {
                console.log(error);
            })
            // $('#exampleModal').modal('show');
        }
        
        const updateProfile = async () => {
            state.loading = true;

            await Api.put('/customer/update',{
                name    : dataProfile.name,
                email   : dataProfile.email 
            })
            .then((response) => {
                state.loading = false;
                showModal.value = false;
                dataProfile.name = response.data.user.name;
                dataProfile.email = response.data.user.email;
            })
            .catch((error) => {
                state.loading = false;
                console.log(error);
            })
        }

        const uploadImage = async (event) => {

            imageFile.value = event.target.files[0];

            const data  = new FormData();

            if(imageFile.value.size <= 2148000){
                
                data.append('image', imageFile.value)
                
                await Api.post('/customer/profile/image/update',data)
                .then(() => {
                    state.image = URL.createObjectURL(event.target.files[0]);

                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else{
                alert('image tidak boleh lebih dri 2mb');
            }
        }
        
        const loadProfile = onMounted(() => {
            state.showLoaderData = true;
            
            Api.get('/customer/info')
            .then((response) => {
                state.showLoaderData = false;
                dataProfile.name = response.data.user.name;
                dataProfile.email = response.data.user.email;

                state.image = response.data.user.image ? response.data.user.image : null;
            })
            .catch((error) => {
                state.showLoaderData = false;
                console.log(error);
            })
        });

        return {
            logout,
            checkEmailVerified,
            uploadImage,
            state,
            loadProfile,
            openModal,
            showModal,
            dataProfile,
            updateProfile
        }
    }
}
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  z-index: 9999;
  transition: opacity 0.5s ease;
}
/* 
.fade-enter-from {
  opacity: 0;
  z-index: 9999;
} */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.74);
  display: table;
  /* transition: opacity .3s ease; */
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.style-button{
    padding:8px 40px;
    background: #ca1515;
    color:white;
    cursor: pointer;
}
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
    /* font-size:  */
    font-weight: 700;
    /* color: white;
    background-color: black; */
    display: inline-block;
}

/* .inputfile:focus + label,
.inputfile + label:hover {
    background-color: red;
} */

.table td, .table th{
    border:none;
}
.list-group-flush .list-group-item{
    font-size:13px;
}
.list-group-item.active{
    border-radius: 5px;
    background-color: #ca1515;
    border-color: #f44336;
}
.card{
    border:0;
    /* box-shadow: -17px 18px 41px #0000000d; */
    border-radius: 4px;
}
.section-dashboard .img-header img{
    width: 100%;
    height: 100%;
    border-radius: 0%;
}
.section-dashboard .img-header span{
    font-size:10px;
    margin-left: 3px;
    font-weight: bold;
    color:#ca1515;
}
</style>