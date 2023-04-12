function topic() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/topicData",
        dataType: "json",
        success: function (data) {
            // $("#word").html(data["data"][0]["话题名称"])
            // $("#summary").html(data["data"][0]["导语"])
            // $("#talk").html("讨论量："+ data["data"][0]["讨论量"])
            // $("#read").html("阅读量："+ data["data"][0]["阅读量"])
            var str = ""
            for (let i = 0; i < data["data"].length; i++) {
                // str += "<div class='topic' id='topic'>" + "<a href='" + data['data'][i]['链接'] + "'>"
                str += "<div class='topic' id='topic'>"
                str += "<p id='word'>" + data['data'][i]['话题名称'] + "</p>"
                str += "<p id='summary'>" + data['data'][i]['导语'] + "</p>"
                if (data['data'][i]['讨论量'] > 2000) {
                    str += "<p id='talk'>讨论量：" + data['data'][i]['讨论量'] + "<span class='hot'><svg t=\"1681014654967\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3956\" width=\"200\" height=\"200\"><path d=\"M413.162667 42.666667c143.850667 74.986667 265.301333 213.418667 278.741333 371.733333 41.045333-30.4 77.013333-73.066667 77.013333-122.325333 121.856 109.333333 126.08 245.589333 126.976 285.098666l0.106667 7.082667c0 22.272-1.685333 44.885333-5.226667 67.648-23.146667 142.997333-121.066667 259.968-251.072 307.072l-1.578666 0.554667c-20.864 6.912-43.52 12.522667-68.16 16.405333a432.213333 432.213333 0 0 1-62.976 5.376c-170.709333-2.24-346.688-114.090667-373.845334-278.101333-21.973333-149.034667 0-319.210667 172.906667-484.821334l4.010667 25.493334c7.36 45.909333 16.256 93.632 29.589333 121.429333l13.056-24.106667 6.421333-12.16 6.485334-12.586666c37.333333-73.813333 66.005333-154.944 47.552-273.792z\" fill=\"#131415\" p-id=\"3957\"></path><path d=\"M285.354667 764.373333v-81.770666h90.816v81.770666h29.333333v-184.746666h-29.333333v77.098666h-90.816V579.626667H256v184.746666h29.354667z m256.128 3.626667c27.349333 0 48.917333-9.066667 64.725333-27.178667 15.061333-17.322667 22.570667-40.106667 22.570667-68.565333s-7.509333-51.498667-22.570667-68.821333c-15.786667-18.368-37.376-27.434667-64.725333-27.434667-27.584 0-49.173333 9.066667-64.725334 27.690667-15.04 17.6-22.314667 40.362667-22.314666 68.565333 0 27.946667 7.253333 50.709333 22.314666 68.309333 15.573333 18.133333 37.12 27.434667 64.725334 27.434667z m0-26.666667c-18.56 0-33.109333-6.464-43.136-19.136-9.792-12.416-14.549333-28.970667-14.549334-49.92 0-21.226667 4.757333-37.802667 14.549334-50.218666 10.282667-12.928 24.576-19.413333 43.136-19.413334 18.56 0 32.853333 5.973333 42.88 18.389334 9.813333 12.416 14.826667 29.482667 14.826666 51.221333s-5.013333 38.549333-14.805333 50.709333c-10.026667 12.16-24.32 18.389333-42.88 18.389334z m189.141333 23.04v-158.869333H789.333333V579.626667h-146.752v25.877333h58.709334v158.869333h29.333333z\" fill=\"#FFFFFF\" p-id=\"3958\"></path></svg></span>" + "</p>"
                } else {
                    str += "<p id='talk'>讨论量：" + data['data'][i]['讨论量'] + "</p>"
                }
                str += "<p id='read'>阅读量：" + data['data'][i]['阅读量'] + "</p>"
                str += "<a class='analyse' id='analyse' onclick='openCenteredWindow()'>话题分析</a>"
                str += "<a class='analyse' id='from' href='" + data['data'][i]['链接'] + "'>微博页面</a>"
                // str += "</a></div>"
                str += "</div>"
            }
            // console.log(str)
            $(".topics").append(str);

        }
    })
}


// 暂时用不到了
function showWindow() {
    // alert("aa")
    var popup = document.getElementById("light");
    // 显示弹出窗口
    popup.style.display = "block";
    // body元素添加禁用滚动
    document.body.classList.add("popup-open");

}

// 暂时用不到了
function hideWindow() {
    var popup = document.getElementById("light");
    popup.style.display = "none";
    // 取消禁用滚动
    document.body.classList.remove("popup-open")
}


// 使用window.open方法来创建窗口
function openCenteredWindow() {
    var windowWidth = 1200; // 窗口的宽度
    var windowHeight = 800; // 窗口的高度
    var screenWidth = screen.width; // 屏幕的宽度
    var screenHeight = screen.height; // 屏幕的高度

    var left = (screenWidth - windowWidth) / 2;
    var top = (screenHeight - windowHeight) / 2;
    var newWindow = window.open('http://127.0.0.1:5000/detailTopic', '', 'width=' + windowWidth + ',height=' + windowHeight + ',left=' + left + ',top=' + top);
    newWindow.moveTo(left, top);

}


// 话题搜索功能
function search() {
    var input = document.getElementById("searchBox").value.toLowerCase();
    var divs = document.getElementsByClassName("topics")[0].getElementsByTagName("div");
    console.log(document.getElementsByClassName("topics")[0].getElementsByTagName("div"))
    for (var i = 0; i < divs.length; i++) {
        var text = divs[i].textContent.toLowerCase();
        if (text.includes(input)) {
            divs[i].classList.remove("hide");
        } else {
            divs[i].classList.add("hide")
        }
    }
}

// 回车执行搜索
document.getElementById("searchBox").addEventListener("keyup", function (event) {
    // 判断是否按下回车键
    if (event.keyCode === 13) {
        // 调用search()函数
        search();
    }
});


// 当页面滚动到某个位置时，再加载需要延迟加载的内容
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 1000) { // 页面向下滚动超过 1000 像素时
        var lazyLoadDiv = document.getElementsByClassName("topic");
        if (!lazyLoadDiv.innerHTML) { // 避免重复加载
            lazyLoadDiv.innerHTML = 'waiting';
        }
    }
});


topic()