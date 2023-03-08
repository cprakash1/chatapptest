// Headers('Access-Control-Allow-Origin : *')

const socket=io('http://127.0.0.1:8000')

const form=document.getElementById('form')
const messageinp=document.getElementById('cp1')
const messageinput=document.getElementById('cp2')
const submit=document.getElementById('submit')

const append = (message,position)=>{
    const messageelement=document.createElement('div')
    messageelement.innerText=message;
    messageelement.classList.add('message')
    messageelement.classList.add(position);
    messageinp.append(messageelement);
}

const name=prompt('Enter Name :')
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})
socket.on('recieve',data=>{
    append(`${data.name} : ${data.message}`,'left')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = ''
})

