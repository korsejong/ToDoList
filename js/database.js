window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (!window.indexedDB) {
    // 브라우저 indexedDB 지원 체크
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
const dbName = "todolist";
const indexdDB = window.indexedDB.open(dbName, 1);
let db;

// indexedDB open asunc onerror, onsuccess
indexdDB.onerror = (event) => {
    console.log("indexedDB open error");
};
indexdDB.onsuccess = (event) => {
    try{
        db = indexdDB.result;
        readAll();
        console.log(db);
    }catch(e){
        console.log(e);
    }
};
indexdDB.onupgradeneeded = (event) => {
    try{
        db = event.target.result;
        db.createObjectStore(dbName, { keyPath: "id"} );
    }catch(e){
        console.log(e);
    }
};

// parameter : id ( main -> guid)
// async onerror, onsuccess
// request.result : contents: {id, createdAt, deadline, text}
const read = (id) => {
    try{
        let objectStore = db.transaction(dbName).objectStore(dbName);
        let request = objectStore.get(id);
        request.onerror = (event) => {
            console.log("log: read() onerror");
        };
        request.onsuccess = (event) => {
            console.log(event);
            if(request.result) {
                console.log(request.result);
            } else {
                console.log("log: read() onsuccess");
            }
        };
    }
    catch(e){
        console.log(e);
    }
}

// parameter : None
// async onerror, onsuccess
// request.result : Array<contents>  contents: {id, createdAt, deadline, text}
const readAll = () => {
    try{
        let objectStore = db.transaction(dbName).objectStore(dbName);
        let request = objectStore.getAll();
        request.onerror = (event) => {
            console.log("log: readAll() onerror");
        };
        request.onsuccess = (event) => {
            console.log("log: readAll() onsuccess");
            todo_list = request.result;
            sort("Deadline");
            refreshList(todo_list);
        }
    }catch(e){
        console.log(e);
    }
}

// parameter : contents: {id, createdAt, deadline, text}
// async onerror, onsuccess
// request.result : None
const add = (contents) => {
    try{
        let request = db.transaction([dbName], "readwrite").objectStore(dbName).add(contents);
        request.onsuccess = (event) => {
            console.log("log: add() onsuccess");
        };
        request.onerror = (event) => {
            console.log("log: add() onerror");
        }
    }catch(e){
        console.log(e);
    }
}

// parameter : id
// async onerror, onsuccess
// request.result : None
const remove = (id) => {
    try{
        let request = db.transaction([dbName], "readwrite").objectStore(dbName).delete(id);
        request.onsuccess = (event) => {
            console.log("log: remove() onsuccess");
        };
        request.onerror = (event) => {
            console.log("err: remove() onerror");
        }
    }
    catch(e){
        console.log(e);
    }
}