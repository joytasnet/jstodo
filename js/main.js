'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_IMPORTANCE = "3"; // 重要度の初期値
    const todoInput = document.querySelector('#todoInput');
    const importance = document.querySelector('#importance');
    const addBtn = document.querySelector('#addBtn');
    const todoList = document.querySelector('#todoList');
    let list = [];

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
    });

    const sortList = () => {
        list.sort((a, b) => b.importanceValue - a.importanceValue);
    };

    todoList.addEventListener('click', (eve) => {
        const li = eve.target.closest('li');
        if (!li) return;

        const idx = parseInt(li.dataset.index, 10);
        if (eve.target.textContent === '完了') {
            list[idx].importanceValue = 0;
            sortList();
            displayList();
        } else if (eve.target.textContent === '削除') {
            list.splice(idx, 1);
            displayList();
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

            const bt1 = document.createElement('button');
            bt1.textContent = '完了';
            li.appendChild(bt1);

            const bt2 = document.createElement('button');
            bt2.textContent = '削除';
            li.appendChild(bt2);

            todoList.appendChild(li);
        });
    };
});