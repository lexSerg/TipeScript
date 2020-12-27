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

// let startRada =  document.getElementById('rada');
// // console.log(startRada);
// startRada.onclick = () => {
//  document.write('Запуск');
// //  alert('Start');
// // confirm('Рада');
// // confirm('L');
// // prompt('Депутат', 'Рада')
// }

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
        if (this.isBribetaker && money > 100000) return 'Що ви мені пропонуєте??? Я чесна людина!';
        this.bribe = this.bribe + money;
        return 'Ваше питання передано на розгляд'
    }
};

class Fraction {
    deputyList: IDeputy[];
    constructor(deputyList: IDeputy[]) {
        this.deputyList = deputyList
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
    removeDeputy(deputy:number): string{
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
        const sum = this.deputyList.reduce((acc, iter, index) => {
            if (!(index === 0)) acc.bribe = acc.bribe + iter.bribe
            return acc
        }
        )
        console.log(`Общая сумма взяток фракции: ${sum.bribe}$`);
        
    }
}

let depArr = [
    {weight: 75, height: 178, firstName: 'Олег', lastName: 'Ляшко', age: 48, isBribetaker: true, bribe: 5000000},
    {weight: 64, height: 164, firstName: 'Виталий', lastName: 'Голобородько', age: 42, isBribetaker: false},
    {weight: 50, height: 167, firstName: 'Юлия', lastName: 'Тимошенко', age: 60, isBribetaker: true, bribe: 200000000},
    {weight: 106, height: 181, firstName: 'Петр', lastName: 'Порошенко', age: 55, isBribetaker: true, bribe: 500000000},
    {weight: 65, height: 164, firstName: 'Владимир', lastName: 'Зеленский', age: 42, isBribetaker: true, bribe: 10000000},
];
let deputyArray = [];
for (let iter of depArr) {
    deputyArray.push(new Deputy(
    iter.weight, 
    iter.height, 
    iter.firstName,
    iter.lastName, 
    iter.age, 
    iter.isBribetaker, 
    iter.bribe
    ));
}


let fraction = new Fraction(deputyArray);
// fraction.addDeputy();
// fraction.addDeputy();
fraction.showAllDeputy();
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
fraction.showTotalCorruptionSum();