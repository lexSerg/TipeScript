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
var Fraction = /** @class */ (function () {
    function Fraction(deputyList) {
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
    };
    Fraction.prototype.showAllDeputy = function () {
        console.log(this.deputyList);
    };
    ;
    return Fraction;
}());
var depArr = [
    { weight: 75, height: 178, firstName: 'Олег', lastName: 'Ляшко', age: 48, isBribetaker: true, bribe: 5000000 },
    { weight: 64, height: 164, firstName: 'Виталий', lastName: 'Голобородько', age: 42, isBribetaker: false },
    { weight: 50, height: 167, firstName: 'Юлия', lastName: 'Тимошенко', age: 60, isBribetaker: true, bribe: 200000000 },
    { weight: 106, height: 181, firstName: 'Петр', lastName: 'Порошенко', age: 55, isBribetaker: true, bribe: 500000000 },
    { weight: 65, height: 164, firstName: 'Владимир', lastName: 'Зеленский', age: 42, isBribetaker: true, bribe: 10000000 },
];
depArr = [];
var deputyArray = [];
for (var _i = 0, depArr_1 = depArr; _i < depArr_1.length; _i++) {
    var iter = depArr_1[_i];
    deputyArray.push(new Deputy(iter.weight, iter.height, iter.firstName, iter.lastName, iter.age, iter.isBribetaker, iter.bribe));
}
var fraction = new Fraction(deputyArray);
// fraction.addDeputy();
// fraction.addDeputy();
fraction.showAllDeputy();
// console.log(deputyList[2]);
// console.log(fraction.deputyList[2]);
//fraction.addDeputy();
// let dep1 = new Deputy(65, 154, 'FGf', 'DDDDDD', 65, true, 50);
// console.log(dep1);
//fraction.showAllDeputy();
// fraction.showAllDeputy();