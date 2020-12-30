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
var startRadaBtn = document.getElementById('rada');
var radaData = document.getElementById('radaData');
startRadaBtn.onclick = function () {
    startRada();
};
radaData.onclick = function () {
    addDefaultData();
    radaData.classList.add('hidden');
};
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
        if (this.isBribetaker && money > 1000)
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
        console.log("\u0414\u0435\u043F\u0443\u0442\u0430\u0442 '" + deput.firstName + " " + deput.lastName + "' \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432\u043E \u0444\u0440\u0430\u043A\u0446\u0438\u044E");
    };
    ;
    Fraction.prototype.removeDeputy = function () {
        this.showAllDeputy();
        var deputy = +prompt('Введите номер депутата из списка для удаления') - 1;
        var firstName = this.deputyList[deputy].firstName;
        var lastName = this.deputyList[deputy].lastName;
        this.deputyList.splice(deputy, 1);
        var res = "\u0423\u0434\u0430\u043B\u0435\u043D \u0434\u0435\u043F\u0443\u0442\u0430\u0442 \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + (deputy + 1) + " - " + firstName + " " + lastName + " ";
        console.log(res);
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
        var arr = JSON.parse(JSON.stringify(this.deputyList));
        var res = arr.reduce(function (acc, current) {
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
        this.deputyList.forEach(function (value, index) {
            console.log(index + 1 + ") " + value.firstName + " " + value.lastName);
        });
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
    // Основные методы
    VerhovnaRada.prototype.addFraction = function () {
        var name = prompt('Введите название фракции');
        var fraction = new Fraction(name, []);
        this.fractionList.push(fraction);
        console.log("\u0424\u0440\u0430\u043A\u0446\u0438\u044F '" + name + "' \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0432 \u0420\u0430\u0434\u0443");
    };
    ;
    VerhovnaRada.prototype.removeFraction = function () {
        this.showAllFractions();
        var keyChoise = +prompt('Введите номер фракции для удаления') - 1;
        if (keyChoise === null) {
            console.log('Удаление отменено');
            return;
        }
        ;
        if (keyChoise > this.fractionList.length && keyChoise < 0)
            alert('Извините, но такой фракции нет в списке');
        var deletedFractionName = this.fractionList[keyChoise].fractionName;
        this.fractionList.splice(keyChoise, 1);
        console.log("\u0424\u0440\u0430\u043A\u0446\u0438\u044F \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + (keyChoise + 1) + " - '" + deletedFractionName + "' \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0430");
    };
    VerhovnaRada.prototype.showAllFractions = function () {
        console.log(rada.fractionList);
        this.fractionList.forEach(function (iter, index) {
            console.log(index + 1 + ") \u0424\u0440\u0430\u043A\u0446\u0438\u044F: '" + iter.fractionName + "'");
        });
    };
    VerhovnaRada.prototype.showFraction = function () {
        this.showAllFractions();
        var fractionNum = +prompt('Введите номер фракции для показа') - 1;
        if (fractionNum > this.fractionList.length && fractionNum < 0)
            alert('Извините, но такой фракции нет в списке');
        console.log("\u0412\u044B\u0432\u0435\u0434\u0435\u043D\u0430 \u0444\u0440\u0430\u043A\u0446\u0438\u044F \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + (fractionNum + 1) + " - '" + this.fractionList[fractionNum].fractionName + "' :");
        console.log(this.fractionList[fractionNum]);
    };
    VerhovnaRada.prototype.addDeputyToFraction = function () {
        this.showAllFractions();
        var fraction = +prompt('Выбирите фракцию для добавления депутата') - 1;
        this.fractionList[fraction].addDeputy();
    };
    VerhovnaRada.prototype.removeDeputyFromFraction = function () {
        this.showAllFractions();
        var fraction = +prompt('Выбирите фракцию для удаления депутата') - 1;
        this.fractionList[fraction].removeDeputy();
    };
    VerhovnaRada.prototype.showFractionCoruptionDeputies = function () {
        this.showAllFractions();
        var choise = +prompt('Выбирите фракцию для поиска взяточников') - 1;
        if (this.isDeputiesInFraction(choise))
            return;
        var coruptionsDeputies = this.fractionList[choise].deputyList.filter(function (iter) { return iter.isBribetaker; });
        if (!this.isCorruoptioDeputiesInFraction(coruptionsDeputies))
            return;
        console.log(coruptionsDeputies);
        console.log("\u0412\u043E \u0444\u0440\u0430\u043A\u0446\u0438\u0438 '" + this.fractionList[choise].fractionName + "' " + coruptionsDeputies.length + " \u0432\u0437\u044F\u0442\u043E\u0447\u043D\u0438\u043A(\u043E\u0432)");
        coruptionsDeputies.forEach(function (iter, index) {
            console.log(index + 1 + ") " + iter.firstName + " " + iter.lastName);
        });
    };
    VerhovnaRada.prototype.showMostFractionCoruptionDeputy = function () {
        this.showAllFractions();
        var choise = +prompt('Выбирите фракцию для поиска самого жадного депутата') - 1;
        if (this.isDeputiesInFraction(choise))
            return;
        if (!this.isCorruoptioDeputiesInFraction(this.fractionList[choise].deputyList))
            return;
        var mostCorruptionDeputy = this.findMostCorruptionDeputyInFraction(this.fractionList, choise);
        console.log(mostCorruptionDeputy);
        console.log("\u0421\u0430\u043C\u044B\u0439 \u0436\u0430\u0434\u043D\u044B\u0439 \u0434\u0435\u043F\u0443\u0442\u0430\u0442 \u0444\u0440\u0430\u043A\u0446\u0438\u0438 - '" + mostCorruptionDeputy.firstName + " " + mostCorruptionDeputy.lastName + "'");
    };
    ;
    VerhovnaRada.prototype.showMostCorruptionDeputyInRada = function () {
        var res;
        var arrDep = [];
        for (var i = 0; i < this.fractionList.length; i++) {
            if (this.fractionList[i].deputyList.length === 0)
                continue;
            arrDep.push(this.findMostCorruptionDeputyInFraction(this.fractionList, i));
        }
        ;
        console.log(arrDep);
        var user = new Fraction('Buffer', arrDep);
        user.showMostCorruptionDeputy();
    };
    VerhovnaRada.prototype.showAllDeputiesInFraction = function () {
        this.showAllFractions();
        var choise = +prompt('Выбирите фракцию для отображения всех депутатов') - 1;
        if (choise > this.fractionList.length && choise < 0)
            alert('Извините, но такой фракции нет в списке');
        console.log("\u0412\u043E \u0444\u0440\u0430\u043A\u0446\u0438\u0438 '" + this.fractionList[choise].fractionName + "' - " + this.fractionList[choise].deputyList.length + " \u0434\u0435\u043F\u0443\u0442\u0430\u0442\u043E\u0432:");
        this.fractionList[choise].showAllDeputy();
        return this.fractionList[choise].deputyList;
    };
    ;
    VerhovnaRada.prototype.takeBribeToDeputy = function () {
        var depArr = this.showAllDeputiesInFraction();
        var choise = +prompt('Выбирите депутата, которому нужно предложить взятку') - 1;
        var money = +prompt('Введите сумму взятки');
        console.log(depArr[choise]);
        console.log(depArr[choise].takeBribe(money));
    };
    // Вспомагательные служебные методы
    VerhovnaRada.prototype.isDeputiesInFraction = function (num) {
        if (this.fractionList[num].deputyList.length === 0) {
            console.log('Во фракции нет депутатов');
            return true;
        }
        return false;
    };
    ;
    VerhovnaRada.prototype.isCorruoptioDeputiesInFraction = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var iter = arr_1[_i];
            if (iter.bribe)
                return true;
        }
        console.log('Во фракции нет взяточников');
        return false;
    };
    ;
    VerhovnaRada.prototype.findMostCorruptionDeputyInFraction = function (arr, num) {
        var bufferArr = JSON.parse(JSON.stringify(arr[num].deputyList));
        var res = bufferArr.reduce(function (acc, iter) {
            if (acc.bribe < iter.bribe)
                acc = iter;
            return acc;
        });
        return res;
    };
    return VerhovnaRada;
}());
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
var fractionArr = [];
var rada = new VerhovnaRada(fractionArr);
function addDefaultData() {
    var depArr1 = [
        { weight: 75, height: 178, firstName: 'Олег', lastName: 'Ляшко', age: 48, isBribetaker: true, bribe: 5000 },
        { weight: 64, height: 164, firstName: 'Виталий', lastName: 'Голобородько', age: 42, isBribetaker: false },
        { weight: 50, height: 167, firstName: 'Юлия', lastName: 'Тимошенко', age: 60, isBribetaker: true, bribe: 10000 },
        { weight: 106, height: 181, firstName: 'Петр', lastName: 'Порошенко', age: 55, isBribetaker: true, bribe: 50000 },
        { weight: 65, height: 164, firstName: 'Владимир', lastName: 'Зеленский', age: 42, isBribetaker: true, bribe: 15000 },
    ];
    var depArr2 = [
        { weight: 88, height: 173, firstName: 'Валерий', lastName: 'Звягенцев', age: 19, isBribetaker: true, bribe: 500 },
        { weight: 65, height: 179, firstName: 'Рик', lastName: 'Санчес', age: 70, isBribetaker: true, bribe: 7000 },
        { weight: 45, height: 142, firstName: 'Морти', lastName: 'Смит', age: 14, isBribetaker: false },
        { weight: 35, height: 162, firstName: 'Дональд', lastName: 'Дак', age: 25, isBribetaker: true, bribe: 200 },
    ];
    var depArr3 = [
        { weight: 105, height: 175, firstName: 'Гомер', lastName: 'Симпсон', age: 36, isBribetaker: true, bribe: 1200 },
        { weight: 65, height: 179, firstName: 'Мардж', lastName: 'Симпсон', age: 31, isBribetaker: false },
        { weight: 43, height: 145, firstName: 'Барт', lastName: 'Симпсон', age: 9, isBribetaker: true, bribe: 200 },
        { weight: 34, height: 138, firstName: 'Лиза', lastName: 'Симпсон', age: 8, isBribetaker: false },
        { weight: 15, height: 55, firstName: 'Мегги', lastName: 'Симпсон', age: 1, isBribetaker: false },
    ];
    var deputyArray = [depArr1, depArr2, depArr3];
    var fractionsDefault = [];
    function fillDeputyDefaultArray(arr) {
        var resOuter = [];
        var _loop_1 = function (iter) {
            var resInner = [];
            iter.forEach(function (curr) {
                resInner.push(new Deputy(curr.weight, curr.height, curr.firstName, curr.lastName, curr.age, curr.isBribetaker, curr.bribe));
            });
            resOuter.push(resInner);
        };
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var iter = arr_2[_i];
            _loop_1(iter);
        }
        ;
        return resOuter;
    }
    ;
    var fractionArrays = fillDeputyDefaultArray(deputyArray);
    fractionsDefault.push(new Fraction('Салат', fractionArrays[0]));
    fractionsDefault.push(new Fraction('Веселі смаколики', fractionArrays[1]));
    fractionsDefault.push(new Fraction('Симпсоны', fractionArrays[2]));
    fractionsDefault.forEach(function (iter) {
        rada.fractionList.push(iter);
    });
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
    var choise = +prompt('Выберите действие');
    switch (choise) {
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
            rada.takeBribeToDeputy();
            break;
        default: alert('Выберите другое действие');
    }
    ;
    console.log('*********************');
}
startRada();
