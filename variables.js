const product = [
    {id: 1, type: "manga", name: "You are in the Blue Summer vol. 01", img:"you_re_in_the_blue_summer.jpg", valueList: 1500, stock: 12, productAvaible: true},
    {id: 2, type: "manga", name: "Attack On Titan vol. 01", img:"attack01.jpg", valueList: 600, stock: 100, productAvaible: true},
    {id: 3, type: "manga", name: "Hunter x Hunter vol. 01", img:"hunter_x_hunter01.jpg", valueList: 450, stock: 150, productAvaible: true},
    {id: 5, type: "manga", name: "My Hero Academy vol. 02", img:"my_hero_academia02.jpg", valueList: 500, stock: 60, productAvaible: true},
    {id: 4, type: "manga", name: "Blue Lock vol. 01", img:"blue_lok01.jpg", valueList: 600, stock: 30, productAvaible: true},
    {id: 6, type: "manga", name: "Chainsaw Man vol. 01", img:"chainsaw_man01.jpg", valueList: 500, stock: 25, productAvaible: true},
    {id: 7, type: "manga", name: "Dorohedoro vol. 01", img:"dorohedoro01.jpg", valueList: 350, stock: 40, productAvaible: true},
    {id: 8, type: "manga", name: "Haikyu vol. 01", img:"haikuy01.jpg", valueList: 450, stock: 35, productAvaible: true},
    {id: 9, type: "manga", name: "Ranma 1/2 vol. 01", img:"ranma01.jpg", valueList: 550, stock: 69, productAvaible: true},
    {id: 10, type: "manga", name: "Spy Family vol. 01", img:"spy_family01.jpg", valueList: 300, stock: 10, productAvaible: true},
    {id: 11, type: "manga", name: "Tokyo Revengers vol. 01", img:"tokyo_revenger02.jpg", valueList: 650, stock: 120, productAvaible: true},
    {id: 12, type: "manga", name: "Jujutsu Kaisen vol. 01", img:"jujutsu_kaisen01.jpg", valueList: 700, stock: 76, productAvaible: true},
    {id: 13, type: "manga", name: "Vinland vol. 01", img:"vinland01.jpg", valueList: 600, stock: 82, productAvaible: true},
    {id: 14, type: "manga", name: "Slam Dunk vol. 01", img:"slam_dunk01.jpg", valueList: 650, stock: 150, productAvaible: true}
];

function saveAndRecoverStorage() {
    localStorage.setItem("mangas", JSON.stringify(product)); 
    let recover = JSON.parse(localStorage.getItem("mangas")) || [];
}

saveAndRecoverStorage();

