"use server"

import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { handleError } from "../utils";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongodb/database";
import Order from "../mongodb/database/models/order.model";




export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = order.isFree ? 0 : Number(order.price) * 100;
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: price,
                        product_data: {
                            name: order.eventTitle
                        }
                    },
                    quantity: 1
                },
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?success=/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=/`,
        });
        redirect(session.url!);
    } catch (error) {
        console.error(error);
        throw (error)
    }
}

export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();
        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId
        })

        return JSON.parse(JSON.stringify(newOrder));

    } catch (error) {
        console.error(error);
        handleError(error);
    }
}