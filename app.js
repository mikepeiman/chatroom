const heading = document.getElementById('lesson-heading')
const subheading = document.getElementById('lesson-subheading')
heading.textContent = 'ChatRoom App'
subheading.textContent = 'Based on JS Mediator Pattern'

// Allows us to subscribe/unsubscribe for events
// can notify DOM of elements to update

// const insert = document.getElementById('insertion-point')
// const content = ''

insert.innerHTML = content

const UserES5 = function(name) {
  this.name = name
  this.chatroom = null
}

UserES5.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to)
  },
  receive: function(message, from) {
    console.log(`From ${from.name} to ${this.name}: ${message}`)
  }
}

class UserES6 {
  constructor(name) {
    this.name = name
    this.chatroom = null
  }

  send(message, to) {
    this.chatroom.send(message, this, to)
  }

  receive(message, from) {
    console.log(`From ${from.name} to ${this.name}: ${message}`)
  }
}


const ChatRoom = function() {
  let users = {} // list of users

  return {
    register: function(user) {
      users[user.name] = user
      user.chatroom = this
    },
    send: function(message, from, to) {
      if(to) {
        // single user message
        to.receive(message, from)
      } else {
        // group message
        for(key in users) {
          if(users[key] !==  from) {
            users[key].receive(message, from)
          }
        }
      }
    }
  }
}

const brad = new UserES5('Brad')
const jeff = new UserES5('Jeff')
const sara = new UserES5('Sara')
const mike = new UserES6('Mike')
const melissa = new UserES6('Melissa')
const kaya = new UserES6('Kaya')

const chatroom = new ChatRoom()

chatroom.register(brad)
chatroom.register(jeff)
chatroom.register(sara)
chatroom.register(mike)
chatroom.register(kaya)
chatroom.register(melissa)

brad.send('Hi there Jeff', jeff)
sara.send('Yo Brad, whatsup?', brad)
jeff.send('Hey everyone, how\'s it going?')
mike.send('I love you baby!', kaya)