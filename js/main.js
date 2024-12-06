'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('#todoInput'); 
    const importance = document.querySelector('#importance'); 
    const todoList = document.querySelector('#todoList'); 
    let list=[];

    todoInput.focus();
    importance.disabled = true;

    todoInput.addEventListener('change', () => {
        // Todo入力があった場合、重要度をenabledにし、フォーカスを当てる
        if (todoInput.value.trim() !== "") {
            importance.disabled = false; // 重要度を有効にする
            importance.focus(); // 重要度セレクトボックスにフォーカス
        } else {
            importance.disabled = true; // Todoが空の場合、重要度を無効にする
        }
    });

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
        const importanceValue = parseInt(importance.value);
        const item = { todo, importanceValue };
        list.push(item);
        todoInput.value = '';
        importance.value = 0;
        todoInput.focus();
        importance.disabled=true;
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
