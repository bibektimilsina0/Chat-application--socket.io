const socket=io()

const message=document.getElementById('messages');
const form=document.getElementById('form');
const inputMessage=document.getElementById('input')
form.onsubmit=(e)=>{
    e.preventDefault()
 console.log("bob")
};
const user_nm='bibek'
socket.emit('new-user-connected',user_nm)