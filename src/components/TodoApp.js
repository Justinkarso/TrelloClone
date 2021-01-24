import React, { useState } from 'react';
import Items from './Items';
import styled from 'styled-components'

const TodoApp = styled(({className}) => {
  const listsRef = React.useRef()
  const [listValue, setListValue] = useState('')
  const [lists, setLists] = useState([
    {
      name: 'Backlog',
      items: [
        {
          label: 'Get milk',
          editable: false
        }
      ]
    }
  ])

  const handleCreateList = () => {
    const newLists = [...lists]
    const list = {
      name: listValue,
      items: []
    }
    newLists.push(list)
    setLists(newLists)
    setListValue('')
  }

  const handleRemoveList = (i) => {
    const newLists = [...lists]
    newLists.splice(i, 1)
    setLists(newLists)
  }

  const handleAddItem = (listIndex) => {
    const newLists = [...lists]
    const listItems = newLists[listIndex].items

    // Check if there are items that are editable, if so we remove those
    // so the user can only edit one item at the same time.
    listItems.forEach((listItem, j) => {
      if (listItem.editable) {
        handleRemoveItem(listIndex, j)
      }
    })

    listItems.push({
      label: '',
      editable: true
    })

    newLists[listIndex].items = listItems
    setLists(newLists)
  }

  const handleCommitItem = (e, listIndex, itemIndex) => {
    const newLists = [...lists]
    newLists[listIndex].items[itemIndex] = {
      label: e.target.label.value,
      editable: false 
    }
    setLists(newLists)
  }

  const handleRemoveItem = (listIndex, itemIndex) => {
    const newLists = [...lists]
    newLists[listIndex].items.splice(itemIndex, 1)
    setLists(newLists)
  }

  React.useEffect(() => {
    if (listsRef.current) {
      const editableItems = Array.from(listsRef.current.querySelectorAll('.editable input'))
      if (editableItems.length > 0) {
        editableItems[0].focus()
      }
    }
  }, [lists, listsRef.current])

  return ( 
    <div className={className}>
      <div className='create-item'>
        <h1>Realm Manager</h1>
        <div className='add-todo'>
          <input
            type='text'
            placeholder='List Name'
            value={listValue}
            onChange={(e) => setListValue(e.target.value)}
            required
          />
          <button onClick={handleCreateList}>Create New List</button>
        </div>
      </div>
      <div className='lists' ref={listsRef}>
        {lists.map((list, i) => {
          return(
            <div className='list' key={i}>
              <div className='list-header'>
                <p>{list.name}</p>
                <button onClick={() => handleRemoveList(i)}>X</button>
              </div>
              <div className='list-content'>
                {list.items.map((item, j) => {
                  if (item.editable) {
                    return <div key={j} className='item editable'>
                      <form onSubmit={(e) => handleCommitItem(e, i, j)}>
                        <input type='text' name='label' />
                        <div className='item-actions'>
                          <button type='submit'>Save</button>
                          <button onClick={() => handleRemoveItem(i, j)}>Cancel</button>
                        </div>
                      </form>
                    </div>
                  }
                  return <div key={j} className='item'>
                    <span>{item.label}</span>
                    <button onClick={() => handleRemoveItem(i, j)}>x</button>
                  </div>
                })}
              </div>
              <div className='list-footer'>
                <button className='add-item-button' onClick={() => handleAddItem(i)}>+</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
})`
  .create-item {
    display: flex;
    flex-direction: row;
    background: #333;
    padding: 0 50px;
    height: 65px;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    color: #fefefe;
  }

  .lists {
    width: auto;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 50px;
    
    .list {
      background: #333;
      width: 285px;
      margin-top: 30px;
      margin-right: 20px;
      display:flex;
      flex-direction: column;
      color: #fefefe;
      border-radius: 3px;

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, .1);

        button {
          width: 32px;
          height: 32px;
          border-radius: 3px;
          outline: 0;
          border: 0;
          cursor: pointer;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .list-content {
        padding: 8px;
        
        input,
        button {
          padding: 4px;
          outline: 0;
          border: 0;
          border-radius: 3px;
        }

        button {
          cursor: pointer;
        }

        .item {
          background-color: white;
          color: black;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          border-radius: 3px;

          &:last-of-type {
            margin: 0;
          }

          span {
            font-size: 14px;
            padding: 8px;
            width: 100%;
          }

          form {
            width: 100%;
            display: flex;
            justify-content: space-between;
          
            input {
              width: 100%;
              padding: 8px;
            }
          }

          .item-actions {
            display: flex;
            margin-left: auto;
          }
        }
      }

      .list-footer {
        padding: 8px;
        border-top: 1px solid rgba(255, 255, 255, .1);

        .add-item-button {
          width: 32px;
          height: 32px;
          border-radius: 3px;
          outline: 0;
          border: 0;
          cursor: pointer;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`
 
export default TodoApp;