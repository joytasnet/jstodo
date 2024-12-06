'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('#todoInput'); 
    const importance = document.querySelector('#importance'); 
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

    importance.addEventListener('change', () => {
        const todo = todoInput.value.trim();
        if (!todo) {
            alert('Todoを入力してください！');
            importance.value="0";
            return;
        }
        const importanceValue = parseInt(importance.value);
        const item = { todo, importanceValue };
        list.push(item);
        todoInput.value = '';
        importance.value = 0;
        sortList();
        displayList();
        saveList(); 
    });

    const sortList = () => {
        list.sort((a, b) => b.importanceValue - a.importanceValue);
    };


    const checkedListener = (eve) => {
        const li = eve.target.closest('li')
        const idx = li.dataset.index;
        list.splice(idx, 1);
        li.animate(
            {
                opacity:[1,0],
                translate:[0,"10px"],
            },
            {
                duration:600,
                easeing:"ease",
                fill:"forwards"
            }
        ).finished.then(()=>{
            li.style.display = 'none';
            displayList();
            saveList(); 
        });
    };

    const displayList = () => {
        todoList.innerHTML = '';
        list.forEach((item, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            const cb = document.createElement("input");
            cb.type="checkbox";
            cb.addEventListener("change",checkedListener);
            li.appendChild(cb);
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

            todoList.appendChild(li);
        });
    };

    loadList();
    sortList();
    displayList();
});
