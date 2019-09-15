var arr = [];
var isEdit = false;
var editIndex;

var fname, lname, mobile, email
function getInput() {
    fname = document.getElementById("f_Name");
    lname = document.getElementById("l_Name");
    mobile = document.getElementById("m_No");
    email = document.getElementById("e_Mail");
}

function my_Fun() {
    getInput();
    if (!isEdit) {

        
     
     
        let obj={ firstName: fname.value, lastName: lname.value, phoneNo: mobile.value, email: email.value };

        console.log(obj);

        post(obj).then((res)=>{
            console.log(res);

//Call get fun to update table
            get().then((res)=>{
                arr=res;
                getData();
            },(err)=>{
                console.log(err);
            })


        
        },(err)=>{
            console.log(err);
        })

      
    }
    fname.value = '';
    lname.value = '';
    mobile.value = '';
    email.value = '';
    // console.log(JSON.stringify(arr));
}


function getData() {
    $("table tbody").html("");
    var str = "";
    arr.forEach((val, key) => {
        str += '<tr><td>' + val.firstName + '</td>' +
            '<td>' + val.lastName + '</td>' +
            '<td>' + val.phoneNo + '</td>' +
            '<td>' + val.email + '</td>' +
            '<td><a class="edt" onclick="editData(' + key + ')">edit</a></td>' +
            '<td><a class="rmv" onclick="removeData(' + val.phoneNo + ')">remove</a></td></tr>'
    })

    $("table tbody").append(str);
}


function editData(key) {
    isEdit = true;
    editIndex = key;
    getInput();

    let data = arr[key];
    console.log(data);

    fname.value = data.firstName;
    lname.value = data.lastName;
    mobile.value = data.phoneNo;
    email.value = data.email;


    $(".submit").css("display", "none");
    $(".update").css("display", "block");

}


function update() {
    getInput();

    console.log(arr[editIndex]);


    let no= arr[editIndex].phoneNo;

    var obj = { firstName: fname.value, lastName: lname.value, phoneNo: mobile.value, email: email.value };

    put(no,obj).then((res)=>{
        console.log(res);

//Call get fun to update table
        get().then((res)=>{
            arr=res;
            getData();
            isEdit=false;
        },(err)=>{
            console.log(err);
            isEdit=false;
        })
    
    },(err)=>{
        console.log(err);
    })


    // arr[editIndex] = obj;
    // getData();

    console.log(arr);
    fname.value = '';
    lname.value = '';
    mobile.value = '';
    email.value = '';
    $(".submit").css("display", "block");
    $(".update").css("display", "none");

}



function removeData(key) {

    deleteData(key).then((res)=>{
        console.log(res);

//Call get fun to update table
        get().then((res)=>{
            arr=res;
            getData();
        },(err)=>{
            console.log(err);
        })


    
    },(err)=>{
        console.log(err);
    })

}


function get(){
    return new Promise((resolve,reject)=>{


    $.ajax({
        url: "/book",
        method:"GET",
        success: function(result){
          
            resolve(result);
      },fail:(err)=>{
     
        reject(err);
      }
    });
})

}

function post(data){
    return new Promise((resolve,reject)=>{
    $.ajax({
        url: "/book",
        method: "POST",
        data:data,
        success: function(result){
              
                resolve(result);
      },fail:(err)=>{
        reject(err);
      }
    });
})
}


function deleteData(no){

    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "/book/"+no,
            method: "DELETE",
            success: function(result){
                  
                    resolve(result);
          },fail:(err)=>{
            reject(err);
          }
        });
    })

}


function put(no,data){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "/book/"+no,
            method: "PUT",
            data:data,
            success: function(result){
                    resolve(result);
          },fail:(err)=>{
                     reject(err);
          }
        });
    })
}

$(document).ready(()=>{
    get().then((res)=>{
        console.log(res);
        arr=res;
        getData();
    },(err)=>{
        console.log(err);
    })
})