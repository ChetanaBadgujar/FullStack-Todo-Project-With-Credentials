import React from 'react'

const TodoItem = ({title,description, isCompleted,updateHandler,deleteHandler,id}) => {
  return (
    <div className="todo">
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        
        </div>
        <div>
            <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)}/>
            <button className='btn' onClick={() => deleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem