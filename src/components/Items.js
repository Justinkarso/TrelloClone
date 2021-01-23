import React from 'react'

const Items = ({data, value, handleDelete}) => {

    return (  
        <div>
            {data[value].items.map((item,i) => {
                return (
                    <div key={i}>
                        <p>{item.name}</p>
                        <button onClick={() => handleDelete(item.id, value)}>Delete Item</button>
                    </div>
                )
            })}
        </div>
    );
}
 
export default Items;