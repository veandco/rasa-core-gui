<template>
  <el-row class='domain-item'>
    <el-col :span='18' :offset='3'>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>{{ title }}</span>
          <el-button class='operation' type='text' @click='onNew'>+</el-button>
        </div>
        <div v-for='(entry, i) in entries' :key='i'>
          <el-row>
            <el-col :span='6'>
              <span v-if='editingIndex !== i'>{{ entry }}</span>
              <input type='text' v-model='entries[i]' v-else />
            </el-col>
            <el-col :span='12'>
              <el-button class='button' type='secondary' @click='onEdit(i)' icon='el-icon-edit'></el-button>
              <el-button class='button' type='danger' @click='onDelete(i)' icon='el-icon-delete'></el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'domain-item',
  props: [ 'title', 'entries' ],
  data () {
    return {
      editingIndex: -1
    }
  },
  methods: {
    // Create a new domain item (e.g. intent, action)
    onNew () {
      const name = prompt('What\'s the name?')
      if (!name) {
        return
      }

      this.entries.push(name)
    },

    // Switch to / from editing mode
    onEdit (index) {
      const bStartEditing = this.editingIndex !== index
      if (bStartEditing) {
        this.editingIndex = index
      } else {
        this.editingIndex = -1
      }
    },

    // Delete existing domain item
    onDelete (index) {
      this.entries.splice(index, 1)
    }
  }
}
</script>

<style>
.button {
  margin: .5rem;
  padding: .5rem;
}
</style>