const time = ()=>{
    let d = new Date()
    let h = d.getHours()
    let m = d.getMinutes()
    let sec = d.getSeconds()
    const day = d.getDate();
    const month = d.getMonth() + 1; // Note: January is month 0
    const year = d.getFullYear();

    // Format the date string as "dd/mm/yyyy"
    const dateString = day + '/' + month + '/' + year;
    var clock1 = document.getElementById("clock");
    clock1.innerText = dateString + '  ' + h + ":" + m   + ":" + sec;   
    
}
setInterval(time,1000);