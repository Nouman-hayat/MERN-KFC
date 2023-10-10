const
stripe =
require('stripe')('sk_test_51JmH5OGFsyW28IZDNVYJ6TPYwW9F6Zst8zlF5ctp8hZquuLfXtytiXkDR336dVzIMDzV1jEqmYegl1g0XuGLeGVY00DFGWOCHa')

exports.processPayment = async ( req , res ) =>{

    const paymentIntent = await stripe.paymentIntents.create({
        amount : req.body.bill ,
        currency : 'usd' ,
        metadata : { integration_check : 'accept_a_payment' }
    })

    res.status(200).json({
        client_secret : paymentIntent.client_secret
    })
}


