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
      const slots = this.loadSlotsFromYaml(yamlData.slots)
      const templates = this.loadTemplatesFromYaml(yamlData.templates)

      const jsonData = {
        intents: yamlData.intents ? yamlData.intents : [],
        entities: yamlData.entities ? yamlData.entities : [],
        actions: yamlData.actions ? yamlData.actions : [],
        slots,
        templates
      }

      this.$router.push({ name: 'domain', params: jsonData })
    },

    // Load YAML slots into our JSON format
    loadSlotsFromYaml (yamlSlots) {
      const slots = []

      const keys = Object.keys(yamlSlots)
      for (let key of keys) {
        const slot = yamlSlots[key]
        slots.push({ name: key, ...slot })
      }

      return slots
    },

    // Load YAML templates into our JSON format
    loadTemplatesFromYaml (yamlTemplates) {
      const templates = []
      const templatesKeys = Object.keys(yamlTemplates)

      for (let key of templatesKeys) {
        const templateData = yamlTemplates[key][0]

        let template
        if (typeof templateData === 'object') {
          template = Object.assign(templateData, { name: key })
        } else {
          template = { name: key, text: templateData }
        }

        // WORKAROUND: Delete array data inside template because we cannot handle it yet
        const keys = Object.keys(template)
        for (let key of keys) {
          if (typeof template[key] === 'object') {
            delete template[key]
          }
        }

        templates.push(template)
      }

      return templates
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
