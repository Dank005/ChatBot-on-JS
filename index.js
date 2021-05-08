let count = 0;

let whereIsToggled=false;
let whatIsToggled=false;
let rulesIsToggled=false;

let nothingIsToggled=true;
//let something = document.querySelectorAll("div");
//console.log(something);


let whereButton=document.getElementById("whereButton");
let whatButton=document.getElementById("whatButton");
let rulesButton=document.getElementById("rulesButton");

whereButton.onclick = function() {
	
	whereIsToggled=!whereIsToggled;
	nothingIsToggled=!nothingIsToggled;

	if (whereIsToggled)
		whereButton.style.background = "LightSalmon";
	else
		whereButton.style.background = "#efefef";
		
	rulesButton.style.background = "#efefef";
	whatButton.style.background = "#efefef";
	whatIsToggled=false;
	rulesIsToggled=false;
	
}

whatButton.onclick = function() {
	
	whatIsToggled=!whatIsToggled;
	nothingIsToggled=!nothingIsToggled;
	
	if (whatIsToggled)
		whatButton.style.background = "LightSalmon";
	else
		whatButton.style.background = "#efefef";
	
	whereButton.style.background = "#efefef";
	rulesButton.style.background = "#efefef";
	whereIsToggled=false;
	rulesIsToggled=false;
}

rulesButton.onclick = function() {
	
	rulesIsToggled=!rulesIsToggled;
	nothingIsToggled=!nothingIsToggled;
	
	if (rulesIsToggled)
		rulesButton.style.background = "LightSalmon";
	else
		rulesButton.style.background = "#efefef";

	whatButton.style.background = "#efefef";
	whereButton.style.background = "#efefef";
	whereIsToggled=false;
	whatIsToggled=false;
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
	addChatBot(`Привет, я чат бот для сайта "t-univer.simulizator.com". Если ты новичок напиши "начать" `, 0);

    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
        let input = document.getElementById("input").value;
        //document.getElementById("user").innerHTML = input;
        output(input);
		if (count>6)
			deleteMessages();
     }
    });
});

function deleteMessages() {
	let strId = count-6
	
	let botMess = document.getElementById('bot'+strId);
	let userMess = document.getElementById('user'+strId);
	
	botMess.remove();
	userMess.remove();
}

function output(input) {

  let product;
  let text = input.toLowerCase();
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

//compare arrays
//then search keyword
//then random alternative

	let choosenTrigger;
	let choosenReply;
	
	if (whereIsToggled)
	{
		choosenTrigger=triggerWhere;
		choosenReply=replyWhere;
	}
	else if (whatIsToggled)
	{
		choosenTrigger=triggerWhat;
		choosenReply=replyWhat;
	}
	else if (rulesIsToggled)
	{
		choosenTrigger=triggerRules;
		choosenReply=replyRules;
	}
		



  if (compare(choosenTrigger, choosenReply, text)) {
    product = compare(choosenTrigger, choosenReply, text);
  } else if (text.match(/robot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  count++;
  //update DOM
  addChatUser(input, count);
  addChatBot(product, count);
  
  
  //document.getElementById("chatbot").innerHTML = product;
  //speak(product);

    //clear input value
  document.getElementById("input").value = "";
}

const triggerWhat = [
["начать"],
//1
["партнерство", "партнёрство"],
["индустрия"],
["регион, город, сообщества", "регион", "город", "сообщества"],
//1
["медиа"],
["бренд, pr, сми", "pr", "сми", "бренд"],
//3
["инновации"],
["инновационная стратегия", "стратегия"],
["условия поддержки инноваций", "условия поддержки", "поддержки инноваций"],
["инновационные проекты"],
//4
];

const replyWhat = [
[`Начни`], 
//1 
[`Блок "Партнёрство" отвечает за связь универа с городом и индустрией. Выберите интересующий подблок`],
[`Подблок "Индустрия" отвечает за развитие партнерских отношений университета с промышленным бизнесом в регионе.`],
[`Подблок "Регион, город,.." отвечает за реализация различных инновационных и исследовательских проектов, подготовка кадров и прочее`],
//2
[`Блок "Медиа" влияет на все аспекты деятельности университета (привлечение абитуриентов и партнеров, преподавателей и талантливых ученых и т.п.)`],
[`Подблок "Бренд, PR, СМИ" формирует положительный / отрицательный образ университета`],
//3
[`Блок "Инновации" отвечает за участие университета в разработке чего-то нового`],
[`Подблок "Инновационная стратегия" отвечает за выбор секторов индустрии для создания инновационных коммерческих проектов и разработок.`],
[`Подблок "Исловия поддержки инноваций" отвечает за создание условий для поддержки инноваций: инфраструктура, люди готовые рисковать, инвестиции и пр.`],
[`Подблок "Инновационные проекты" отвечает за оказание поддержки конкретным типам инновационных активностей, появившихся в вашем университете: патенты и лицензии, ОКР, консалтинг, стартапы.`],
//4
];

const triggerWhere = [
["начать"],
//1


];

const replyWhere = [
[`начать где`], 
//1 

];

const triggerRules = [
["начать"],
//1
["пока"],


];

const replyRules = [
[`В верхней панели у вас есть несколько важных показателей. Бюджет и Упр.нагрузка. Упр нагрузку можно увеличить, наняв сотрудников.. ` +
	`Цель игры заключается в том, чтобы удачно распределить нагрузку между направлениями деятельности университета, которые расположены на карте и снизу.` + 
	`Напишите название блока, чтобы узнать подробнее например "Управление"`],
//1 
["правила"],
];


const alternative = [
  "Ответа на ваш вопрос не придумали"
];

function compare(triggerArray, replyArray, text) {
  let item;
  
  for (let x = 0; x < triggerArray.length; x++) 
    for (let y = 0; y < replyArray.length; y++) 
		if (text.indexOf(triggerArray[x][y]) != -1){/*text.indexOf(triggerArray[x][y] != -1) */
			items = replyArray[x];
			item = items[Math.floor(Math.random() * items.length)];
		}
  return item;
}

const robot = ["How do you do, fellow human", "I am not a bot"];


function addChatUser(input, count) {

  const mainDiv = document.getElementById("main");
  let userDiv = document.createElement("div");
  userDiv.id = "user"+count;
  userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

 
}

function addChatBot(product, count) {
	
  const mainDiv = document.getElementById("main");	
  let botDiv = document.createElement("div");
  botDiv.id = "bot"+count;
  botDiv.innerHTML = `Chatbot: <span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
}

