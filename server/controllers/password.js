import Password from '../models/password';

import { makeLogger, sendErr, asyncErr } from '../helpers';

let log = makeLogger('controllers/password');

export async function create(req, res) {
    let pass = req.body;

    // Missing parameters
    if (typeof pass.name === 'undefined')
        return sendErr(res, `when creating a password: ${cat}`, 400,
            'Missing password name');

    if (typeof pass.login === 'undefined')
        return sendErr(res, `when creating a password: ${cat}`, 400,
            'Missing password login');

    if (typeof pass.password === 'undefined')
        return sendErr(res, `when creating a password: ${cat}`, 400,
            'Missing password');

    try {
        let created = await Password.create(pass);
        res.status(200).send(created);
    } catch (err) {
        return asyncErr(res, err, 'when creating password');
    }
}


export async function update(req, res) {
    let params = req.body;

    // Missing parameters
    if (typeof params.name === 'undefined')
        return sendErr(res, `when updating a password: ${cat}`, 400,
            'Missing password name');

    if (typeof params.login === 'undefined')
        return sendErr(res, `when updating a password: ${cat}`, 400,
            'Missing password login');

    if (typeof params.password === 'undefined')
        return sendErr(res, `when updating a password: ${cat}`, 400,
            'Missing password');

    let password = Password.find(req.params.id);
    try {
        let newPass = await password.updateAttributes(params);
        res.status(200).send(newPass);
    } catch (err) {
        return asyncErr(res, err, 'when updating a password');
    }
}

export async function destroy(req, res) {
    try {
        await Password.destroy(req.params.id);
        res.sendStatus(204);
    } catch(err) {
        return asyncErr(res, err, 'when deleting password');
    }
};