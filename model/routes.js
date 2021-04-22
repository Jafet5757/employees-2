const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/',(req,res) => {
    res.render('index', {});
});

//Esta xona es para los departamentos
router.post('/addNewDepartament',(req,res)=>{
    let data = req.body;
    console.log(data);
    db.query("INSERT INTO departments VALUES (?,?)",[data.idDept, data.nameDept], (err,response) =>{
        if(err) return res.json(err);
        return res.send('good');
    });
});
router.post('/deleteDepartament',(req,res)=>{
    let data = req.body;
    db.query("DELETE FROM departments WHERE dept_no=?",[data.id],(err, response) =>{
        if(err) return res.json(err);
        return res.send('good');
    }); 
});
router.post('/getDepartaments',(req,res)=>{
    db.query('SELECT * FROM departments', (err, dept) =>{
        if(err) return res.json(err);
        return res.send(dept);
    });
});

//Esa es del empleado
router.post('/saveNewEmployee',(req,res)=>{
    const data = req.body;
    db.query("INSERT INTO employees VALUES(?,?, ?, ?, ?, ?)",[data.empNum,data.birthday,data.firstName,data.lastName,data.gender,data.hireDate],(err,response)=>{
        if(err)return res.json(err);
        db.query("INSERT INTO dept_emp VALUES(?,?,?,?)",[data.empNum,data.idDepartament,data.fromDate,data.toDate],(err,response)=>{
            if(err)return res.json(err);

            //si es un manager y si no lo es
            console.log(data.manager);
            if(data.manager){
                db.query("INSERT INTO dept_manager VALUES(?,?,?,?)",[data.empNum,data.idDepartament,data.fromDate,data.toDate],(err,response)=>{
                    if(err)return res.json(err);
                    db.query("INSERT INTO salaries VALUES(?,?,?,?)",[data.empNum,data.salary,data.fromDate,data.toDate],(err,response)=>{
                        if(err)return res.json(err);
                        db.query("INSERT INTO titles VALUES(?,?,?,?)",[data.empNum,data.title,data.fromDate,data.toDate],(err,response)=>{
                            if(err)return res.json(err);
                            return res.send('good');
                        });
                    });
                });
            }else{
                if(err)return res.json(err);
                 db.query("INSERT INTO salaries VALUES(?,?,?,?)",[data.empNum,data.salary,data.fromDate,data.toDate],(err,response)=>{
                    if(err)return res.json(err);
                    db.query("INSERT INTO titles VALUES(?,?,?,?)",[data.empNum,data.title,data.fromDate,data.toDate],(err,response)=>{
                        if(err)return res.json(err);
                        return res.send('good');
                    });
                });
            }
        });
    });
});

router.post('/getEmployees',(req,res)=>{
    db.query('SELECT * FROM employees',(err, employees)=>{
        if(err)return res.json(err);
        db.query('SELECT * FROM departments',(err,depts)=>{
            if(err)return res.json(err);
            db.query('SELECT * FROM dept_emp',(err, empDepts)=>{
                if(err)return res.json(err);
                db.query('SELECT * FROM salaries',(err, salaries)=>{
                    if(err)return res.json(err);
                    db.query('SELECT * FROM titles',(err, title)=>{
                        if(err)return res.json(err);
                        const data = {employees:employees, depts:depts, salaries:salaries, titles: title, empDepts:empDepts};
                        console.log('data getEmp? '+data);
                        return res.send(data);
                    });
                })
            })
        })
    });
});

router.post('/deleteEmployee',(req,res)=>{
    const idEmp = req.body.idEmp;
    db.query('DELETE FROM dept_emp WHERE emp_no=?',[idEmp],(err,response)=>{
        if(err) return res.json(err);
        db.query('DELETE FROM dept_manager WHERE emp_no=?',[idEmp],(err,response)=>{
            if(err) return res.json(err);
            db.query('DELETE FROM salaries WHERE emp_no=?',[idEmp],(err,response)=>{
                if(err) return res.json(err);
                db.query('DELETE FROM titles WHERE emp_no=?',[idEmp],(err,response)=>{
                    if(err) return res.json(err);
                    db.query('DELETE FROM employees WHERE emp_no=?',[idEmp],(err,response)=>{
                        if(err) return res.json(err);
                        return res.send('good');
                    })
                })
            });
        });
    });
});

module.exports = router;