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
    bribe: number;
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
    addDeputy();
    removeDeputy(deputy:number): string;
    removeAllDeputies():void;
    removeCorruptionDeputy(): void;
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
    addDeputy(){
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
    };
    removeDeputy(): string{
        let deputy:number = +prompt('Введите номер депутата из списка для удаления')
        this.deputyList.splice(deputy, 1)
        return `Удален депутат под номером ${deputy} -
         ${this.deputyList[deputy].firstName}
         ${this.deputyList[deputy].firstName} `
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
        let res = this.deputyList.reduce((acc,current) => {
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
    };
    showTotalCorruptionSum():void {
            const firstElemBribe = this.deputyList[0].bribe;
            let total:number;
            let res = this.deputyList.reduce((acc, iter, index) => {
            if (!(index === 0)) acc.bribe = acc.bribe + iter.bribe
            return acc
            });
            total = res.bribe;
            this.deputyList[0].bribe = firstElemBribe; //Потому как было мутировано значение bribe первого элемента
            //Не самое удачное решение но захотелось сделать через reduce()
        console.log(`Общая сумма взяток фракции: ${total}$`);    
    }
}
class VerhovnaRada {
    fractionList: IFraction[];
    constructor(fractionList: IFraction[]) {
        this.fractionList = fractionList;
    };
    addFraction() :void {
        let name:string = prompt('Введите название фракции')
        const fraction = new Fraction(name, []);
        this.fractionList.push(fraction);
    };
    removeFraction(): void {
        this.showAllFractions();
        let keyChoise:number = +prompt('Введите номер фракции для удаления');
        if (keyChoise === null) {
            console.log('Удаление отменено'); 
            return
        };
        if (keyChoise > this.fractionList.length && keyChoise < 0) alert('Извините, но такой фракции нет в списке');
        let deletedFractionName:string = this.fractionList[keyChoise].fractionName;
        this.fractionList.splice(keyChoise, 1);
        console.log(`Фракция под номером ${keyChoise} - '${deletedFractionName}' успешно удалена`);
    }
    showAllFractions(): void{
        console.log(rada.fractionList);
        this.fractionList.forEach((iter, index) => {
            console.log(`${index + 1}) Фракция: '${iter.fractionName}'`);
            
        })
    }
    showFraction(): void {
        this.showAllFractions();
        let fractionNum: number = +prompt('Введите номер фракции для показа');
        if (fractionNum > this.fractionList.length && fractionNum < 0) alert('Извините, но такой фракции нет в списке');
        console.log(`Выведена фракция под номером ${fractionNum} - '${this.fractionList[fractionNum].fractionName}' :`);
        console.log(this.fractionList[fractionNum]);
    }
    addDeputyToFraction() : void {
        this.showAllFractions();
        let fraction:number = +prompt('Выбирите фракцию для добавления депутата') - 1;
        this.fractionList[fraction].addDeputy();
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
        {weight: 88, height: 173, firstName: 'Валерия', lastName: 'Звягенцев', age: 19, isBribetaker: true, bribe: 500},
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
        const resInner: IDeputy[] = [];
        const resOuter = [];
            for (let iter of arr) {
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
                let buffer = JSON.parse(JSON.stringify(resInner));
                resOuter.push(buffer);
                resInner.splice(0, resInner.length)
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
    console.log('Фракции по умолчанию добавлены в раду');
    
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
    console.log('11 - вивести найбільшого хабарника');
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
        default: alert('Выберите другое действие');
    };
    console.log('*********************');
    
}
startRada();
