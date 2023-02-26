const http = require("http");
const fs = require("fs");


const countOfOffers = 25;
const countOfComments = 25;
const countOfAvatars = 6;
const COMMENTIDSRANGE = {
    MIN: 1,
    MAX: 999,
}
const LIKESRANGE = {
    MIN: 15,
    MAX: 200,
}
const descriptions = ["Це літо було чудовим", "Фотка з минулого року",
    "Дуже сумую за цими емоціями", "Сподіваюсь, що я там не був лише один раз"];

const names = ["Артем", "Андрій", "Антон", "Богдан", "Микола", "Максим", "Михайло", "Олег", "Олексій",
    "Іван", "Дмитро", "Василь", "Юрій", "Петро", "Володимир"]

const comments = ["Все відмінно!", "Загалом все непогано. Але не всі.",
    "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
    "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
    "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
    "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?"];


const data = new Array(countOfOffers).fill(null).map((e, index) => {
    return getOffer(index);
});
const commentArray = new Array(countOfComments).fill(null).map((e, index) => {
    return getComment(index)
});



function getRandomNumber(min, max) {
    const step1 = max - min + 1;
    const step2 = Math.random() * step1;
    const result = Math.floor(step2) + min;

    return result
}

function getRandomArray(arrayLenght, arrayMax) {
    const arr = []
    while (arr.length < arrayLenght) {
        const r = Math.floor(Math.random() * arrayMax) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;

}



function getRandomDescription() {
    const randomArrayNumber = getRandomNumber(0, descriptions.length - 1)
    const randomDescription = descriptions[randomArrayNumber];
    return randomDescription
}



function getOffer(index) {
    return {
        id: index + 1,
        url: `photos/${index + 1}.jpg`,
        description: getRandomDescription(),
        likes: getRandomNumber(LIKESRANGE.MIN, LIKESRANGE.MAX),
        comments: getComment(getRandomNumber(1, countOfComments))
    }
}


function getComment(countOfComments,) {

    const ArrayOfComments = [];
    for (let i = 0; i < countOfComments; i++) {
        ArrayOfComments.push({
            id: getRandomNumber(COMMENTIDSRANGE.MIN, COMMENTIDSRANGE.MAX),
            avatar: `img/avatar-${getRandomNumber(1, countOfAvatars)}.svg`,
            comment: comments[getRandomNumber(1, comments.length - 1)],
            name: names[getRandomNumber(1, names.length - 1)]

        })
    }
    return ArrayOfComments;
}


fs.writeFileSync("data.txt", JSON.stringify(data));
fs.writeFileSync("comments.txt", JSON.stringify(commentArray));

http.createServer((req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = req.url;
    if (req.method === "GET"){
        if(url === "/data"){
            const photoData = fs.readFileSync("data.txt", "utf-8");
            res.end(photoData);
        }else if(photoData.status !== 200){
            res.end("Cannot find photos")
        }
    } else if (req.method === "POST"){
        
    }

}).listen(3000);