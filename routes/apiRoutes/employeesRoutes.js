const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/employees', (req, res) => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, title.manager
    FROM employees
    LEFT JOIN departments ON employees.department_id = departments.id
    LEFT JOIN title ON employees.title_id = title.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get a single employee
router.get('/employees/:id', (req, res) => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, title.manager
    FROM employees
    LEFT JOIN departments ON employees.department_id = departments.id
    LEFT JOIN title ON employees.title_id = title.id
    WHERE employees.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a employee
router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});
// Create a employee
router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'title_id',
        'department_id'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, title_id, department_id)
      VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.title_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.put('/employees/:id', (req, res) => {
    const sql = `UPDATE employees SET title_id = ? 
                 WHERE id = ?`;
    const params = [req.body.title_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  module.exports = router;