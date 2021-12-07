import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const App = () => {
    const [listItem, setListItem] = useState('');
    const [list, setList] = useState([]);
    console.log('listItem: ', listItem);
    console.log('list: ', list);

    const textInput = useRef();
    const focusTextInput = () => textInput.current.focus();

    const submit = e => {
        e.preventDefault();

        const newListItem = {
            id: Math.random().toString(),
            content: listItem,
            completed: false
        };

        const newList = [...list, newListItem];
        setListItem('');
        setList(newList);
    };

    const toggleCompleted = id => {
        const newList = [...list];
        const itemToChange = newList.find(i => i.id === id);
        itemToChange.completed = !itemToChange.completed;
        console.log('itemToChange: ', itemToChange);

        const listWithFoundItemReplaced = newList.map(i => (i.id === id ? itemToChange : i));
        console.log('listWithFoundItemReplaced: ', listWithFoundItemReplaced);

        setList(listWithFoundItemReplaced);
    };

    const removeItem = id => {
        const newList = [...list];
        const listWithItemRemoved = newList.filter(i => i.id !== id);
        console.log('listWithItemRemoved: ', listWithItemRemoved);

        setList(listWithItemRemoved);
    };

    return (
        <Container>
            <HeaderContainer>
                <h1>ToDo Checklist</h1>
            </HeaderContainer>

            <Form onSubmit={submit}>
                <ListInput
                    type='text'
                    value={listItem}
                    ref={textInput}
                    onChange={e => setListItem(e.target.value)}
                />
                <AddButton type='submit' onClick={focusTextInput}>add item</AddButton>
            </Form>

            <ItemListContainer>
                <List>
                    {list.map(l => (
                        <ListItem key={l.id}>
                            {l.content}
                            <input
                                type='checkbox'
                                checked={l.completed}
                                onChange={() => toggleCompleted(l.id)}
                            />
                            {l.completed ? (
                                <DeleteButton onClick={() => removeItem(l.id)}>delete</DeleteButton>
                            ) : null}
                        </ListItem>
                    ))}
                </List>
            </ItemListContainer>
        </Container>
    );
};

const Container = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-color: papayawhip;
`;

const HeaderContainer = styled.div`
    text-align: center;
    padding: 1em 0;
`;

const Form = styled.form`
    margin: 0 auto;
    padding: 1em;
    width: 80%;
    background-color: #efefef;
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
`;

const ItemListContainer = styled(HeaderContainer)`
    margin: 0 auto;
    padding: 1em;
    border-radius: 10px;
    border: 1px solid black;
    width: 80%;
`;

const List = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
`;

const ListItem = styled.li`
    padding: 5px;
    display: inline-block;
`;

const ListInput = styled.input`
    margin: 0 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 20px;
`;

const Button = styled.button`
    padding: 3px 1em;
    border-radius: 5px;
    border: none;
    font-weight: bold;
`;

const AddButton = styled(Button)`
    background-color: #5283ba;
    color: #fefefe;
    transition: 500ms background-color, 500ms color;
    &:hover {
        color: #5283ba;
        background-color: #efefef;
        cursor: pointer;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #b8515b;
    color: #fefefe;
    transition: 500ms background-color, 500ms color;
    margin: 0 5px;
    &:hover {
        color: #b8515b;
        background-color: papayawhip;
        cursor: pointer;
    }
`;

export default App;
