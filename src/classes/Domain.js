export const DummyDomain = {
  intents: [
    'greet',
    'goodbye',
    'mood_affirm',
    'mood_deny',
    'mood_great',
    'mood_unhappy'
  ],
  actions: [
    'utter_greet',
    'utter_cheer_up',
    'utter_did_that_help',
    'utter_happy',
    'utter_goodbye'
  ],
  templates: [
    {
      name: 'utter_greet',
      text: 'Hey! How are you?'
    },
    {
      name: 'utter_cheer_up',
      text: 'Here is something to cheer you up:',
      image: 'https://i.imgur.com/nGF1K8f.jpg'
    },
    {
      name: 'utter_did_that_help',
      text: 'Did that help you?'
    },
    {
      name: 'utter_happy',
      text: 'Great carry on!'
    },
    {
      name: 'utter_goodbye',
      text: 'Bye'
    }
  ]
}
