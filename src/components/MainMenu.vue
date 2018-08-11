<template>
  <div class='main-menu'>
    <el-row>
      <el-col :span='6' :offset='6'>
        <!-- New Domain -->
        <el-button class='button' @click='onDomainNew'>New Domain</el-button>

        <!-- Load Domain -->
        <label class='el-button' for='domain-file'>
          <input id='domain-file' type='file' @change='onDomainLoad'/>
          Load Domain
        </label>

      </el-col>
      <el-col :span='6'>

        <!-- New Story -->
        <el-button class='button'>New Story</el-button>

        <!-- Load Story -->
        <el-button class='button'>Load Story</el-button>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import yaml from 'js-yaml'

import { EmptyDomain } from '@/classes/Domain'

export default {
  name: 'main-menu',
  data () {
    return {

    }
  },
  methods: {
    onDomainNew () {
      this.$router.push({ name: 'domain', params: EmptyDomain })
    },
    onDomainLoad (e) {
      const files = e.target.files
      const reader = new FileReader()

      reader.addEventListener('load', (e) => {
        this.loadYaml(e.target.result)
      })
      reader.readAsText(files[0])
    },
    loadYaml (data) {
      const yamlData = yaml.safeLoad(data)
      const templates = []
      const templatesKeys = Object.keys(yamlData.templates)

      for (let key of templatesKeys) {
        const template = Object.assign(yamlData.templates[key][0], { name: key })
        templates.push(template)
      }

      const jsonData = {
        intents: yamlData.intents ? yamlData.intents : [],
        entities: yamlData.entities ? yamlData.entities : [],
        actions: yamlData.actions ? yamlData.actions : [],
        slots: yamlData.slots ? yamlData.slots : [],
        templates: templates
      }

      this.$router.push({ name: 'domain', params: jsonData })
    }
  }
}
</script>

<style scoped>
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

input[type='file'] {
  display: none;
}
</style>
