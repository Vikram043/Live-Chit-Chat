const socket = io('wss://peppermint-nervous-baritone.glitch.me/',{transports:["websocket"]});


const form=document.getElementById("form")
const messagIp=document.getElementById("messageIn")
const msg=document.querySelector(".container")

const append=(message,position)=>{
    const msgel=document.createElement("div")
    msgel.innerText=message;
    msgel.classList.add('message')
    msgel.classList.add(position)
    msg.append(msgel)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message=messagIp.value
    append(`You :${message}`,"right")
    socket.emit('send',message)
    messagIp.value=''
})
const name=prompt("Enter your name to join")
socket.emit("new-user",name);


socket.on("userjoined",name=>{
    append(`${name} joined the chat` ,"right")
})

socket.on("receive",data=>{
    append(`${data.name} :${data.message}` ,"left")
})


socket.on("leave",name=>{
    append(`${name} left the chat`,"left")
})