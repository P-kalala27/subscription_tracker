import Subscription  from "../models/subscription.models.js"

export const createSubscription = async (req, res, next ) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json(subscription)
    } catch (error) {
        next(error)
    }
}