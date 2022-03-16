interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}
interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeID: number, supervisorID: number): void;
  /** Undo last move action */
  undo(): void;
  /** Redo last undone action */
  redo(): void;
}

interface IHistory {
  employeeID: number;
  supervisorID: number;
}

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  prevHistory: IHistory[] = [];
  redoHistory: IHistory[] = [];
  setPosition(employeeID: number, supervisorID: number) {
    let employeeName = "";
    let supervisorName = "";
    for (let staff of allStaffs) {
      if (staff.uniqueId === employeeID) {
        employeeName = staff.name;
      }
      if (staff.uniqueId === supervisorID) {
        supervisorName = staff.name;
      }
    }
    for (let staff of allStaffs) {
      if (staff.uniqueId === employeeID) {
        staff.name = supervisorName;
      }
      if (staff.uniqueId === supervisorID) {
        staff.name = employeeName;
      }
    }
  }
  move(employeeID: number, supervisorID: number) {
    this.setPosition(employeeID, supervisorID)
    this.prevHistory.push({
      employeeID,
      supervisorID
    })
    this.redoHistory = [];
  };
  /** Undo last move action */
  undo() {
    if (this.prevHistory.length > 0) {
      let lastAction: IHistory = this.prevHistory.pop();
      this.redoHistory.push(lastAction);
      this.setPosition(lastAction.supervisorID, lastAction.employeeID);
    }
  };
  /** Redo last undone action */
  redo() {
    if (this.redoHistory.length > 0) {
      let forwardAction = this.redoHistory.pop();
      this.prevHistory.push(forwardAction);
      this.setPosition(forwardAction.employeeID, forwardAction.supervisorID);
    }
  };
  constructor(ceo: Employee) {
    this.ceo = ceo;
  };
}

let id = 1;
const will: Employee = {
  uniqueId: id ++,
  name: "Will Turner",
  subordinates: [],  
}
const tina: Employee = {
  uniqueId: id ++,
  name: "Tina Teff",
  subordinates: [will],
}
const bob: Employee = {
  uniqueId: id ++,
  name: "Bob Saget",
  subordinates: [tina],
}
const mary: Employee = {
  uniqueId: id ++,
  name: "Mary Blue",
  subordinates: [],
}
const cassandra: Employee = {
  uniqueId: id ++,
  name: "Cassandra Reynolds",
  subordinates: [mary, bob],
}
const sarah: Employee = {
  uniqueId: id ++,
  name: "Sarah Donald",
  subordinates: [cassandra],
}
const tomas: Employee = {
  uniqueId: id ++,
  name: "Thomas Brown",
  subordinates: [],
}
const harry: Employee = {
  uniqueId: id ++,
  name: "Harry Tobs",
  subordinates: [tomas],
}
const george: Employee = {
  uniqueId: id ++,
  name: "George Carrey",
  subordinates: [],
}
const gary: Employee = {
  uniqueId: id ++,
  name: "Gary Styles",
  subordinates: [],
}
const tyler: Employee = {
  uniqueId: id ++,
  name: "Tyler Simpson",
  subordinates: [harry, george, gary],
}
const bruce: Employee = {
  uniqueId: id ++,
  name: "Bruce Willis",
  subordinates: [],
}
const shopie: Employee = {
  uniqueId: id ++,
  name: "Sophie Turner",
  subordinates: [],
}
const georgina: Employee = {
  uniqueId: id ++,
  name: "Georgina Flangy",
  subordinates: [shopie],
}
const mark: Employee = {
  uniqueId: id++,
  name: "Mark Zuckerberg",
  subordinates: [sarah, tyler, bruce, georgina]
}
const allStaffs = [
  will, tina, bob, mary, cassandra, sarah, tomas, harry, george, gary, tyler, bruce, shopie, georgina, mark
];
const employeeOrgApp = new EmployeeOrgApp(mark)

// Test
employeeOrgApp.move(15, 5)
employeeOrgApp.move(1, 3)
employeeOrgApp.undo()
employeeOrgApp.redo()
console.log(employeeOrgApp.ceo)