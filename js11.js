const sheetId = '1rW9HxNodNpJktjPJH9Fc2TYJx6LcpvLoDzIqX3JoF98';
const Script = 'https://script.google.com/macros/s/AKfycbz4bi-9Y-QDHQDV2akQA1wi4OB6t93SxdDfX0JBMvmiG2psCOUkpiRJrMypJj18KOVc2g/exec'
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
let query = encodeURIComponent('Select *');
let Users="Users";
let UrlUsers = `${base}&sheet=${Users}&tq=${query}`;
let DataUsers = [];
let Accounts="Customers";
let UrlAccounts = `${base}&sheet=${Accounts}&tq=${query}`;
let DataCustomers = [];
let WareHouse="WareHouse";
let UrlWareHouse = `${base}&sheet=${WareHouse}&tq=${query}`;
let DataWareHouse = [];
let Mats="Mats";
let UrlMat = `${base}&sheet=${Mats}&tq=${query}`;
let DataMat = [];
let Move="MoveV";
let UrlMove = `${base}&sheet=${Move}&tq=${query}`;
let DataMove = [];
let Sales="SalesV";
let UrlSales = `${base}&sheet=${Sales}&tq=${query}`;
let DataSales = [];
let Teacher="TeacherV";
let UrlTeacher = `${base}&sheet=${Teacher}&tq=${query}`;
let DataTeacher = [];
let Gover="Gover";
let UrlGover = `${base}&sheet=${Gover}&tq=${query}`;
let DataGover = [];
let City="City";
let UrlCity = `${base}&sheet=${City}&tq=${query}`;
let DataCity = [];
let Town="Town";
let UrlTown = `${base}&sheet=${Town}&tq=${query}`;
let DataTown = [];
let MatBalance="MatBalance";
let UrlMatBalance = `${base}&sheet=${MatBalance}&tq=${query}`;
let DataMatBalance = [];
let MoveWM="MoveWM";
let UrlMoveWM = `${base}&sheet=${MoveWM}&tq=${query}`;
let DataMoveWM = [];
let Purchases="Purchases";
let UrlPurchases = `${base}&sheet=${Purchases}&tq=${query}`;
let Datapurchases = [];
let IsReady=false;
document.addEventListener('DOMContentLoaded', init)
function init() {
  IsReady=false;
  ConvertMode();
  LoadUsers();
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("PassWord")!=null){
      document.getElementById("User_PassWord").value=localStorage.getItem("PassWord");
    }
    if( localStorage.getItem("User_Index")!=null){
      let User_Index = localStorage.getItem("User_Index");
      ShowSelectForm(localStorage.getItem("ActiveForm"));
      let Loading=document.getElementById("Loading");
      Loading.className="fa fa-refresh fa-spin"
      document.getElementById("Myusername").value=localStorage.getItem("User_Name");
      let Ti =new Date().getTime().valueOf();
      let Ti1 =new Date().getTimezoneOffset().valueOf()
      let Ti2 =Ti1*60*1000 * -1 + Ti
      document.getElementById("BillDateS").valueAsDate =new Date(Ti2);
      LoadCustomersToTable();
       LoadMat();
       LoadGover();
       LoadCity();
       LoadTown();
       LoadSales();
       LoadWareHouse();
       LoadMove();
       LoadMatBalance();
       LoadMoveWM();
       Loadpurchases();
       const LoadTime=setTimeout(function(){
        if(DataUsers[User_Index].IsM=="No"){
          document.getElementById("purchasesBtb").style.display="flex";
        };
        document.getElementById("Myusername").value=localStorage.getItem("User_Name");
        document.getElementById("MyMobile").value=DataUsers[User_Index].Phone;
        Loading.className="fa fa-refresh" ;
        IsReady=true;
        clearTimeout(LoadTime);
       },3000);
    }
  }
}

function ShowSelectForm(ActiveForm){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("Main").style.display="none";
  document.getElementById("CustomerWi").style.display="none";
  document.getElementById("CustomerBrowser").style.display="none";
  document.getElementById("SalesWi").style.display="none";
  document.getElementById("SalesBrowser").style.display="none";
  document.getElementById("MatsBrowser").style.display="none";
  document.getElementById("AmountMat").style.display="none";
  document.getElementById("purchasesWi").style.display="none";
  document.getElementById("purchasesBrowser").style.display="none";
  document.getElementById(ActiveForm).style.display="flex";
  localStorage.setItem("ActiveForm",ActiveForm)
}


// *************************************Main**************
function ShowCustomerBrowser(){
  ShowSelectForm("CustomerBrowser");
  LoadCustomersToTable();
}
function ShowCustomerWi(){
  if(IsReady==false){return;}
  ShowSelectForm("CustomerWi");
  LoadCustomerWi();
}

function ShowSalesBrowser(){
  ShowSelectForm("SalesBrowser");
  LoadSalesToTable();
}
function ShowSalesWi(){
  if(IsReady==false){return;}
  ShowSelectForm("SalesWi");
  LoadSalesWi();
}

function ShowMatsBrowser(){
  ShowSelectForm("MatsBrowser");
  LoadMatsToTable();
}

function ShowpurchasesBrowser(){
  let User_Index = localStorage.getItem("User_Index");
  if(DataUsers[User_Index].IsM=="No"){
  ShowSelectForm("purchasesBrowser");
  LoadpurchasesBrowser();
  };
}
function ShowpurchasesWi(){
  if(IsReady==false){return;}
  ShowSelectForm("purchasesWi");
  LoadpurchasesWi();
}

function SignOutUser(){
  localStorage.removeItem("User_Index");
  localStorage.removeItem("User_Name");
  localStorage.removeItem("UserCode");
  document.getElementById('Myusername').value="";
  ShowSelectForm("loginPage");
}
function GoToMain(){
  ShowSelectForm("Main");
}
// **********************Loading*****************
function LoadUsers(){
  DataUsers=[];
  fetch(UrlUsers)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataUsers.push(rowUser);
      })
  })
}

function LoadCustomers(){
  DataCustomers=[];
  fetch(UrlAccounts)
  .then(res => res.text())
  .then(rep => {
      const jsonData1 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzCustomers = [];
      jsonData1.table.cols.forEach((heading1) => {
          if (heading1.label) {
              let columnCustomers = heading1.label;
              colzCustomers.push(columnCustomers);
          }
      })
      jsonData1.table.rows.forEach((rowData1) => {
          const rowCustomers = {};
          colzCustomers.forEach((ele, ind) => {
              rowCustomers[ele] = (rowData1.c[ind] != null) ? rowData1.c[ind].v : '';
          })
          DataCustomers.push(rowCustomers);
      })
      LoadCustomerName()
  })
}
function LoadCustomerName(){
  let CustomerName,AccountNum,SaleManCode,Mobile;
  let optionClass;
  let UserCode=localStorage.getItem("UserCode");
  let ListCustomers =document.getElementById("ListCustomers");
  let listAccountNameS =document.getElementById("listAccountNameS");
  let ListCutomers1 =document.getElementById("ListCutomers1");
  let SeaMobList=document.getElementById("SeaMobList");
  ListCustomers.innerHTML="";
  listAccountNameS.innerHTML="";
  ListCutomers1.innerHTML="";
  SeaMobList.innerHTML="";
  for (let index = 0; index < DataCustomers.length; index++) {
    AccountNum=DataCustomers[index].AccountNum
    CustomerName=DataCustomers[index].CustomerName
    SaleManCode=DataCustomers[index].SaleManCode
    Mobile=DataCustomers[index].Mobile
    if(AccountNum!="" && SaleManCode==UserCode){
      optionClass=document.createElement("option");
      optionClass.value=CustomerName;
      optionClass.textContent=CustomerName;
      ListCustomers.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=CustomerName;
      optionClass.textContent=CustomerName;
      listAccountNameS.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=CustomerName;
      optionClass.textContent=CustomerName;
      ListCutomers1.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=Mobile;
      optionClass.textContent=Mobile;
      SeaMobList.appendChild(optionClass);
    }
  }
}

function LoadWareHouse(){
  DataWareHouse=[];
  fetch(UrlWareHouse)
  .then(res => res.text())
  .then(rep => {
      const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
      const colWare = [];
      jsonData2.table.cols.forEach((heading2) => {
          if (heading2.label) {
              let columnWare = heading2.label;
              colWare.push(columnWare);
          }
      })
      jsonData2.table.rows.forEach((rowData2) => {
          const rowUser2 = {};
          colWare.forEach((ele, ind) => {
              rowUser2[ele] = (rowData2.c[ind] != null) ? rowData2.c[ind].v : '';
          })
          DataWareHouse.push(rowUser2);
      })
      LoadWareHouseItems();
  })
}

function LoadWareHouseItems(){
  let WareHouseName,NumberH,SaleManCode;
  let optionClass;
  let UserCode=localStorage.getItem("UserCode");
  let WareHouseList = document.getElementById("WareHouseList");
  let WareHouseList2= document.getElementById("WareHouseList2");
  let WareHouseList3= document.getElementById("WareHouseList3");
  let AmountWareList= document.getElementById("AmountWareList");
  let WareHouseList5 = document.getElementById("WareHouseList5");
  WareHouseList5.innerHTML="";
  WareHouseList.innerHTML="";
  WareHouseList2.innerHTML="";
  WareHouseList3.innerHTML="";
  AmountWareList.innerHTML="";
  for (let index = 0; index < DataWareHouse.length; index++) {
    NumberH=DataWareHouse[index].Num
    WareHouseName=DataWareHouse[index].WareHouseName
    SaleManCode=DataWareHouse[index].SaleManCode
    if(NumberH!="" && SaleManCode==UserCode){
      optionClass=document.createElement("option");
      optionClass.value=WareHouseName;
      optionClass.textContent=WareHouseName;
      WareHouseList.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=WareHouseName;
      optionClass.textContent=WareHouseName;
      WareHouseList2.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=WareHouseName;
      optionClass.textContent=WareHouseName;
      WareHouseList3.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=WareHouseName;
      optionClass.textContent=WareHouseName;
      AmountWareList.appendChild(optionClass);
    }
  }
  for (let index = 0; index < DataWareHouse.length; index++) {
    NumberH=DataWareHouse[index].Num
    WareHouseName=DataWareHouse[index].WareHouseName
    if(NumberH!=""){
      optionClass=document.createElement("option");
      optionClass.value=WareHouseName;
      optionClass.textContent=WareHouseName;
      WareHouseList5.appendChild(optionClass);
    }
  }
}


function LoadMat(){
  DataMat=[];
  fetch(UrlMat)
  .then(res => res.text())
  .then(rep => {
      const jsonData3 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzMat = [];
      jsonData3.table.cols.forEach((heading3) => {
          if (heading3.label) {
              let columnMat = heading3.label;
              colzMat.push(columnMat);
          }
      })
      jsonData3.table.rows.forEach((rowData3) => {
          const rowMat = {};
          colzMat.forEach((ele, ind) => {
              rowMat[ele] = (rowData3.c[ind] != null) ? rowData3.c[ind].v : '';
          })
          DataMat.push(rowMat);
      })
      LoadMatsItems();
  })
}

function LoadMatsItems(){
  let MatNum,MatName;
  let optionClass;
  let MatsList = document.getElementById("MatsList");
  let AmountMatList = document.getElementById("AmountMatList");
    MatsList.innerHTML="";
    AmountMatList.innerHTML="";
  for (let index = 0; index < DataMat.length; index++) {
    MatNum=DataMat[index].MatNum
    MatName=DataMat[index].MatName
    if(MatName!="" ){
      optionClass=document.createElement("option");
      optionClass.value=MatName;
      optionClass.textContent=MatName;
      MatsList.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=MatName;
      optionClass.textContent=MatName;
      AmountMatList.appendChild(optionClass);
    }
  }
}

function LoadGover(){
  DataGover=[];
  fetch(UrlGover)
  .then(res => res.text())
  .then(rep => {
      const jsonData4 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzGov = [];
      jsonData4.table.cols.forEach((heading4) => {
          if (heading4.label) {
              let columnGov = heading4.label;
              colzGov.push(columnGov);
          }
      })
      jsonData4.table.rows.forEach((rowData4) => {
          const rowGov = {};
          colzGov.forEach((ele, ind) => {
              rowGov[ele] = (rowData4.c[ind] != null) ? rowData4.c[ind].v : '';
          })
          DataGover.push(rowGov);
      })
      LoadGovItems();
  })
}

function LoadGovItems(){
  let Num,GoverName;
  let optionClass;
  let BiCityList = document.getElementById("BiCityList");
  let SeaBiCityList = document.getElementById("SeaBiCityList");
  BiCityList.innerHTML="";
  SeaBiCityList.innerHTML="";
  for (let index = 0; index < DataGover.length; index++) {
    Num=DataGover[index].Num
    GoverName=DataGover[index].GoverName
    if(Num!="" ){
      optionClass=document.createElement("option");
      optionClass.value=GoverName;
      optionClass.textContent=GoverName;
      BiCityList.appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=GoverName;
      optionClass.textContent=GoverName;
      SeaBiCityList.appendChild(optionClass);
    }
  }
}

function LoadCity(){
  DataCity=[];
  fetch(UrlCity)
  .then(res => res.text())
  .then(rep => {
      const jsonData5 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzCity = [];
      jsonData5.table.cols.forEach((heading5) => {
          if (heading5.label) {
              let columnCity = heading5.label;
              colzCity.push(columnCity);
          }
      })
      jsonData5.table.rows.forEach((rowData5) => {
          const rowCity = {};
          colzCity.forEach((ele, ind) => {
              rowCity[ele] = (rowData5.c[ind] != null) ? rowData5.c[ind].v : '';
          })
          DataCity.push(rowCity);
      })
      LoadCityItems1();
  })
}

function LoadCityItems(Gover){
  let Num,CityName,GoverName;
  let optionClass;
  let CityList =document.getElementById("CityList");
  CityList.innerHTML="";
  for (let index = 0; index < DataCity.length; index++) {
    Num=DataCity[index].Num;
    CityName=DataCity[index].CityName;
    GoverName=DataCity[index].GoverName;
    if(Num!="" && Gover==GoverName){
      optionClass=document.createElement("option");
      optionClass.value=CityName;
      optionClass.textContent=CityName;
      CityList.appendChild(optionClass);
    }
  }
}

function LoadCityItems1(Gover){
  let Num,CityName,GoverName;
  let optionClass;
  let SeaCityList =document.getElementById("SeaCityList");
  SeaCityList.innerHTML="";
  if(Gover==undefined){
    for (let index = 0; index < DataCity.length; index++) {
      Num=DataCity[index].Num;
      CityName=DataCity[index].CityName;
      GoverName=DataCity[index].GoverName;
      if(Num!=""){
        optionClass=document.createElement("option");
        optionClass.value=CityName;
        optionClass.textContent=CityName;
        SeaCityList.appendChild(optionClass);
      }
    }
  }else{
  for (let index = 0; index < DataCity.length; index++) {
    Num=DataCity[index].Num;
    CityName=DataCity[index].CityName;
    GoverName=DataCity[index].GoverName;
    if(Num!="" && Gover==GoverName){
      optionClass=document.createElement("option");
      optionClass.value=CityName;
      optionClass.textContent=CityName;
      SeaCityList.appendChild(optionClass);
    }
  }
}
}

function LoadTown(){
  DataTown=[];
  fetch(UrlTown)
  .then(res => res.text())
  .then(rep => {
      const jsonData6 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzTown = [];
      jsonData6.table.cols.forEach((heading6) => {
          if (heading6.label) {
              let columnTown = heading6.label;
              colzTown.push(columnTown);
          }
      })
      jsonData6.table.rows.forEach((rowData6) => {
          const rowTown = {};
          colzTown.forEach((ele, ind) => {
              rowTown[ele] = (rowData6.c[ind] != null) ? rowData6.c[ind].v : '';
          })
          DataTown.push(rowTown);
      })
      LoadTownItems1();
  })
}

function LoadSales(){
  DataSales=[];
  fetch(UrlSales)
  .then(res => res.text())
  .then(rep => {
      const jsonData7 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser7 = [];
      jsonData7.table.cols.forEach((heading7) => {
          if (heading7.label) {
              let columnUser7 = heading7.label;
              colzUser7.push(columnUser7);
          }
      })
      jsonData7.table.rows.forEach((rowData7) => {
          const rowUser7 = {};
          colzUser7.forEach((ele, ind) => {
              rowUser7[ele] = (rowData7.c[ind] != null) ? rowData7.c[ind].v : '';
          })
          DataSales.push(rowUser7);
      })
      LoadBillNumbers();
  })
}
function LoadBillNumbers(){
  let Num,BillNumber;
  let optionClass;
  let ListBills = document.getElementById("ListBills");
  ListBills.innerHTML="";
  for (let index = 0; index < DataSales.length; index++) {
    Num=DataSales[index].Num
    BillNumber=DataSales[index].BillNumber
    if(Num!="" ){
      optionClass=document.createElement("option");
      optionClass.value=BillNumber;
      optionClass.textContent=BillNumber;
      ListBills.appendChild(optionClass);
    }
  }
}

function LoadMove(){
  DataMove=[];
  fetch(UrlMove)
  .then(res => res.text())
  .then(rep => {
      const jsonData8 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser8 = [];
      jsonData8.table.cols.forEach((heading8) => {
          if (heading8.label) {
              let columnUser8 = heading8.label;
              colzUser8.push(columnUser8);
          }
      })
      jsonData8.table.rows.forEach((rowData8) => {
          const rowUser8 = {};
          colzUser8.forEach((ele, ind) => {
              rowUser8[ele] = (rowData8.c[ind] != null) ? rowData8.c[ind].v : '';
          })
          DataMove.push(rowUser8);
      })
  })
}

function LoadTownItems(City){
  let Num,TownName,CityName;
  let optionClass;
  let TownList =document.getElementById("TownList");
  TownList.innerHTML="";
  for (let index = 0; index < DataTown.length; index++) {
    Num=DataTown[index].Num;
    TownName=DataTown[index].TownName;
    CityName=DataTown[index].CityName;
    if(Num!="" && City==CityName){
      optionClass=document.createElement("option");
      optionClass.value=TownName;
      optionClass.textContent=TownName;
      TownList.appendChild(optionClass);
    }
  }
}

function LoadTownItems1(City){
  let Num,TownName,CityName;
  let optionClass;
  let SeaTownList =document.getElementById("SeaTownList");
  SeaTownList.innerHTML="";
  if(City==undefined){
    for (let index = 0; index < DataTown.length; index++) {
      Num=DataTown[index].Num;
      TownName=DataTown[index].TownName;
      CityName=DataTown[index].CityName;
      if(Num!=""){
        optionClass=document.createElement("option");
        optionClass.value=TownName;
        optionClass.textContent=TownName;
        SeaTownList.appendChild(optionClass);
      }
    }
  }else{
  for (let index = 0; index < DataTown.length; index++) {
    Num=DataTown[index].Num;
    TownName=DataTown[index].TownName;
    CityName=DataTown[index].CityName;
    if(Num!="" && City==CityName){
      optionClass=document.createElement("option");
      optionClass.value=TownName;
      optionClass.textContent=TownName;
      SeaTownList.appendChild(optionClass);
    }
  }
}
}



// ***************Sign On**************
function IsfoundUser(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < DataUsers.length; index++) {
      if(TPassWord==DataUsers[index].PassWord){
        localStorage.setItem("User_Index", index);
        return true;
      }
    }
      error_User_ID.className="fa fa-warning";
      return false ;
  }

  function foundIndex(TPassWord){
      for (let index = 0; index < DataUsers.length; index++) {
        if(TPassWord==DataUsers[index].PassWord){
          return index
        }
      }
      return -1
    }
  
function Istrue(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
  if(TPassWord===""){ error_User_ID.className="fa fa-warning"; return false;}else{ error_User_ID.className="" }
  if(IsfoundUser(TPassWord)===false){return false}else{error_User_ID.className=""}
  return true;
}

function Sign_In(){
  let User_PassWord= document.getElementById("User_PassWord");
  if (Istrue(User_PassWord.value)===true){
    let User_Index = localStorage.getItem("User_Index");
    localStorage.setItem("User_Name", DataUsers[User_Index].UserName);
    localStorage.setItem("PassWord",DataUsers[User_Index].PassWord);
    localStorage.setItem("UserCode",DataUsers[User_Index].UserCode);
    ShowSelectForm("Main");
    location.reload();
  }
}

function ShowPassword(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Eye_Password= document.getElementById("Eye_Password");
  if (Eye_Password.className=="fa fa-eye"){
    User_PassWord.type="text";
    Eye_Password.className="fa fa-eye-slash";
  }else{
    User_PassWord.type="password";
    Eye_Password.className="fa fa-eye";
  }
}


// ********************CustomerWi
function LoadCustomerWi(){
  IsReady=false;
  let Loading =document.getElementById("LoadingCustomerWi");
  Loading.className="fa fa-refresh fa-spin";
  LoadCustomers();
  LoadGover();
  LoadCity();
  LoadTown();
  const LoadTime=setTimeout(function(){
    document.getElementById("CustomerCode").value=MaxCustomerNumber();
    Loading.className="fa fa-refresh" ;
    IsReady=true;
    clearTimeout(LoadTime);
   },2000);
}

function ClearItemCu(){
  document.getElementById("CustomerCode").value=MaxCustomerNumber();
  document.getElementById("AccountNameP").value="";
  document.getElementById("Mobil").value="";
  document.getElementById("Mobil1").value="";
  document.getElementById("WhatsUp").value="";
  document.getElementById("BiCity").value="";
  document.getElementById("City").value="";
  document.getElementById("Town").value="";
  document.getElementById("NoteP").value="";
}

function OnChangeMobil(Num){
if(Num!=undefined){
  let WhatsUp = document.getElementById("WhatsUp");
  if( WhatsUp.value =="" ){
    WhatsUp.value = Num.value;
  }
}
IsFoundCustomerMo(Num);
}

function IsFoundCustomer(Customer){
  if(Customer!=undefined){
    for (let index = 0; index < DataCustomers.length; index++) {
      if(Customer.value==DataCustomers[index].CustomerName){
        Customer.style.border="2px solid #ff0000"
        return index
      }
    }
    Customer.style.border="none";
    return -1
  }
}

function IsFoundCustomerMo(Mobile){
  if(Mobile!=undefined){
    for (let index = 0; index < DataCustomers.length; index++) {
      if(Mobile.value==DataCustomers[index].Mobile){
        Mobile.style.border="2px solid #ff0000"
        return index
      }
    }
    Mobile.style.border="none";
    return -1
  }
}

function MaxCustomerNumber(){
  let XX;
  let CustomerNumber=[];
  for (let index = 0; index < DataCustomers.length; index++) {
    if(DataCustomers[index].Num!="" ){
      CustomerNumber.push(DataCustomers[index].AutoCode);
    }
  }
  XX= Math.max.apply(Math, CustomerNumber) + 1;
  if(isNaN(XX)==true){return 1}else{return XX}
}

function IstrueGover(Gover){
  let GoverName;
    for (let index = 0; index < DataGover.length; index++) {
      GoverName=DataGover[index].GoverName;
    if(GoverName==Gover ){
      return true
    }
  }
  return false;
}

function IstrueCity(City,Gover){
  let GoverName,CityName;
    for (let index = 0; index < DataCity.length; index++) {
      CityName=DataCity[index].CityName;
      GoverName=DataCity[index].GoverName;
    if(GoverName==Gover &&  CityName==City){
      return true
    }
  }
  return false;
}
function IstrueTwon(Town,City){
  let TownName,CityName;
    for (let index = 0; index < DataTown.length; index++) {
      TownName=DataTown[index].TownName;
      CityName=DataTown[index].CityName;
    if(TownName==Town &&  CityName==City){
      return true
    }
  }
  return false;
}

function IstrueDataInform(){
  let AccountNameP=document.getElementById("AccountNameP");
  let Mobil=document.getElementById("Mobil");
  let WhatsUp=document.getElementById("WhatsUp");
  let BiCity=document.getElementById("BiCity");
  let City=document.getElementById("City");
  let Town=document.getElementById("Town");
  if(AccountNameP.value==""){AccountNameP.style.border="2px solid #ff0000";return false}else{AccountNameP.style.border="none";}
  if(Mobil.value==""){Mobil.style.border="2px solid #ff0000";return false}else{Mobil.style.border="none";}
  if(WhatsUp.value==""){WhatsUp.style.border="2px solid #ff0000";return false}else{WhatsUp.style.border="none";}
  if(BiCity.value==""){BiCity.style.border="2px solid #ff0000";return false}else{BiCity.style.border="none";}
  if(IstrueGover(BiCity.value)==false){BiCity.style.border="2px solid #ff0000";return false}else{BiCity.style.border="none";}
  if(City.value==""){City.style.border="2px solid #ff0000";return false}else{City.style.border="none";}
  if(IstrueCity(City.value,BiCity.value)==false){City.style.border="2px solid #ff0000";return false}else{City.style.border="none";}
  if(Town.value==""){Town.style.border="2px solid #ff0000";return false}else{Town.style.border="none";}
  if(IstrueTwon(Town.value,City.value)==false){Town.style.border="2px solid #ff0000";return false}else{Town.style.border="none";}
  return true;
}

function onsubmitForm1(){
  if(IstrueDataInform()===true){
    document.getElementById("CustomerCode").value=MaxCustomerNumber();
    document.getElementById("ModeP").value="1";
    onsubmitForm(5000);
  }
}

function IsFoundCustomerModify(){
  let Customer =document.getElementById("AccountNameP");
  let Code =document.getElementById("CustomerCode");
    for (let index = 0; index < DataCustomers.length; index++) {
      if(Customer.value==DataCustomers[index].CustomerName && DataCustomers[index].AutoCode !=Code.value){
        Customer.style.border="2px solid #ff0000"
        return index
      }
    }
    Customer.style.border="none";
    return -1
}

function onsubmitForm2(){
  if(IstrueDataInform()===true){
    if(IsFoundCustomerModify()==-1){
    document.getElementById("ModeP").value="2";
    onsubmitForm(5000);
  }
  }
}


function onsubmitForm3(){
  if (IsFoundCustomer(document.getElementById("AccountNameP"))==-1){return}
  document.getElementById("ModeP").value="3";
  onsubmitForm(4000);
}

function onsubmitForm(Time){
  document.getElementById("typeP").value="4";
  document.getElementById("UserNameP").value=localStorage.getItem("UserCode");
  let MainForm=document.getElementById("FormCutomerDetails");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action=Script;
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                location.reload();
    }, Time);
  }
} 

// **************************CustomerBrowser***********

function ClearValueN(){
  document.getElementById("SeaName").value=""
}

function ClearValueM(){
  document.getElementById("SeaMob").value=""
}

function ClearValueG(){
  document.getElementById("SeaBiCity").value=""
}

function ClearValueC(){
  document.getElementById("SeaCity").value=""
  LoadCityItems1();
}

function ClearValueT(){
  document.getElementById("SeaTown").value=""
  LoadTownItems1();
}

function LoadCustomersToTable(){
let UserCode=localStorage.getItem("UserCode");
IsReady=false;
let Loading =document.getElementById("LoadingCustomerBrowser");
Loading.className="fa fa-refresh fa-spin"
document.getElementById("bodydata").innerHTML=""
LoadCustomers();
  const myTimeout = setTimeout(function(){ 
  if (isNaN(DataCustomers[0].AccountNum)==false){
      for (let index = 0; index < DataCustomers.length; index++) {
        if(DataCustomers[index].AccountNum!="" && DataCustomers[index].SaleManCode==UserCode){
          AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,DataCustomers[index].CustomerName,DataCustomers[index].Mobile,DataCustomers[index].WhatsUp,DataCustomers[index].Gover,DataCustomers[index].City,DataCustomers[index].Town)
        }
  }
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function FillterustomersToTable(){
  let UserCode=localStorage.getItem("UserCode");
  let CustomerName,Mobile,Gover,City,Town,Customer,Mob,Gov,Cit,Tow;
  Customer=document.getElementById("SeaName").value
  Mob=document.getElementById("SeaMob").value
  Gov=document.getElementById("SeaBiCity").value
  Cit=document.getElementById("SeaCity").value
  Tow=document.getElementById("SeaTown").value
  IsReady=false;
  let Loading =document.getElementById("LoadingCustomerBrowser");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodydata").innerHTML=""
    const myTimeout = setTimeout(function(){ 
    if (isNaN(DataCustomers[0].AccountNum)==false){
        for (let index = 0; index < DataCustomers.length; index++){
          CustomerName=DataCustomers[index].CustomerName;
          Mobile=DataCustomers[index].Mobile;
          Gover=DataCustomers[index].Gover;
          City=DataCustomers[index].City;
          Town=DataCustomers[index].Town;
          if(DataCustomers[index].AccountNum!="" && DataCustomers[index].SaleManCode==UserCode){
            if(Customer!=""){
              if(Customer==CustomerName){
                AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
              }
              }else if (Mob!="" ){
                  if(Mob==Mobile){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
              }else if(Gov!="" && Cit !="" && Tow !="" ){
                if(Gov==Gover && Cit==City && Tow==Town){
                  AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                  }
                }else if(Gov=="" && Cit !="" && Tow !="" ){
                  if( Cit==City && Tow==Town){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
                }else if(Gov=="" && Cit =="" && Tow !=""){
                  if( Tow==Town){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
                }else if(Gov!="" && Cit =="" && Tow ==""){
                  if(Gov==Gover){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
                }else if(Gov!="" && Cit !="" && Tow ==""){
                  if(Gov==Gover && Cit==City){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
                }else if(Gov!="" && Cit =="" && Tow !=""){
                  if(Gov==Gover && Tow==Town){
                    AddRowCu(DataCustomers[index].AccountNum,DataCustomers[index].AutoCode,CustomerName,Mobile,DataCustomers[index].WhatsUp,Gover,City,Town)
                    }
                  }
              }
            }
          }
    Loading.className="fa fa-refresh" ;
    IsReady=true;
    clearTimeout(myTimeout)
  }, 2000);
  }

function AddRowCu(AccountNum,AutoCode,CustomerName,Mobile,WhatsUp,Gover,City,Town) {
  let bodydata=document.getElementById("bodydata");
  let row = bodydata.insertRow();
  row.id="Cu" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "AccountNum";
  cell.innerHTML = AccountNum;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "AutoCode";
  cell.innerHTML = AutoCode;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "CustomerName";
  cell.innerHTML = CustomerName;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "Mobile";
  cell.innerHTML = Mobile;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "WhatsUp";
  cell.innerHTML = WhatsUp;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "Gover";
  cell.innerHTML = Gover;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "City";
  cell.innerHTML = City;
  cell = row.insertCell();
  cell.id="Cu" + bodydata.childElementCount + "Town";
  cell.innerHTML = Town;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('button');
  btb.onclick=function(){showdatarows1()};
  btb.id="CuBut" + bodydata.childElementCount;
  btb.type="button"
  btb.innerHTML=`<a class='fa fa-edit' style='color:#ff5e00 ;width:100% ;'> </a>`
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.style.width="100%";
  };

  function showdatarows1() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent;
    for (let index = 0; index < DataCustomers.length; index++) {
      if(DataCustomers[index].AccountNum == IndexRow ){
        document.getElementById("RowCu").value= DataCustomers[index].AccountNum + 1;
        document.getElementById("CustomerCode").value= DataCustomers[index].AutoCode;
        document.getElementById("AccountNameP").value= DataCustomers[index].CustomerName;
        document.getElementById("Mobil").value=DataCustomers[index].Mobile;
        document.getElementById("WhatsUp").value=DataCustomers[index].WhatsUp;
        document.getElementById("BiCity").value=DataCustomers[index].Gover;
        document.getElementById("City").value=DataCustomers[index].City;
        document.getElementById("Town").value=DataCustomers[index].Town;
        document.getElementById("NoteP").value=DataCustomers[index].Note;
      }
    }
    ShowSelectForm("CustomerWi");
  };

// ********************SalesWi

function ClearItemSa(){
  document.getElementById("BillNumberS").value =MaxBillNumberS();
  let Ti =new Date().getTime().valueOf();
  let Ti1 =new Date().getTimezoneOffset().valueOf();
  let Ti2 =Ti1*60*1000 * -1 + Ti;
  document.getElementById("BillDateS").valueAsDate =new Date(Ti2);
  document.getElementById("CustomerName").value ="";
  document.getElementById("CustomerCode1").value ="";
  document.getElementById("WareHouse").value ="";
  document.getElementById("WareHouseCode").value ="";
  document.getElementById("NoteS").value ="";
  document.getElementById("bodyBillSa").innerHTML ="";
  AddRowPrElementS();
  document.getElementById("STotal").value ="";
}

function MaxBillNumberS(){
  let XX;
  let BillNumbers0=[];
  for (let index = 0; index < DataSales.length; index++) {
    if(DataSales[index].Num!="" ){
      BillNumbers0.push(DataSales[index].BillNumber);
    }
  }
  XX= Math.max.apply(Math, BillNumbers0) + 1;
  if(isNaN(XX)==true){return 1}else{return XX}
}

function LoadSalesWi(){
  IsReady=false;
  document.getElementById("bodyBillSa").innerHTML ="";
  let Loading =document.getElementById("LoadingSalesWi");
  Loading.className="fa fa-refresh fa-spin"
  let Ti =new Date().getTime().valueOf();
  let Ti1 =new Date().getTimezoneOffset().valueOf()
  let Ti2 =Ti1*60*1000 * -1 + Ti
  document.getElementById("BillDateS").valueAsDate =new Date(Ti2);
  LoadCustomers();
  LoadWareHouse();
  LoadMat();
  const LoadTime=setTimeout(function(){
    document.getElementById("BillNumberS").value =MaxBillNumberS();
    AddRowPrElementS();
    Loading.className="fa fa-refresh" ;
    IsReady=true;
    clearTimeout(LoadTime);
   },2000);
}

function AddRowPrElementS() {
  var td;
  let bodydata=document.getElementById("bodyBillSa");
  let row = bodydata.insertRow();
  row.id="PRBS" + bodydata.childElementCount;
  row.className="PRBRowS";
   row.appendChild(td=document.createElement('td'));
  td.innerHTML=`<input list='listMatName${bodydata.childElementCount}' id="PRBCodeNS${bodydata.childElementCount}"  style='width:95%;' class="TableInputMnS"  autocomplete="off" onkeyup="LoadMatsPrice(this);" />`;
  var datalist = document.createElement('datalist');
  datalist.id=`listMatName${bodydata.childElementCount}`;
  td.appendChild(datalist);
  LoadMatsName(bodydata.childElementCount);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.id="MatCodeS" + bodydata.childElementCount ;
  btb.name="MatCode" + bodydata.childElementCount ;
  td.style.display="none";
  btb.className="MatCodeSS";
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMaS";
  btb.style.width="92%";
  btb.id="PRBAmountS" + bodydata.childElementCount ;
  btb.name="Amount" + bodydata.childElementCount ;
  btb.onkeyup=function(){CalculateRowAS(this.value,this.id)};
  btb.onchange=function(){CalculateRowAS(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMpS";
  btb.style.width="92%";
  btb.id="PRBPriceS" + bodydata.childElementCount ;
  btb.name="Price" + bodydata.childElementCount ;
  btb.readOnly=true;
  btb.onchange=function(){CalculateRowS(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputBon";
  btb.style.width="92%";
  btb.id="PRBMatBos" + bodydata.childElementCount ;
  btb.name="MatBos" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMtS";
  btb.style.width="92%";
  btb.readOnly=true;
  btb.id="PRBMatTotalS" + bodydata.childElementCount ;
  btb.name="MatTotal" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.autocomplete="off";
  btb.className="TableInputMnoS";
  btb.style.width="92%";
  btb.id="PRBNoteS" + bodydata.childElementCount ;
  btb.name="Note" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  btb = document.createElement('input');
  btb.type = "button";
  btb.id="PRBDS" + bodydata.childElementCount;
  btb.value = "X";
  btb.className="BtnStyle";
  btb.onclick=function(){DeleteRowS(this.id)};
  td.appendChild(btb)
  };


  function DeleteRowS(TRow){
    let Row=String(TRow).slice(5,String(TRow).length);
    document.getElementById("PRBS" + Row).hidden=true;
    CaluclateTotalS();
  }

function LoadMatsName(Num){
  let MatName,MatNum;
  let optionClass;
  let listMatName =document.getElementById("listMatName" + Num);
  listMatName.innerHTML="";
  for (let index = 0; index < DataMat.length; index++) {
    MatNum=DataMat[index].MatNum
    MatName=DataMat[index].MatName
    if(MatNum!=""){
      optionClass=document.createElement("option");
      optionClass.value=MatName;
      optionClass.textContent=MatName;
      listMatName.appendChild(optionClass);
    }
  }
}
function LoadMatsPrice(Mat){
  const StrId=Mat.id
  let PRBPriceStr="PRBPriceS" + StrId.slice(9,StrId.length);
  let MatCodeStr="MatCodeS" + StrId.slice(9,StrId.length);
  let PRBPriceS =document.getElementById(PRBPriceStr);
  let MatCodeTxt =document.getElementById(MatCodeStr);
  if(Mat!=undefined){
    let MatName,MatPrice,MatCode;
    for (let index = 0; index < DataMat.length; index++) {
      MatName=DataMat[index].MatName
      MatPrice=DataMat[index].MatPrice
      MatCode=DataMat[index].MatCode
      if(MatName==Mat.value){
        PRBPriceS.value=MatPrice;
        MatCodeTxt.value=MatCode;
        return;
      }
    }
    PRBPriceS.value="";
    MatCodeTxt.value="";
    return;
  }else{
    PRBPriceS.value="";
    MatCodeTxt.value="";
  }
}

function CalculateRowAS(Am,TRow){
  let Row=String(TRow).slice(10,String(TRow).length);
  let Pr=document.getElementById("PRBPriceS" + Row).value
  document.getElementById("PRBMatTotalS" + Row).value = Pr * Am
  CaluclateTotalS();
}

function CalculateRowS(Pr,TRow){
  let Row=String(TRow).slice(9,String(TRow).length);
  let Am=document.getElementById("PRBAmountS" + Row).value
  document.getElementById("PRBMatTotalS" + Row).value = Pr * Am
  CaluclateTotalS();
}

function CaluclateTotalS(){
  let PTotal = document.getElementById("STotal");
  let TableInputMt=document.getElementsByClassName("TableInputMtS");
  let total = 0 ;
  for (let index = 0; index < TableInputMt.length; index++) {
    if (TableInputMt.item(index).parentElement.parentElement.hidden==false){
      total =  total + Number(TableInputMt.item(index).value);
    }
  }
  PTotal.value=total;
}

function IstrueCustomer(Customer){
    for (let index = 0; index < DataCustomers.length; index++) {
      if(Customer.value==DataCustomers[index].CustomerName){
        document.getElementById("CustomerCode1").value=DataCustomers[index].AutoCode;
        return index
      }
    }
    return -1
}

function IstrueWare(Ware){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(Ware.value==DataWareHouse[index].WareHouseName){
    document.getElementById("WareHouseCode").value=DataWareHouse[index].WareHouseCode;
      return index
    }
  }
  return -1
}

  
function IstrueDataInformS(){
  let BillDateP=document.getElementById("BillDateS");
  let CustomerName=document.getElementById("CustomerName");
  let WareHouse=document.getElementById("WareHouse");
  let bodyBillPur=document.getElementById("bodyBillSa"); 
  let PurchasesItems=document.getElementById("SalesItems");   
  if(BillDateP.value==""){BillDateP.style.border="2px solid #ff0000";return false}else{BillDateP.style.border="none";}
  if(CustomerName.value==""){CustomerName.style.border="2px solid #ff0000";return false}else{CustomerName.style.border="none";}
  if(IstrueCustomer(CustomerName)==-1){CustomerName.style.border="2px solid #ff0000";return false}else{CustomerName.style.border="none";}
  if(WareHouse.value==""){WareHouse.style.border="2px solid #ff0000";return false}else{WareHouse.style.border="none";}
  if(IstrueWare(WareHouse)==-1){WareHouse.style.border="2px solid #ff0000";return false}else{WareHouse.style.border="none";}
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  if(IsTableInputMnTrueS()==false){return false};
  if(IsTableInputMaTrueS()==false){return false};
  if(IsTableInputMpSTrueS()==false){return false};
  if(IsTableInputBos()==false){return false};
  RemoveRowHiddenS();
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  return true;
}

function IsTableInputMnTrueS(){
  let TableInputMn=document.getElementsByClassName("TableInputMnS");
  for (let index = 0; index < TableInputMn.length; index++) {
    if (TableInputMn.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMn.item(index).value==""){
        TableInputMn.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMn.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function IsTableInputMaTrueS(){
  let TableInputMa=document.getElementsByClassName("TableInputMaS");
  for (let index = 0; index < TableInputMa.length; index++) {
    if (TableInputMa.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMa.item(index).value<=0){
        TableInputMa.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMa.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function IsTableInputMpSTrueS(){
  let TableInputMa=document.getElementsByClassName("TableInputMpS");
  for (let index = 0; index < TableInputMa.length; index++) {
    if (TableInputMa.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMa.item(index).value==""){
        TableInputMa.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMa.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}
function IsTableInputBos(){
  let TableInputMa=document.getElementsByClassName("TableInputBon");
  for (let index = 0; index < TableInputMa.length; index++) {
    if (TableInputMa.item(index).parentElement.parentElement.hidden==false){
      if ( TableInputMa.item(index).value<0){
        TableInputMa.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMa.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function RemoveRowHiddenS(){
  let ArraryNamesRow=[];
  let ArraryNames=[];
    let PRBRow=document.getElementsByClassName("PRBRowS");
    for (let index1 = PRBRow.length - 1; index1 >= 0 ; index1--) {
      if (PRBRow.item(index1).hidden==true){
        PRBRow.item(index1).remove();
      }
    }
    for (let index = 0; index < PRBRow.length; index++) {
        var RowN=PRBRow.item(index).children;
        for (let indexN = 0; indexN < RowN.length; indexN++) {
          var RowNi =RowN.item(indexN).children.item(0)
          if(RowNi.name !=""){
            ArraryNames.push(RowNi.name);
          }
        }
        ArraryNamesRow.push(ArraryNames);
        ArraryNames=[];
    }
    document.getElementById("ArrayTableS").value=ArraryNamesRow;
}

function onsubmitFormS1(){
  if(IstrueDataInformS()===true){
    document.getElementById("BillNumberS").value=MaxBillNumberS();
    document.getElementById("ModeS").value="1";
    onsubmitFormS(6000);
    const myTimeout = setTimeout(function(){ 
      ExportSaleBill();
      clearTimeout(myTimeout)
    }, 6500);
  }
}

function onsubmitFormS2(){
  if(IstrueDataInformS()===true){
    document.getElementById("ModeS").value="2";
    onsubmitFormS(10000);
    const myTimeout = setTimeout(function(){ 
      ExportSaleBill();
      clearTimeout(myTimeout)
    }, 10500);
  }
}

function IsNumTrue(BillNumber){
  for (let index = 0; index < DataSales.length; index++) {
    if(DataSales[index].BillNumber==BillNumber ){
      return true
    }
  }
  return false
}

function onsubmitFormS3(){
  if (IsNumTrue(document.getElementById("BillNumberS").value)==true){
    document.getElementById("ModeS").value="3";
    onsubmitFormS(8000);
    const myTimeout = setTimeout(function(){ 
      location.reload();
      clearTimeout(myTimeout)
    }, 8000);
  }
}

function onsubmitFormS(Time){
  document.getElementById("typeS").value="2";
  document.getElementById("UserNameS").value=localStorage.getItem("UserCode");
  let MainForm=document.getElementById("FormSalesDetails");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action=Script;
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
    }, Time);
  }
} 


// **************************SalesBrowser***********
function ClearValueNu(){
  document.getElementById("SeaNumber").value=""
}

function ClearValueCus(){
  document.getElementById("SeCustomer").value=""
}

function ClearValueWa(){
  document.getElementById("SeaWarehouse").value=""
}

function ClearValueDa(){
  document.getElementById("SeaDate").value=""
}

function GetDateFromString(Str){
  let MM,DD;
  let ZZ=[];
  let SS=String(Str).substring(5,String(Str).length-1);
  ZZ=SS.split(",");
  if (Number(ZZ[1])<9 && Number(ZZ[1]).length!= 2){ MM=0 + String(parseInt(ZZ[1]) + 1)}else{ MM=(parseInt(ZZ[1]) + 1)}
  if (Number(ZZ[2])<=9 && Number(ZZ[1]).length!= 2){ DD=0 + ZZ[2]}else{ DD=ZZ[2]}
  return ZZ[0] + "-" + MM + "-" + DD
}

function GetNameAccount(Code){
  for (let index = 0; index < DataCustomers.length; index++) {
    if(DataCustomers[index].AutoCode==Code ){
      return DataCustomers[index].CustomerName
    }
  }
  return "none"
}

function GetCodeCustomer(Nam){
  for (let index = 0; index < DataCustomers.length; index++) {
    if(DataCustomers[index].CustomerName ==Nam ){
      return DataCustomers[index].AutoCode
    }
  }
  return -1
}

function GetWareName(Code){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(DataWareHouse[index].WareHouseCode==Code ){
      return DataWareHouse[index].WareHouseName
    }
  }
  return "none"
}

function GetCodeWare(Nam){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(DataWareHouse[index].WareHouseName ==Nam ){
      return DataWareHouse[index].WareHouseCode
    }
  }
  return -1
}

function GetMatNameFormCode1(Code){
  for (let index = 0; index < DataMat.length; index++) {
    if(DataMat[index].MatCode==Code ){
      return DataMat[index].MatName;
    }
  }
}

function LoadSalesToTable(){
  IsReady=false;
  let Loading =document.getElementById("LoadingSalesBrowser");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodydataS").innerHTML=""
  LoadSales();
  LoadWareHouse();
  LoadCustomers();
  LoadBillNumbers();
  const myTimeout = setTimeout(function(){ 
  if (isNaN(DataSales[0].Num)==false){
  for (let index = 0; index < DataSales.length; index++) {
    if(DataSales[index].Num!="" ){
      AddRowPrS(DataSales[index].BillNumber,DataSales[index].BillDateS,DataSales[index].AccountCode,DataSales[index].WareHouse,DataSales[index].Total)
    }
  }
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function FillterSalesToTable(){
  let SeaNumber=document.getElementById("SeaNumber");
  let SeCustomer=document.getElementById("SeCustomer");
  let SeaWarehouse=document.getElementById("SeaWarehouse");
  let SeaDate=document.getElementById("SeaDate");
  IsReady=false;
  let Loading =document.getElementById("LoadingSalesBrowser");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodydataS").innerHTML=""
  LoadSales();
  LoadWareHouse();
  LoadCustomers();
  LoadBillNumbers();
  let BillNumber,BillDateS,AccountCode,WareHouse;
  const myTimeout = setTimeout(function(){ 
  if (isNaN(DataSales[0].Num)==false){
  for (let index = 0; index < DataSales.length; index++) {
    BillNumber=DataSales[index].BillNumber;
    BillDateS=DataSales[index].BillDateS;
    AccountCode=DataSales[index].AccountCode
    WareHouse=DataSales[index].WareHouse
    if(DataSales[index].Num!="" ){
      if(SeaNumber.value!=""){
        if(BillNumber==SeaNumber.value){
          AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value!="" && SeaWarehouse.value!="" && SeaDate.value!=""){
        if(AccountCode==GetCodeCustomer(SeCustomer.value) && WareHouse==GetCodeWare(SeaWarehouse.value) && GetDateFromString(BillDateS)==SeaDate.value){
          AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value!="" && SeaWarehouse.value!="" && SeaDate.value==""){
        if(AccountCode==GetCodeCustomer(SeCustomer.value) && WareHouse==GetCodeWare(SeaWarehouse.value) ){
          AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value!="" && SeaWarehouse.value=="" && SeaDate.value==""){
        if(AccountCode==GetCodeCustomer(SeCustomer.value) ){
          AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value=="" && SeaWarehouse.value!="" && SeaDate.value==""){
        if(WareHouse==GetCodeWare(SeaWarehouse.value)){
        AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value=="" && SeaWarehouse.value=="" && SeaDate.value!=""){
        if( GetDateFromString(BillDateS)==SeaDate.value){
        AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value=="" && SeaWarehouse.value!="" && SeaDate.value!=""){
        if( WareHouse==GetCodeWare(SeaWarehouse.value) && GetDateFromString(BillDateS)==SeaDate.value){
        AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else if(SeCustomer.value!="" && SeaWarehouse.value=="" && SeaDate.value!=""){
        if( AccountCode==GetCodeCustomer(SeCustomer.value) && GetDateFromString(BillDateS)==SeaDate.value){
        AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
        }
      }else{
        AddRowPrS(BillNumber,BillDateS,AccountCode,WareHouse,DataSales[index].Total)
      }
  }
}
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function AddRowPrS(BillNumberP,BillDateP,AccountCodeP,WareHouseS,TotalP) {
  let bodydata=document.getElementById("bodydataS");
  let row = bodydata.insertRow();
  row.id="S" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "BillNumberS";
  cell.innerHTML = BillNumberP;
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "BillDateS";
  cell.innerHTML = GetDateFromString(BillDateP);
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "AccountCodeS";
  cell.innerHTML = AccountCodeP;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "AccountNameS";
  cell.innerHTML = GetNameAccount(AccountCodeP);
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "WareHouseS";
  cell.innerHTML = WareHouseS;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "WareHouseSN";
  cell.innerHTML = GetWareName(WareHouseS);
  cell = row.insertCell();
  cell.id="S" + bodydata.childElementCount + "TotalS";
  cell.innerHTML = TotalP;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('button');
  btb.type = "button";
  btb.id="ButS" + bodydata.childElementCount;
  btb.onclick=function(){showdatarowsS()};
  btb.innerHTML=`<a class='fa fa-edit' style='color:#ff5e00 ; width:100% ;'> </a>`
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.style.width="100%";
  };


  function showdatarowsS() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent  ;
    let NameAccountTable=document.getElementById(indextable).children.item(3).textContent  ;
    let WareHouseTable=document.getElementById(indextable).children.item(5).textContent  ;
    document.getElementById("CustomerName").value=NameAccountTable;
    document.getElementById("WareHouse").value=WareHouseTable;
    document.getElementById("bodyBillSa").innerHTML="";
    ShowSelectForm("SalesWi");
    for (let index = 0; index < DataSales.length; index++) {
      if(DataSales[index].BillNumber == IndexRow){
        document.getElementById("BillNumberS").value= IndexRow;
        document.getElementById("BillDateS").value=GetDateFromString(DataSales[index].BillDateS);
        document.getElementById("CustomerCode1").value=DataSales[index].AccountCode;
        document.getElementById("WareHouseCode").value=DataSales[index].WareHouse;
        document.getElementById("NoteS").value=DataSales[index].Note;
        document.getElementById("STotal").value=DataSales[index].Total;
      }
    }
    let IndexTableRow = 1;
    for (let indexM = 0; indexM < DataMove.length; indexM++) {
      if(DataMove[indexM].BillNumber == IndexRow && DataMove[indexM].Type=="2"){
        AddRowPrElementS();
        document.getElementById(`PRBCodeNS${IndexTableRow}`).value=GetMatNameFormCode1(DataMove[indexM].MatCode)
        document.getElementById(`MatCodeS${IndexTableRow}`).value= DataMove[indexM].MatCode;
        document.getElementById(`PRBAmountS${IndexTableRow}`).value= Math.abs(DataMove[indexM].Amount);
        document.getElementById(`PRBMatBos${IndexTableRow}`).value= DataMove[indexM].Bon;
        document.getElementById(`PRBPriceS${IndexTableRow}`).value= DataMove[indexM].Price;
        document.getElementById(`PRBMatTotalS${IndexTableRow}`).value= DataMove[indexM].MatTotal;
        document.getElementById(`PRBNoteS${IndexTableRow}`).value= DataMove[indexM].Note;
        IndexTableRow++;
      }
    }
    CaluclateTotalS();
    document.getElementById("CountRowS").value=IndexTableRow - 1;
  };



// **************************MatsBrowser***********

function LoadMatBalance(){
  DataMatBalance=[];
  fetch(UrlMatBalance)
  .then(res => res.text())
  .then(rep => {
      const jsonData9 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser9 = [];
      jsonData9.table.cols.forEach((heading9) => {
          if (heading9.label) {
              let columnUser9 = heading9.label;
              colzUser9.push(columnUser9);
          }
      })
      jsonData9.table.rows.forEach((rowData9) => {
          const rowUser9 = {};
          colzUser9.forEach((ele, ind) => {
              rowUser9[ele] = (rowData9.c[ind] != null) ? rowData9.c[ind].v : '';
          })
          DataMatBalance.push(rowUser9);
      })
  })
}

function LoadMoveWM(){
  DataMoveWM=[];
  fetch(UrlMoveWM)
  .then(res => res.text())
  .then(rep => {
      const jsonData10 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser10 = [];
      jsonData10.table.cols.forEach((heading10) => {
          if (heading10.label) {
              let columnUser10 = heading10.label;
              colzUser10.push(columnUser10);
          }
      })
      jsonData10.table.rows.forEach((rowData10) => {
          const rowUser10 = {};
          colzUser10.forEach((ele, ind) => {
              rowUser10[ele] = (rowData10.c[ind] != null) ? rowData10.c[ind].v : '';
          })
          DataMoveWM.push(rowUser10);
      })
  })
}

function ClearValueW1(){
  document.getElementById("SeaWarehouse1").value=""
}

function ClearValueM1(){
  document.getElementById("SeaItem").value=""
}

function LoadMatsToTable(){
  let WareHouse,MatCode,SaleManCode;
  let Saleman=localStorage.getItem("UserCode");
  IsReady=false;
  let Loading =document.getElementById("LoadingMat");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodyTableMats").innerHTML=""
  LoadMatBalance();
  LoadWareHouse();
  LoadMoveWM();
  const myTimeout = setTimeout(function(){ 
  if (isNaN(DataMatBalance[0].Num)==false){
  for (let index = 0; index < DataMatBalance.length; index++) {
    WareHouse=DataMatBalance[index].WareHouse;
    MatCode=DataMatBalance[index].MatCode;
    SaleManCode=DataMatBalance[index].SaleManCode;
    if(DataMatBalance[index].Num!="" && SaleManCode==Saleman){
      AddRowMats(GetWareName(WareHouse),WareHouse,GetMatNameFormCode1(MatCode),MatCode,DataMatBalance[index].Amount,DataMatBalance[index].AmountWanted)
    }
  }
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function FillteMatsToTable(){
  let WareHouse,MatCode,SaleManCode;
  let SeaWarehouse1=document.getElementById("SeaWarehouse1");
  let SeaItem=document.getElementById("SeaItem");
  let Saleman=localStorage.getItem("UserCode");
  IsReady=false;
  let Loading =document.getElementById("LoadingMat");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodyTableMats").innerHTML=""
  LoadMatBalance();
  LoadWareHouse();
  const myTimeout = setTimeout(function(){ 
  if (isNaN(DataMatBalance[0].Num==false)){
  for (let index = 0; index < DataMatBalance.length; index++) {
    WareHouse=DataMatBalance[index].WareHouse;
    MatCode=DataMatBalance[index].MatCode;
    SaleManCode=DataMatBalance[index].SaleManCode;
    if(DataMatBalance[index].Num!="" && SaleManCode==Saleman){
      if(SeaWarehouse1.value!="" && SeaItem.value!=""){
        if(GetWareName(WareHouse)==SeaWarehouse1.value && GetMatNameFormCode1(MatCode)==SeaItem.value){
          AddRowMats(GetWareName(WareHouse),WareHouse,GetMatNameFormCode1(MatCode),MatCode,DataMatBalance[index].Amount,DataMatBalance[index].AmountWanted)
        }
      }else if(SeaWarehouse1.value=="" && SeaItem.value!=""){
        if(GetMatNameFormCode1(MatCode)==SeaItem.value){
          AddRowMats(GetWareName(WareHouse),WareHouse,GetMatNameFormCode1(MatCode),MatCode,DataMatBalance[index].Amount,DataMatBalance[index].AmountWanted)
        }
    }else if(SeaWarehouse1.value!="" && SeaItem.value==""){
      if(GetWareName(WareHouse)==SeaWarehouse1.value){
        AddRowMats(GetWareName(WareHouse),WareHouse,GetMatNameFormCode1(MatCode),MatCode,DataMatBalance[index].Amount,DataMatBalance[index].AmountWanted)
      }
    }else {
      AddRowMats(GetWareName(WareHouse),WareHouse,GetMatNameFormCode1(MatCode),MatCode,DataMatBalance[index].Amount,DataMatBalance[index].AmountWanted)
    }
  }
}
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function AddRowMats(Warename,WareCode,MatName,MatCode,MatBalance,AmountW) {
  let td;
  let bodydata=document.getElementById("bodyTableMats");
  let row = bodydata.insertRow();
  row.id="ACC" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="ACC" + bodydata.childElementCount + "Warename";
  cell.innerHTML = Warename;
  cell = row.insertCell();
  cell.id="ACC" + bodydata.childElementCount + "WareCode";
  cell.style.display="none";
  cell.innerHTML =WareCode;
  cell = row.insertCell();
  cell.id="ACC" + bodydata.childElementCount + "MatName";
  cell.innerHTML = MatName;
  cell = row.insertCell();
  cell.id="ACC" + bodydata.childElementCount + "MatCode";
  cell.innerHTML = MatCode;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="ACC" + bodydata.childElementCount + "MatBalance";
  cell.innerHTML = MatBalance;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.style.width="92%";
  btb.id="LAmount" + bodydata.childElementCount ;
  btb.name="LAmount" + bodydata.childElementCount ;
  btb.className="LAmounts";
  btb.value=AmountW;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  btb = document.createElement('input');
  btb.type = "button";
  btb.id="Lbutton" + bodydata.childElementCount;
  btb.value = "+";
  btb.className="BtnStyle1";
  btb.onclick=function(){ShowMatsWanted()};
  td.appendChild(btb)
  };

  function ShowMatsWanted() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let AmountWareName=document.getElementById(indextable).children.item(0).textContent  ;
    let AmountWareCode=document.getElementById(indextable).children.item(1).textContent  ;
    let AmountMatName=document.getElementById(indextable).children.item(2).textContent  ;
    let AmountMatCode=document.getElementById(indextable).children.item(3).textContent  ;
    let MatBalanes=document.getElementById(indextable).children.item(4).textContent  ;
    let AmountWanted =document.getElementById(indextable).children.item(5).children.item(0).value;
    document.getElementById("AmountMatNum").value=MaxBillAmountNum();
    document.getElementById("AmountWareName").value=AmountWareName;
    document.getElementById("AmountWareCode").value=AmountWareCode;
    document.getElementById("AmountMatName").value=AmountMatName;
    document.getElementById("AmountMatCode").value=AmountMatCode;
    document.getElementById("MatBalanes").value=MatBalanes;
    document.getElementById("AmountWanted").value=AmountWanted;
    ShowSelectForm("AmountMat");
  };

// ***********************AmountMat*********************
function LoadAmountMat(){
  IsReady=false;
  let Loading =document.getElementById("LoadingAmountMat");
  Loading.className="fa fa-refresh fa-spin"
  ShowSelectForm("AmountMat");
  LoadWareHouse();
  LoadMat();
  const LoadTime=setTimeout(function(){
    Loading.className="fa fa-refresh" ;
    IsReady=true;
    clearTimeout(LoadTime);
   },2000);
}

function MaxBillAmountNum(){
  let XX;
  let BillNumbers1=[];
  for (let index = 0; index < DataMoveWM.length; index++) {
    if(DataMoveWM[index].Num!="" ){
      BillNumbers1.push(DataMoveWM[index].AmountMatNum);
    }
  }
  XX= Math.max.apply(Math, BillNumbers1) + 1;
  if(isNaN(XX)==true){return 1}else{return XX}
}

function IstrueMats(Mat){
  for (let index = 0; index < DataMat.length; index++) {
    if(Mat.value==DataMat[index].MatName){
      return index
    }
  }
  return -1
}

function IstrueWare1(Ware){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(Ware.value==DataWareHouse[index].WareHouseName){
      return index
    }
  }
  return -1
}
  

function IstrueAmountInformS(){
  let AmountWareName=document.getElementById("AmountWareName");
  let AmountMatName=document.getElementById("AmountMatName");
  let AmountWanted=document.getElementById("AmountWanted");
  if(AmountWareName.value==""){AmountWareName.style.border="2px solid #ff0000";return false}else{AmountWareName.style.border="none";}
  if(IstrueWare1(AmountWareName)==-1){AmountWareName.style.border="2px solid #ff0000";return false}else{AmountWareName.style.border="none";}
  if(AmountMatName.value==""){AmountMatName.style.border="2px solid #ff0000";return false}else{AmountMatName.style.border="none";}
  if(IstrueMats(AmountMatName)==-1){AmountMatName.style.border="2px solid #ff0000";return false}else{AmountMatName.style.border="none";}
  if(AmountWanted.value==""){AmountWanted.style.border="2px solid #ff0000";return false}else{AmountWanted.style.border="none";}
   return true;
}


function onsubmitForm10(){
  if(IstrueAmountInformS()===true){
    document.getElementById("AmountMatNum").value=MaxBillAmountNum();
    document.getElementById("ModeL").value="1";
    onsubmitFormS10(6000);
    const myTimeout = setTimeout(function(){ 
      ExportMatWant();
      clearTimeout(myTimeout)
    }, 7500);

  }
}


function onsubmitFormS10(Time){
  document.getElementById("typeL").value="5";
  document.getElementById("UserNameL").value=localStorage.getItem("UserCode");
  let MainForm=document.getElementById("FormAmountMat");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action=Script;
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
    }, Time);
  }
} 



// ***********************Mode*********************
function ConvertMode(){
  if (localStorage.getItem("FColor")==1){
    ConvertModeToSun();
  }else{
    ConvertModeToMoon();
  }
 }

function ConvertModeToSun(){
  localStorage.setItem("FColor", 1);
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333");
  document.querySelector(':root').style.setProperty('--THColor', "wheat");  
  document.querySelector(':root').style.setProperty('--TDColor', "yellow"); 
} 
function ConvertModeToMoon(){
  localStorage.setItem("FColor", 2);
  document.getElementById("Sun").style.display="inline-block";
  document.getElementById("Moon").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
  document.querySelector(':root').style.setProperty('--THColor', "gray");  
  document.querySelector(':root').style.setProperty('--TDColor', "Red"); 
}  
// '''''''''''''''''''''''

// ********************purchasesWi
function ClearItemP(){
  document.getElementById("BillNumberP").value =MaxBillNumberS();
  let Ti =new Date().getTime().valueOf();
  let Ti1 =new Date().getTimezoneOffset().valueOf()
  let Ti2 =Ti1*60*1000 * -1 + Ti
  document.getElementById("BillDateP").valueAsDate =new Date(Ti2);
  document.getElementById("SupllierName").value =""
  document.getElementById("WareHouse2").value =""
  document.getElementById("WareHouseCode2").value =""
  document.getElementById("NoteP1").value =""
  document.getElementById("bodyBillP").innerHTML =""
  AddRowPrElementP();
  document.getElementById("PTotal").value =""
}
function Loadpurchases(){
  Datapurchases=[];
  fetch(UrlPurchases)
  .then(res => res.text())
  .then(rep => {
      const jsonData11 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser11 = [];
      jsonData11.table.cols.forEach((heading11) => {
          if (heading11.label) {
              let columnUser11 = heading11.label;
              colzUser11.push(columnUser11);
          }
      })
      jsonData11.table.rows.forEach((rowData11) => {
          const rowUser11 = {};
          colzUser11.forEach((ele, ind) => {
              rowUser11[ele] = (rowData11.c[ind] != null) ? rowData11.c[ind].v : '';
          })
          Datapurchases.push(rowUser11);
      })
  })
}


function MaxBillNumberP(){
  let XX;
  let BillNumbers01=[];
  for (let index = 0; index < Datapurchases.length; index++) {
    if(Datapurchases[index].Num!="" ){
      BillNumbers01.push(Datapurchases[index].BillNumber);
    }
  }
  XX= Math.max.apply(Math, BillNumbers01) + 1;
  if(isNaN(XX)==true){return 1}else{return XX}
}

function LoadpurchasesWi(){
  IsReady=false;
  document.getElementById("bodyBillP").innerHTML =""
  let Loading =document.getElementById("LoadingpurchasesWi");
  Loading.className="fa fa-refresh fa-spin"
  Loadpurchases();
  LoadWareHouse();
  LoadMat();
  const LoadTime=setTimeout(function(){
    document.getElementById("BillNumberP").value =MaxBillNumberP();
    AddRowPrElementP();
    Loading.className="fa fa-refresh" ;
    IsReady=true;
    clearTimeout(LoadTime);
   },2000);

}

function AddRowPrElementP() {
  var td;
  let bodydata=document.getElementById("bodyBillP");
  let row = bodydata.insertRow();
  row.id="PRBP" + bodydata.childElementCount;
  row.className="PRBRowP";
   row.appendChild(td=document.createElement('td'));
  td.innerHTML=`<input list='listMatName2${bodydata.childElementCount}' id="PRBCodeNP${bodydata.childElementCount}"  style='width:95%;' class="TableInputMnP"  autocomplete="off" onkeyup="LoadMatsPrice2(this);"/>`;
  var datalist = document.createElement('datalist');
  datalist.id=`listMatName2${bodydata.childElementCount}`;
  td.appendChild(datalist);
  LoadMatsName2(bodydata.childElementCount);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.id="MatCodeP" + bodydata.childElementCount ;
  btb.name="MatCode" + bodydata.childElementCount ;
  td.style.display="none";
  btb.className="MatCodeSP";
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMaP";
  btb.style.width="92%";
  btb.id="PRBAmountP" + bodydata.childElementCount ;
  btb.name="Amount" + bodydata.childElementCount ;
  btb.onkeyup=function(){CalculateRowAP(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMpP";
  btb.style.width="92%";
  btb.id="PRBPriceP" + bodydata.childElementCount ;
  btb.name="Price" + bodydata.childElementCount ;
  btb.onchange=function(){CalculateRowP(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMtP";
  btb.style.width="92%";
  btb.readOnly=true;
  btb.id="PRBMatTotalP" + bodydata.childElementCount ;
  btb.name="MatTotal" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.autocomplete="off";
  btb.className="TableInputMnoP";
  btb.style.width="92%";
  btb.id="PRBNoteP" + bodydata.childElementCount ;
  btb.name="Note" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  btb = document.createElement('input');
  btb.type = "button";
  btb.id="PRBDP" + bodydata.childElementCount;
  btb.value = "X";
  btb.className="BtnStyle";
  btb.onclick=function(){DeleteRowP(this.id)};
  td.appendChild(btb)
  };

  function LoadMatsPrice2(Mat){
    const StrId=Mat.id
    let MatCodeStr="MatCodeP" + StrId.slice(9,StrId.length);
    let MatCodeTxt =document.getElementById(MatCodeStr);
    if(Mat!=undefined){
      let MatName,MatCode;
      for (let index = 0; index < DataMat.length; index++) {
        MatName=DataMat[index].MatName
        MatCode=DataMat[index].MatCode
        if(MatName==Mat.value){
          MatCodeTxt.value=MatCode;
          return;
        }
      }
      MatCodeTxt.value="";
      return;
    }else{
      MatCodeTxt.value="";
    }
  }
  function DeleteRowP(TRow){
    let Row=String(TRow).slice(5,String(TRow).length);
    document.getElementById("PRBP" + Row).hidden=true;
    CaluclateTotalP();
  }

function LoadMatsName2(Num){
  let MatName,MatNum;
  let optionClass;
  let listMatName2 =document.getElementById("listMatName2" + Num);
  listMatName2.innerHTML="";
  for (let index = 0; index < DataMat.length; index++) {
    MatNum=DataMat[index].MatNum
    MatName=DataMat[index].MatName
    if(MatNum!=""){
      optionClass=document.createElement("option");
      optionClass.value=MatName;
      optionClass.textContent=MatName;
      listMatName2.appendChild(optionClass);
    }
  }
}


function CalculateRowAP(Am,TRow){
  let Row=String(TRow).slice(10,String(TRow).length);
  let Pr=document.getElementById("PRBPriceP" + Row).value
  document.getElementById("PRBMatTotalP" + Row).value = Pr * Am
  CaluclateTotalP();
}

function CalculateRowP(Pr,TRow){
  let Row=String(TRow).slice(9,String(TRow).length);
  let Am=document.getElementById("PRBAmountP" + Row).value
  document.getElementById("PRBMatTotalP" + Row).value = Pr * Am
  CaluclateTotalP();
}

function CaluclateTotalP(){
  let PTotal = document.getElementById("PTotal");
  let TableInputMt=document.getElementsByClassName("TableInputMtP");
  let total = 0 ;
  for (let index = 0; index < TableInputMt.length; index++) {
    if (TableInputMt.item(index).parentElement.parentElement.hidden==false){
      total =  total + Number(TableInputMt.item(index).value);
    }
  }
  PTotal.value=total;
}


function IstrueWare2(Ware){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(Ware.value==DataWareHouse[index].WareHouseName){
    document.getElementById("WareHouseCode2").value=DataWareHouse[index].WareHouseCode;
      return index
    }
  }
  return -1
}

  
function IstrueDataInformS2(){
  let BillDateP=document.getElementById("BillDateP");
  let CustomerName=document.getElementById("SupllierName");
  let WareHouse=document.getElementById("WareHouse2");
  let bodyBillPur=document.getElementById("bodyBillP"); 
  let PurchasesItems=document.getElementById("purchasesItems");   
  if(BillDateP.value==""){BillDateP.style.border="2px solid #ff0000";return false}else{BillDateP.style.border="none";}
  if(CustomerName.value==""){CustomerName.style.border="2px solid #ff0000";return false}else{CustomerName.style.border="none";}
  if(WareHouse.value==""){WareHouse.style.border="2px solid #ff0000";return false}else{WareHouse.style.border="none";}
  if(IstrueWare2(WareHouse)==-1){WareHouse.style.border="2px solid #ff0000";return false}else{WareHouse.style.border="none";}
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  if(IsTableInputMnTrueP()==false){return false};
  if(IsTableInputMaTrueP()==false){return false};
  RemoveRowHiddenP();
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  return true;
}

function IsTableInputMnTrueP(){
  let TableInputMn=document.getElementsByClassName("TableInputMnP");
  for (let index = 0; index < TableInputMn.length; index++) {
    if (TableInputMn.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMn.item(index).value==""){
        TableInputMn.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMn.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function IsTableInputMaTrueP(){
  let TableInputMa=document.getElementsByClassName("TableInputMaP");
  for (let index = 0; index < TableInputMa.length; index++) {
    if (TableInputMa.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMa.item(index).value==""){
        TableInputMa.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMa.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function RemoveRowHiddenP(){
  let ArraryNamesRow2=[];
  let ArraryNames2=[];
    let PRBRow=document.getElementsByClassName("PRBRowP");
    for (let index1 = PRBRow.length - 1; index1 >= 0 ; index1--) {
      if (PRBRow.item(index1).hidden==true){
        PRBRow.item(index1).remove();
      }
    }
    for (let index = 0; index < PRBRow.length; index++) {
        var RowN=PRBRow.item(index).children;
        for (let indexN = 0; indexN < RowN.length; indexN++) {
          var RowNi =RowN.item(indexN).children.item(0)
          if(RowNi.name !=""){
            ArraryNames2.push(RowNi.name);
          }
        }
        ArraryNamesRow2.push(ArraryNames2);
        ArraryNames2=[];
    }
    document.getElementById("ArrayTableP1").value=ArraryNamesRow2;
}

function onsubmitFormp1(){
  if(IstrueDataInformS2()===true){
    document.getElementById("BillNumberP").value=MaxBillNumberP();
    document.getElementById("ModeP1").value="1";
    onsubmitFormS11(6000);
  }
}

function onsubmitFormp2(){
  if(IstrueDataInformS2()===true){
    document.getElementById("ModeP1").value="2";
    onsubmitFormS11(10000);
  }
}

function IsNumTrue2(BillNumber){
  for (let index = 0; index < Datapurchases.length; index++) {
    if(Datapurchases[index].BillNumber==BillNumber ){
      return true
    }
  }
  return false
}

function onsubmitFormp3(){
  if (IsNumTrue2(document.getElementById("BillNumberP").value)==true){
    document.getElementById("ModeP1").value="3";
    onsubmitFormS11(6000);
  }
}

function onsubmitFormS11(Time){
  document.getElementById("typeP1").value="1";
  document.getElementById("UserNameP1").value=localStorage.getItem("UserCode");
  let MainForm=document.getElementById("FormpurchasesDetails");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action=Script;
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                location.reload();
    }, Time);
  }
} 


// **************************purchasesBrowser***********


function LoadpurchasesBrowser(){
  IsReady=false;
  let Loading =document.getElementById("LoadingpurchasesBrowser");
  Loading.className="fa fa-refresh fa-spin"
  document.getElementById("bodydataP").innerHTML=""
  Loadpurchases();
  LoadWareHouse();
  const myTimeout = setTimeout(function(){ 
  if (isNaN(Datapurchases[0].Num)==false){
  for (let index = 0; index < Datapurchases.length; index++) {
    if(Datapurchases[index].Num!="" ){
      AddRowPrS1(Datapurchases[index].BillNumber,Datapurchases[index].BillDateS,Datapurchases[index].SupllierName,Datapurchases[index].WareHouse,Datapurchases[index].Total)
    }
  }
}
  Loading.className="fa fa-refresh" ;
  IsReady=true;
  clearTimeout(myTimeout)
}, 2000);
}

function AddRowPrS1(BillNumberPA,BillDatePA,AccountCodePA,WareHousePA,TotalPA) {
  let bodydata=document.getElementById("bodydataP");
  let row = bodydata.insertRow();
  row.id="P" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "BillNumberPA";
  cell.innerHTML = BillNumberPA;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "BillDatePA";
  cell.innerHTML = GetDateFromString(BillDatePA);
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "AccountCodePA";
  cell.innerHTML = AccountCodePA;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "WareHousePA";
  cell.innerHTML = WareHousePA;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "WareHousePNA";
  cell.innerHTML = GetWareName(WareHousePA);
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "TotalPA";
  cell.innerHTML = TotalPA;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('button');
  btb.type = "button";
  btb.id="ButPA" + bodydata.childElementCount;
  btb.onclick=function(){showdatarowsP()};
  btb.innerHTML=`<a class='fa fa-edit' style='color:#ff5e00 ; width:100% ;'> </a>`
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.style.width="100%";
  };


  function showdatarowsP() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent  ;
    let NameAccountTable=document.getElementById(indextable).children.item(2).textContent  ;
    let WareHouseTable=document.getElementById(indextable).children.item(4).textContent  ;
    document.getElementById("SupllierName").value=NameAccountTable;
    document.getElementById("WareHouse2").value=WareHouseTable;
    document.getElementById("bodyBillP").innerHTML="";
    ShowSelectForm("purchasesWi");
    for (let index = 0; index < Datapurchases.length; index++) {
      if(Datapurchases[index].BillNumber == IndexRow){
        document.getElementById("BillNumberP").value= IndexRow;
        document.getElementById("BillDateP").value=GetDateFromString(Datapurchases[index].BillDateS);
        document.getElementById("WareHouseCode2").value=Datapurchases[index].WareHouse;
        document.getElementById("NoteP1").value=Datapurchases[index].Note;
        document.getElementById("PTotal").value=Datapurchases[index].Total;
      }
    }
    let IndexTableRow = 1;
    for (let indexM = 0; indexM < DataMove.length; indexM++) {
      if(DataMove[indexM].BillNumber == IndexRow && DataMove[indexM].Type=="1"){
        AddRowPrElementP();
        document.getElementById(`PRBCodeNP${IndexTableRow}`).value=GetMatNameFormCode1(DataMove[indexM].MatCode)
        document.getElementById(`MatCodeP${IndexTableRow}`).value= DataMove[indexM].MatCode;
        document.getElementById(`PRBAmountP${IndexTableRow}`).value= Math.abs(DataMove[indexM].Amount);
        document.getElementById(`PRBPriceP${IndexTableRow}`).value= DataMove[indexM].Price;
        document.getElementById(`PRBMatTotalP${IndexTableRow}`).value= DataMove[indexM].MatTotal;
        document.getElementById(`PRBNoteP${IndexTableRow}`).value= DataMove[indexM].Note;
        IndexTableRow++;
      }
    }
    CaluclateTotalP();
    document.getElementById("CountRowP").value=IndexTableRow - 1;
  };
// **************Export
function ChangeStyle1(){
  let Myusername=document.getElementById("Myusername");
  let MyMobile= document.getElementById("MyMobile");
  MyMobile.style.display="block";
  Myusername.className="TableInputMa";
  MyMobile.className="TableInputMa";
  let FormSalesDetails=document.getElementById("FormSalesDetails");
  FormSalesDetails.style.textAlign="right";
  FormSalesDetails.style.backgroundColor="white";
  FormSalesDetails.style.overflowX="unset"
  FormSalesDetails.style.height="100%"
  let AllInput=document.getElementsByTagName("input");
  for (let index = 0; index < AllInput.length; index++) {
    AllInput[index].style.textAlign="right";
    AllInput[index].style.borderRadius="0px";
    AllInput[index].type="text";
  }
  let Alllabel=document.getElementsByTagName("label");
  for (let index1 = 0; index1 < Alllabel.length; index1++) {
    Alllabel[index1].style.textAlign="right";
  }
  document.getElementById("MainLabel").style.display="none";
  document.getElementById("FirtDivSale").style.display="none";
  document.getElementById("ButtonBill").style.display="none";
  let TotalSale=document.getElementById("TotalSale");
  let SalesItems=  document.getElementById("SalesItems")
  SalesItems.append(TotalSale)
  TotalSale.append(Myusername)
  TotalSale.append(MyMobile)
  Myusername.style.marginLeft="5px"
  Myusername.style.marginRight="5px"
  TotalSale.style.direction="ltr";
  TotalSale.style.width="100%"
  SalesItems.style.overflowX="unset"
  SalesItems.style.border="none"
  document.getElementById("SalesWi").className="login-box2"
  let BtnStyle=document.getElementsByClassName("BtnStyle")
  for (let index2 = 0; index2 < BtnStyle.length; index2++) {
    BtnStyle[index2].parentElement.style.display="none";
  }
  document.getElementById("AddRow1").parentElement.style.display="none";
  
  
}

function ExportSaleBill(){
  ChangeStyle1();
  ClickA1();
  const myTimeout = setTimeout(function(){ 
    location.reload();
    clearTimeout(myTimeout)
  }, 3000);

} 

function ClickA1(){
    let inputValue =$("#FormSalesDetails");
          html2canvas(inputValue, {
            onrendered: function(canvas) {
              var imageData = canvas.toDataURL("image/jpg");
              var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
              let AA=document.getElementById("download")
              AA.href=newData;
              AA.download="image.jpg"
              // $("#download").attr("download", "image.jpg").attr("href", newData);
              AA.click()
            }
          });
        };
 
function ChangeStyle2(){
  let Myusername=document.getElementById("Myusername");
  let MyMobile= document.getElementById("MyMobile");
  MyMobile.style.display="block";
  Myusername.className="TableInputMa";
  MyMobile.className="TableInputMa";
  let FormAmountMat=document.getElementById("FormAmountMat");
  FormAmountMat.style.textAlign="right";
  FormAmountMat.style.backgroundColor="white";
  FormAmountMat.style.overflowX="unset"
  FormAmountMat.style.height="100%"
  let AllInput=document.getElementsByTagName("input");
  for (let index = 0; index < AllInput.length; index++) {
    AllInput[index].style.textAlign="right";
    AllInput[index].style.borderRadius="0px";
    AllInput[index].type="text";
  }
  let Alllabel=document.getElementsByTagName("label");
  for (let index1 = 0; index1 < Alllabel.length; index1++) {
    Alllabel[index1].style.textAlign="right";
  }
  document.getElementById("MainLabel").style.display="none";
  document.getElementById("FirtDivSale2").style.display="none";
  document.getElementById("ButtonAmount").style.display="none";
  let Sdiv=document.createElement("div");
  Sdiv.className="user-box";
  Sdiv.append(Myusername);
  Sdiv.append(MyMobile);
  FormAmountMat.append(Sdiv)
  Myusername.style.marginLeft="5px"
  Myusername.style.marginRight="5px"
  document.getElementById("AmountMat").className="login-box2"
}

function ExportMatWant(){
  ChangeStyle2();
  ClickA2();
  const myTimeout = setTimeout(function(){ 
    location.reload();
    clearTimeout(myTimeout)
  }, 3000);

} 

function ClickA2(){
    let inputValue =$("#FormAmountMat");
          html2canvas(inputValue, {
            onrendered: function(canvas) {
              var imageData = canvas.toDataURL("image/jpg");
              var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
              let BB=document.getElementById("download")
              BB.href=newData;
              BB.download="image.jpg"
              BB.click()
            }
          });
        };
  


