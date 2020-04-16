const inputTitle = document.getElementById('input-title')
const inputText = document.getElementById('input-text')
const output = document.getElementById("output")
const addButton = document.getElementById('button-add')
const attention = document.getElementById('attention')
const deleteButton = document.getElementById('delete')

if (localStorage.length === 0) {
  localStorage.setItem('memo',JSON.stringify([]))
}

/**
 * add title of the new memo and text of the new memo to localStorage.
 * @param {*} title Strings of the title input form.
 * @param {*} text Strings of the text input form.
 */

const preserveToLocalStorage = function (title,text,id) {
  const temp = {title: title, text: text, id:id}
  if (localStorage.getItem('memo') === null) {
    localStorage.setItem('memo',JSON.stringify([temp]))
  } else {
    let memo = JSON.parse(localStorage.getItem('memo'))
    memo.push(temp)
    localStorage.setItem('memo',JSON.stringify(memo))
  }
}

/**
 * load title and text from localStorage and create and show new memo on HTML.
 * @param {*} title Strings of the title input form.
 * @param {*} text Strings of the text input form.
 * @param {*} newMemo boolean. If it is true, memo is to added by addbutton.
 */

const loadFromLocalStorage = function (title,text,id,newMemo) {
  if (localStorage.length !== 0 && newMemo === false) { // do not allow load localStorage if localStorage is null.
    const temp = JSON.parse(localStorage.getItem('memo'))
    for (let i=0;i < temp.length;i++) {
      helploadFormLocalStorage(temp[i].title,temp[i].text,id,false)
    }
  } else if (newMemo === true) { // for add the new memo.
    helploadFormLocalStorage(title,text,id,true)
  }
}

/**
 * Help the LoadFormLocalSorage() and create each id for showing memo on HTML.
 * @param {*} title Strings of the title input form.
 * @param {*} text Strings of the text input form.
 * @param {*} newMemo boolean. If it is true, memo is to added by addbutton.
 */
const helploadFormLocalStorage = function (title,text,id,newMemo) {
  const div = document.createElement('div')
  div.id = id
  const memoTitle = document.createElement('h2')
  const memoText = document.createElement('p')
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.id = id
  if (newMemo) {
    memoTitle.textContent = inputTitle.value
    memoText.textContent = inputText.value
  } else {
  memoTitle.textContent = title
  memoText.textContent = text
  }
  div.append(memoTitle)
  div.append(memoText)
  div.append(deleteButton)
  output.append(div)

  /**
   * this function is to make work delete button added by JavaScript.
   */
  deleteButton.onclick = function () { 
    // Get the id of button
    var e = e || window.event;
    var element = e.target || e.srcElement;
    var buttonId = element.id;
    // Delete the memo be going to been deleted from localStorage.
    removeFromLocalStorage(buttonId)
    // Delete the memo from HTML
    removeAllChildren(div)
  }
}

/**
 * Remove all node children.
 * @param {*} node
 */
const removeAllChildren = function (node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

const removeFromLocalStorage = function (removingId) {
  let memo = JSON.parse(localStorage.getItem('memo'))
  // const index = memo.findIndex( ({ id }) => id === buttonId).getItem('id')
  let index = memo.findIndex( ({ id }) => id === removingId); //一個しかない配列を検索すると-1が帰ってくる?
  if (index === -1) { // この際、-1だったら特別な処理を実装
    console.log('Delte this index item:' + 0)
    const newMemo = memo.splice(0,1)
    localStorage.setItem('memo',JSON.stringify(newMemo))
  } else {
    //  const index = indexOfId(memo,id)
    console.log('Delte this index item:' + index)
    const newMemo = memo.splice(index,1) // なぜかspliceがindex移行の要素を全て削除する。
    localStorage.setItem('memo',JSON.stringify(newMemo))
  }
}

// const isId = function(ids,id) {
//   return ids === id
// }

const indexOfId = function (array,id) {
  for(let i=0;i < array.length;i++) {
    if(array[i].id === id) {
      return i;
    }
  }
  return -1;
}

const getRandomNumber = function () {
  const memo = JSON.parse(localStorage.getItem('memo'))
  const random = Math.floor( Math.random() * 10001 )
  const indexOfObject = memo.findIndex( ({ id }) => id === random )
  if (indexOfObject !== -1) { // If find the id already used in memo.
    console.log('Found the same id.')
    return getRandomNumber()
  } else {
    return String(random)
  }

}

/**
 * Add a new memo to window and localStorage.
 */

addButton.onclick = function () {
  if (inputTitle.value !== "" && inputText.value !== "") {
    const id = getRandomNumber()
    preserveToLocalStorage(inputTitle.value,inputText.value,id)
    loadFromLocalStorage(inputTitle.value,inputText.value,id,true)
  } else { // if the text boxes are empty.
    attention.textContent = "Please, write any sentences in upper textboxes."
  }
}

window.onload = function () {
  loadFromLocalStorage(null,null,null,false)
}