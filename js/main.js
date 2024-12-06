'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_IMPORTANCE = "3";
    const todoInput = document.querySelector('#todoInput'); 
    const importance = document.querySelector('#importance'); 
    const addBtn = document.querySelector('#addBtn'); 
    const todoList = document.querySelector('#todoList'); 
    let list=[];

    // LocalStorageからリストを読み込む
    const loadList = () => {
        const savedList = localStorage.getItem('todoList');
        list = savedList ? JSON.parse(savedList) : [];
    };

    // リストをLocalStorageに保存する
    const saveList = () => {
        localStorage.setItem('todoList', JSON.stringify(list));
    };

    addBtn.addEventListener('click', () => {
        const todo = todoInput.value.trim();
        if (!todo) {
            alert('Todoを入力してください！');
            return;
        }
        const importanceValue = parseInt(importance.value);
        const item = { todo, importanceValue };
        list.push(item);
        todoInput.value = '';
        importance.value = DEFAULT_IMPORTANCE;
        sortList();
        displayList();
        saveList(); 
    });

    const sortList = () => {
        list.sort((a, b) => b.importanceValue - a.importanceValue);
    };

    todoList.addEventListener('click', (eve) => {
        const idx = eve.target.closest('li').dataset.index;
        if (eve.target.textContent === '完了') {
            list[idx].importanceValue = 0;
            sortList();
            displayList();
            saveList(); 
        } else if (eve.target.textContent === '削除') {
            list.splice(idx, 1);
            displayList();
            saveList(); 
        }
    });

    const displayList = () => {
        todoList.innerHTML = '';
        list.forEach((item, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            const span = document.createElement('span');
            span.textContent = item.todo;
            if (item.importanceValue === 0) {
                span.classList.add('finished');
            }
            li.appendChild(span);
            
            // 重要度に応じた星の表示
            const importanceSpan = document.createElement('span');
            importanceSpan.textContent = '★'.repeat(item.importanceValue);;
            li.appendChild(importanceSpan);

            const bt1 = document.createElement('button');
            bt1.textContent = '完了';
            li.appendChild(bt1);
            const bt2 = document.createElement('button');
            bt2.textContent = '削除';
            li.appendChild(bt2);

            todoList.appendChild(li);
        });
    };

    loadList();
    sortList();
    displayList();
});
