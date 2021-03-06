const heading = document.getElementById('lesson-heading')
const subheading = document.getElementById('lesson-subheading')
heading.textContent = 'ChatRoom App'
subheading.textContent = 'Based on JS Mediator Pattern'

const addUserBtn = document.getElementById('add-user')
const fromUser = document.getElementById('from-user')
const dropdownFrom = document.getElementById('dropdown-from')
const dropdownTo = document.getElementById('dropdown-to')
const dropdownMenu = document.querySelector('.dropdown-menu')
const toUser = document.getElementById('to-user')
const allUsers = document.getElementById('all-users')
const selectAllUsers = document.getElementById('select-all-users')
const messageList = document.getElementById('message-list')
const submit = document.getElementById('submit')
const messageField = document.getElementById('message')

submit.addEventListener('click', function(e) {
  let message = messageField.value
  let from = fromUser.textContent.toLowerCase().trim()
  let to = toUser.textContent.toLowerCase().trim()
  if(from === 'from') {
    console.log('from user not selected')
  }
  if(to === 'to') {
    console.log('to user not selected')
  }
  if(selectAllUsers.checked) {
    console.log('selectAllUsers checked')
  } else {
//
  }
  // console.log(from, to)
  chatroom.send(message, eval(from), eval(to))
  // sendMessage()
  // chatroom.send(message, window[fromUser.textContent], jeff)

  clearMessage()

  e.preventDefault()
})

dropdownFrom.addEventListener('click', function(e) {
  console.log('dropdownFrom', e.target.textContent)
  fromUser.textContent = e.target.textContent
})
dropdownTo.addEventListener('click', function(e) {
  console.log('dropdownTo', e.target.textContent)
  toUser.textContent = e.target.textContent
})

function clearMessage() {
  messageField.value = ''
  messageField.focus()
}




// allUsers.childNodes[3].style.color = 'white'
// console.log(allUsers.childNodes)


// Allows us to subscribe/unsubscribe for events
// can notify DOM of elements to update

// const insert = document.getElementById('insertion-point')
// const content = ''

// insert.innerHTML = content

// class UserES6 {
//   constructor(name) {
//     this.name = name
//     this.chatroom = null
//   }

//   send(message, to) {
//     this.chatroom.send(message, this, to)
//   }

//   receive(message, from) {
//     console.log(`From ${from.name} to ${this.name}: ${message}`)
//   }
// }

const UserES5 = function(name) {
  this.name = name
  this.chatroom = null // no current chatroom by default
}

UserES5.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to)
    // this = from user
  },
  receive: function(message, from) {
    console.log(`From ${from.name} to ${this.name}: ${message}`)
    // this = to user
    messageList.innerHTML += `
    <li class="list-group-item">From ${from.name} to ${this.name}: ${message}</li>`
  }
}

// the chatroom is the mediator object, the users are colleagues

const ChatRoom = function() {
  let users = {} // list of users

  return {
    register: function(user) {
      // colleagues have to register with the mediator
      users[user.name] = user
      user.chatroom = this // set to current chatroom
      let dropdownItem = document.createElement('li')
      dropdownItem.className = 'dropdown-item'
      dropdownItem.textContent = user.name
      dropdownFrom.appendChild(dropdownItem)
      let dropdownItem2 = document.createElement('li')
      dropdownItem2.className = 'dropdown-item'
      dropdownItem2.textContent = user.name
      dropdownTo.appendChild(dropdownItem2)
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


const chatroom = new ChatRoom()


function addUser(name) {
    this.name = new UserES5(name)
    chatroom.register(this.name)
}
addUser('x')

const brad = new UserES5('Brad')
const jeff = new UserES5('Jeff')
const sara = new UserES5('Sara')
const michael = new UserES5('Michael')
// const mike = new UserES6('Mike')
// const melissa = new UserES6('Melissa')
// const kaya = new UserES6('Kaya')


chatroom.register(brad)
chatroom.register(jeff)
chatroom.register(sara)
// chatroom.register(mike)
// chatroom.register(kaya)
// chatroom.register(melissa)

function sendMessage() {
  console.log(message)
  chatroom.send(message.value, brad, jeff)
}

// brad.send('Hi there Jeff', jeff)
// sara.send('Yo Brad, whatsup?', brad)
// jeff.send('Hey everyone, how\'s it going?')
// // mike.send('I love you baby!', kaya)