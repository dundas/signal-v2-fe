"use server";
import { connectDB } from "@/utils/db/mongoose/connect";
import User from "@/utils/db/mongoose/models/User";
import Brand from "@/utils/db/mongoose/models/Brand";
import { getBrands } from "../user/getBrands";
export async function getUserSessionDetails(userId) {

    // Connect to the database
    await connectDB();

    // Find the user by id
    const user = await User.findOne({ _id: userId });
    const userDetails = JSON.parse(JSON.stringify(user));
    if (!user) {
        throw new Error("User not found");
    }
    // Get the user's brands
    const brands = await getBrands(user._id);

    // check the activeBrand from the user object, and set it to the matching brand in the brands array
    const finalBrandList = brands.map(brand => {
        if (brand._id == user.activeBrand) {
            brand.active = true
            return brand;
        }
        return brand
    });
    console.log("FINAL BRAND LIST: ", finalBrandList)
    userDetails.brands = finalBrandList;
    // Return the user object
    return userDetails;

}