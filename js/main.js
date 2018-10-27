const checkboxHTML = `<td><input type="checkbox" class="delete-icon delete-checkbox"></td>`;
const contents = {
    id: null,
    createdAt: null,
    deadline: null,
    text: null
};
const sortToggle = {
    contents: 1,
    createdAt: 1,
    deadline: 1
};
let todo_list = [];
$(document).ready(
    () => {
        $('.container').css("height", $(document).height()-86);;
    }
)
// Functions
const addContents = () => {
    contents.text = $(".new-contents")[0].value;
    if(contents.text == ""){
        alert("내용을 입력해 주세요.");
        initContents();
        return 0;
    }
    if(contents.text.length > 100){
        alert("글자 수가 너무 많습니다. 100자 이내로 작성해 주세요.");
        initContents();
        return 0;
    }
    if($('.new-contents-deadline')[0].value == ""){
        alert("마감기한을 설정해 주세요.");
        initContents();
        return 0;
    }
    contents.createdAt = new Date(Date.now());
    contents.deadline = new Date($('.new-contents-deadline')[0].value);
    if(contents.createdAt > contents.deadline){
        alert("마감기한이 현재시간보다 빠릅니다.");
        initContents();
        return 0;
    }
    contents.id = guid();
    todo_list.push(contents);
    add(contents);
    addHTMLSingleContents(contents);
    flushInput();
}
const deleteContents = () => {
    if(!confirm("삭제하시겠습니까?")) return 0;
    for(let value of $(".delete-checkbox")){
        if(value.checked){
            let idx = $(".delete-checkbox").index(value);
            remove(todo_list[idx].id);
            todo_list.splice(idx,1);
            $('.contents-list > tbody > tr').eq(idx).remove();
        }
    }
    refreshList(todo_list);
}
const sort = (col) => {
    if(col == 'Contents'){
        console.log("Contents");
        if(sortToggle.contents){
            //오름차순
            todo_list.sort((x,y)=>{
                return x.text.localeCompare(y.text);
            });
            sortToggle.contents = 0;
        }else{
            //내림차순
            todo_list.sort((x,y)=>{
                return y.text.localeCompare(x.text);
            });
            sortToggle.contents = 1;
        }
    }else if(col == 'CreatedAt'){
        if(sortToggle.createdAt){
            //오름차순
            todo_list.sort((x,y)=>{
                return x.createdAt - y.createdAt;
            });
            sortToggle.createdAt = 0;
        }else{
            //내림차순
            todo_list.sort((x,y)=>{
                return y.createdAt - x.createdAt;
            });
            sortToggle.createdAt = 1;
        }
    }else if(col == 'Deadline'){
        if(sortToggle.deadline){
            //오름차순
            todo_list.sort((x,y)=>{
                return x.deadline - y.deadline;
            });
            sortToggle.deadline = 0;
        }else{
            //내림차순
            todo_list.sort((x,y)=>{
                return y.deadline - x.deadline;
            });
            sortToggle.deadline = 1;
        }
    }
    refreshList(todo_list);
}
const search = () => {
    let filter = $(".search-text")[0].value.toUpperCase();
    let ele = $('.contents-list > tbody > tr');
    for (i = 0; i < ele.length; i++) {
        let td = ele[i].getElementsByTagName("td")[1]
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                ele[i].style.display = "";
            } else {
                ele[i].style.display = "none";
            }
        }
    }
}
const initContents = () => {
    contents.id = null;
    contents.createdAt = null;
    contents.deadline = null;
    contents.text = null;
}

// View
const addHTMLMultiContents = (list) => {
    let idx = parseInt($(".contents-list > tbody")[0].childElementCount);
    for(ele of list){
        idx++;
        $(".contents-list > tbody").append(`<tr><td>${idx}</td><td>${ele.text}</td><td>${ele.createdAt.format()}</td><td>${ele.deadline.format()}</td>${checkboxHTML}`);
    }
}
const addHTMLSingleContents = (contents) => {
    let idx = parseInt($(".contents-list > tbody")[0].childElementCount) + 1;
    $(".contents-list > tbody").append(`<tr><td>${idx}</td><td>${contents.text}</td><td>${contents.createdAt.format()}</td><td>${contents.deadline.format()}</td>${checkboxHTML}`);
}
const refreshList = (list) => {
    $('.contents-list > tbody > tr').remove();
    addHTMLMultiContents(list);
    $(".search-text")[0].value = "";
}
const selectAll = () => {
    for(let e of $(".delete-checkbox")){
        if(e.checked) e.checked = false;
        else e.checked = true;
    }
}
const flushInput = () => {
    $(".new-contents")[0].value = "";
    $('.new-contents-deadline')[0].value = "";
}