const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul")
// ローカルストレージからデータを取得
const todos = JSON.parse(localStorage.getItem("todos") );

// Todosが空でなかったら、liタグを追加
if(todos){
  todos.forEach (todo => {
    add(todo);
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

// テキストエリアの入力
function add(todo) {
  let todoText = input.value
// もしTODOがあったときは、TODOテキストにTODOの値を入れる。
  if(todo){
    todoText = todo.text;
  }

  if (todoText) {
    // 以下でも可能（JSが自動でデータ型を変換する）
    // if (todoText.length > 0) {  
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if(todo && todo.completed){
      li.classList.add("text-decoration-line-through")
    }

    // 右クリックのイベントを追加
    li.addEventListener("contextmenu", function
    (event){
      // 右クリックで出現するデフォルトを削除
      event.preventDefault();
      // データの削除
      li.remove();
      // ローカルストレージにも反映
      saveData();
    });

    // 左クリックしたら取り消し線をつける
    li.addEventListener("click", function(){
      li.classList.toggle("text-decoration-line-through");
      saveData();
    })

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll('li')
  // 新しい配列の中にまとめる。→ローカルストレージに格納するのに配列の方が楽
  let todos = []
  // ループを使用しliタグの配列情報を全て取得する。
  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    };
    todos.push(todo);
  });
  // リロードしてもデータが消えないようにする。
  // ローカルストレージに保存する(JSONにした方が扱いが楽)
  localStorage.setItem("todos", JSON.stringify(todos));
}
