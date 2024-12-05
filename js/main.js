'use strict';

document.addEventListener('DOMContentLoaded',()=>{
    const todoInput=document.querySelector('#todoInput'); 
    const importance=document.querySelector('#importance'); 
    const addBtn=document.querySelector('#addBtn'); 
    const todoList=document.querySelector('#todoList'); 
    let list = [];

    addBtn.addEventListener('click',()=>{
        const todo = todoInput.value.trim(); // 空白を除去してチェック
        if (!todo) {
            alert('Todoを入力してください！');
            return;
        }
        const importanceValue= parseInt(importance.value);
        const item = {todo,importanceValue};
        list.push(item);
        todoInput.value='';
        importance.value="3";
        displayList();

    });
    const finished = (eve)=>{
        const idx = eve.target.closest('li').dataset.index;
        list[idx].importanceValue=0;
        displayList();

    };
    const deleteItem = (eve)=>{
        const idx = eve.target.closest('li').dataset.index;
        list.splice(idx,1);
        displayList();

    };

    const displayList = ()=>{
        list.sort((a,b)=>b.importanceValue - a.importanceValue);
        todoList.innerHTML='';
        list.forEach((item,index)=>{
            const li = document.createElement('li');
            li.dataset.index = index;
            const span = document.createElement('span');
            span.textContent=item.todo;
            if(item.importanceValue === 0){
                span.classList.add('finished');
            }
            li.appendChild(span);
            const bt1 = document.createElement('button');
            bt1.textContent='完了';
            bt1.addEventListener('click',finished);
            li.appendChild(bt1);
            const bt2 = document.createElement('button');
            bt2.textContent='削除';
            bt2.addEventListener('click',deleteItem);
            li.appendChild(bt2);

            todoList.appendChild(li);
        });
    };
});