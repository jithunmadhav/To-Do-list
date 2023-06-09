import React, { useEffect } from 'react';
import './App.css';
import {useState} from 'react'
 

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  const handleDelete = (id) => {
    console.log(id
      );
    if(window.confirm("Are you sure to continue")){
      const newTodo = todos.filter((item, index) => item.id !== id);
      console.log(newTodo);
      localStorage.setItem('todos', JSON.stringify(newTodo))
      setTodos(newTodo);
    }
  
};
 
  
useEffect(() => {
  if (localStorage.getItem("todos")) {
    //key from handlesum
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }
}, [])
  return (
    <div className="app">
      <div className="mainHeading">
        <h1 style={{ marginTop: "12px"}}>Todo App</h1>
      </div>
      <div className="subHeading">
        <br />
       
      </div>
      <div className="input">
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder="Add items" />
        <i onClick={()=>{
          if(todo!=="" && todo.trim()!==""){
            setTodos([...todos,{id:Date.now(),text:todo,status:false}])
            localStorage.setItem('todos',JSON.stringify([...todos,{id:Date.now(),text:todo,status:false}]))

          setTodo("")
          }
          
          }} className="fas fa-plus"></i>
          
      </div>
      <div className="todos">
        {todos.map((value)=>{
          return(<div className="todo">
          <div className="left">
            <input onChange={(e)=>setTodos(todos.filter(value2=>{
              if(value2.id===value.id){
              value2.status=e.target.checked;
              }
              return value2;
            }))} value={value.status} className='ch3' type="checkbox" name="" id="" />
            <p>{value.text}</p>
          </div>
          <div className="right">
            <i onClick={()=> handleDelete(value.id)} className="fas fa-times"></i>
          </div>
        </div>)
        })}
      
      </div>
      <div className='completedTodo'>
      <h1 style={{ color:'black'}}>Task Completed</h1>
      {todos.map((value)=>{
        if(value.status){
        
          return(<h3 style={{ color:'white' }}>{value.text}</h3>) 
        }else{
          return null
        }
      })}
      </div>
      <div className='pendingTodo'>
      <h1 style={{ color:'black'}}>Task pending</h1>
      {todos.map((value)=>{
        if(value.status){
          return null
        }else{
          return(<h3 style={{ color:'white' }}>{value.text}</h3>) 
        }
      })}
      </div>
    </div>
  );
}

export default App;