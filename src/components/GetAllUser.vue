<template>
  <div class="container">
    <div class="navbar">
      <span class="search_items">
        <input
          id="searchbar"
          type="text"
          placeholder="Search Github Username..."
          v-model="Login"
          @keypress="onEnter"
          @change="search()"
        />
        <span>
          <img
            class="searchbtn"
            src="../assets/search.svg"
            alt="SEARCH"
            @click="search"
          />
        </span>
      </span>
    </div>
    <div class="outer">
    <div class="column1" v-if="results.length">
    <div  class="column1row1" v-if="results.length">
        <img class="image" v-if="results[0].avatar_url" :src="results[0].avatar_url" >
    </div>
    <div class="column1row2" v-if="results.length">
        <div><u><h3 style="color:black">Followers:</h3></u>
         <h2><b>{{ results[0].followers }}</b></h2></div>
        <div><u><h3 style="color:black">Following:</h3></u>
        <h2><b>{{ results[0].following }}</b></h2></div>
    </div>
    </div>
    <div class="column2" v-if="results.length">
        <div class="row1" v-if="results.length">
           User Login:
            <div class="ans">{{results[0].login}}</div>
            </div>
        <div class="row2" v-if="results.length">
            <span>
          Number of Public Repository:
            <div class="ans">{{results[0].public_repos}}</div>
            </span>
            <span>
            Number Of Public Gists:
            <div class="ans">{{results[0].public_gists}}</div>
            </span>
        </div>
        <div class="row3" v-if="results.length">
           UserId:
           <div class="ans">
           {{results[0].id}}</div></div>
        <div class="row4" v-if="results.length">
             User Name:
             <div class="ans">{{results[0].name}}</div></div>
        </div>
    </div>
    </div>

</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      results: [],
      loading: false,
      Login: ''
    }
  },
  watch: {
    Login: function (val) {
      this.search()
    }
  },
  props: ['users'],
  methods: {
    onFailToGetUsers (results) {
      console.log(results)
      this.$alert('User Not Found :)')
    },
    onEnter (e) {
      if (e.key === 'Enter') {
        this.search()
      }
    },
    search: function () {
      if (this.Login) {
        console.log('Searching for... ' + this.Login)
        axios.get('https://api.github.com/users/' + this.Login)
          .then((response) => {
            console.log(response.data)
            this.results = [response.data]
            this.loading = false
          })
          .catch(this.onFailToGetUsers)
      } else {
        this.results = ''
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.v{
    height: 2vh;
    margin-top: 4vh;
    color: black;
}
.val {
    margin-top: 4vh;
}
.mystye {
    color: black;
    margin-top: 6vh;
}
.navbar {
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: #141d55;
  z-index: 1;
  top: 0;
  margin-top: 0;
}
#searchbar {
  height: 4vh;
  width: 40vw;
  color: black;
  background-color: white;
  border-radius: 5%;
}
.searchbtn {
  border-left: 1% solid gray;
  max-width: fit-content;
  height: 4.5vh;
  padding: 0% 1% 0% 1%;
  color: #0c164f;
  background-color: white;
  border-radius: 10%;
  margin-left: -5%;
}
.search_items {
  width: 40%;
  display: flex;
  margin-left: 3%;
}
.outer {
    display: flex;
    flex-wrap: wrap;
    justify-content:space-evenly;
    margin-top: 5%;
}
.image{
    height: 50vh;
    width: 35vw;
    position: sticky;
    border-radius:50%;
}

.column {
 display: flex;
 justify-content: center;
 float: left;
  width: 50%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
.card {
     position: sticky;
     display: flex;
    justify-content: space-around;
    align-items: center;
    width:400px;
    margin: 5%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    height: 500px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.login{
margin-right: 80%;
margin-top: 90%;
}
.column1{
    position: sticky;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    min-height: 100%;
    background: #7F7FD5;
background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);

}
.column2{
    justify-content: center;
     min-height:100%;
     display:flex;
     flex-direction: column;
     justify-content: space-evenly;
     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
     transition: 0.3s;
     background: #7F7FD5;
background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);

}
.row1{
    padding: 0.5%;
    margin: 5%;
    font-size:large;
    font-weight:bold
}
.row2{
    padding: 0.5%;
    margin: 3%;
    font-size:large;
    font-weight:bold;
    display: flex;
    justify-content: space-evenly;
}
.row3{
    font-size:large;
    font-weight:bold;
    padding: 0.5%;
    margin: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.row4{
    font-size:large;
    font-weight:bold;
    padding: 0.5%;
    margin: 3%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.column1row1{
    display: flex;
    justify-content: center;
    min-height: 74vh;

}
.column1row2{
    display: flex;
    justify-content: space-around;
}
.ans{
    font-size:large;
    font-weight:bold
}

</style>
