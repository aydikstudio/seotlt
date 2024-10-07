import { createSlice  } from '@reduxjs/toolkit'



export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        value: JSON.parse(localStorage.getItem('news') || '[]'),
    },
    reducers: {
        addNewNews: (state:any, action) => {
            state.value =  addValue(state, action);
        },
        editNews: (state: any, action) => {
            state.value = editValue(state, action);
        },
        deleteNews: (state: any, action) => {
            state.value = deleteValue(state, action);
        },

    },
})

export const { addNewNews, editNews,  deleteNews } = newsSlice.actions

export default newsSlice.reducer

function deleteValue(state:any, action:any) {
    let new_array = [...state.value].filter((item) => item.title != action.payload.title);
    localStorage.setItem('news', JSON.stringify(new_array));
    return new_array;
}


function editValue(state:any, action:any) {
    let obj = action.payload;
    let new_array = [...state.value];
    new_array.map((item) => {
        if(item.title == obj.oldTitle) {
            item.title = obj.title;
            item.description = obj.description;
        }
        return item; 
    });
    localStorage.setItem('news', JSON.stringify(new_array));
    return new_array;
}


function addValue(state:any, action:any) {
    let new_array = [...state.value];
    Object.freeze(action.payload);
    new_array.push(action.payload);
    localStorage.setItem('news', JSON.stringify(new_array));
    return new_array;
}
