<template>
  <div>
    <!-- Intents -->
    <el-collapse :accordion='true'>
      <el-collapse-item v-for='(intent, j) in story.intents' :name='"intent-" + j' :key='"intent-" + j'>
        <template slot='title'>
            {{ intent.name }} <span style='float: right'><el-button type='danger' icon='el-icon-delete' @click='onIntentDelete(j)'></el-button></span>
        </template>
        <Intent :intent='intent' />
      </el-collapse-item>
    </el-collapse>

    <!-- Create new Intent -->
    <el-row>
      <el-col :span='4'>
        <el-button @click='onIntentNew'>+</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Intent from '@/components/story/Intent'

export default {
  name: 'story',
  props: [ 'story' ],
  components: {
    Intent
  },
  methods: {
    // Create a new intent
    onIntentNew () {
      const name = prompt('What\'s the intent name?')
      if (!name) {
        return
      }

      this.story.intents.push({
        name,
        actions: [],
        entities: []
      })
    },

    // Delete an intent from the list
    // @param i The index of the intent
    onIntentDelete (i) {
      this.story.intents.splice(i, 1)
    }
  }
}
</script>
<style>
</style>