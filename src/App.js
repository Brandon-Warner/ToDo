import React, { useState } from 'react';

const App = () => {
    const [listItem, setListItem] = useState('');
    const [list, setList] = useState([]);
    console.log('listItem: ', listItem);
    console.log('list: ', list);

    const submit = e => {
        e.preventDefault();

        const newListItem = {
            id: Math.random().toString(),
            content: listItem,
            completed: false
        };

        const newList = [...list, newListItem];
        setList(newList);
    };

    const toggleCompleted = id => {
        const newList = [...list];
        const itemToChange = newList.find(i => i.id === id);
        itemToChange.completed = !itemToChange.completed;
        console.log('itemToChange: ', itemToChange);

        const listWithFoundItemReplaced = newList.map(i => i.id === id ? itemToChange : i);
        console.log('listWithFoundItemReplaced: ', listWithFoundItemReplaced);

        setList(listWithFoundItemReplaced);
    };
    return (
        <div>
            <h1>ToDo Checklist</h1>

            <form onSubmit={submit}>
                <input type='text' onChange={e => setListItem(e.target.value)} />
                <button type='submit'>add item</button>
            </form>

            <div>
                <ul>
                    {list.map(l => (
                        <li key={l.id}>
                            {l.content}
                            <input
                                type='checkbox'
                                checked={l.completed}
                                onChange={() => toggleCompleted(l.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
