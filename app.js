// import pizzaImg from './images/pizza.png';
// import burgerImg from "./images/burger.png";
// import cocaImg from "./images/coca.png";
// import saladImg from "./images/salad.png";
// import waterImg from "./images/water.png";
// import iceCreamImg from "./images/icecream.png";
// import kebabImg from "./images/kebab.png";
// const kebabImg = require('.images/kebab.png')

const ProductData=[
  { title: "Pizza", price: 17,id:1 },
  { title: "Burger", price: 15,id:2 },
  { title: "Coca", price: 3.5,id:3},
  { title: "Kebab", price: 13, id:4},
  { title: "Salad", price: 2.5, id:5 },
  { title: "Bottle of water", price: 0.6,id:6 },
  { title: "Ice cream", price: 2.9,id:7 },
]


Telegram.WebApp.ready()
let initData = Telegram.WebApp.initData || '';



const postContainer = document.querySelector('.container')
const sumtag = document.querySelector('.summ')
const count = document.querySelector('.count')

const Orders =[]


const postMethod = ()=>{
    ProductData.map((cradData)=>{
        const postElement = document.createElement('div');
        postElement.classList.add('card');
        postElement.innerHTML=`
        <div class="item w-[200px]">
            <img src="./images/burger.png" alt="">
            <div class="flex ">  
                  <p class="px-5 font-bold w-[150px] h-[50px]"> ${cradData.title.toUpperCase()}</p>
                   <p class="font-bold">${cradData.price}$</p>
           </div>
           <div class="flex">
                 <button onclick="addToCard(${cradData.id})" class="btn justify-center items-center bg-green-400 w-[100px] h-[40px] border rounded-3xl border-5 text-bold hover:bg-green-600" id="btn1">+
                 </button>
                  <button onclick="delToCard(${cradData.id})" class="btn justify-center items-center bg-red-500 w-[100px] h-[40px] border rounded-3xl border-5 text-bold hover:bg-red-800" id="btn1">-
                  </button>
             </div>
         </div>
        `
        postContainer.appendChild(postElement)
    })
}

postMethod()

const summm = document.querySelector('.summ')
const checkout = document.querySelector('.checkout')
const addcard = document.querySelector('.checkout')
var summ = 0;





const addToCard = (id)=>{
  ProductData.map((carddata)=>{
    if(id==carddata.id){
      Orders.push(carddata)
    }

  

  })

  if(Summ()>0){
    addcard.classList.remove('hidden')
  }
  else{
    addcard.classList.add('hidden')
  }

  Summ()
  count.innerHTML=Orders.length
summm.innerHTML=`${Summ()}$`
}




const delToCard = (id)=>{
  ProductData.map((carddata)=>{
    // summm.innerHTML=`${summ.toFixed(2)}$`
    for(let i=0;i<Orders.length;i++){
      if(Orders[i].id==id){
        Orders.splice(i, 1)
      } 
    }
  })
  Summ()
  count.innerHTML=Orders.length
  summm.innerHTML=`${Summ()}$`
  if(Summ()>0){
    addcard.classList.remove('hidden')
  }
  else{
    addcard.classList.add('hidden')
  }
}



var Summ=()=>{
  let c=0
  for(let i=0;i<Orders.length;i++){
    c=c+Orders[i].price
  }
  return c
}

summm.innerHTML=`${Summ()}$`
count.innerHTML=Orders.length



const sendAnswer = () => {
  // If user visited by not inline keyboard we can't reply him with backend
  if (!initData) {
    const result = Orders
    Telegram.WebApp.sendData(result);
    Telegram.WebApp.close();
  } else {
    const data = JSON.stringify({
      _auth: initData,
      result: Orders,
    });

    fetch('/api/sendAnswer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    }).then((res) => {
      const response = res.json();
    });
  }
  alert('succes')
};


addcard.onclick=function(){
  if (!initData) {
    const result = Orders
    Telegram.WebApp.sendData(result); 
    Telegram.WebApp.close();
  }
  else{
    const data=[]
    const Data = new Object();
    for(let i=0;i<Orders.length;i++){
      Data.title=Orders[i].title
      Data.price=Orders[i].price
      data.push(Data)
    }
    postJSON(data);
    alert(initData)
    }

  
}


async function postJSON(data) {
  try {
    const response = await fetch("http://localhost:3003/api/sendAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
 
    const result = await response.json();
    console.log("Success:", result);
    alert(result)
  } catch (error) {
    console.error("Error:", error);
  }
}


