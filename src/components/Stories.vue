<template>
  <div id='story'>
    <!-- Header -->
    <el-row>
      <el-col :span='18' :offset='3'>
        <h2>Stories</h2>

        <!-- Stories -->
        <el-collapse :accordion='true'>
          <el-collapse-item v-for='(story, i) in stories' :name='story.name' :key='i'>
            <template slot='title'>
              <strong>{{ story.name }}</strong>
              <span style='float: right'><el-button type='danger' icon='el-icon-delete' @click='onStoryDelete(i)'></el-button></span>
            </template>
            <Story :story='story' />
          </el-collapse-item>
        </el-collapse>

      </el-col>
    </el-row>

    <el-row>
      <el-col :span='18' :offset='3'>
        <el-button @click='onStoryNew'>+</el-button>
      </el-col>
    </el-row>

    <!-- Download -->
    <el-row>
      <el-col :span='18' :offset='3'>
        <el-button @click='onDownload'>Download</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { DummyStories } from '@/classes/Story'
import Story from '@/components/story/Story'

export default {
  name: 'stories',
  components: {
    Story
  },
  data () {
    const bParamsExist = Object.keys(this.$route.params).length > 0
    return {
      stories: bParamsExist ? this.$route.params : DummyStories
    }
  },
  methods: {
    // Create a new story
    onStoryNew () {
      const name = prompt('What\'s the story name?')
      if (!name) {
        return
      }

      this.stories.push({ name, intents: [] })
    },

    // Delete a story from the list
    // @param i The index of the story
    onStoryDelete (i) {
      this.stories.splice(i, 1)
    },

    onDownload () {

    }
  }
}
</script>
<style scoped>
.buttons {
  margin: 0 .5rem;
}
</style>
