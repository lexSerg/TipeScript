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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Human = /** @class */ (function () {
    function Human(weight, height) {
        this.weight = weight;
        this.height = height;
    }
    return Human;
}());
;
;
var Deputy = /** @class */ (function (_super) {
    __extends(Deputy, _super);
    function Deputy(weight, height, firstName, lastName, age, isBribetaker, bribe) {
        var _this = _super.call(this, weight, height) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.age = age;
        _this.isBribetaker = isBribetaker;
        _this.bribe = bribe | 0;
        return _this;
    }
    ;
    Deputy.prototype.takeBribe = function (money) {
        if (!this.isBribetaker)
            return 'Я державу не продаю!!! Геть звідси злодій!!!';
        if (this.isBribetaker && money > 100000)
            return 'Що ви мені пропонуєте??? Я чесна людина!';
        this.bribe = this.bribe + money;
        return 'Ваше питання передано на розгляд';
    };
    return Deputy;
}(Human));
;
;
var Fraction = /** @class */ (function () {
    function Fraction(fractionName, deputyList) {
        this.fractionName = fractionName;
        this.deputyList = deputyList;
    }
    ;
    Fraction.prototype.addDeputy = function () {
        var firstName = prompt('Введите имя депутата');
        var lastName = prompt('Введите фамилию депутата');
        var weight = +prompt('Введите вес депутата');
        var height = +prompt('Введите высоту депутата');
        var age = +prompt('Введите возраст депутата');
        var isBribetaker = confirm('Взяточник?');
        var bribe;
        if (isBribetaker)
            bribe = +prompt('Размер взяток?');
        var deput = new Deputy(weight, height, firstName, lastName, age, isBribetaker, bribe);
        this.deputyList.push(deput);
    };
    ;
    Fraction.prototype.removeDeputy = function (deputy) {
        this.deputyList.splice(deputy, 1);
        return "\u0423\u0434\u0430\u043B\u0435\u043D \u0434\u0435\u043F\u0443\u0442\u0430\u0442 \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + deputy + " -\n         " + this.deputyList[deputy].firstName + "\n         " + this.deputyList[deputy].firstName + " ";
    };
    Fraction.prototype.removeAllDeputies = function () {
        this.deputyList = [];
        console.log('Во фракции нет ни одного депутата');
    };
    Fraction.prototype.removeCorruptionDeputy = function () {
        var isCorruptions = false;
        for (var i = 0; i < this.deputyList.length; i++) {
            if (this.deputyList[i].isBribetaker) {
                this.deputyList.splice(i, 1);
                isCorruptions = true;
                i--;
            }
        }
        if (isCorruptions)
            console.log('Коррупционеров исключили из фракции');
        console.log('Во фракции нет коррупционеров');
    };
    Fraction.prototype.showMostCorruptionDeputy = function () {
        if (this.deputyList.length === 0) {
            console.log('Во фракции нет ни одного депутата');
            return;
        }
        if (!this.deputyList.some(function (iter) { return iter.isBribetaker; })) {
            console.log('Во фракции нет коррупционеров');
            return;
        }
        var res = this.deputyList.reduce(function (acc, current) {
            if (acc.bribe < current.bribe)
                acc = current;
            return acc;
        });
        console.log("\u0421\u0430\u043C\u044B\u0439 \u043A\u0440\u0443\u043F\u043D\u044B\u0439 \u0432\u0437\u044F\u0442\u043E\u0447\u043D\u0438\u043A: " + res.firstName + " " + res.lastName);
        console.log(res);
    };
    Fraction.prototype.showAllDeputy = function () {
        (this.deputyList.length === 0) ?
            console.log('Во фракции нет ни одного депутата') :
            console.log(this.deputyList);
    };
    ;
    Fraction.prototype.showTotalCorruptionSum = function () {
        var firstElemBribe = this.deputyList[0].bribe;
        var total;
        var res = this.deputyList.reduce(function (acc, iter, index) {
            if (!(index === 0))
                acc.bribe = acc.bribe + iter.bribe;
            return acc;
        });
        total = res.bribe;
        this.deputyList[0].bribe = firstElemBribe; //Потому как было мутировано значение bribe первого элемента
        //Не самое удачное решение но захотелось сделать через reduce()
        console.log("\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430 \u0432\u0437\u044F\u0442\u043E\u043A \u0444\u0440\u0430\u043A\u0446\u0438\u0438: " + total + "$");
    };
    return Fraction;
}());
var VerhovnaRada = /** @class */ (function () {
    function VerhovnaRada(fractionList) {
        this.fractionList = fractionList;
    }
    ;
    VerhovnaRada.prototype.addFraction = function () {
        var name = prompt('Введите название фракции');
        var fraction = new Fraction(name, []);
        this.fractionList.push(fraction);
    };
    ;
    VerhovnaRada.prototype.removeFraction = function () {
        var fractionNum = +prompt('Введите номер фракции для удаления');
        if (fractionNum > this.fractionList.length)
            alert('Извините, но такой фракции нет в списке');
        var deletedFractionName = this.fractionList[fractionNum].fractionName;
        this.fractionList.splice(fractionNum, 1);
        console.log("\u0424\u0440\u0430\u043A\u0446\u0438\u044F \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + fractionNum + " : " + deletedFractionName + " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0430");
    };
    return VerhovnaRada;
}());
var depArr = [
    { weight: 75, height: 178, firstName: 'Олег', lastName: 'Ляшко', age: 48, isBribetaker: true, bribe: 5000000 },
    { weight: 64, height: 164, firstName: 'Виталий', lastName: 'Голобородько', age: 42, isBribetaker: false },
    { weight: 50, height: 167, firstName: 'Юлия', lastName: 'Тимошенко', age: 60, isBribetaker: true, bribe: 200000000 },
    { weight: 106, height: 181, firstName: 'Петр', lastName: 'Порошенко', age: 55, isBribetaker: true, bribe: 500000000 },
    { weight: 65, height: 164, firstName: 'Владимир', lastName: 'Зеленский', age: 42, isBribetaker: true, bribe: 10000000 },
];
var deputyArray = [];
for (var _i = 0, depArr_1 = depArr; _i < depArr_1.length; _i++) {
    var iter = depArr_1[_i];
    deputyArray.push(new Deputy(iter.weight, iter.height, iter.firstName, iter.lastName, iter.age, iter.isBribetaker, iter.bribe));
}
var fraction = new Fraction("Зеленые", deputyArray);
var fractionArr = [];
fractionArr.push(fraction);
var rada = new VerhovnaRada(fractionArr);
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
// fraction.showMostCorruptionDeputy()
// fraction.showTotalCorruptionSum();
// fraction.showAllDeputy();
console.log(rada);
rada.fractionList;
rada.addFraction();
rada.addFraction();
rada.removeFraction();
console.log(rada.fractionList);
;
