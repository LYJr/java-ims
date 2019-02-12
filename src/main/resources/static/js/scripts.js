'use strict';

// create users
$("#createUser button[type=submit]").click(create);
function create(e) {
    e.preventDefault();

    var url = $('#createUser').attr("action");
    console.log(url);

    var user = {
            userId : $('#userId').val(),
            name : $('#name').val(),
            password : $('#password').val()
    };

    console.log(JSON.stringify(user));

    $.ajax({
        url : url,
        method : 'POST',
        data : JSON.stringify(user),
        contentType : "application/json",
        success : function() {
            location.href="/";
        },
        error : function(response) {
            console.log(response);
            makingErrorField(response);
        }
    });

    var makingErrorField = function(response) {
        const errorFields = response.responseJSON.errors;

        if (!errorFields) {
            alert(response);
            return;
        }

        console.log(errorFields);

        var $field, error;

        for (var i = 0, length = errorFields.length; i < length; i++) {
            error = errorFields[i];

            console.log(error.errorMessage);


            //document.querySelector(".answer-error").innerHTML = error.fieldName + error.errorMessage;

            $field = $('#' + error['fieldName']);

           if($field && $field.length > 0){
                      $field.siblings('.error-message').remove();
                      $field.after('<span class="error-message text-muted taxt-small text-danger">'+error.errorMessage+'</span>');
           }

        }
    }
}

/*
let formId = document.querySelector(".check-userId");
let formName = document.querySelector(".check-name");
let formPassword = document.querySelector(".check-password");

formId.addEventListener("change", function(evt) {

    if(evt.target.name === "userId" && evt.target.value.length >= 5) {
        let answerName = document.querySelector(".answer-userId").innerHTML = "올바른 아이디입니다.";
    } else {
     let answerName = document.querySelector(".answer-userId").innerHTML = "아이디는 5자리 이상이어야 합니다.";
    }

});

formName.addEventListener("change", function(evt) {

    if(evt.target.name === "name" && evt.target.value.length >= 3) {
        let answerName = document.querySelector(".answer-name").innerHTML = "올바른 이름입니다.";
    } else {
     let answerName = document.querySelector(".answer-name").innerHTML = "이름은 3자 이상이어야 합니다.";
    }

});

formPassword.addEventListener("change", function(evt) {

    if(evt.target.name === "password" && evt.target.value.length >= 8) {
        let answerName = document.querySelector(".answer-password").innerHTML = "올바른 비밀번호입니다.";
    } else {
     let answerName = document.querySelector(".answer-password").innerHTML = "비밀번호는 8자리 이상이어야 합니다.";
    }

});
*/




// ## Login
$("#login button[type=submit]").click(login);

function login(e) {
    console.log("click login");
    e.preventDefault();

//    var queryString = $("#login").serialize();
//    console.log(queryString);

    var url = $('#login').attr("action");
    console.log(url);

    var json = new Object();
    json.userId = $('#userId').val();
    json.password = $('#password').val();

    console.log(JSON.stringify(json));

    $.ajax({
        type : 'post',
        url : url,
        data : JSON.stringify(json),
        contentType: 'application/json',
        error : function(xhr, status, error) {
            alert("아이디 또는 비밀번호가 다릅니다.")
        },
        success : function() {
            console.log("success");
            location.href = "/";
        }
    });
}


// ### add milstone
$(".mdl-menu__item_milestone").click(addMilestone);
function addMilestone(e) {
    console.log("click addMilestone");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function() {
        },
        success : function(data) {

            if (data.valid) {

                alert('마일스톤 지정에 성공했습니다.');
                $("#milestone-menu").empty().append(data.object.userId);
            }
        }
    })
}

// ### add assignee
$(".mdl-menu__item_assignee").click(addAssignee);
function addAssignee(e) {
    console.log("click addAssignee");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function(xhr, status, error) {
            console.log('error');
        },
        success : function(data, status) {
            console.log(data);
            console.log('success');


            if (data.valid) {

                   alert('담당자를 지정하였습니다.');
            }
        }
    });
}



// ### add labels
$(".mdl-menu__item_label").click(addLabels);
function addLabels(e) {
    console.log("click addLabels");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function(xhr, status, error) {
            console.log('error');
        },
        success : function(data, status) {
            console.log(data);
            console.log('success');
            if (data.valid) {
                   alert('라벨을 지정했습니다..');
            }
        }
    });
}

// ### add answers
$(".add_answers button[type=submit]").click(addAnswers);
function addAnswers(e) {
    console.log("click addAnswers");
    e.preventDefault();

    var url = $(".add_answers").attr("action");
    console.log(url);
//
//    var queryString = $("#add_answers").serialize();
//    console.log(queryString);
//

    var json = new Object();
    json.answer = $('#comment').val();

    console.log(JSON.stringify(json));
    console.log(json);




    $.ajax({
        type : 'post',
        url : url,
       // data : queryString,
        data : JSON.stringify(json),
        contentType: 'application/json',

        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);

console.log(data.formattedCreateDate);
console.log(data.formattedDate);
            var answerTemplate = $("#answerTemplate").html();
            var template = answerTemplate.format(data.writer.userId, data.answer, data.formattedCreateDate);
            $(".comments").append(template);
            $("textarea[name=comment]").val("");

        }
    });
}

// ### update answers form
$(".updateAnswerForm").click(updateAnswerForm);
function updateAnswerForm(e) {
    console.log("click updateAnswerForm");
    e.preventDefault();

    var url = $(this).attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);

            var answerTemplate = $("#answerUpdateTemplate").html();
            var template = answerTemplate.format(data.answer);
            $(".answerForm").append(template);
            $(".update_answer button[type=submit]").click(updateAnswer);
            $(".deleteAnswer").click(deleteAnswer);
        }
    });
}


// ### update answers
$(".update_answer button[type=submit]").click(updateAnswer);
function updateAnswer(e) {
    console.log("click updateAnswer");
    e.preventDefault();

    var url = $(".update_answer").attr("action");
    console.log(url);

    var json = new Object();
    json.answer = $("#updatecomment").val();
    console.log(json);

     var submitBnt = $(this);

    $.ajax({
        type : 'put',
        url : url,
        data : JSON.stringify(json),
        dataType : 'json',
        contentType : 'application/json',
        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);
            submitBnt.closest(".new-comment").remove();


//            var answerTemplate = $("#answerUpdateTemplate").html();
//            var template = answerTemplate.format(data.answer);
//            $("#answerForm").append(template);
        }
    });

}

// ## answer delete
$(".deleteAnswer").click(deleteAnswer);
function deleteAnswer(e) {
    console.log("deleteAnswer");
    e.preventDefault(); // 클릭이벤트 막아주는

    var submitBnt = $(this);
    var url = $(this).attr("href");
    console.log("url : " + url);

    $.ajax({
        type : 'delete',
        url : url,
        error : function (xhr, status) {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function (data, status) {
            console.log("success");
            submitBnt.closest(".comment").remove();
        }
    });
}

// 파일 업로드
var singleUploadForm = document.querySelector('#singleUploadForm');
var singleUploadFileInput = document.querySelector('#singleUploadFileInput');
var singleFileUploadError = document.querySelector('#singleFileUploadError');
var singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');
$("#singleUploadForm button[type=submit]").click(uploadFile);
function uploadFile(e) {
    e.preventDefault();
    console.log('uploadFile');


    var url = $('#singleUploadForm').attr("action");
    console.log(url);


    var files = singleUploadFileInput.files;
    if (files.length == 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }


    var formData = new FormData;
    formData.append("file", files[0]);



    $.ajax({
        type : 'post',
        url : url,
        data : formData,
        processData: false,
        contentType : false,
        error : function() {

            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = "Some Error Occurred";
        },
        success : function(data) {
            singleFileUploadError.style.display = "none";
      singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='"  + data.fileDownloadUri + "' target='_blank'>" + data.fileDownloadUri + "</a></p>";
                   singleFileUploadSuccess.style.display = "block";
        }
    });

    /*

    var files = singleUploadFileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
        type : 'post',
        
    });
    */
}



String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};