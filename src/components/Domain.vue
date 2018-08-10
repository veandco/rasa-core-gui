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

    <!-- Actions -->
    <DomainItem title='Actions' :entries='form.actions' />

    <!-- Templates -->
    <el-row>
      <el-col :span='18' :offset='3'>
        <el-card class='box-card'>
          <div slot='header' class='clearfix'>
            <span>Templates</span>
            <el-button class='operation' type='text' @click='onTemplateNew'>+</el-button>
          </div>
          <el-collapse v-model='collapseActiveNames' :accordion='true'>
            <el-collapse-item v-for='(template, i) in form.templates' :title='template.name' :name='template.name' :key='template.name'>
              <template slot='title'>
                {{ template.name }} <span style='float: right'><el-button type='danger' icon='el-icon-delete' @click='onTemplateDelete(i)'></el-button></span>
              </template>
              <el-form ref='form' :model='form' label-width='120px'>
                <el-form-item v-for='(value, key) in form.templates[i]' :label='key' :key='key'>
                  <el-row>
                    <el-col :span='12'>
                      <el-input v-model='form.templates[i][key]'></el-input>
                    </el-col>
                    <el-col :span='6'>
                      <el-button class='button' type='danger' icon='el-icon-delete' @click='onTemplateDelete(i, key)'></el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-button @click='onTemplateItemNew(i)'>+</el-button>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Vue from 'vue'

import { DummyDomain } from '@/classes/Domain'
import DomainItem from '@/components/domain/DomainItem'

export default {
  name: 'domain',
  components: {
    DomainItem
  },
  data () {
    return {
      form: DummyDomain,
      collapseActiveNames: -1
    }
  },
  methods: {
    // Create a new template
    onTemplateNew () {
      const name = prompt('What\'s the template name?')
      if (!name) {
        return
      }

      this.form.templates.push({ name })
    },

    // Delete existing template
    onTemplateDelete (i) {
      this.form.templates.splice(i, 1)
    },

    // Create a new template item
    onTemplateItemNew (i) {
      const key = prompt('What\'s the field name?')
      if (!key) {
        return
      }

      Vue.set(this.form.templates[i], key, 'value')
    },

    // Delete existing template item
    onTemplateItemDelete (i, key) {
      // If we're deleting the field name (key), we ask whether or not
      // the user wants to delete the whole item
      let shouldDeleteItem = false
      if (key === 'name') {
        shouldDeleteItem = confirm('By deleting the name, you will delete the item. Do you want to proceed?')
      }

      // If the user doesn't want to proceed deleting the name, we return early
      if (!shouldDeleteItem) {
        return
      }

      // Remove the field from the template item
      Vue.delete(this.form.templates[i], key)

      // Count the number of keys in the template item
      // When it reaches zero, delete the whole item
      const numberOfKeys = Object.keys(this.form.templates[i]).length
      if (numberOfKeys <= 0 || key === 'name') {
        this.form.templates.splice(i, 1)
      }
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