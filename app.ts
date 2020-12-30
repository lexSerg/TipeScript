// клас Верховна рада
// поля:
// масив фракцій
// методи:
// додати\видалити фракцію
// вивести всі фракції
// вивести конкретну фракцію
// додати\видалити депутата з фракції
// вивести всіх хабарників фракції
// вивести найбільшого хабарника у фрації
// вивести найбільшого хабарника верховної ради
// вивести фсіх депутатів фракції

// ****************
// Для сверх людей
//  зробити через switch меню 1 - Верховна рада 2 - Фракція 3 - Депутат відповідно при вводі з
//     клави певної цифри ми попадаєио в інше меню якщо ми нажали 1 то нам промалюється в консолі
//     таке меню 1-додати фракцію 2-вивести всі фракції 3-вивести найбільшого хабарника меню робимо

//РОБИТИ НА ТС !!З інтрефейсами. типами і енамками!

let startRadaBtn =  document.getElementById('rada');
let radaData =  document.getElementById('radaData');
startRadaBtn.onclick = () => {
    startRada();
};
radaData.onclick = () => {
    addDefaultData();
    radaData.classList.add('hidden')
}

abstract class Human {
    weight: number;
    height: number;
    constructor(weight:number, height:number){
        this.weight = weight;
        this.height = height;
    }
};
interface IDeputy{
    weight: number;
    height: number;
    firstName: string,
    lastName: string,
    age: number,
    isBribetaker: boolean,
    bribe?: number,
    takeBribe(money:number):string
};
class Deputy extends Human implements IDeputy {
    firstName: string;
    lastName: string;
    age: number;
    isBribetaker: boolean;
    bribe?: number;
        constructor(weight: number, height: number, firstName: string, lastName: string, age: number, isBribetaker: boolean, bribe?: number){
            super(weight, height)
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.isBribetaker = isBribetaker;
            this.bribe = bribe | 0;
        };
    takeBribe(money):string {
        if (!this.isBribetaker) return 'Я державу не продаю!!! Геть звідси злодій!!!';
        if (this.isBribetaker && money > 1000) return 'Що ви мені пропонуєте??? Я чесна людина!';
        this.bribe = this.bribe + money;
        return 'Ваше питання передано на розгляд'
    }
};
interface IFraction{
    fractionName:string;
    deputyList: IDeputy[];
    addDeputy():void;
    removeDeputy():void;
    removeAllDeputies():void;
    removeCorruptionDeputy():void;
    showMostCorruptionDeputy():void;
    showMostCorruptionDeputy():void;
    showAllDeputy();
    showTotalCorruptionSum():void;
};

class Fraction implements IFraction{
    fractionName: string;
    deputyList: IDeputy[];
    constructor(fractionName: string, deputyList: IDeputy[]) {
        this.fractionName = fractionName;
        this.deputyList = deputyList;
    };
    addDeputy(): void{
       let firstName = prompt('Введите имя депутата');
       let lastName = prompt('Введите фамилию депутата');
       let weight = +prompt('Введите вес депутата');
       let height = +prompt('Введите высоту депутата');
       let age = +prompt('Введите возраст депутата');
       let isBribetaker = confirm('Взяточник?');
       let bribe;
       if (isBribetaker) bribe = +prompt('Размер взяток?')
       let deput =  new Deputy(weight, height, firstName, lastName, age, isBribetaker, bribe);
       this.deputyList.push(deput);
       console.log(`Депутат '${deput.firstName} ${deput.lastName}' добавлен во фракцию`); 
    };
    removeDeputy(): void{
        this.showAllDeputy();
        let deputy:number = +prompt('Введите номер депутата из списка для удаления') - 1;
        let firstName = this.deputyList[deputy].firstName;
        let lastName = this.deputyList[deputy].lastName;
        this.deputyList.splice(deputy, 1);
        let res = `Удален депутат под номером ${deputy + 1} - ${firstName} ${lastName} `
        console.log(res);
    }
    removeAllDeputies():void {
        this.deputyList = [];
        console.log('Во фракции нет ни одного депутата');
        
    }
    removeCorruptionDeputy(): void{
        let isCorruptions:boolean = false;
        for (let i = 0; i < this.deputyList.length; i++) {
            if (this.deputyList[i].isBribetaker)  {
                this.deputyList.splice(i, 1);
                isCorruptions = true;
                i--;
            }
        }
        if (isCorruptions) console.log('Коррупционеров исключили из фракции');
        console.log('Во фракции нет коррупционеров');
    }
    showMostCorruptionDeputy():void {
        if (this.deputyList.length === 0) {
            console.log('Во фракции нет ни одного депутата');
            return
        }
        if (!this.deputyList.some(iter => iter.isBribetaker)) {
            console.log('Во фракции нет коррупционеров');
            return
        }
        const arr = JSON.parse(JSON.stringify(this.deputyList))
        let res = arr.reduce((acc,current) => {
            if (acc.bribe < current.bribe) acc = current;
            return acc
        });
        console.log(`Самый крупный взяточник: ${res.firstName} ${res.lastName}`);
        console.log(res);
        
    }
    showAllDeputy(){
        (this.deputyList.length === 0) ? 
        console.log('Во фракции нет ни одного депутата'):
        console.log(this.deputyList);
        this.deputyList.forEach((value, index) => {
            console.log(`${index + 1}) ${value.firstName} ${value.lastName}`);
        })    
    };
    showTotalCorruptionSum():void {
            const firstElemBribe = this.deputyList[0].bribe;
            let total:number;
            let res = this.deputyList.reduce((acc, iter, index) => {
            if (!(index === 0)) acc.bribe = acc.bribe + iter.bribe
            return acc
            });
            total = res.bribe;
            this.deputyList[0].bribe = firstElemBribe;
        console.log(`Общая сумма взяток фракции: ${total}$`);    
    }
}
class VerhovnaRada {
    fractionList: IFraction[];
    constructor(fractionList: IFraction[]) {
        this.fractionList = fractionList;
    };
    // Основные методы
    addFraction() :void {
        let name:string = prompt('Введите название фракции')
        const fraction = new Fraction(name, []);
        this.fractionList.push(fraction);
        console.log(`Фракция '${name}' добавлена в Раду`);
    };
    removeFraction(): void {
        this.showAllFractions();
        let keyChoise:number = +prompt('Введите номер фракции для удаления') - 1;
        if (keyChoise === null) {
            console.log('Удаление отменено'); 
            return
        };
        if (keyChoise > this.fractionList.length && keyChoise < 0) alert('Извините, но такой фракции нет в списке');
        let deletedFractionName:string = this.fractionList[keyChoise].fractionName;
        this.fractionList.splice(keyChoise, 1);
        console.log(`Фракция под номером ${keyChoise + 1} - '${deletedFractionName}' успешно удалена`);
    }
    showAllFractions(): void{
        console.log(rada.fractionList);
        this.fractionList.forEach((iter, index) => {
            console.log(`${index + 1}) Фракция: '${iter.fractionName}'`);
            
        })
    }
    showFraction(): void {
        this.showAllFractions();
        let fractionNum: number = +prompt('Введите номер фракции для показа') - 1;
        if (fractionNum > this.fractionList.length && fractionNum < 0) alert('Извините, но такой фракции нет в списке');
        console.log(`Выведена фракция под номером ${fractionNum + 1} - '${this.fractionList[fractionNum].fractionName}' :`);
        console.log(this.fractionList[fractionNum]);
    }
    addDeputyToFraction() : void {
        this.showAllFractions();
        let fraction:number = +prompt('Выбирите фракцию для добавления депутата') - 1;
        this.fractionList[fraction].addDeputy();
    }
    removeDeputyFromFraction() : void {
        this.showAllFractions();
        let fraction:number = +prompt('Выбирите фракцию для удаления депутата') - 1;
        this.fractionList[fraction].removeDeputy();
    }
    showFractionCoruptionDeputies():void {
        this.showAllFractions();
        let choise:number = +prompt('Выбирите фракцию для поиска взяточников') - 1;
        if (this.isDeputiesInFraction(choise)) return;
        const coruptionsDeputies = this.fractionList[choise].deputyList.filter(iter => iter.isBribetaker);
        if (!this.isCorruoptioDeputiesInFraction(coruptionsDeputies)) return;
        console.log(coruptionsDeputies);
        console.log(`Во фракции '${this.fractionList[choise].fractionName}' ${coruptionsDeputies.length} взяточник(ов)`);
        coruptionsDeputies.forEach((iter, index) => {
            console.log(`${index + 1}) ${iter.firstName} ${iter.lastName}`);        
        })
    }
    showMostFractionCoruptionDeputy():void {
        this.showAllFractions();
        let choise:number = +prompt('Выбирите фракцию для поиска самого жадного депутата') - 1;
        if (this.isDeputiesInFraction(choise)) return;
        if (!this.isCorruoptioDeputiesInFraction(this.fractionList[choise].deputyList)) return;
        const mostCorruptionDeputy:IDeputy = this.findMostCorruptionDeputyInFraction(this.fractionList, choise)
        console.log(mostCorruptionDeputy);
        console.log(`Самый жадный депутат фракции - '${mostCorruptionDeputy.firstName} ${mostCorruptionDeputy.lastName}'`);     
    };
    showMostCorruptionDeputyInRada():void{
        let res: IDeputy;
        const arrDep: IDeputy[] = [];
        for(let i = 0; i < this.fractionList.length; i++) {
            if (this.fractionList[i].deputyList.length === 0) continue;
            arrDep.push(this.findMostCorruptionDeputyInFraction(this.fractionList, i))
        };
        console.log(arrDep);

        const user = new Fraction('Buffer', arrDep);
        user.showMostCorruptionDeputy();
    }
    showAllDeputiesInFraction():IDeputy[]{
        this.showAllFractions();
        let choise:number = +prompt('Выбирите фракцию для отображения всех депутатов') - 1;
        if (choise > this.fractionList.length && choise < 0) alert('Извините, но такой фракции нет в списке');
        console.log(`Во фракции '${this.fractionList[choise].fractionName}' - ${this.fractionList[choise].deputyList.length} депутатов:`);
        this.fractionList[choise].showAllDeputy();
        return this.fractionList[choise].deputyList;
    };
    takeBribeToDeputy():void{
        const depArr:IDeputy[] = this.showAllDeputiesInFraction();
        const choise:number = +prompt('Выбирите депутата, которому нужно предложить взятку') - 1;
        const money:number = +prompt('Введите сумму взятки');
        console.log(depArr[choise]);
        console.log( depArr[choise].takeBribe(money));
    }
    // Вспомагательные служебные методы
    isDeputiesInFraction(num:number):boolean{
        if (this.fractionList[num].deputyList.length === 0) {
            console.log('Во фракции нет депутатов');
            return true;
        }
        return false;
    };
    isCorruoptioDeputiesInFraction(arr:IDeputy[]):boolean{
            for (let iter of arr) {
                if (iter.bribe) return true;
            }
            console.log('Во фракции нет взяточников')
            return false;
    };
    findMostCorruptionDeputyInFraction(arr:IFraction[], num:number) : IDeputy{
        const bufferArr = JSON.parse(JSON.stringify(arr[num].deputyList));
        let res = bufferArr.reduce((acc, iter) => {
            if (acc.bribe < iter.bribe) acc = iter;
            return acc
        })
        return res;
    }

}
// let fraction = new Fraction("Зеленые", deputyArray);
// let fractionArr:IFraction[] = [];
// fractionArr.push(fraction)
// const rada = new VerhovnaRada(fractionArr);
// fraction.addDeputy();
// fraction.addDeputy();
// fraction.showAllDeputy();
// console.log(deputyList[2]);
// console.log(fraction.deputyList[2]);
//fraction.addDeputy();
// let dep1 = new Deputy(65, 154, 'FGf', 'DDDDDD', 65, true, 50);
// console.log(dep1);
//fraction.showAllDeputy();
// fraction.removeCorruptionDeputy();
// console.log('*****************');
// fraction.showAllDeputy();
// fraction.showMostCorruptionDeputy();
// console.log(fraction.deputyList[2].takeBribe(500000000));
// fraction.removeAllDeputies();
// fraction.showMostCorruptionDeputy()
// fraction.showTotalCorruptionSum();
// fraction.showAllDeputy();
// console.log(rada);
// rada.fractionList;
// rada.addFraction();
// rada.addFraction();
// rada.removeFraction();
// console.log(rada.fractionList);
// rada.showFraction()


const fractionArr:IFraction[] = [];
const rada = new VerhovnaRada(fractionArr);

function addDefaultData() {
    const depArr1 = [
        {weight: 75, height: 178, firstName: 'Олег', lastName: 'Ляшко', age: 48, isBribetaker: true, bribe: 5000},
        {weight: 64, height: 164, firstName: 'Виталий', lastName: 'Голобородько', age: 42, isBribetaker: false},
        {weight: 50, height: 167, firstName: 'Юлия', lastName: 'Тимошенко', age: 60, isBribetaker: true, bribe: 10000},
        {weight: 106, height: 181, firstName: 'Петр', lastName: 'Порошенко', age: 55, isBribetaker: true, bribe: 50000},
        {weight: 65, height: 164, firstName: 'Владимир', lastName: 'Зеленский', age: 42, isBribetaker: true, bribe: 15000},
    ];
    const depArr2 = [
        {weight: 88, height: 173, firstName: 'Валерий', lastName: 'Звягенцев', age: 19, isBribetaker: true, bribe: 500},
        {weight: 65, height: 179, firstName: 'Рик', lastName: 'Санчес', age: 70, isBribetaker: true, bribe: 7000},
        {weight: 45, height: 142, firstName: 'Морти', lastName: 'Смит', age: 14, isBribetaker: false},
        {weight: 35, height: 162, firstName: 'Дональд', lastName: 'Дак', age: 25, isBribetaker: true, bribe: 200},
    ];
    const depArr3 = [
        {weight: 105, height: 175, firstName: 'Гомер', lastName: 'Симпсон', age: 36, isBribetaker: true, bribe: 1200},
        {weight: 65, height: 179, firstName: 'Мардж', lastName: 'Симпсон', age: 31, isBribetaker: false},
        {weight: 43, height: 145, firstName: 'Барт', lastName: 'Симпсон', age: 9, isBribetaker: true, bribe: 200},
        {weight: 34, height: 138, firstName: 'Лиза', lastName: 'Симпсон', age: 8, isBribetaker: false},
        {weight: 15, height: 55, firstName: 'Мегги', lastName: 'Симпсон', age: 1, isBribetaker: false},
    ];
    const deputyArray = [depArr1, depArr2, depArr3];
    const fractionsDefault: IFraction[] = [];
    function fillDeputyDefaultArray(arr) {
        const resOuter = [];
            for (let iter of arr) {
                const resInner: IDeputy[] = [];
                iter.forEach((curr) => {
                    resInner.push(new Deputy(
                        curr.weight, 
                        curr.height, 
                        curr.firstName,
                        curr.lastName, 
                        curr.age, 
                        curr.isBribetaker, 
                        curr.bribe
                    ))
                })
                resOuter.push(resInner);
            };
        return resOuter;
    };
    const fractionArrays = fillDeputyDefaultArray(deputyArray);
    fractionsDefault.push(new Fraction('Салат', fractionArrays[0]));
    fractionsDefault.push(new Fraction('Веселі смаколики', fractionArrays[1]));
    fractionsDefault.push(new Fraction('Симпсоны', fractionArrays[2]));
    fractionsDefault.forEach(iter => {
        rada.fractionList.push(iter)
    })
    console.log('Фракции по умолчанию добавлены в Раду');
    
}

function startRada() {
    console.log('Верховна рада');
    console.log('1 - додати фракцію');
    console.log('2 - видалити фракцію');
    console.log('3 - вивести всі фракції');
    console.log('4 - вивести конкретну фракцію');
    console.log('5 - додати депутата до фракції');
    console.log('6 - видалити депутата з фракції');
    console.log('7 - вивести всіх хабарників фракції');
    console.log('8 - вивести найбільшого хабарника у фрації');
    console.log('9 - вивести найбільшого хабарника верховної ради');
    console.log('10 - вивести всіх депутатів фракції');
    console.log('11 - запропонувати хабаря депутату');
    let choise:number = +prompt('Выберите действие');
    switch(choise) {
        case 1: 
            rada.addFraction();
            break;
        case 2: 
            rada.removeFraction();
            break;
        case 3: 
            rada.showAllFractions();
            break;
        case 4: 
            rada.showFraction();
            break;
        case 5: 
            rada.addDeputyToFraction();
            break;
        case 6: 
            rada.removeDeputyFromFraction();
            break;
        case 7: 
            rada.showFractionCoruptionDeputies();
            break;
        case 8: 
            rada.showMostFractionCoruptionDeputy();
            break;
        case 9: 
            rada.showMostCorruptionDeputyInRada();
            break;
        case 10: 
            rada.showAllDeputiesInFraction();
            break;
        case 11: 
            rada.takeBribeToDeputy()
            break;   
        default: alert('Выберите другое действие');
        
    };
    console.log('*********************');
}
startRada();
