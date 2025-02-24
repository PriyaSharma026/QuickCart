import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quick-cart" });

// Inngest function to save user data in database 
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            name: first_name + ' ' + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        await connectDb()
        await User.create(userData)
    }
)

// Inngest function to update user data in database 
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'user-update-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({event}) => {
         const { id, first_name, last_name, email_addresses, image_url } =
           event.data;
         const userData = {
           _id: id,
           name: first_name + " " + last_name,
           email: email_addresses[0].email_address,
           imageUrl: image_url,
         }
        await connectDb()
        await User.findByIdAndUpdate(id, userData)
    }
)

// Inngest function to update user data in database 
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'user-delete-from-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({event}) => {
         const { id } =event.data;
        await connectDb()
        await User.findByIdAndDelete(id)
    }
)
