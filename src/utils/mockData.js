 export const mockCardList = [
  { 
    id: 0, 
    title: "Welcome to Sticky Do's", 
    content: [
      {
        id: 1,
        type: 'note',
        text: 'This is a standard note. Which is the default when you start typing in our input box ⤴️',
        checked: null
      }
    ]
  },
  { 
    id: 2, 
    title: "Example #2", 
    content: [
      {
        id: 1,
        type: 'list',
        text: 'This is a list item. If you click the ☑️ button in the input box',
        checked: false
      },
      {
        id: 2,
        type: 'list',
        text: 'You can add as many checkList items as you would like!',
        checked: true
      }
    ]
  }
]