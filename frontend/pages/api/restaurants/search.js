import dbConnect from '../../../lib/dbConnect'
import restaurantController from '../../../controllers/Restaurant'
import catchAsync from '../../../lib/catchAsync'

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'POST':
            catchAsync(restaurantController.serachRestaurant(req, res));
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}