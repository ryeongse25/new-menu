function postComment() {
    let form = document.getElementById("review_form");
    let comment = form.review.value;

    axios({
        method: "post",
        url: "http://localhost:8000/recipe/review",
        data: {
            food_id: "<%=data.id%>",
            comment: comment
        },
    }).then((response) => {
        return response.data;
    }).then((data) => {
        form.reset();
        console.log(data);
        let html = "<tr id='review_" + data.id + "'><th><%=user%></th><th>" + comment + "</th><th id='deleteComment' onclick='deleteComment(" + data.id + ")'>x</th></tr>";
        $("table").append(html);
    })
}

function deleteComment(id) {
    axios({
        method: "delete",
        url: "http://localhost:8000/recipe/deletereview",
        data: { id : id }
    }).then((response) => {
        return response.data;
    }).then((data) => {
        $("#review_" + id).remove();
    })
}

function getReview(id) {
    let form = document.getElementById("review_form");

    axios({
        method: "get",
        url: "http://localhost:8000/recipe/getreview",
        params: { id : id }
    }).then((response) => {
        return response.data;
    }).then((data) => {
        console.log(data);
        form.review.value = data.review;
        $("#review_form div").html("<button type='button' onclick='editComment(" + id + ");'>수정</button><button type='button' onclick='cancle();'>취소</button>");
    })
}

function editComment(id) {
    let form = document.getElementById("review_form");

    axios({
        method: "patch",
        url: "http://localhost:8000/recipe/updatereview",
        data: { 
            id : id,
            food_id: "<%=data.id%>",
            comment: form.review.value
        }
    }).then((response) => {
        return response.data;
    }).then((data) => {
        console.log(data);

        let tr = document.getElementById("review_" + id);
        let children = tr.children;
        $(children[1]).text(form.review.value);

        form.reset();
        
        $("#review_form div").html('<button type="button" onclick="postComment();">등록</button>');
    })
}

function cancle() {
    let form = document.getElementById("review_form");

    form.reset();

    $("#review_form div").html('<button type="button" onclick="postComment();">등록</button>');
}