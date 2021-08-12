import dbConnect from '../../../../lib/dbConnect';
import userController from '../../../../controllers/User';
import catchAsync from "../../../../lib/catchAsync";

export default async function handler(req, res) {
    const method = req.method;
    await dbConnect();
    switch (method) {
        case 'PUT':
            const type = req.body.type;
            let route;
            switch (type) {
                case 'image':
                    route = userController.updateImage;
                    break;
                case 'name':
                    route = userController.updateName;
                    break;
                case 'both':
                    route = userController.updateNameAndImage;
                default:
                    res.status(400).json({ success: false });
            }
            catchAsync(route(req, res));
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}