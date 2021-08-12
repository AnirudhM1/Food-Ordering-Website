import dbConnect from '../../../../lib/dbConnect';
import userController from '../../../../controllers/User';
import catchAsync from "../../../../lib/catchAsync";

export default async function handler(req, res) {
    const method = req.method;
    await dbConnect();
    switch (method) {
        case 'POST':
            catchAsync(userController.addAddress(req, res));
            break;
        case 'PUT':
            catchAsync(userController.updateAddress(req, res));
            break;
        case 'DELETE':
            catchAsync(userController.deleteAddress(req, res));
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}