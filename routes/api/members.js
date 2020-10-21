const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../member_list');


//rest api - get members
router.get('/', (req, res) => res.json(members));

//get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

//create a member
router.post('/', (req, res) => {
    const new_member = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!req.body.name || !req.body.email) {
        res.redirect('/');
        return res.status(400).json({ msg: 'please include a nme and email.'});
    }

    members.push(new_member);
    //res.json(members);
    res.redirect('/');
});

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const update_member = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = update_member.name ? update_member.name : member.name;
                member.email = update_member.email ? update_member.email : member.email;

                res.json({ msg: 'member updated', member});
            }
        });
        res.json(members.filter(member => member.id === parseInt(req.params)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

//delete member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;