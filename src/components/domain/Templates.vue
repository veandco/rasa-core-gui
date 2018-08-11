<template>
<el-row>
  <el-col :span='18' :offset='3'>
  <el-card class='box-card'>
    <div slot='header' class='clearfix'>
    <span>Templates</span>
    <el-button class='operation' type='text' @click='onTemplateNew'>+</el-button>
    </div>
    <el-collapse :accordion='true'>
    <el-collapse-item v-for='(template, i) in templates' :title='template.name' :name='template.name' :key='template.name'>
      <template slot='title'>
      {{ template.name }} <span style='float: right'><el-button type='danger' icon='el-icon-delete' @click='onTemplateDelete(i)'></el-button></span>
      </template>
      <el-form ref='form' label-width='120px'>
      <el-form-item v-for='(value, key) in templates[i]' :label='key' :key='key'>
        <el-row>
        <el-col :span='12'>
          <el-input v-model='templates[i][key]'></el-input>
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
</template>

<script>
import Vue from 'vue'

export default {
  name: 'templates',
  props: [ 'templates' ],
  methods: {
    // Create a new template
    onTemplateNew () {
      const name = prompt('What\'s the template name?')
      if (!name) {
        return
      }

      this.templates.push({ name })
    },

    // Delete existing template
    onTemplateDelete (i) {
      this.templates.splice(i, 1)
    },

    // Create a new template item
    onTemplateItemNew (i) {
      const key = prompt('What\'s the field name?')
      if (!key) {
        return
      }

      Vue.set(this.templates[i], key, 'value')
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
      Vue.delete(this.templates[i], key)

      // Count the number of keys in the template item
      // When it reaches zero, delete the whole item
      const numberOfKeys = Object.keys(this.templates[i]).length
      if (numberOfKeys <= 0 || key === 'name') {
        this.templates.splice(i, 1)
      }
    }
  }
}
</script>
<style>
</style>