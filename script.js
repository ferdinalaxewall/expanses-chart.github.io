$(document).ready(function(){

    var url = "./data.json";
    getJsonData(url);
    
});

async function getJsonData(url){
    const response = await fetch(url);
    var data = await response.json();
    processingJsonData(data);
}

function processingJsonData(jsonData){
    let arr = [];

    for (let i = 0; i < jsonData.length; i++) {
        let data = jsonData[i];
        let day = data.day;
        let amount = data.amount;
        arr.push(amount);

        setTimeout(() => {
            jsonToHtml(amount, day);
        }, 100 * i);
        
    }

    const max = Math.max(...arr);

    setTimeout(() => {
        $(".graphic-box").each(function(){
            if ($(this).attr("data-amount") == "$"+max) {
                $(this).addClass("highest")
            }
        })
    }, 250);
}

function jsonToHtml(amount, day){

    let graphicHeight = amount + 30;
    var graphicHtml = '<div class="graphic-list">'+
                '          <div class="graphic-box" data-amount="$'+amount+'" style="height:'+graphicHeight+'%;animation: graphicAnimation 0.5s ease-in-out;-webkit-animation: graphicAnimation 0.5s ease-in-out;"></div>'+
                '          <p class="graphic-text">'+day+'</p>'+
                '      </div>';

    $(".card-graphic").append(graphicHtml);
}
