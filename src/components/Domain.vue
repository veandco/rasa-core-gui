<template>
  <div id='domain'>
    <!-- Header -->
    <el-row>
      <el-col :span='18' :offset='3'>
        <h2>Domain</h2>
      </el-col>
    </el-row>

    <!-- Intents -->
    <DomainItem title='Intents' :entries='form.intents' />

    <!-- Entities -->
    <DomainItem title='Entities' :entries='form.entities' />

    <!-- Actions -->
    <DomainItem title='Actions' :entries='form.actions' />

    <!-- Slots -->
    <Slots :slots='form.slots' />

    <!-- Templates -->
    <Templates :templates='form.templates' />

    <el-row>
      <el-col :span='18' :offset='3'>
        <el-button @click='onDownload'>Download</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import yaml from 'js-yaml'

import DomainItem from '@/components/domain/DomainItem'
import Slots from '@/components/domain/Slots'
import Templates from '@/components/domain/Templates'
import { EmptyDomain } from '@/classes/Domain'

export default {
  name: 'domain',
  components: {
    DomainItem,
    Slots,
    Templates
  },
  data () {
    const bParamsExist = Object.keys(this.$route.params).length > 0
    return {
      form: bParamsExist ? this.$route.params : EmptyDomain,
      collapseActiveNames: -1
    }
  },

  methods: {
    onDownload () {
      let templates = {}

      // Convert the templates data format to be compatible with the YAML format
      for (let i in this.form.templates) {
        const mainKey = this.form.templates[i].name
        const keys = Object.keys(this.form.templates[i])

        templates[mainKey] = [{}]

        for (let key of keys) {
          const value = this.form.templates[i][key]
          if (mainKey !== value) {
            templates[mainKey][0][key] = value
          }
        }
      }

      // Build the final data format for conversion to YAML format
      const output = {
        intents: this.form.intents,
        entities: this.form.entities,
        actions: this.form.actions,
        slots: this.form.slots,
        templates
      }

      // Convert data to YAML
      const yamlData = yaml.safeDump(output)

      // Initiate download
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(yamlData))
      element.setAttribute('download', 'domain.yml')

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    }
  }
}
</script>

<style>
.box-card {
  margin: 1rem;
}

.operation {
  float: right;
  padding: 3px 0;
}
</style>