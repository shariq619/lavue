<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <h2>Login</h2>

                <p class="text-danger" v-if="error">{{ error }}</p>


                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" class="form-control" id="email" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import { reactive,ref } from 'vue'
import { useRouter } from "vue-router"
import axios from 'axios';

export default{
    setup(){
        const router = useRouter()

        let form = reactive({
            email: '',
            password: ''
        });

        let error = ref('')

        const login = async() =>{
            await axios.post('/api/login',form).then(res=>{
                if(res.data.success){
                    localStorage.setItem('token',res.data.data.token)
                    router.push({name:'Dashboard'})
                }
            }).catch(e=>{
                error.value = e.response.data.message
            })
        }

        return{
            form,
            login,
            error
        }
    }
}
</script>
