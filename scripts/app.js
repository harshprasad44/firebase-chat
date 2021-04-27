//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});


//update username
newNameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //Show then hide the update message
    const mssg = `Your name changed to ${newName}`;
    updateMssg.innerText = mssg;
    setTimeout(() => updateMssg.innerText = '', 3000)
});

//update the chatroom
rooms.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

//check localstorage for name
const username = localStorage.username ? localStorage.username : 'anonymous';

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
});