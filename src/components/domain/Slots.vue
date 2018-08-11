<template>
    <el-row>
      <el-col :span='18' :offset='3'>
        <el-card class='box-card'>
          <div slot='header' class='clearfix'>
            <span>Slots</span>
            <el-button class='operation' type='text' @click='onSlotNew'>+</el-button>
          </div>
          <el-collapse :accordion='true'>
            <el-collapse-item v-for='(slot, i) in slots' :title='slot.name' :name='slot.name' :key='slot.name'>
              <template slot='title'>
                {{ slot.name }} <span style='float: right'><el-button type='danger' icon='el-icon-delete' @click='onSlotDelete(i)'></el-button></span>
              </template>
              <el-form ref='form' label-width='120px'>
                <el-form-item v-for='(value, key) in slots[i]' :label='key' :key='key'>
                  <el-row>
                    <el-col :span='12'>
                      <el-input v-model='slots[i][key]'></el-input>
                    </el-col>
                    <el-col :span='6'>
                      <el-button class='button' type='danger' icon='el-icon-delete' @click='onSlotDelete(i, key)'></el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-button @click='onSlotItemNew(i)'>+</el-button>
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
  name: 'slots',
  props: [ 'slots' ],
  methods: {
    // Create a new slot
    onSlotNew () {
      const name = prompt('What\'s the slot name?')
      if (!name) {
        return
      }

      this.slots.push({
        name,
        type: 'text'
      })
    },

    // Delete existing slot
    onSlotDelete (i) {
      this.slots.splice(i, 1)
    },

    // Create a new slot item
    onSlotItemNew (i) {
      const key = prompt('What\'s the field name?')
      if (!key) {
        return
      }

      Vue.set(this.slots[i], key, 'value')
    },

    // Delete existing slot item
    onSlotItemDelete (i, key) {
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

      // Remove the field from the slot item
      Vue.delete(this.slots[i], key)

      // Count the number of keys in the slot item
      // When it reaches zero, delete the whole item
      const numberOfKeys = Object.keys(this.slots[i]).length
      if (numberOfKeys <= 0 || key === 'name') {
        this.slots.splice(i, 1)
      }
    }
  }
}
</script>
<style>
</style>