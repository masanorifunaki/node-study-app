'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('../mysqlConnection');

router.get('/:board_id', function (req, res, next) {
    var boardId = req.params.board_id;
    var getBoardQuery = `SELECT * FROM boards WHERE board_id = ${boardId}`;
    var getMessagesQuery = `SELECT *, DATE_FORMAT(created_at, '%Y年%m月%d日 %k時%i分%s秒') AS created_at FROM messages WHERE board_id = ${boardId};`;
    connection.query(getBoardQuery, function (err, board) {
        connection.query(getMessagesQuery, function (err, messages) {
            res.render('board', {
                title: board[0].title,
                board: board[0],
                messageList: messages
            });
        });
    });
});

router.post('/:board_id', function (req, res, next) {
    var message = req.body.message;
    var boardId = req.params.board_id;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = `INSERT INTO messages (message, board_id, created_at) VALUES ( "${message}", "${boardId}", "${createdAt}" )`;
    connection.query(query, function (err, rows) {
        res.redirect(`/boards/${boardId}`);
    });
});

module.exports = router;