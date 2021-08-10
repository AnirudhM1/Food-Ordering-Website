import dbConnect from '../../../lib/dbConnect'
import restaurantController from '../../../controllers/Restaurant'
import catchAsync from '../../../lib/catchAsync'

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'GET':
            catchAsync(restaurantController.getRestaurants(req, res))
            break;
        case 'POST':
            catchAsync(restaurantController.createRestaurant(req, res))
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}