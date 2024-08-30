let money = 0, clicks = 0, DMG = 1;//main variables
let DMGlevel = 1, DMGcost = 10, sidi = 2; //item: Damage
let plevel = 1, xp = 0, levelupreq = 1000, xppgrs = 0, scale = 200; //level up system
const adminN = "userAdmin", adminP = "#@kmz1121"; //admin variables
let inputN, inputP, amoney, aDMG; //admin variables
let rebirth = 0, rebirthboost = 0, boost = 0, effectiveDMG = 1, moreDMG = 0; //rebirth variables 
let rebirthdn = false, rebirthreq = 5;
const clickbtn = new Audio("music/click.mp3");
const buttonclk = document.getElementById('btn');

function formatNumber(num) {
  if (num >= 1000000000) { // Billions
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) { // Millions
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 10000) { // Ten Thousands and above
    return (num / 1000).toFixed(1) + "K"; // Display one decimal place for 10k+
  } else if (num >= 1000) {
    //  If num is less than 10000, display it with 2 decimal places
    return (num / 1000).toFixed(2) + "K";
  } else {
    return num.toString();
  }
}
function unformatNumber(str) {
  str = str.toString(); // Convert to string
  if (str.includes("M")) {
    return parseFloat(str.replace("M", "")) * 1000000; // Multiply by 1 million
  } else if (str.includes("K")) {
    return parseFloat(str.replace("K", "")) * 1000; // Multiply by 1 thousand
  } else if (str.includes("B")) {
    return parseFloat(str.replace("B", "")) * 1000000000; // Multiply by 1 billion
  } else {
    return parseFloat(str);
  }
}

function onld() {
  document.getElementById('header').style.visibility = "hidden";
  document.getElementById('body').style.visibility = "hidden";
  document.getElementById('adminlogin').style.height = "0px";
  document.getElementById('adminpanel').style.height = "0px"
  document.getElementById('body').style.height = "0px";
  setTimeout(function() {
    document.getElementById('loadingscr').style.visibility = "hidden";
    document.getElementById('header').style.visibility = "visible";
    document.getElementById('body').style.height = "75vh";
    document.getElementById('body').style.visibility = "visible";
    document.getElementById('loadingscr').style.height = "0px";
    document.getElementById('loadingscr').style.padding = "0px";
  }, 2000);
}
window.onload = function() {
  effectiveDMG = DMG;
  document.getElementById('floating-buttons').style.visibility = "hidden";
  document.getElementById('header').style.visibility = "hidden";
  document.getElementById('body').style.visibility = "hidden";
  document.getElementById('adminlogin').style.height = "0px";
  document.getElementById('adminpanel').style.height = "0px"
  document.getElementById('body').style.height = "0px";
  setTimeout(function() {
    document.getElementById('loadingtext').id = "loadingtext1";
    document.getElementById('progressbar').id = 'progressbar1';
  }, 1000);
  setTimeout(function() {
    document.getElementById('progressbar1').style.visibility = "hidden";
  document.getElementById('loadingtext1').style.visibility = "hidden";
  }, 1600);
  setTimeout(function() {
    document.getElementById('blogo').id = 'blogo1';
  }, 2000);
  setTimeout(function() {
    document.getElementById('blogo1').style.visibility = "hidden";
    document.getElementById('blogo1').style.width = "0px";
    document.getElementById('header').style.visibility = "visible";
    document.getElementById('body').style.height = "75vh";
    document.getElementById('floating-buttons').style.visibility = "visible";
    document.getElementById('body').style.visibility = "visible";
    document.getElementById('loadingscr').style.height = "0px";
    document.getElementById('loadingscr').style.padding = "0px";
  }, 3000);
}
function adminbtn() {
  document.getElementById('body').id = "body1";
  setTimeout(function() {
    document.getElementById('adminlogin').style.visibility = "visible";
    document.getElementById('header').style.visibility = "hidden";
    document.getElementById('body1').style.height = "0px";
    document.getElementById('body1').style.visibility = "hidden";
    document.getElementById('adminlogin').id = "adminlogin1";
  }, 1500);
}
function adminlogin() {
  inputN = document.getElementById('adminusername').value;
  inputP = document.getElementById('adminpassword').value;
  if (inputN == adminN && inputP == adminP) {
    document.getElementById('error').style.visibility = "hidden";
    document.getElementById('adminlogin1').id = "adminlogin2";
    setTimeout(function() {
      document.getElementById('adminlogin2').style.visibility = "hidden";
      document.getElementById('adminpanel').style.visibility = "visible";
      document.getElementById('adminpanel').id = "adminpanel1";
    }, 1500);
  } else {
    document.getElementById('error').style.visibility = "visible";
  }
}
function addamt() {
  clicks = unformatNumber(clicks);
  money = unformatNumber(money);
  amoney = parseFloat(document.getElementById('addmoney').value);
  aDMG = parseFloat(document.getElementById('addDMG').value);
  money = money + amoney;
  DMG = DMG + aDMG;
  document.getElementById('added').style.visibility = "visible";
  setTimeout(function() {
    document.getElementById('added').style.visibility = "hidden";
  }, 1500);
  document.getElementById('adminpanel1').id = "adminpanel2";
  document.getElementById('adminpanel2').style.visibility = "hidden";
  document.getElementById('body1').id = "body";
  setTimeout(function() {
    document.getElementById('adminpanel2').id = "adminpanel";
    document.getElementById('adminlogin2').id = "adminlogin";
    onld();
  }, 1000)
  clicks = formatNumber(clicks);
  money = formatNumber(money);
  document.getElementById('money').innerHTML = money;
  document.getElementById('damage').innerHTML = DMG;
}
function xpprogress() {
  xppgrs = (xp / levelupreq) * 100;
  document.getElementById('xppgr').style.width = `${xppgrs}%`;
}

function ctr() {
  click();
  DMG = effectiveDMG;
  clicks = unformatNumber(clicks); // Convert formatted clicks to raw number
  money = unformatNumber(money); // Convert formatted money to raw number

  // Calculate effective damage with boost
  money += effectiveDMG; // Apply the rebirth boost to money earned
  clicks += effectiveDMG; // Apply the rebirth boost to clicks

  clicks = formatNumber(clicks); // Format clicks
  money = formatNumber(money); // Format money

  document.getElementById('clicks').innerHTML = clicks; // Update clicks display
  document.getElementById('money').innerHTML = money; // Update money display
  document.getElementById('damage').innerHTML = DMG; // Update damage display
  document.getElementById('xp').innerHTML = xp; // Update XP display

  if (xp > levelupreq) {
    plevel += 1;
    xp -= levelupreq;
    DMG += 10;
    levelupreq += 2000;
    effectiveDMG = DMG;
    setTimeout(function() {
      alert("Congratulations 🎉 You leveled up!!!");
      alert("You got 10 dmg/click");
      document.getElementById('xp').innerHTML = xp;
      document.getElementById('plevel').innerHTML = plevel;
      document.getElementById('damage').innerHTML = DMG;
      document.getElementById('reqxp').innerHTML = levelupreq;
      xpprogress();
      if (plevel >= rebirthreq) {
        alert("Congratulations you can now rebirth");
      }
    }, 10);
  } else {
    xp += (effectiveDMG * 2);
    xpprogress();
  }
}


function buyDMG() {
  money = unformatNumber(money);
  if (DMGcost <= money) {
    if (DMGlevel < 50) {
      money = money - DMGcost;
      DMGlevel = DMGlevel + 1;
      DMG = DMG + sidi;
      DMGcost = DMGcost + 100;
    }
    if (DMGlevel == 9) {
      sidi = sidi * 2;
    } if (DMGlevel == 19) {
      sidi = sidi * 2;
    } if (DMGlevel == 29) {
      sidi = sidi * 2;
    } if (DMGlevel == 39) {
      sidi = sidi * 2;
    } if (DMGlevel == 49) {
      sidi = sidi * 2;
    } if (DMGlevel == 50) {
      document.getElementById('DMGcost').onclick = "";
      document.getElementById('DMGcost').innerHTML = "MAX";
      document.getElementById('dmginfo').innerHTML = "Maxed Damage";
      alert("You Maxed This item!!!");
    }
    effectiveDMG = DMG;
    document.getElementById('damagelevel').innerHTML = DMGlevel;
    if (DMGlevel < 50) {
      document.getElementById('DMGcost').innerHTML = DMGcost;
    }
  } else {
    alert("You dont have enough cash!!");
  }
  document.getElementById('damage').innerHTML = DMG;
  if (rebirth = true) {

  }
  money = formatNumber(money);
  document.getElementById('money').innerHTML = money;
  document.getElementById('sidi').innerHTML = sidi;
}
function openFloatingWindow(windowId) {
  document.getElementById(windowId).style.display = 'block';
}

function closeFloatingWindow(windowId) {
  document.getElementById(windowId).style.display = 'none';
}

function rebirthicn() {
  openFloatingWindow('window1');
}

function function2() {
  openFloatingWindow('window2');
}

function rebirthbtn() {
  if (plevel >= rebirthreq) {
    rebirthreq += 5;
    rebirthdn = true;
    money = 0;
    boost += 100; // Increment boost by 50%
    rebirthboost = boost; // Update the total rebirth boost
    DMG = 1; // Reset damage
    rebirth += 1; // Increment rebirth count
    DMGlevel = 0;
    DMGcost = 10;
    sidi = 2 + Math.floor(2 * (rebirthboost / 100));
    effectiveDMG = DMG + Math.floor(DMG * (rebirthboost / 100));
    DMG = effectiveDMG;
    document.getElementById('rebirthreq').innerHTML = `Level required = ${rebirthreq}`;
    document.getElementById('rebirthctr').textContent = `Rebirths: ${rebirth}`; // Update rebirth counter
    document.getElementById('rebirth').innerHTML = rebirth;
    document.getElementById('damagelevel').innerHTML = DMGlevel;
    document.getElementById('DMGcost').innerHTML = DMGcost;
    document.getElementById('sidi').innerHTML = sidi;
    document.getElementById('rebirthboost').textContent = `Total Boost: ${rebirthboost}%`; // Update total boost display
    document.getElementById('money').innerHTML = money; // Update money display
    document.getElementById('damage').innerHTML = DMG; // Update damage display
  } else {
    document.getElementById('rebirthreqerror').style.visibility = "visible";
    setTimeout(function() {
      document.getElementById('rebirthreqerror').style.visibility = "hidden";
    }, 1000);
  }
}
function click() {
  if (clickbtn.paused) {
    clickbtn.play(); // Play if paused
  } else {
    clickbtn.pause(); // Pause if playing
    clickbtn.currentTime = 0; // Reset to the beginning
  }
  clickbtn.play();
}
// Attach the event listener directly to the button
if (buttonclk) {
  buttonclk.addEventListener("click", click); 
} else {
  // Wait for the button to be loaded
  document.addEventListener("DOMContentLoaded", () => {
    const buttonclk = document.getElementById('btn');
    if (buttonclk) {
      buttonclk.addEventListener("click", click);
    }
  });
}