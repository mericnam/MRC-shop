let cartList = document.getElementById("cartList")
let pageId = document.getElementById("pageID") 
let itemsInCart = document.getElementById("itemsInCart");
let checkOutList = document.getElementById("checkOutList")
let productPicture = document.getElementById("productPicture")
let productContainerOtherPicture1 = document.getElementById("productContainerOtherPicture1")
let productContainerOtherPicture2 = document.getElementById("productContainerOtherPicture2")
let productContainerOtherPicture3 = document.getElementById("productContainerOtherPicture3")
let productName = document.getElementById("productName")
let addProduct = document.getElementById("addProduct")
let productPrice = document.getElementById("productPrice")
let productZoom = document.getElementById("productZoom")

// we will use this variable to change productImage in produductdetails.html 
let productImage ;
let productImages ;
let productTitle ;
let productPriceTag ;

let cartIDList = [];

// getting information with id 
// getting price with id 
let getPriceById = (x) => {
  const item = items_data.find((item) => item.itemId === x);
  if (item) {
    return item.price;
  } else {
    return null;
  }
};       

// getting image with id 
let getImageById = (x) => {
  const itemforImage = items_data.find((itemforImage) => itemforImage.itemId === x);
  if (itemforImage) {
    return itemforImage.images[0];
  } else {
    return null;
  }
};    
// getting image with id end
// getting images with id
let getImagesById = (x) => {
  const itemsforImage = items_data.find((itemsforImage) => itemsforImage.itemId === x);
  if (itemsforImage) {
    return itemsforImage.images;
  } else {
    return null;
  }
};    
// getting images with id end
// getting name with id 
let getNameById = (x) => {
  const name = items_data.find((name) => name.itemId === x);
  if (name) {
    return name.name;
  } else {
    return null;
  }
};   
// getting name with id end
// getting information with id end

if(pageId.innerText=="index"){
 
    const cardOne = document.getElementById("cardOne");
    const cardTwo = document.getElementById("cardTwo");
    const cardThree = document.getElementById("cardThree");
    
    cardOne.addEventListener("mouseenter", ()=>{
        cardOne.src="./images/kadın/tshirt/kadın-tshirt-1-2.jpg_Default-MainProductImage"
    });
    cardOne.addEventListener("mouseleave", ()=>{
        cardOne.src="./images/kadın/tshirt/kadın-tshirt-1-1.jpg_Default-MainProductImage"
    });
    
    cardTwo.addEventListener("mouseenter", ()=>{
        cardTwo.src="./images/kadın/short/kadın-short-3-2.jpg_Default-MainProductImage"
    });
    cardTwo.addEventListener("mouseleave", ()=>{
        cardTwo.src="./images/kadın/short/kadın-short-3-1.jpg_Default-MainProductImage"
    });
    
    cardThree.addEventListener("mouseenter", ()=>{
        cardThree.src="./images/erkek/gomlek/erkek-gomlek-1-2.jpg_Default-MainProductImage"
    });
    cardThree.addEventListener("mouseleave", ()=>{
        cardThree.src="./images/erkek/gomlek/erkek-gomlek-1-1.jpg_Default-MainProductImage"
    });
}else if(pageId.innerText=="login"){
    const input = document.querySelectorAll("input")

    for(let i of input){
        i.addEventListener("focus",function(){
            let lab = this.parentElement.children[0]
            lab.style.backgroundColor ="#a2d2ff"
        })
        i.addEventListener("blur",function(){
            if(this.value == ""){
                let lab = this.parentElement.children[0]
                lab.style.backgroundColor ="transparent"
            }
        })
    }
    const showPass = document.getElementById("showPass")
    const pass = document.getElementById("password")

    function showPassword(){
        if(pass.getAttribute("type") == "password"){
            pass.setAttribute("type","text")
        }else{
            pass.setAttribute("type","password")
        }
    }
}else if(pageId.innerText=="checkout"){
  checkIDListFromStorage();
  cartIDList.forEach(function(item) {
  });
  checkOutList.innerHTML="";
  addCartStoredIDlistToCheckout();
}else if(pageId.innerText=="productDetails"){ 
 productContainerOtherPicture1.addEventListener("click", ()=>{
  productPicture.style.backgroundImage = "url(" + productImages[0] + ")";
 })
 productContainerOtherPicture2.addEventListener("click", ()=>{
  productPicture.style.backgroundImage = "url(" + productImages[1] + ")";
 })
 productContainerOtherPicture3.addEventListener("click", ()=>{
  productPicture.style.backgroundImage = "url(" + productImages[2] + ")";
 })

 productPicture.addEventListener("mousemove",(e)=>{
  productZoom.style.backgroundImage = window.getComputedStyle(productPicture).backgroundImage;

  productZoom.style.opacity=1

  let positionPx = e.x - productZoom.getBoundingClientRect().left;
  positionPx = Math.round( 1.2 * (positionPx))
  let positionPy = e.y - productZoom.getBoundingClientRect().top;
  positionPy = Math.round(4.7 * (positionPy))
  
  productZoom.style.backgroundPositionX = `-${positionPx}px`;
  productZoom.style.backgroundPositionY = `-${positionPy}px`;
  
 }) 
 productPicture.addEventListener("mouseout",()=>{
  productZoom.style.opacity=0
 })
}

// IDList and StoredIDList part 
document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
  checkIDListFromStorage();
  cartIDList.forEach(function(item) {
  });
}
function checkIDListFromStorage() {
  if (localStorage.getItem("cartStoredIDList") === null) {
    cartIDList = [];
  } else {
    cartIDList = JSON.parse(localStorage.getItem("cartStoredIDList"));
  }
}
function addItemToStorage(item) {
  checkIDListFromStorage();
  cartIDList.push(item);
  localStorage.setItem("cartStoredIDList", JSON.stringify(cartIDList));
  addCartStoredIDlistToCart();
}
async function removeItemFromStorage(item) {
  checkIDListFromStorage();
  const index = cartIDList.indexOf(item);
  if (index > -1) {
    cartIDList.splice(index, 1);
    localStorage.setItem("cartStoredIDList", JSON.stringify(cartIDList));
  }
  cartClick();
  cartClick();
}
function addCartStoredIDlistToCart(){
  itemsInCart.innerHTML="";

    let totalPrice =0;
    for(let i=0;i<cartIDList.length;i++){
        let itemImg = document.createElement("span")
        let p = document.createElement("span")
        let symbol$ = document.createElement("span")
        let deletebtn = document.createElement("button")
        let li = document.createElement("div")

        let x = cartIDList[i];
        symbol$.textContent= "  $";

        let itemImageOne = getImageById(x);
        let y = getPriceById(x);
        totalPrice = totalPrice + y;

        itemImg.setAttribute("style", "align-items: center; display:inline-block; margin: 10px; width: 50px; height: 50px; background-size:cover; background-image: url(" + itemImageOne + ")");

        p.setAttribute("style", "position:relative; top:-25px; width: 5px; height: 50px")
        symbol$.setAttribute("style", "position:relative; top:-25px; width: 5px; height: 50px")
        deletebtn.setAttribute("onclick", `removeItemFromStorage(${cartIDList[i]})`);
        deletebtn.setAttribute("class", "btn btn-outline-dark p-0 cartButton");

        p.innerText=y;
        li.append(itemImg);
        li.append(p);
        li.append(symbol$);
        li.append(deletebtn);
        itemsInCart.append(li);
    }
    const totalPriceTag = document.getElementById("amountInCart");
    totalPriceTag.innerText=`${totalPrice}   $`
}
// IDList and StoredIDList part end

// checkOutList 
function addCartStoredIDlistToCheckout(){
  checkOutList.innerHTML="";

  let totalPrice =0;
  for(let i=0;i<cartIDList.length;i++){

      let itemImg = document.createElement("span")
      let p = document.createElement("span")
      let symbol$ = document.createElement("span")
      let deletebtn = document.createElement("button")
      let li = document.createElement("div")

      let x = cartIDList[i];
      symbol$.textContent= "  $";

      let itemImageOne = getImageById(x);
      let y = getPriceById(x);
      totalPrice = totalPrice + y;

      console.log(itemImageOne)
      itemImg.setAttribute("style", "align-items: center; display:inline-block; margin: 40px clamp(8px, 3rem, 40px); width: clamp(40px, 6rem, 120px); height: clamp(40px, 6rem, 120px); background-size:cover; background-image: url(" + itemImageOne + ")");

      p.setAttribute("style", "position:relative; top:-80px; width: clamp(40px, 3rem, 100px); height: 150px; font-size: clamp(20px, 3rem, 30px)")      
      symbol$.setAttribute("style", "position:relative; top:-80px; width: clamp(40px, 3rem, 100px); height: 150px; font-size: clamp(20px, 3rem, 30px)")
      deletebtn.setAttribute("onclick", `refreshPageAfterWait(${cartIDList[i]})`);
      deletebtn.setAttribute("class", "btn btn-outline-dark p-0 cartButton ms-2");
      deletebtn.setAttribute("style", "position:relative; top:-90px; width: clamp(20px, 5vw, 50px); aspect-ratio: 1; border-radius:20px");
      li.setAttribute("style", "margin-right: 10px");
    
      p.innerText=y;
      li.append(itemImg);
      li.append(p);
      li.append(symbol$);
      li.append(deletebtn);
      checkOutList.append(li);
  }
  const totalPriceTag = document.getElementById("amountInCart");
  const totalPriceCheckout = document.getElementById("amountInCheckout");

  totalPriceCheckout.innerText=`${totalPrice}   $`
  totalPriceTag.innerText=`${totalPrice}   $`
};
async function refreshPageAfterWait (cartID) {
  await removeItemFromStorage(cartID);
  location.reload();
}
// checkOutList end


//  cart click 
function cartClick(){
    cartList.classList.toggle("gorunur");
    itemsInCart.innerHTML="";
    
    addCartStoredIDlistToCart();
}
//  cart click end

// login signup 
function login(){
  console.log("log in")
}
function signup(){
  console.log("sign up")
}
// login signup end

// items zoom in 
const items = document.querySelectorAll('.items');
items.forEach(item =>{
    item.addEventListener("mouseenter",(e)=>{
        e.target.style.scale=1.3
    })
    item.addEventListener("mouseleave",(e)=>{
        e.target.style.scale=1.0
    })
})
// items zoom in end 

// productDetailst 
const searchPage = "./otherPages/search.html";
function changeProduct(){
  let productID = getProductIDFromSessionStorage();

  // big image part 
  productImage = getImageById(Number(productID));
  productPicture.style.backgroundImage = "url(" + productImage + ")";
  // name part 
  productTitle = getNameById(Number(productID));
  console.log(productTitle)
  productName.innerText = ` ${productTitle} `;

  // images part 
  productImages = getImagesById(Number(productID))
    productContainerOtherPicture1.style.backgroundImage = "url(" + productImages[0] + ")";
    productContainerOtherPicture2.style.backgroundImage = "url(" + productImages[1] + ")";
    productContainerOtherPicture3.style.backgroundImage = "url(" + productImages[2] + ")";

  // price part 
  productPriceTag = getPriceById(Number(productID))
  productPrice.innerText = ` ${productPriceTag}   $`;

  // button part 
  addProduct.setAttribute("onclick",`addItemToStorage(${productID})`)
}
function changeProductID(ID){
  saveProductIDToSessionStorage(ID)
  if(pageId.innerText=="index"){
    window.location.href ="./items/productDetails.html";
  }else{
    window.location.href ="../items/productDetails.html";
  }
}
// productDetailst end

// go to page 
function goToPage(pageURL) {
  window.location.href = pageURL;
}
// go to page end

// productID localstorage part 
// setting the productID 
function saveProductIDToSessionStorage(productID) {
  sessionStorage.setItem('productID', productID);
}
// getting the productID 
function getProductIDFromSessionStorage() {
  return sessionStorage.getItem('productID');
}
// productID localstorage part end

// search part 
function searchItem(){
  window.location.href = searchPage ;
}
// search part end