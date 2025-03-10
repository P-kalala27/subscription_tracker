import { Router } from "express";

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => res.send({title: 'Get all subscriptions'}))

subscriptionRouter.get('/:id', (req, res) => res.send({title: 'Get subscription details'}))

subscriptionRouter.post('/',(req, res) => res.send({title: 'create a new subscription'}))

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'update subscription details'}))

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'delete a subscription'}))

subscriptionRouter.get('/user/:id', (req, res) => res.send({title: 'Get all subscriptions for a user'}))

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'cancel a subscription'}))

subscriptionRouter.get('/upcoming', (req, res) => res.send({title: 'Get all upcoming subscriptions'}) )

export default subscriptionRouter;

