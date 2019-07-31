const inputField = document.forms['myForm'].input_search;
const suggestionsDiv = document.getElementById('div_suggestions');
const suggestionsUl = document.getElementById('ul_suggestions');
const data = ['ctt', 'hello', 'JavaScript', 'cccc', 'text', 'cdcddcd', 'dfrgc'];

// 找到输入相关的匹配项
function findSuggestions(suggestions) {
    let results = '';
    let value = inputField.value;
    if(value.length) {
        suggestions.forEach(item => {
            if(item.includes(value)) {
                let startIndex = item.indexOf(value);
                results += `<li>${item.slice(0, startIndex)}<span style="color: blue">${value}</span>${item.slice(startIndex + value.length)}</li>`;
            }
        })
        setSuggestions(results)
    }else {
        clearSuggestions();
    }

    inputField.onfocus = function() {
        setSuggestions(results); // 输入框获取焦点时，显示suggestion内容
    }
    inputField.onblur = function() {
        clearSuggestions(); // 输入框失去焦点时，清除suggestion下拉提示框
    }
}

// 渲染匹配到的选项
function setSuggestions(results) {
    clearSuggestions();
    if(results) {
        suggestionsDiv.className = "show";
        suggestionsUl.innerHTML = results;
        // suggestionsUl.onclick= function(e) {
        //     handleClick(e);
        // }
    }

}
// 清除上一次匹配到的数据
function clearSuggestions() {
    let childNodes = suggestionsUl.childNodes;
    for(let i = childNodes.length - 1; i >= 0; i--) {
        suggestionsUl.removeChild(childNodes[i]);
    }
    suggestionsDiv.className = 'hide';
}

function keyEvent(e) {
    let suggestions = suggestionsUl.children;
    if(e.keyCode === 40) { // 向下
        moveDown(suggestions);
    }else if(e.keyCode === 38) { // 向上
        moveUp(suggestions);
    }else {
        findSuggestions(data);
        selectSuggestionIndex = -1;
    }
}

let selectSuggestionIndex = -1; // 匹配选项索引值，初始化为未选中状态
function moveDown(suggestions) {
    if(selectSuggestionIndex <= -1) { // 最开始加载页面
        suggestions[selectSuggestionIndex + 1].setAttribute('style', 'background-color: white');  // 将上面一个元素设置为白色背景
    }else {
        suggestions[selectSuggestionIndex].setAttribute('style', 'background-color: white');  // 将上面一个元素设置为白色背景
    }
    selectSuggestionIndex++;
    if(selectSuggestionIndex == suggestions.length) {
        selectSuggestionIndex = 0;
    }
    suggestions[selectSuggestionIndex].setAttribute('style', 'background-color: #ebebeb');
    inputField.value = suggestions[selectSuggestionIndex].innerText;
}

function moveUp(suggestions) {
    if(selectSuggestionIndex <= -1) { // 最开始加载页面
        suggestions[selectSuggestionIndex + 1].setAttribute('style', 'background-color: white');  // 将下面一个元素设置为白色背景
    }else {
        suggestions[selectSuggestionIndex].setAttribute('style', 'background-color: white');  // 将下面一个元素设置为白色背景
    }
    selectSuggestionIndex--;
    if(selectSuggestionIndex <= -1) {
        selectSuggestionIndex = suggestions.length - 1;
    }
    suggestions[selectSuggestionIndex].setAttribute('style', 'background-color: #ebebeb');
    inputField.value = suggestions[selectSuggestionIndex].innerText;
}

suggestionsUl.onmouseover = function(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    if(target.tagName.toLowerCase() == 'li') {
        let li = suggestionsUl.children;
        let index = Array.prototype.indexOf.call(li, target);
        for(let i = 0; i <li.length; i++) {
            li[i].setAttribute('style', 'background-color: white');
        }
        li[index].setAttribute('style', 'background-color: #ebebeb');
        inputField.value = li[index].innerText; // 动态生成的ul元素click不生效，暂时通过onmouseover事件赋值
    }
}