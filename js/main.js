'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('#todoInput'); 
    const importanceContainer = document.querySelector('#importanceContainer'); 
    const importanceItems = document.querySelectorAll('input[name="importance"]');
    const todoList = document.querySelector('#todoList'); 
    let list=[];

    todoInput.focus();
    importanceContainer.style.display = 'none'; // 重要度を有効にする

    todoInput.addEventListener('change', () => {
        // Todo入力があった場合、重要度をenabledにし、フォーカスを当てる
        if (todoInput.value.trim() !== "") {
            importanceContainer.style.display = ''; // 重要度を有効にする
            importanceItems.forEach((item)=>{
                item.checked=false;
            });
            importanceItems[0].focus(); // 少し遅れてフォーカス
        } else {
            importanceContainer.style.display = 'none'; // Todoが空の場合、重要度を無効にする
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

    /*
    importanceItems.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            const todo = todoInput.value.trim();
            const importanceValue = e.target.value;
            const item = { todo, importanceValue };
            list.push(item);
            todoInput.value = '';
            todoInput.focus();
            importanceContainer.style.display = 'none'; // Todoが空の場合、重要度を無効にする
            sortList();
            displayList();
            saveList(); 
  });
});
*/

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
    document.addEventListener('keydown', (event) => {
    const focused = document.activeElement; // 現在フォーカスされている要素
    if( event.key === 'Enter' && importanceContainer.style.display !== 'none'){
        const todo = todoInput.value.trim();
        const importanceValue = document.querySelector('input[name="importance"]:checked').value;
        const item = { todo, importanceValue };
        list.push(item);
        todoInput.value = '';
        todoInput.focus();
        
        importanceContainer.style.display = 'none'; // Todoが空の場合、重要度を無効にする
        sortList();
        displayList();
        saveList(); 
    }
    if (focused && focused.type === 'radio') {
        const radios = document.querySelectorAll(`input[name="${focused.name}"]`);
        const currentIndex = Array.from(radios).indexOf(focused);
        let newIndex = currentIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % radios.length; // 次の要素
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            newIndex = (currentIndex - 1 + radios.length) % radios.length; // 前の要素
        }

        radios[newIndex].focus();
        radios[newIndex].checked = true; // 必要ならチェック状態も変更
        event.preventDefault(); // 既定の矢印キー挙動を無効化
    }
});

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
