<template>
  <div>
    <!-- Actions -->
    <strong><p>Actions</p></strong>
    <el-row v-for='(action, i) in intent.actions' :key='"action-" + i'>
      <el-col :span='4'>
        <el-input v-model='intent.actions[i]'></el-input>
      </el-col>
      <el-col :span='4'>
        <div class='buttons'>
        <el-button type='danger' icon='el-icon-delete' @click='onActionDelete(i)'></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='4'>
        <el-button @click='onActionNew'>+</el-button>
      </el-col>
    </el-row>
  
    <!-- Entities -->
    <strong><p>Entities</p></strong>
    <el-row v-for='(entity, i) in intent.entities' :key='"entity-" + i'>
      <el-col :span='4'>
        <el-input v-model='intent.entities[i].name'></el-input>
      </el-col>
      <el-col :span='1'>
        <i class='el-icon-caret-right' />
      </el-col>
      <el-col :span='4'>
        <el-input v-model='intent.entities[i].value'></el-input>
      </el-col>
      <el-col :span='4'>
        <div class='buttons'>
        <el-button type='danger' icon='el-icon-delete' @click='onEntityDelete(i)'></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='4'>
        <el-button @click='onEntityNew'>+</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'intent',
  props: [ 'intent' ],
  methods: {
    // Create a new action for specific story and intent
    onActionNew () {
      const name = prompt('What\'s the action name?')
      if (!name) {
        return
      }

      this.intent.actions.push(name)
    },

    // Delete a action from specific story and intent
    // @param i The index of action
    onActionDelete (i) {
      this.intent.actions.splice(i, 1)
    },

    // Create a new entity for specific story and intent
    onEntityNew () {
      const name = prompt('What\'s the entity name?')
      if (!name) {
        return
      }

      const value = prompt('What\'s the entity value?')
      if (!value) {
        return
      }

      this.intent.entities.push({ name, value })
    },

    // Delete a entity from specific story and intent
    // @param i The index of entity
    onEntityDelete (i) {
      this.intent.entities.splice(i, 1)
    }
  }
}
</script>
<style>
</style>