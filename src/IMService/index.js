import _ from 'lodash'

let IMStorage

function getFromDB () {
  try {
    IMStorage = JSON.parse(localStorage.getItem('kandy-IM-Storage'))
  } catch (err) {
    console.log(err)
  }
}

function existConversation (conversationId) {
  return _.find(IMStorage, i => {
    return i.conversationId === conversationId
  })
}

function saveFirstRecord (newConv) {
  try {
    IMStorage.push(newConv)
    localStorage.setItem('kandy-IM-Storage', JSON.stringify(IMStorage))
  } catch (err) {
    console.log(err)
  }
}

function saveNewConv (newConv) {
  try {
    IMStorage.push(newConv)
    localStorage.setItem('kandy-IM-Storage', JSON.stringify(IMStorage))
  } catch (err) {
    console.log(err)
  }
}

function saveExistingConv (conv) {
  let storageDeep = _.cloneDeep(IMStorage)
  let index = _.findIndex(storageDeep, c => {
    return c.conversationId === conv.conversationId
  })
  if (index > -1) {
    try {
      let last = _.last(conv.messages)
      storageDeep[index].messages.push(last)
      localStorage.setItem('kandy-IM-Storage', JSON.stringify(storageDeep))
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('Error saving the conv')
  }
}

const IMService = {
  saveMessage: (msg) => {
    if (IMStorage) {
      let conversation = existConversation(msg.conversationId)
      if (conversation) {
        saveExistingConv(msg)
      } else {
        saveNewConv(msg)
      }
    } else {
      let firstConv = {
        conversationId: msg.conversationId,
        messages: msg.messages
      }
      IMStorage = []
      saveFirstRecord(firstConv)
    }
  },
  getMessages: () => {
    getFromDB()
    return IMStorage
  }
}

export default IMService
