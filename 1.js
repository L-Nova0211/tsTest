var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.prevHistory = [];
        this.redoHistory = [];
        this.ceo = ceo;
    }
    EmployeeOrgApp.prototype.setPosition = function (employeeID, supervisorID) {
        var employeeName = "";
        var supervisorName = "";
        for (var _i = 0, allStaffs_1 = allStaffs; _i < allStaffs_1.length; _i++) {
            var staff = allStaffs_1[_i];
            if (staff.uniqueId === employeeID) {
                employeeName = staff.name;
            }
            if (staff.uniqueId === supervisorID) {
                supervisorName = staff.name;
            }
        }
        for (var _a = 0, allStaffs_2 = allStaffs; _a < allStaffs_2.length; _a++) {
            var staff = allStaffs_2[_a];
            if (staff.uniqueId === employeeID) {
                staff.name = supervisorName;
            }
            if (staff.uniqueId === supervisorID) {
                staff.name = employeeName;
            }
        }
    };
    EmployeeOrgApp.prototype.move = function (employeeID, supervisorID) {
        this.setPosition(employeeID, supervisorID);
        this.prevHistory.push({
            employeeID: employeeID,
            supervisorID: supervisorID
        });
        this.redoHistory = [];
    };
    ;
    /** Undo last move action */
    EmployeeOrgApp.prototype.undo = function () {
        if (this.prevHistory.length > 0) {
            var lastAction = this.prevHistory.pop();
            this.redoHistory.push(lastAction);
            this.setPosition(lastAction.supervisorID, lastAction.employeeID);
        }
    };
    ;
    /** Redo last undone action */
    EmployeeOrgApp.prototype.redo = function () {
        if (this.redoHistory.length > 0) {
            var forwardAction = this.redoHistory.pop();
            this.prevHistory.push(forwardAction);
            this.setPosition(forwardAction.employeeID, forwardAction.supervisorID);
        }
    };
    ;
    ;
    return EmployeeOrgApp;
}());
var id = 1;
var will = {
    uniqueId: id++,
    name: "Will Turner",
    subordinates: []
};
var tina = {
    uniqueId: id++,
    name: "Tina Teff",
    subordinates: [will]
};
var bob = {
    uniqueId: id++,
    name: "Bob Saget",
    subordinates: [tina]
};
var mary = {
    uniqueId: id++,
    name: "Mary Blue",
    subordinates: []
};
var cassandra = {
    uniqueId: id++,
    name: "Cassandra Reynolds",
    subordinates: [mary, bob]
};
var sarah = {
    uniqueId: id++,
    name: "Sarah Donald",
    subordinates: [cassandra]
};
var tomas = {
    uniqueId: id++,
    name: "Thomas Brown",
    subordinates: []
};
var harry = {
    uniqueId: id++,
    name: "Harry Tobs",
    subordinates: [tomas]
};
var george = {
    uniqueId: id++,
    name: "George Carrey",
    subordinates: []
};
var gary = {
    uniqueId: id++,
    name: "Gary Styles",
    subordinates: []
};
var tyler = {
    uniqueId: id++,
    name: "Tyler Simpson",
    subordinates: [harry, george, gary]
};
var bruce = {
    uniqueId: id++,
    name: "Bruce Willis",
    subordinates: []
};
var shopie = {
    uniqueId: id++,
    name: "Sophie Turner",
    subordinates: []
};
var georgina = {
    uniqueId: id++,
    name: "Georgina Flangy",
    subordinates: [shopie]
};
var mark = {
    uniqueId: id++,
    name: "Mark Zuckerberg",
    subordinates: [sarah, tyler, bruce, georgina]
};
var allStaffs = [
    will, tina, bob, mary, cassandra, sarah, tomas, harry, george, gary, tyler, bruce, shopie, georgina, mark
];
var employeeOrgApp = new EmployeeOrgApp(mark);
// Test
employeeOrgApp.move(15, 5);
employeeOrgApp.move(1, 3);
employeeOrgApp.undo();
employeeOrgApp.redo();
console.log(employeeOrgApp.ceo);
