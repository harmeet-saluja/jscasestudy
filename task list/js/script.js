 function taskOperation() {

 }

 taskOperation.prototype.tasks = [];

 taskOperation.prototype.addTask = function (title, dueDate) {
     this.tasks.push({
         title: title,
         dueDate: dueDate,
         status: false
     })
 }


 taskOperation.prototype.display = function () {
     this.tasks.forEach(function (task) {
         console.log(task);
     })
 }

 taskOperation.prototype.toggle = function (position) {
     this.tasks[position].status = !this.tasks[position].status;
 }

 taskOperation.prototype.toggleAll = function () {
     var taskListSize = this.tasks.length;
     var statusTrueCount = 0;

     for (var i = 0; i < taskListSize; i++) {
         if (this.tasks[i].status === true) {
             statusTrueCount++;
         }
     }

     if (statusTrueCount === taskListSize) {
         for (i = 0; i < taskListSize; i++) {
             this.toggle(i);
         }
     } else {
         for (i = 0; i < taskListSize; i++) {
             if (this.tasks[i].status === false) {
                 this.toggle(i);
             }
         }
     }
 }

 taskOperation.prototype.delete = function (position) {
     this.tasks.splice(position, 1);
 }


 var handler = {
     addTask: function () {
         var title = document.getElementById('title').value;
         var date = document.getElementById('date').value;
         if (title.trim().length === 0) {
             alert('Please enter the title.');
             return;
         }

         if (date.trim().length === 0) {
             alert('Please enter the date.');
             return;
         }
         taskOperation.prototype.addTask(title, date);
         taskOperation.prototype.display();
         view.displayTasks();
     },

     delete: function () {
         let checkBoxes = document.getElementsByClassName('taskCheckBox');
         for (let i = checkBoxes.length - 1; i >= 0; i--) {
             if (checkBoxes[i].checked === true) {
                 let position = checkBoxes[i].id;
                 taskOperation.prototype.delete(position);
             }
         }
         view.displayTasks();
     },

     deleteAll: function () {
         let deleteAllCB = document.getElementById('deleteAll');
         let checkBoxes = document.getElementsByClassName('taskCheckBox');
         if (deleteAllCB.checked === true) {
             for (let i = checkBoxes.length - 1; i >= 0; i--) {
                 checkBoxes[i].checked = true;
             }
         } else {
             for (let i = checkBoxes.length - 1; i >= 0; i--) {
                 checkBoxes[i].checked = false;
             }
         }
     },

     toggle: function () {
         let checkBoxes = document.getElementsByClassName('taskCheckBox');
         let trueCheckBoxCount = 0;
         for (let i = checkBoxes.length - 1; i >= 0; i--) {
             if (checkBoxes[i].checked === true) {
                 trueCheckBoxCount++;
             }
         }
         if (trueCheckBoxCount === taskOperation.prototype.tasks.length)
             taskOperation.prototype.toggleAll();
         else {
             for (let i = checkBoxes.length - 1; i >= 0; i--) {
                 if (checkBoxes[i].checked === true) {
                     let position = checkBoxes[i].id;
                     taskOperation.prototype.toggle(position);
                 }
             }
         }

         view.displayTasks();
     }
 };

 var view = {
     displayTasks: function () {
         let display = document.querySelector('[id=table]');
         let table = this.createTable();
         display.innerHTML = '';
         display.appendChild(table);
         let tasks = taskOperation.prototype.tasks;
         tasks.forEach(function (task) {
             let tableTr = document.createElement('tr');
             tableTr.setAttribute('id', tasks.indexOf(task));
             let tdCheckbox = document.createElement('td');
             let ipCheckBox = document.createElement('input');
             tdCheckbox.appendChild(ipCheckBox);
             ipCheckBox.setAttribute('id', tasks.indexOf(task));
             ipCheckBox.setAttribute('type', 'checkbox');
             ipCheckBox.className = 'taskCheckBox';
             let tdTitle = document.createElement('td');
             tdTitle.textContent = task.title;
             let tdDueDate = document.createElement('td');
             tdDueDate.textContent = this.findDays(task.dueDate);
             let tdStatus = document.createElement('td');
             if (task.status === true)
                 tdStatus.textContent = 'Completed';
             else
                 tdStatus.textContent = 'In Progress';
             tableTr.appendChild(tdCheckbox);
             tableTr.appendChild(tdTitle);
             tableTr.appendChild(tdDueDate);
             tableTr.appendChild(tdStatus);
             table.appendChild(tableTr);
         }, this)
     },

     createTable: function () {
         let table = document.createElement('table');
         table.setAttribute('cellpadding', '10px');
         table.setAttribute('cellspacing', '0px');
         table.setAttribute('width', '50%');
         table.style.margin = '0px auto';
         let tableRow = document.createElement('tr');
         let tableCheckBox = document.createElement('th');
         let inputCheckBox = document.createElement('input');
         inputCheckBox.setAttribute('type', 'checkbox');
         inputCheckBox.id = 'deleteAll';
         inputCheckBox.setAttribute('onchange', 'handler.deleteAll();');
         tableCheckBox.appendChild(inputCheckBox);
         let tableTitle = document.createElement('th');
         tableTitle.textContent = 'Title';
         let tableDueDate = document.createElement('th');
         tableDueDate.textContent = 'Due Date';
         let tableStatus = document.createElement('th');
         tableStatus.textContent = 'Status';
         tableRow.appendChild(tableCheckBox);
         tableRow.appendChild(tableTitle);
         tableRow.appendChild(tableDueDate);
         tableRow.appendChild(tableStatus);
         table.appendChild(tableRow);

         return table;
     },

     addTask: function () {
         handler.addTask();
     },

     delete: function () {
         handler.delete();
     },

     deleteAll: function () {
         handler.deleteAll();
     },

     toggle: function () {
         handler.toggle();
     },

     findDays: function (input) {
         var inputDate = new Date(input);
         var currentDate = new Date();
         var message = "";
         if (inputDate.getDate() === currentDate.getDate()) {
             message = "Due Today";
         } else if (inputDate.getTime() > currentDate.getTime()) {
             var daysLeft = inputDate.getDate() - currentDate.getDate();
             message = daysLeft + " Days Due";
         } else {
             message = "OverDue";
         }
         return message;

     }
 }

 view.displayTasks();
