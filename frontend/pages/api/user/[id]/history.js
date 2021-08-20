import dbConnect from '../../../../lib/dbConnect';
import userController from '../../../../controllers/User';
import catchAsync from "../../../../lib/catchAsync";

export default async function handler(req, res) {
    const method = req.method;
    await dbConnect();
    switch (method) {
        case 'POST':
            catchAsync(userController.addHistory(req, res));
            break;
        case 'GET':
            res.send('HELLO')
            break
        default:
            res.status(400).json({ success: false })
            break;
    }
}