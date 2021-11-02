<template>
     <main class="bg-gray-100 mb-12 sm:w-full md:max-w-md lg:max-w-lg mx-auto p-8 md:p-12 my-5 rounded-lg shadow-2xl">
        <section class="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-5">
            <h3 class="font-bold text-2xl">Register</h3>
            <p class="text-gray-600 pt-2">Insert text here.</p>
        </section>
        <section class="bg-gray-800 rounded-lg py-5 mx-auto">
            <form id="register" class="text-sm m-8 xs:p-4 sm:p-4 md:p-8 lg:p-8" >
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <input class="w-full py-2 px-3 text-black leading-normal rounded" id="name" v-model="state.name" name="name" type="text" placeholder="Name">
                </div>
                  <div>
                        <span v-if="validate.name.$error">
                           {{validate.name.$errors[0].$message}}
                        </span>
                    </div>
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <input class="w-full py-2 px-3 text-black leading-normal rounded" id="email" v-model="state.email" name="email" type="email" placeholder="E-mail Address">
                </div>
                    <div>
                       <span v-if="validate.email.$error">
                         {{validate.email.$errors[0].$message}}
                     </span>
                  </div>
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <input class="w-full py-2 px-3 text-black leading-normal rounded" id="password" v-model="state.password" name="password" type="password" placeholder="Password">
                </div>
                 <div>
                       <span v-if="validate.password.$error">
                         {{validate.password.$errors[0].$message}}
                     </span>
                  </div>
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <!-- <input class="w-full py-2 px-3 text-black leading-normal rounded" id="confirm-password" v-model="c_password" name="password_confirmation" type="password" placeholder="Confirm Password">
                        <span v-if="validate.c_password.$error">
                         {{validate.c_password.$errors[0].$message}}
                     </span> -->
                </div>
                <div class="flex flex-wrap py-2 items-center justify-evenly">
                    <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                        <button class="bg-black hover:bg-white hover:text-black text-white w-full py-2 px-4 rounded" type="button" @click="submitfrom"   >
                          Register
                        </button>
                    </div>
                    <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                        <a class="inline-block align-baseline text-gray-400 hover:text-white" href="#" onclick="document.getElementById('register').reset(); return false;">
                            Clear Form
                        </a>
                    </div>
                </div>
            </form>
        </section>

        <div class="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-5 my-5">
            <p class="text-black">
                Already have an account? <router-link to="/login" class="font-bold hover:underline">Login here</router-link>.
            </p>
        </div>
    </main>     
</template>
<script>
import 'vue-loading-overlay/dist/vue-loading.css';
import useValidate from "@vuelidate/core"
import {required, email,minLength} from "@vuelidate/validators"
import {useStore} from 'vuex'
import {reactive , computed} from "vue"
import { useRouter } from "vue-router";
export default {
   
    setup() {
        const store =useStore()
      const router= useRouter();
         const state = reactive({
          name:'',
           email:'',
           password:'',
        //    c_password:''

      })

       const rules = computed(()=>{
          return{
            name:{required},
            email:{required, email },
            password:{required, minLength:minLength(6) },
            // c_password:{required, sameAs:sameAs(state.password) },
          }
      })

      const validate = useValidate(rules,state);
const resgister = async()=>{
     await store.dispatch('registerModule/register',{name:state.name, email:state.email, password:state.password}).then( response =>{
  if(response.data.status == true){ 
      console.log("arslanbarkat", response.data.status)
      alert(response.data.message)
       router.push("/login");
  }else{
      alert(response.data.message)
      
  }

     },
     error=>{
         console.log("error" , error);
         alert(error.data.error)
     }
     
     )
}

        return{
       state,
       validate,
       resgister,
      }
    },
      methods: {
       submitfrom()
       {
           this.validate.$validate()
           if(!this.validate.$error)
           {
               this.resgister()
           }else{
               alert('from failed validation')
           }
       },
   }, 
}

</script>
<style scoped>

span
{
    color: white;
}
</style>