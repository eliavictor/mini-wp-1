<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <i class="fab fa-google" style="margin-right: 5px;"></i> SignIn
  </g-signin-button>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '82170727512-0kklq3qc62h3rst15akd6bee9tf9vr15.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
        const profile = googleUser.getBasicProfile()// etc etc
        const idToken= googleUser.getAuthResponse().id_token
        axios({
            url: `http://35.240.235.62:3000/users/gsignin`,
            type: 'post',
            data: {
                idToken
            }
        })
        .then(function(data){
            localStorage.setItem('userId', data.id)
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('name', data.name)
            isLogin()
        })
        .catch(function(err){
            console.log(err)
        })
    },
    onSignInError (error) {
        console.log('OH NOES', error)
    }
  }
}
</script> 
 
<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style> 