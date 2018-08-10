<template>
  <div class='main-menu'>
    <el-button @click='onCreateNewDomain'>Create new Domain</el-button>
    <el-button>Create new Story</el-button>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
  data () {
    return {

    }
  },
  methods: {
    onCreateNewDomain () {
      this.$router.push('/domain/new')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
