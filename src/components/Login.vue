<template>
    <main class="bg-gray-100 mb-12 sm:w-full md:max-w-md lg:max-w-lg mx-auto p-8 md:p-12 my-5 rounded-lg shadow-2xl">
        <section class="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-5">
            <h3 class="font-bold text-2xl">Login</h3>
        </section>
        <section class="bg-gray-800 rounded-lg py-5 mx-auto">
            <form id="login" class="text-sm m-8 xs:p-4 sm:p-4 md:p-8 lg:p-8" >
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <input class="w-full py-2 px-3 text-black leading-normal rounded" id="email"  name="email" v-model="state.email" type="email" placeholder="E-mail Address">
                </div>
                    <div>
                       <span v-if="validate.email.$error" class="text-white">
                         {{validate.email.$errors[0].$message}}
                     </span>
                  </div>
                <div class="relative border rounded mb-4 shadow appearance-none label-floating">
                    <input class="w-full py-2 px-3 text-black leading-normal rounded" id="password"  name="password" v-model="state.password" type="password" placeholder="Password">
                </div>
                 <div>
                       <span v-if="validate.password.$error" class="text-white">
                         {{validate.password.$errors[0].$message}}
                     </span>
                  </div>
                <div class="flex flex-wrap py-2 items-center justify-evenly">
                    <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                        <button class="bg-black hover:bg-white hover:text-black text-white w-full py-2 px-4 rounded" type="button" @click="loginfrom"   >
                          Login
                        </button>
                    </div>
                    <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                        <a class="inline-block align-baseline text-gray-400 hover:text-white" href="#" onclick="document.getElementById('login').reset(); return false;">
                            Clear Form
                        </a>
                    </div>
                </div>
            </form>
        </section>

        <div class="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-5 my-5">
            <p class="text-black">
            Create your new account ? <router-link to="/register" class="font-bold hover:underline"> Signup here</router-link>.
            </p>
        </div>
    </main>     
</template>
<script>
import { useRouter } from "vue-router";
import useValidate from "@vuelidate/core"
import {required, email} from "@vuelidate/validators"
import {useStore} from 'vuex'
import {computed, reactive} from "vue"
export default {
    setup() {
        const router =useRouter();
        const store =useStore();
        const state = reactive({
           email:'',
           password:'',
      })
       const rules = computed(()=>{
          return{
            email:{required, email },
            password:{required,},
          }
      })

       const validate = useValidate(rules,state);

const login = async()=> {
        await store.dispatch("registerModule/login", {email:state.email, password:state.password}).then( response => {
            console.log("login", response)
            if(response.data.status)
            {
            router.push("/todolist");
            }else
            {
                alert(response.data.message)
            }
          
          },
          error => {  
           console.log("error", error);
           alert(error.data.error)
          }
        )
      
    }


         return{
       state,
       validate,
       login
      }
    },
    methods: {
       loginfrom()
       {
           this.validate.$validate()
           if(!this.validate.$error)
           {
              this.login()
           }else{
               alert('from failed validation')
           }
       },
   }, 
}
</script>
<style scoped>

</style>