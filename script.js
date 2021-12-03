
let isOpen = true;
let isClick = false;
let hash = window.location.hash;

$(function () {
    setInterval(function () {
        if (window.location.hash !== hash && isClick) {
            hash = window.location.hash;
            console.log("hash has been changed!");
            if (isOpen) {
                closePopup();
                isOpen = false;
            } else {
                openPopup();
                isOpen = true;
            }
        }
    }, 100);

    $("#openBut").click(function () {
        isClick = false;
        console.log("click on button");
        openPopup();
    });

    function openPopup(){
        console.log("open!");
        if (!isClick) {
            let stateObj = {task8: "#form"};
            history.pushState(stateObj, null, "#form");
            isClick = true;
            isOpen = true;
        }
        $(".hidden").css("background-color", "rgba(0, 0, 0, 0.31)").show();
        hash = window.location.hash;
    }

    function closePopup(){
        console.log("close!");
        $(".hidden").css("background-color", "rgba(255,255,255)").hide();
    }

    $("#form").submit(function(e){
        e.preventDefault();
        let formData = new FormData(document.querySelector('form'));
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let jsonString = JSON.stringify(object);
        let href = "https://formcarry.com/s/HaKvssAuc9l";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: href,
            data: JSON.parse(jsonString),
            success: function(response){
                if(response.status === "success"){
                    alert("Data was successfully sent!");
                    document.getElementById('form').reset();
                }else{
                    alert("ERROR: " + response.message);
                }
            }
        });
    });

    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("email", document.getElementById("email").value);
    localStorage.setItem("comment", document.getElementById("comment").value);
});
