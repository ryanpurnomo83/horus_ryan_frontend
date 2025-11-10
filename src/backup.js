  /*
  async login(credentials) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`, 
        credentials
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async register(userData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`, 
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  <!--
<script>
    export default{
        name: 'Login',
        methods: {
            goToRegister(){
                this.$router.push({ name: 'Register' });
            }
        }
    }
</script>-->
  */
