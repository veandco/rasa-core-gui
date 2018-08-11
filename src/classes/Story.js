export const DummyStories = [
  {
    name: 'Make Reservation #1',
    intents: [
      {
        name: 'greet',
        actions: [
          'utter_ask_howcanhelp'
        ],
        entities: []
      },
      {
        name: 'inform',
        actions: [
          'utter_on_it',
          'utter_ask_location'
        ],
        entities: [
          {
            name: 'cuisine',
            value: 'italian'
          }
        ]
      },
      {
        name: 'inform',
        actions: [
          'utter_ask_numpeople'
        ],
        entities: [
          {
            name: 'location',
            value: 'paris'
          }
        ]
      }
    ]
  }
]

export const EmptyStory = {
  name: '',
  intents: []
}
