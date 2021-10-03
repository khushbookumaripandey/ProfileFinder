<template>
<div class="main">
<div class="navbar">
<span class="search_items" >
      <input id="searchbar" type="text" placeholder="Search Github Username..." v-model="Name" @keypress="onEnter"/>
      <span>
      <img class="searchbtn" src="../assets/search.svg" alt="SEARCH"  @click="search"  >
      </span>
</span>
</div>
<p style="font-size:40px; display: flex;justify-content: center;"> Welcome To Github Profile Finder</p>
<div class="outer">
    <div class="card">
  <div class="container">
   <div class="image">
    <img  class="avatar" v-if="results.avatar_url" :src="results.avatar_url" >
    </div>
 <div class="row">
  <div class="column">UserId:  {{ results.id }}</div>
  <div class="column">Public Repos:{{ results.public_repos }}</div>
  <div class="column">Followers:{{ results.following }}</div>
  <div class="column">Hireable:{{ results.hireable }}</div>
</div>
  </div>
  <button class="ViewButton">View Details</button>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      Name: '',
      results: '',
      loading: false
    }
  },
  watch: {
    Name: function (val) {
      this.error = ''
    }
  },
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
      if (this.Name) {
        this.loading = true
        console.log('Searching for... ' + this.Name)
        axios.get('https://api.github.com/users/' + this.Name)
          .then(response => {
            console.log(response.data)
            this.results = response.data
            this.loading = false
          }).catch(this.onFailToGetUsers)
      } else {
        this.results = ''
        this.loading = false
      }
    }
  }
}
</script>

<style >
.navbar{
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 60px;
  background-color:#0C164F;
  z-index: 1;
  top: 0;
  margin-top: 0;
}
#searchbar{
  height: 30px;
  width:500px;
  color: black ;
  background-color: white;
  border-radius: 7px;
  border-bottom-left-radius: 7px;
}
.searchbtn{
  margin-top: 2px;
  border-left: 3px solid gray;
  max-width: fit-content;
  height: 32px;
  padding: 0% 1% 0% 1%;
  color: #0C164F;
  background-color: white;
  border-radius: 0px;
  border-bottom-right-radius: 7px;
  border-top-right-radius: 7px;
  margin-left: -5%;
}
.search_items
{
  width: 40%;
  display: flex;
  margin-left: 3%;
}
div {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
   font-weight: 300;
   font-size: 16px; line-height: 1.4;
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
.container {
  padding: 2px 16px;
}
.avatar{
    border-radius:50% ;
    height: 200px;
    width: 200px;
}
.outer {
    width: 100%;
    display: flex;
    justify-content: center;
}
.image{
    width: 100%;
    display: flex;
    justify-content: center;
    margin:2%;
    padding: auto;
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
.ViewButton{
display:inline-block;
padding:0.3em 1.2em;
margin-top: 90%;
border:0.16em solid rgba(255,255,255,0);
border-radius:2em;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
color:black;
text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
text-align:center;
transition: all 0.2s;
background-color:#f14ebd,

}
a.ViewButton:hover{
border-color: rgba(255,255,255,1);
}
@media all and (max-width:30em){
a.ViewButton{
display:block;
margin:0.2em auto;
}

}
</style>
