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
      // Build the final data format for conversion to YAML format
      const output = {
        intents: this.form.intents,
        entities: this.form.entities,
        actions: this.form.actions,
        slots: this.saveSlotsIntoYaml(this.form.slots),
        templates: this.saveTemplatesIntoYaml(this.form.templates)
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
    },
    saveSlotsIntoYaml (slots) {
      let yamlSlots = {}

      // Convert the slots data format to be compatible with the YAML format
      for (let i in slots) {
        const slot = slots[i]
        const slotName = slot.name
        const slotFields = Object.keys(slot)

        yamlSlots[slotName] = {}

        for (let field of slotFields) {
          const value = slot[field]
          if (slotName !== value) {
            yamlSlots[slotName][field] = value
          }
        }
      }

      return yamlSlots
    },
    saveTemplatesIntoYaml (templates) {
      let yamlTemplates = {}

      // Convert the templates data format to be compatible with the YAML format
      for (let i in templates) {
        const template = templates[i]
        const templateName = template.name
        const templateFields = Object.keys(template)

        yamlTemplates[templateName] = [{}]

        for (let field of templateFields) {
          const value = template[field]
          if (templateName !== value) {
            yamlTemplates[templateName][0][field] = value
          }
        }
      }

      return yamlTemplates
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